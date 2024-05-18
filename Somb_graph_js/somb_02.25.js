let space = 20;
let pts = 20;
let waveMatrix;
let frames = 60;
let angleOffset = 0;
let x, y, z;
/////////////////////////////////////////////////////
//                  GPT REVISION                   //
/////////////////////////////////////////////////////

// Global Nernst Factors
let E_Nernst, E_Cell, transfer_e, electrons, protons, rxnRatio, Product, Reactant, Faraday;
Faraday = 0.0592; // Faraday constant in Volts
Product = 10e-6; // Example mols/volume
Reactant = 1.4612e-4; // Glutamate mols/volume
electrons = 4;
protons = 1;
rxnRatio = Product / Reactant;
transfer_e = electrons; // Using the number of electrons directly
E_Cell = (Faraday / transfer_e) * Math.log(rxnRatio);
E_Nernst = E_Cell + ( Math.random(-E_Cell,E_Cell)  )// Variation around E_Cell

console.log("Initial E_Nernst: ", E_Nernst);

var makeGraph = function(plot) {
    plot.setup = function() {
        plot.angleMode(DEGREES);
        let canvas = plot.createCanvas(420, 400, WEBGL);
        canvas.parent('data');
        let camx = 100;
        let camy = -400;
        let camz = -100;
        plot.camera(camx, camy / 6, camz * 3);
        plot.frameRate(frames);
    };

    plot.draw = function() {
        plot.background(255);
        waveMatrix = [[], []];

        plot.rotateZ(frameCount);
        plot.rotate(frameCount / 4);

        let numPts = 100; // Number of points on the circle
        plot.stroke('rgba(255,0,0,1)');
        plot.fill('rgba(150,150,255,1)');

        angleOffset = frameCount * E_Nernst;
        for (let n = 0; n < numPts; n += 1) {
            plot.strokeWeight(E_Nernst);
            let wave = Math.sin(Math.PI * (n * E_Nernst / numPts) + angleOffset);
            let Alpha = 100 * E_Nernst;
            let x = 120 + (Alpha*(1/wave));
            let y = n * wave;
            let z =  n * 10;

            plot.beginShape();
            plot.vertex(x, y, z); // QUADRANT_1
            plot.vertex(-x, y, z); // QUADRANT_2
            plot.vertex(-x, -y, z); // QUADRANT_3
            plot.vertex(x, -y, z); // QUADRANT_4
            plot.endShape();

            waveMatrix[0].push(Math.round(x), Math.round(y), Math.round(z), '\n');
        }
    };
};

function control_panel() {
    let v0 = document.getElementById('dec0');
    let v1 = document.getElementById('inc0');
    let value_0_ID = document.getElementById('value0');

    let n0 = document.getElementById('dec1');
    let n1 = document.getElementById('inc1');
    let value_1_ID = document.getElementById('value1');

    function updateDisplay() {
        value_0_ID.textContent = E_Nernst.toFixed(4);
        value_1_ID.textContent = E_Nernst.toFixed(4);
    }

    function updateNernstFactors(newE_Nernst) {
        E_Nernst = newE_Nernst;
        updateDisplay();
    }

    function inc() {
        updateNernstFactors(E_Nernst + E_Cell); // Increment step for Nernst potential
    }

    function dec() {
        updateNernstFactors(E_Nernst - E_Cell); // Decrement step for Nernst potential
    }

    v1.addEventListener('click', inc);
    v0.addEventListener('click', dec);
    updateDisplay();
}

control_panel();

const downloadFile = () => {
    const link = document.createElement("a");
    const content = `Sine (XYZ values):\n${waveMatrix[0].join(", ")}`;
    const file = new Blob([content], { type: 'text/plain' });
    link.href = URL.createObjectURL(file);
    link.download = "waveMatrix.txt";
    link.click();
    URL.revokeObjectURL(link.href);
};

const save = document.getElementById('save');
save.addEventListener('click', downloadFile);

new p5(makeGraph, 'graphing');
