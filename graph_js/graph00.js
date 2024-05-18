let x = 50;
let y = 225;
let space = 20;
let pts = 15;
let waveMatrix;
let theta, alpha;
  
var makeGraph = function(plot) {

    plot.setup = function(){
        let canvas = plot.createCanvas(400, 400, WEBGL);
        canvas.parent('data');
        plot.camera(750,420, 180);
        plot.frameRate(5);
    };

    plot.draw = function() {
        plot.background(0);
        plot.stroke(255);
        
        function delta(){
            theta = random(-5,5);
            alpha = 10;
            plot.noFill();
            plot.beginShape();
            for (let i = 0; i<pts; i++){   
                var nth = random(i - 1, i);
                let px = x + i * space;
                let py = y - i*(alpha*sin(nth*theta));
                plot.vertex(px,py);
            }
            plot.endShape();
            plot.beginShape();
            for (let i = 0; i<pts; i++){   
                var nth = random(i - 1, i);
                let px = x + i * space;
                let py = y - i*(alpha*sin(nth*theta));
                plot.vertex(px+10,py+10, 50);
            }
            plot.endShape();
            plot.beginShape();
            for (let i = 0; i<pts; i++){   
                var nth = random(i - 1, i);
                let px = x + i * space;
                let py = y - i*(alpha*sin(nth*theta));
                plot.vertex(px+20,py+20, 100);
            }
            plot.endShape();
            plot.beginShape();
            for (let i = 0; i<pts; i++){   
                var nth = random(i - 1, i);
                let px = x + i * space;
                let py = y - i*(alpha*sin(nth*theta));
                plot.vertex(px+40,py+40, 150);
            }
            plot.endShape();
            plot.beginShape();
            for (let i = 0; i<pts; i++){   
                var nth = random(i - 1, i);
                let px = x + i * space;
                let py = y - i*(alpha*sin(nth*theta));
                plot.vertex(px-10,py-10, -50);
            }
            plot.endShape();
            plot.beginShape();
            for (let i = 0; i<pts; i++){   
                var nth = random(i - 1, i);
                let px = x + i * space;
                let py = y - i*(alpha*sin(nth*theta));
                plot.vertex(px-20,py-20,-100);
            }
            plot.endShape();
            plot.beginShape();
            for (let i = 0; i<pts; i++){   
                var nth = random(i - 1, i);
                let px = x + i * space;
                let py = y - i*(alpha*sin(nth*theta));
                plot.vertex(px-40,py-40, -150);
            }
            plot.endShape();
        }delta();

        // x += 1;
        console.log(x);
        // y += 1;
        if (x > 400){
            x = 0;
        }
      };
};
new p5(makeGraph, 'graphing');