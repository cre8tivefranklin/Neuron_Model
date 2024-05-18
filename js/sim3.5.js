let addNeuron, makeNeuron, neuronPos;
function setup() {
    makeNeuron = createCanvas(400, 400, WEBGL);
    addNeuron = document.getElementById("neuron");
    neuronPos = camera(90, -250, 250);
    addNeuron.appendChild(makeNeuron.elt);
    // frameRate(30);
  }
  
  let mMols_mL, mL, mVolts, mSeconds, mMeters;
  mMols_mL= 1e-6;
  mSeconds =  1e-6;
  mMeters =  1e-6;
  mL = 1e-6;
  let synaptic_factor = mMols_mL * mL * mVolts * mSeconds * mMeters;

  var m_Meters = (synaptic_factor)/(mL*mVolts*mMols_mL*mSeconds)
  
  var x_ini = 0;
  var y_ini = -125;
  var z_ini = 50;
  let stretch;
  
  function draw() {
    background(255);
    // rotateX(millis() / 1500);
    // rotateY(millis() / 1500);
    // rotateZ(millis() / 1500);
    stroke(0)
    strokeWeight(0.05);
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
    // rotateY(frameCount * 0.01);
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
    let axon_term = random(0, mMeters);
    let xk = x_ini + (axon_term);
    let yk = y_ini + (axon_term);
    let zk = z_ini + (axon_term);
    kth.push(createVector(xk, yk, zk));
    //drawBranch is
    // drawBranch(x_ini, y_ini, z_ini, 0.7, 1, 1);
}

function drawBranch(x, y, z, level, stretch, branch) {
  if (level > 10) return; // Limit the depth of branching
  strokeWeight(0.1);
  //assume 1 = 1000 nano meters or 1 micrometer
  //axon terminal values xyz shape the direction of the dendritic trees
  let axon_term_x = random(-1-(mMeters),1+(mMeters));
  let axon_term_y = random(-1-(mMeters),1+(mMeters));
  let axon_term_z = random(-1-(mMeters),1+(mMeters));
  
  //values below represent synptic factors
  let xk = x + axon_term_x * stretch;
  let yk = y - Math.abs(axon_term_y * stretch);
  let zk = z + axon_term_z * stretch;
  line(x, y, z, xk, yk, zk);
  drawBranch(xk, yk, zk, level+1, stretch, branch);
}
