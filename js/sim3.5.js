let addNeuron, makeNeuron, neuronPos;
function setup() {
    makeNeuron = createCanvas(400, 400, WEBGL);
    addNeuron = document.getElementById("neuron");
    neuronPos = camera(90, -250, 250);
    addNeuron.appendChild(makeNeuron.elt);
  }
  
  let nMols_nL, nL, nVolts, nSeconds, nMeters;
  nMols_nL= 1e-6;
  nVolts =  1e-6;
  nSeconds =  1e-6;
  nMeters =  1e-6;
  nL = 1e-6;
  let synaptic_factor = nMols_nL * nL * nVolts * nSeconds * nMeters;
  
  var x_ini = 0;
  var y_ini = -125;
  var z_ini = 50;
  let stretch;
  
  function draw() {
    background(220);
    // rotateX(millis() / 1500);
    // rotateY(millis() / 1500);
    // rotateZ(millis() / 1500);
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

    //nucleus is the next set of lines
    let stroke_val = random(0,2);
    for (let x =0; x<5;x++){
      strokeWeight(0);
      stroke(75, 175, 255);
      line(0,-25,50, 0,0,50);
    }
    strokeWeight(0.25);
    stroke(0);
    push();
    translate(0, 0, 50);
    //rotateZ(frameCount * 0.01);
    // rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);
    ellipsoid(5,7.5,5);
    pop();
    //lines drawn up to this point represent location of the soma and nucleus
    
    //myelin lines below
    stroke(75, 175, 255);
    line(0, -50, 50, 0, -100, 50);
    strokeWeight(1.5);
    line(0, -55, 50, 0, -60, 50);
    line(0, -65, 50, 0, -70, 50);
    line(0, -75, 50, 0, -85, 50);
    line(0, -86, 50, 0, -90, 50);
    line(0, -91, 50, 0, -95, 50);
    stroke(70, 0, 255);
    strokeWeight(2);
    line(0, -100, 50, x_ini, y_ini, z_ini);
    strokeWeight(1);

    let kth = [];
    let axon_term = random(0, nMeters);
    let xk = x_ini + (axon_term);
    let yk = y_ini + (axon_term);
    let zk = z_ini + (axon_term);
    kth.push(createVector(xk, yk, zk));

    drawBranch(x_ini, y_ini, z_ini, 1, 4, 12); // Start with level 1
}

function drawBranch(x, y, z, level, stretch, branch) {
  if (level > 5) return; // Limit the depth of branching
      // Draw 3 branches per level
      strokeWeight(1);
      //assume 1 = 1000 nano meters or 1 micrometer
      let axon_term_x = random(-1, 1);
      let axon_term_y = random(-1, 1);
      let axon_term_z = random(-1, 1);
      
      //values below represent synptic factors
      let xk = x + axon_term_x * stretch;
      let yk = y - Math.abs(axon_term_y * stretch);
      let zk = z + axon_term_z * stretch;
      line(x, y, z, xk, yk, zk);
      
      // Recursively draw sub-branches
      drawBranch(xk, yk, zk, level+1, stretch, branch);
}
