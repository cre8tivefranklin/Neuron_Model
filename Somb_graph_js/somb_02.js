let space = 20;
let pts = 20;
let waveMatrix;
let frames = 60;
let angleOffset = 0;
let x,y,z;

//Global Nernst Factors
let E_Nernst, E_Cell, transfer_e, electrons, protons, rxnRatio, Product, Reactant, Faraday;
Faraday = 0.0592*10e-6;
Product = 10e-6; //any mols/volume
Reactant = 1.4612e-4;//Glutamate mols/volume
electrons = 4;
protons = 1;
rxnRatio = Product/Reactant;
transfer_e = Math.random(protons,electrons);
E_Cell = (Faraday/transfer_e)*( Math.log(rxnRatio) );
E_Nernst = E_Cell + Math.random(-E_Cell,E_Cell);

var makeGraph = function(plot) {
    plot.setup = function() {
        plot.angleMode(DEGREES);
        let canvas = plot.createCanvas(400, 200, WEBGL);
        canvas.parent('data');
        let camx = 100;
        let camy = -400;
        let camz = -100;
        plot.camera(camx, camy/6, camz*2);
        plot.frameRate(frames);
    };
    plot.draw = function() {
        plot.background(255);
        waveMatrix = [[],[]];
        
        // plot.orbitControl();
        plot.rotateZ(frameCount);
        plot.rotate(frameCount/4);
        
        let numPts = 90; // Number of points on the circle
        let radius = 360; // Adjust the radius multiplier for visual scaling

        plot.strokeWeight(2);
        plot.stroke('rgba(255,0,0,1)');
        plot.fill('rgba(150,150,255,1)'); 

        // plot.translate(0,0,0);
        angleOffset = frameCount;     
        for (let n = 0; n < numPts; n+=1) {
            // console.log("Nth: ",n);
            let wave = cos(PI*(n*E_Nernst/numPts) + angleOffset);
            let x = 120+(50*wave);
            let y = n*wave;
            let z = 120 + n*10;

            plot.beginShape();
            plot.vertex(x, y, z);//QUADRANT_1
            plot.vertex(-x, y,z);//QUADRANT_2
            plot.vertex(-x, -y, z);//QUADRANT_3
            plot.vertex(x, -y, z);//QUADRANT_4
            plot.endShape();

            waveMatrix[0].push(Math.round(x), Math.round(y), Math.round(z), '\n');
        }
    };
};

function control_panel(){
    let num_ini, v0, v1, n0, n1, value_0_ID, value_0, value_1_ID, value_1;
    v0 = document.getElementById('dec0');
    v1 = document.getElementById('inc0');
    value_0_ID = document.getElementById('value0');

    n0 = document.getElementById('dec1');
    n1 = document.getElementById('inc1');
    value_1_ID = document.getElementById('value1');
    num_ini = (E_Nernst);
    console.log("ini: ",E_Nernst)
    value_0 = num_ini; value_1 = num_ini;
    value_0_ID.textContent = value_0;
    value_1_ID.textContent = value_1;
    
    function updateNum(){
        value_0_ID.textContent = Math.round(value_0 * 100)/100;
    };
    function inc(){
        E_Nernst + E_Nernst;
        value_0+=E_Nernst;
        updateNum();
    }; v1.addEventListener('click', inc);
    
    function dec(){
        E_Nernst - E_Nernst;
        value_0-=E_Nernst;
        updateNum();
    }; v0.addEventListener('click', dec);
}; control_panel();

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
