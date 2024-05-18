let space = 20;
let pts = 20;
let waveMatrix;
let frames = 30;
let angleOffset = 0;
let x,y,z;

//////////////////////////////////////////////////////////
//                THIS IS                               //
//                GPT'S                                 //
//                VERSION                               //
//                OF MY                                 //
//                CODE                                  //
//////////////////////////////////////////////////////////

var makeGraph = function(plot) {

    plot.setup = function() {
        plot.angleMode(DEGREES);
        let canvas = plot.createCanvas(400, 400, WEBGL);
        canvas.parent('data');
        let camx = 30;
        let camy = 290;
        let camz = 80;
        plot.camera(camx*2, camy*2, camz*2);
        plot.frameRate(frames);
    };

    plot.draw = function() {
        plot.background(200);
        waveMatrix = [[],[]];
        
        plot.orbitControl();
        
        let numPts = 100; // Number of points on the circle
        let radiusMultiplier = 100; // Adjust the radius multiplier for visual scaling

        plot.strokeWeight(0.1);
        plot.stroke('rgba(0,0,0,0.0)');

        for (let n = 0; n < pts; n++) {
            plot.fill('rgba(100,100,255,0.25)');
            let nth;
            plot.beginShape();
            for (let i = 0; i < numPts; i++) {
                nth = random(i-10, i);
                let angle = map(i, 0, numPts, 0, 360); // Convert index to angle
                let besselValue = besselJ0(angle); // Calculate Bessel function value
                let radius = besselValue * radiusMultiplier; // Adjust radius based on Bessel function value

                let xn = sin(angle + angleOffset) * space * n; // Adjust x-coordinate
                let yn = cos(angle + angleOffset) * space * n; // Adjust y-coordinate
                let waveAmount = sin(angle + angleOffset) * 200; // Adjust wave frequency and amplitude
                let zn = waveAmount;

                
                // Draw the vertex
                plot.vertex(xn, yn, zn);

                // Store coordinates in waveMatrix for downloading
                waveMatrix[0].push(Math.round(xn), Math.round(yn), Math.round(zn), '\n');
            } angleOffset += 1;
            plot.endShape(CLOSE);
        }
    };
};

// Approximation of Bessel function J0(x) using Taylor series
function besselJ0(x) {
    let sum = 0;
    let term = 1;
    let factorial = 1;

    for (let k = 0; k < 10; k++) { // Adjust the number of terms for accuracy
        sum += term;
        term *= -1 * x * x / (4 * (k + 1) * (k + 1));
        factorial *= (k + 1) * (k + 1);
    }

    return sum / factorial;
}

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
