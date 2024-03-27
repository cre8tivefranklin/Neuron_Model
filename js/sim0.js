// Declare variables to store p5.js objects
let makesphere;
let img;

function setup() {
  // Create a canvas using p5.js
  makesphere = createCanvas(500, 500, WEBGL); //args(width, height)
  
  // Append the canvas to the element with the ID "sphere"
  document.getElementById("sphere").appendChild(makesphere.elt);
}

function draw() {
  // Rotate the sphere gradually
  rotateY(millis() / 1000);
  
  // Set background color  background(205, 102, 94)
  background(255,255,255);
  
  // Draw a sphere sphere([radius], [detailX], [detailY])
  img= loadImage();
  texture(img);
  sphere(220);
}
