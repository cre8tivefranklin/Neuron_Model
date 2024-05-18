let space = 20;
let pts = 20;
let waveMatrix;
let frames = 30;
let angleOffset = 0;
let x,y,z;

var makeGraph = function(plot) {

    plot.setup = function() {
        plot.angleMode(DEGREES);
        let canvas = plot.createCanvas(400, 400, WEBGL);
        canvas.parent('data');
        let camx = 0;
        let camy = 900;
        let camz = 500;
        plot.camera(camx, camy, camz);
        plot.frameRate(frames);
    };

    plot.draw = function() {
        plot.background(200);
        waveMatrix = [[],[]];
        
        plot.orbitControl();
        
        let numPts = 100; // Number of points on the circle
        let radius = 360; // Adjust the radius multiplier for visual scaling

        plot.strokeWeight(0.1);
        plot.stroke('rgba(0,0,0,0.0)');
        plot.fill('rgba(100,100,255,0.25)');  

        
        let xn = 100*sin(TWO_PI + angleOffset);
        let yn = 10*cos(TWO_PI + angleOffset);
        let zn = tan(TWO_PI + angleOffset);
        plot.translate(0,0,200);
        plot.rotateZ(frameCount*PI/2);
        plot.circle(xn,yn,1080 + zn);
        // Store coordinates in waveMatrix for downloading
        waveMatrix[0].push(Math.round(xn), Math.round(yn), Math.round(zn), '\n');

    };
};

// Approximation of Bessel function J0(x) using Taylor series

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
