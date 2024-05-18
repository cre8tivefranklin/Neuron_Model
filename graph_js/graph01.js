var makeGraph = function(plot) {

    plot.setup = function(){
        let canvas = plot.createCanvas(400, 400);
        canvas.parent('data');
        plot.frameRate(1);
    };

    plot.draw = function() {
        plot.background(0);
        plot.stroke(255);
        var delta_ = 200;
        var nth = random(-2.5,2.5);
        var kth = random(-2.5,2.5);
        for (var i = 0; i<50; i++){
            
            plot.line(200,delta_,0, delta_,delta_,0);//init
            plot.line(400,delta_ - i*5*nth,0, delta_ - i*5*nth,delta_ -i*5*nth,0); //up
            plot.line(400,delta_ + i*5*kth,0, delta_ + i*5*kth,delta_ + i*5*nth,0); //down
        }
      };
};
new p5(makeGraph, 'graphing');