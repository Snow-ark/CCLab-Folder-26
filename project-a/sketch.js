let xRandom;
let yRandom;

let timer = 0;
let duration = 50;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container")
  xRandom = random(0, width);
  yRandom = random(0, 50);
}

function draw() {
  background (0)
  
  //upper part
  stars();
  stars();
  
  if (!mouseIsPressed){ // makes angel disappear if mouse is pressed
    angel(width / 2, height / 2);
    wings();
  }
  
  //lower part
  city();
}



function angel(x, y) {
  let frequency = frameCount * 0.03;
  let sinVal = sin(frequency);

  x1 = map(sinVal, -1, 1, 150, 170);
  y1 = map(sinVal, -1, 1, 150, 165);

  let distance = dist(mouseX, mouseY, x, y1);
  let Sat = map(distance, 0, width / 3, 150, 0); // color change

  //angel (draft)
  stroke(255);
  fill(Sat, 50, 100);
  circle(x, y1 + 70, 150);

  //eye cover
  push();

  noStroke();
  fill(135, 189, 255);
  rect(320, y1 + 40, 160, 37);

  pop();
  
  //halo (revise)
  push();
  
  stroke(Sat, 246, 247);
  noFill();
  strokeWeight (2)
  
  ellipse (width/2, height/3.96 , 150, 40)
  pop();
  
  //smiley face and frown face
  
}

function wings() {
  
 let frequency = frameCount * 0.03;
  let sinVal = sin(frequency);
  y1 = map(sinVal, -1, 1, 150, 172);
  
  //left wings
  push();
  
  triangle(300, y1 +25, 331, y1 + 30, 330, y1 + 90); // wing 1
  triangle (270, y1+23, 308, y1 +30, 330, y1 + 90) // wing 2
  triangle (240, y1+28, 285, y1 +35, 330, y1 +90 ) // wing 3
  
  pop();
  
  
  
  
  //right wings
  push();
  triangle(470, y1 + 30, 503, y1 + 25, 471, y1 + 90); // wing 1
  triangle(490, y1 + 32, 531, y1 + 25, 471, y1 + 90); // wing 2
  triangle (510, y1 +39, 560, y1 + 30 , 471, y1 +90 ) // wing 3
  
  pop();
}

function stars() {
  timer += 1; // help from TA
  if (timer >= duration) {
    xRandom = random(-1, 700);
    yRandom = random(0, 50);
    timer = 0;
  }

  //star 1
  push();

  fill(98, 59, 122);
  noStroke();

  triangle(
    50 + xRandom,
    50 + yRandom,
    40 + xRandom,
    70 + yRandom,
    60 + xRandom,
    70 + yRandom
  );
  triangle(
    40 + xRandom,
    60 + yRandom,
    50 + xRandom,
    80 + yRandom,
    60 + xRandom,
    60 + yRandom
  );
  triangle(
    50 + xRandom,
    50 + yRandom,
    40 + xRandom,
    70 + yRandom,
    60 + xRandom,
    70 + yRandom
  );
  triangle(
    40 + xRandom,
    60 + yRandom,
    50 + xRandom,
    80 + yRandom,
    60 + xRandom,
    60 + yRandom
  );
  pop();

  //star 2
  push();

  fill(174, 114, 212);
  noStroke();

  triangle(
    100 + xRandom,
    100 + yRandom,
    90 + xRandom,
    120 + yRandom,
    110 + xRandom,
    120 + yRandom
  );
  triangle(
    90 + xRandom,
    110 + yRandom,
    100 + xRandom,
    130 + yRandom,
    110 + xRandom,
    110 + yRandom
  );
  triangle(
    100 + xRandom,
    100 + yRandom,
    90 + xRandom,
    120 + yRandom,
    110 + xRandom,
    120 + yRandom
  );
  triangle(
    90 + xRandom,
    110 + yRandom,
    100 + xRandom,
    130 + yRandom,
    110 + xRandom,
    110 + yRandom
  );
  pop();

  //star 3
}

function city(){ // not finished
  
  push();
  //building
  stroke(212, 194, 150)
  noFill()
  rect(575, 400, 50, 180)
  pop();
  
  // racing clock
  push();
  
  translate(600, 430)
  rotate(frameCount * 0.1)
  fill(0);
  rect (0,0, 10, 5)
  
  stroke(212, 194, 150)
  noFill();
  circle(0,0, 30)
  
  pop();
  
  
}
