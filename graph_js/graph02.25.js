let x = 50;
let y = 225;
let space = 20;
let pts = 10;
let waveMatrix;
let theta, alpha;
  
var makeGraph = function(plot) {

    plot.setup = function(){
        let canvas = plot.createCanvas(400, 400, WEBGL);
        canvas.parent('data');
        var camx, camy, camz;
        camx = -480;
        camy = -270;
        camz = 320;
        plot.camera(camx,camy, camz);
        plot.frameRate(2);
    };

    plot.draw = function() {
        plot.background(0);
        waveMatrix = [[],[]];
        
        function delta(){
            plot.strokeWeight(0.1);
            theta = random(-5,5);
            alpha = 10;
            plot.stroke('rgb(255,255,255)');
            for (let n =0; n<pts; n++){
                plot.fill('rgba(100,100,255,0.05)');
                plot.beginShape();
                for (let i = 0; i<pts; i++){  
                    var nth = random(i - 1, i);
                    let px = x + i * space;
                    let py = y - i*(alpha*sin(nth*theta));
                    let xn = random(-(px+10*n), px+10*n);
                    let yn = random(-(py+10*n), py+10*n);
                    let zn = random(-(i+20*n), i+20*n);
                    plot.vertex(xn,yn,zn);
                    // console.log("Values xyz_n: \n");
                    // console.log(xn, yn, zn);
                    waveMatrix[0].push(Math.round(xn), Math.round(yn), Math.round(zn), '\n');
                    console.log('sin wave: \n', xn,yn,zn,'\n');                
                }
                plot.endShape();

                plot.fill('rgba(255,100,100,0.15)');
                plot.beginShape();
                for (let i = 0; i<pts; i++){
                    var nth = random(i - 1, i);
                    let px = x + i * space;
                    let py = y - i*(alpha*cos(nth*theta));
                    let xm = random(-(px-10*n), px-10*n);
                    let ym = random(-(py-10*n), py-10*n);
                    let zm = random(-(i-20*n),i-20*n);
                    plot.vertex(xm,ym,zm);
                    // console.log("Values xyz_m: \n");
                    // console.log(xm, ym, zm);
                    waveMatrix[1].push(Math.round(xm),Math.round(ym),Math.round(zm), '\n');
                    console.log('cos wave: \n', xm,ym,zm,'\n');   
                }
                plot.endShape();
            };
        }delta();

      };
    };
    const downloadFile = () => {
        const link = document.createElement("a");

        const content = `Sine (XYZ values):\n${waveMatrix[0].join(", ")}\n\nCosine (XYZ values):\n${waveMatrix[1].join(", ")}`;

        console.log("Content: \n", content);
        const file = new Blob([content], { type: 'text/plain' });
        link.href = URL.createObjectURL(file);
        link.download = "waveMatrix.txt";
        link.click();
        URL.revokeObjectURL(link.href);
    }; 
    const save = document.getElementById('save');
    save.addEventListener('click', downloadFile);
new p5(makeGraph, 'graphing');

function control_panel(){
    let num_ini, v0, v1, n0, n1, value_0_ID, value_0, value_1_ID, value_1;

    v0 = document.getElementById('dec0');
    v1 = document.getElementById('inc0');
    value_0_ID = document.getElementById('value0');

    n0 = document.getElementById('dec1');
    n1 = document.getElementById('inc1');
    value_1_ID = document.getElementById('value1');
    num_ini = 0;
    value_0 = num_ini; value_1 = num_ini;
    value_0_ID.textContent = value_0;
    value_1_ID.textContent = value_1;
    function updateNum(){
        value_0_ID.textContent = value_0;
    };
    function inc(){
        value_0++;
        updateNum();
    }; v1.addEventListener('click', inc);
    
    function dec(){
        value_0--;
        updateNum();
    }; v0.addEventListener('click', dec);

}; control_panel();