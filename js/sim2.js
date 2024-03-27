// Declare variables
let makesphere, addSphere;
let angle = 0;
let spherePosition;
let weeE, weiI, IextE, Ex, Fr_1, dE_dt;
let wieE, wiiI, IextI, In, Fr_2, dI_dt, Hz_, neural_population, Alpha, wave, ampIE;
let selectedPopulation = 'Inhibition'; // Default selected population

let sphere = document.getElementById('sphere');
let neuron = document.getElementById('neuron');


//Just the declarations, no assgnt
let makeNeuron;
let addto_makeNeuron;

function setup() {
  makesphere = createCanvas(500, 500, WEBGL);
  addSphere = document.getElementById("sphere");
  addSphere.appendChild(makesphere.elt);
  spherePosition = createVector(5, 5, 5);

  var remove_sphere = addSphere;
  
  // Event listeners to update the selected population type
  document.getElementById("Ini").addEventListener("click", function () {
    selectedPopulation = 'Inhibition';
  });
  document.getElementById("Ex").addEventListener("click", function () {
    selectedPopulation = 'Excitation';
  });
  document.getElementById("I_E").addEventListener("click", function () {
    selectedPopulation = 'EntirePopulation';
  });
  document.getElementById("Alpha").addEventListener("click", function () {
    selectedPopulation = 'Alpha_entrain';
  });

  return remove_sphere;
}

function draw() {
  background(255);
  rotateY(angle);
  translate(spherePosition.x, spherePosition.y, spherePosition.z);
  let amp = random(200, 210);
  let radius = amp/2;
  let detailX = 48;
  let detailY = 32;

  ampIE = random(10, 50);
  beginShape(QUAD_STRIP);
  for (let lat = 0; lat <= detailY; lat++) {
    let theta = map(lat, 0, detailY, 0, PI);
    for (let lon = random(0, 3); lon <= detailX; lon++) {
      let phi = map(lon, 0, detailX, 0, TWO_PI);
      let x = radius * sin(theta) * cos(phi);
      let y = radius * sin(theta) * sin(phi);
      let z = radius * cos(theta);

//EXCITATORY POPULATION
      weeE = random( cos(PI/2), sin(PI));
      weiI = random( sin(PI), cos(3*(PI/2)) );
      IextE = random( ampIE*10e-6, ampIE*10e-1 );
      Ex = random();
      Fr_1 = (weeE - weiI + IextE);
      dE_dt = -Ex + Fr_1;

//INHIBITORY POPULATION
      wieE = random( sin(2*PI), cos(PI/2) );
      wiiI = random( cos(3*(PI/2)) , sin(2*PI) );
      IextI = random(-ampIE*10e-1, ampIE*10e-1)/(random(10, 25));
      In = random();
      Fr_2 = (wieE - wiiI + IextI);
      dI_dt = -In + Fr_2;
      Hz_ = random();

      neural_population = dI_dt - dE_dt;
      Alpha = ((sin((2 * PI) * Hz_)) - (sin((PI / 2) * Hz_))) * 10;

      let lineColor = color(map(x, -radius, radius, 0, 55), 100, 100);
      if (selectedPopulation === 'Inhibition') {
        wave = dI_dt;
        lineColor = color(map(x, -radius, radius, 0, 55), 100, 200);
      } else if (selectedPopulation === 'Excitation') {
        wave = dE_dt;
        lineColor = color(map(x, -radius, radius, 0, 55), 200, 100);
      } else if (selectedPopulation === 'EntirePopulation') {
        wave = neural_population;
      } else if (selectedPopulation === 'Alpha_entrain') {
        wave = neural_population/Alpha;
        lineColor = color(map(x, -radius, radius, 0, 55), 100, 100, 200)
      }

      let offset = wave;
      x += offset;
      y += offset;
      z +=offset;

      stroke(lineColor);
      vertex(x, y, z);
    }
  }
  endShape();
  angle += random(0.005, 0.5);
}




///////////////////////////////////////////////////////////////
// DRAW NEURON
///////////////////////////////////////////////////////////////
var canvas_Neuron = function(Neuron){
  let Xm,Ym,Zm,Yk,Xk,Zk;//m = excitatory weights, k = inhibitory
  let delta_y, delta_x, lyne;
  let strokeVal, range;
  let nucleus, axon, axon_terminal, num;

    Neuron.setup = function(){
      let roboto = loadFont("Roboto");
      Neuron.createCanvas(500, 500, WEBGL);
      Neuron.textFont(roboto);
      Neuron.textSize(16);
      
      document.getElementById("Ini").addEventListener("click", function () {
        selectedPopulation = 'Inhibition';
      });
      document.getElementById("Ex").addEventListener("click", function () {
        selectedPopulation = 'Excitation';
      });
      document.getElementById("I_E").addEventListener("click", function () {
        selectedPopulation = 'EntirePopulation';
      });
      document.getElementById("Alpha").addEventListener("click", function () {
        selectedPopulation = 'Alpha_entrain';
      });
    }
    Neuron.draw = function(){
      //Excitatory
      Xm = -Ex;
      Ym = -In;
      Zm = dE_dt;
      range_E = [Xm,Ym,Zm];

      //Inhibitory
      Yk = -Ex;
      Xk = -In;
      Zk = dI_dt;
      range_I = [Xk,Yk,Zk];

      Neuron.background(255);
      Neuron.camera(90,120,720);
      // Neuron.orbitControl();
      Neuron.rotateY(millis() / 1000);
      
      //set coordinates
      lyne = [90,90,90,  90,90,90];//x1 y1 z1__x2 y2 z2

      range = 6;
      Neuron.strokeWeight(1);
      num = 30;
      delta_y = [];
      delta_x = [];
      let vert_ = 90;

      nucleus = [
        Neuron.line(vert_,vert_,vert_, 0,0,0),//S1_R
        Neuron.line(-vert_,vert_,vert_, 0,0,0),//S1_L  
        Neuron.line(vert_,vert_,-vert_, 0,0,0),//S2_R
        Neuron.line(-vert_,vert_,-vert_, 0,0,0),//S2_L
        
        Neuron.line(-vert_,vert_,vert_, vert_,vert_,vert_),
        Neuron.line(vert_,vert_,vert_, vert_,vert_,-vert_),
        Neuron.line(vert_,vert_,-vert_, -vert_,vert_,-vert_),
        Neuron.line(-vert_,vert_,vert_, -vert_,vert_,-vert_)
      ]
      axon = Neuron.line(lyne[0]*0,-lyne[1]/9,lyne[2]*0,  lyne[3]*0,-lyne[4]*3,lyne[5]*0);
      
      let random_angle = random(-num,num);
      if (selectedPopulation === 'Inhibition') {
        num = Zk;
      } else if (selectedPopulation === 'Excitation') {
        num = Zm;
      } else if (selectedPopulation === 'EntirePopulation') {
        num = Zk - Zm;
      } else if (selectedPopulation === 'Alpha_entrain') {
        num = (Zk-Zm)/Alpha;
      }

      let neuroText = ["Nucleus","Axon","Axon_Terminal"];
      //axon terminal loop
      for (count = 0; count < num; count++){
        strokeVal = count;

        Neuron.line(lyne[0]*0,-lyne[1]*2,lyne[2]*0,  -lyne[3]/3,-lyne[4]*3,lyne[5]*0);//90left
        Neuron.line(lyne[0]*0,-lyne[1]*2,lyne[2]*0,  lyne[3]/3,-lyne[4]*3,lyne[5]*0);//90right
        
        
        //x-axis
        delta_x.push(...lyne);
        delta_y.push(...lyne);

        delta_x[0]=delta_x[3];
        delta_x[0]+=random(-range,range);
        delta_x[3]+=random(-range,range);
        delta_y[1]=delta_y[4];        
        delta_y[4]+=random(-range,range);
        
        if (range >= 0){
          range++;

          strokeVal = count/(num);
          strokeVal+=Xm;
          Neuron.color(strokeVal--);
          Neuron.strokeWeight(strokeVal);
  
          Neuron.line(delta_x[0]*0, delta_y[1]-lyne[1]*4,0, delta_x[3]-lyne[3], delta_y[4]-lyne[4]*5,random_angle);
        }
      }
      Neuron.text(neuroText[0],vert_, vert_, 0, 0);

    }
  }

var addNeuron = new p5(canvas_Neuron, 'neuron');


