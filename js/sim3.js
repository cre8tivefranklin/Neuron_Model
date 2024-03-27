let addNeuron, makeNeuron, neuronPos;
function setup() {
    makeNeuron = createCanvas(400, 400, WEBGL);
    addNeuron = document.getElementById("neuron");
    neuronPos = camera(0, -150, 50*sqrt(25));
    addNeuron.appendChild(makeNeuron.elt);
    
  }
  
  let nMols_nL, nVolts, nSeconds, nMeters;
  nMols_nL= 1e-6;
  nVolts =  1e-6;
  nSeconds =  1e-6;
  nMeters =  1e-6;
  
  let amps = 0;
  var x_ini = 0;
  var y_ini = -125;
  var z_ini = 50;
  let stretch, Sf;
  
  function draw() {
    background(220);
    rotateY(millis() / 1500);
    stroke(0)
    strokeWeight(1);
    line(50, 0, 50, 0,0,0);
    line(-50, 0, 50, 0,0,0);
    line(0, 50, 50, 0,0,0);
    line(0, -50, 50, 0,0,0);
    
    line(0,0,100, 50,0,50);
    line(0,0,100, -50,0,50);
    line(0,0,100, 0,50,50);
    line(0,0,100, 0,-50,50);
    
    line(0,-50,50, -50,0,50);
    line(0,-50,50, 50,0,50);
    line(0,50,50, 50,0,50);
    line(0,50,50, -50,0,50);

    //neucleus is the next set of lines
    let stroke_val = random(0,2)
    for (let x =0; x<=5;x++){
      strokeWeight(stroke_val);
      stroke(255,0,255);
      line(0,-25,50, 0,0,50);
  
      strokeWeight(stroke_val/2);
      line(25,25-25,50, 0,0-25,50);
      line(-25,25-25,50, 0,0-25,50);
  
      line(0,25-25,75, 0,0-25,50);
      line(0,25-25,25, 0,0-25,50);
  
      line(-25,25-25,50, 0,25-25,25);
      line(0,25-25,25, 25,25-25,50);
      line(-25,25-25,50, 0,25-25,75);
      line(0,25-25,75, 25,25-25,50);
    }

    //lines drawn up to this point represent location of the soma and nucleus
    
    stroke(75, 175, 255);
    strokeWeight(0.5);
    line(0, -50, 50, 0, -100, 50);
    strokeWeight(stroke_val**2)
    line(0, -55, 50, 0, -60, 50);
    line(0, -65, 50, 0, -70, 50);
    line(0, -75, 50, 0, -85, 50);
    line(0, -86, 50, 0, -90, 50);
    line(0, -91, 50, 0, -95, 50);
    stroke(70, 0, 255);
    strokeWeight(5);
    line(0, -100, 50, x_ini, y_ini, z_ini);
    strokeWeight(1);

    let kth = [];
    for (let i = 0; i <= 10; i++) {
        let axon_term = random(-25, 25);
        axon_term*Sf;
        let xk = x_ini + (axon_term / 5);
        let yk = y_ini + (axon_term / 5);
        let zk = z_ini + (axon_term / 5);
        kth.push(createVector(xk, yk, zk));
    }

    for (let i = 0; i < 5; i++) {
      drawBranch(x_ini, y_ini, z_ini, 1, 1, 1); // Start with level 1
  }
}
strokeWeight(1);
function drawBranch(x, y, z, level, stretch, branch) {
  if (level > 1.5) return; // Limit the depth of branching

  for (let i = 0; i < branch; i++) { // Draw 3 branches per level
      let axon_term_x = random(-25, 25);
      let axon_term_y = random(-25, 25);
      let axon_term_z = random(-25, 25);
      let xk = x + axon_term_x / 5 * stretch;
      let yk = y + axon_term_y / 5 * stretch;
      let zk = z + axon_term_z / 5 * stretch;
      line(x, y, z, xk, yk, zk);
      
      // Recursively draw sub-branches
      drawBranch(xk, yk, zk, level + 1, stretch, branch);
  }
}
