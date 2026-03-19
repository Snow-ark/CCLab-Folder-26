let backtrack;
let x = [];
let y = [];

function preload(){
  backtrack = loadSound("assets/my-sounds/00.mp3")
}

function setup() {
  createCanvas(400, 400);
  // backtrack.loop()
}

function draw() {
  background(220);

  for(let i=0; i < x.length; i++){
    drawCircle(x[i], y[i]);
  }
}

function drawCircle(x, y){
circle (x, y, 30)
}

function mousePressed(){
  x.push(mouseX);
  y.push(mouseY);
}