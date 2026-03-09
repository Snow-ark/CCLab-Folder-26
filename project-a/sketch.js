let xRandom;
let yRandom;

let distance;
let angelX, angelY;

let originalX = 400;
let originalY = 250;

let lastPressTime = 0;
let flyingAway = false;
let returning = false;

let ringSize = 150;
let ringSize2 = 150;

let haloActive = false;

let timer = 0;
let duration = 200;

let angle;
let isDay;

// remember to add let canvas = 

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container")

  xRandom = random(0, 100);
  yRandom = random(0, 50);
  angelX = width / 2;
  angelY = height / 2;
}

function draw() {
  
  //background change
  angle = frameCount * 0.007;
  isDay = sin(angle) < 0;

  angle += 0.007;

  if (angle > TWO_PI) {
    angle = 0;
    isDay = !isDay;
  }

  if (isDay) {
    daylight();
  } else {
    night();
  }

  //upper part
  circles();

  // angel leaves canvas when pressed
  if (distance < 120 && mouseIsPressed) {
    flyingAway = true;
    returning = false;
    lastPressTime = millis(); // millis is milisecond
  }

  if (flyingAway) {
    angelX += 1;
    angelY -= 3;
  }

  // after 3 seconds, it comes back
  if (millis() - lastPressTime > 3000 && flyingAway) {
    flyingAway = false;
    returning = true;
  }

  if (returning) {
    angelX = lerp(angelX, originalX, 0.03); // more smooth
    angelY = lerp(angelY, originalY, 0.03);

    // stop when it comes back
    if (dist(angelX, angelY, originalX, originalY) < 1) {
      angelX = originalX;
      angelY = originalY;
      returning = false;
    }
  }

  angel(angelX, angelY);

  

  city();

  //pressing clock towers make halo pulsate
  clocktower();
  if (mouseIsPressed && dist(mouseX, mouseY, 700, 355) < 40) {
    haloActive = true;
  }
  if (mouseIsPressed && dist(mouseX, mouseY, 100, 355) < 40) {
    haloActive = true;
  }

  halo();
}

function angel(x, y) {
  push();

  let frequency = frameCount * 0.01;
  let sinVal = sin(frequency);

  x1 = map(sinVal, -1, 1, 150, 170);
  // y offset
  y1 = map(sinVal, -1, 1, -50, 30);

  translate(x, y + y1); // <-------
  distance = dist(mouseX, mouseY, x, y + y1);
  let Sat = map(distance, 0, width / 7, 150, 0); // color change

  //angel
  stroke(255);
  fill(180 + Sat, 226, 255);
  circle(0, 0, 150);

  //eye cover
  push();

  noStroke();
  fill(248, 250, 222);
  rect(-80, -33, 160, 37);

  pop();

  //smiley face (fix)
  stroke(248, 250, 222);
  strokeWeight(2);
  curve(-60, +40, -30, +45, 0, +50, +160, +45, +250, +40);

  // // helper dot
  // fill("red");
  // circle(0, 0, 5);

  halo();

  wings();

  pop();
}

function halo() {
  //halo
  push();

  stroke(248, 250, 222);
  noFill();
  strokeWeight(2);
  translate(0, sin(frameCount * 0.01) * 30);

  //   let expand = sin((frameCount * 0.01)+1/2) * 35;

  //   for (let i = -1; i < 3; i++) { // making multiple eclipses
  //   ellipse(0, -100, 150 + i * 20 + expand, 40 + i * 10 + expand * 0.3)}
  ellipse(0, -100, 150, 40);

  //pulsing halo
  if (haloActive) {
    let alpha = map(ringSize, 150, 250, 255, 0);
    stroke(248, 250, 222, alpha);
    ellipse(0, -100, ringSize, 40 + (ringSize - 150) * 0.2);

    let alpha2 = map(ringSize2, 150, 250, 255, 0);
    stroke(248, 250, 222, alpha2);
    ellipse(0, -100, ringSize2, 40);

    ringSize += 0.5;
    ringSize2 += 0.3;

    if (ringSize > 250) {
      ringSize = 150;
    }
    if (ringSize2 > 300) {
      ringSize2 = 150;
    }
  }

  pop();
}

function wings() {
  let wingDistance = dist(mouseX, mouseY, angelX, angelY);
  let speed = 0.07;

  //wings move faster when mouse is close
  if (wingDistance < 120) {
    speed = 0.18;
  }

  let frequency = frameCount * speed;
  let sinVal = sin(frequency);

  y1 = map(sinVal, -1, 1, -10, 0);

  //left wings
  push();
  triangle(-105, y1 - 40, -69, y1 - 30, -70, y1 + 30); // wing 1

  push(); // added small rotation on the last two wings
  translate(-70, y1 + 30);
  let wingrot = map(sinVal, -1, 1, 0, PI * -0.04);
  rotate(wingrot);

  triangle(-130 + 70, -37 - 30, -92 + 70, -30 - 30, 0, 0); // wing 2
  triangle(-160 + 70, -32 - 30, -115 + 70, -25 - 30, 0, 0); // wing 3

  // fill("blue")
  // circle(0, 0, 5);
  pop();

  pop();

  //right wings
  push(); // translate
  triangle(70, y1 - 30, 103, y1 - 38, 71, y1 + 30); // wing 1

  push();
  translate(71, y1 + 30);
  let wingrot2 = map(sinVal, -1, 1, 0, PI * 0.06);
  rotate(wingrot2);

  triangle(14, -57, 60, -35 - 30, 0, 0); // wing 2
  triangle(110 - 71, -21 - 30, 160 - 71, -30 - 30, 0, 0); // wing 3

  pop();

  pop();
}

function city() {
  //building
  push();

  stroke(212, 194, 150);
  fill(20, 25, 45);

  // buildings
  rect(500, 350, 100, 250);
  rect(350, 420, 100, 180);
  rect(200, 380, 100, 220);

  // windows building 1
  for (let y = 380; y < 560; y += 30) {
    for (let x = 520; x < 580; x += 30) {
      fill(255, 230, 150);
      rect(x, y, 10, 15);
    }
  }

  // windows building 2
  for (let y = 440; y < 560; y += 30) {
    for (let x = 370; x < 430; x += 30) {
      fill(255, 230, 150);
      rect(x, y, 10, 15);
    }
  }

  // windows building 3
  for (let y = 400; y < 560; y += 30) {
    for (let x = 220; x < 280; x += 30) {
      fill(255, 230, 150);
      rect(x, y, 10, 15);
    }
  }

  pop();
}

function clocktower() {
  // tower 1
  push();
  translate(700, 355);

  // tower body
  stroke(212, 194, 150);
  strokeWeight(2);
  fill(25, 30, 50);
  rect(-50, -55, 100, 220);

  // roof
  fill(35, 40, 65);
  triangle(-55, -55, 0, -95, 55, -55);

  // clock face
  fill(245, 240, 220);
  circle(0, 0, 80);

  // center dot
  fill(212, 194, 150);
  circle(0, 0, 6);

  // clock hand
  push();
  rotate(frameCount * 0.007);
  rectMode(CENTER);
  fill(212, 194, 150);
  noStroke();
  rect(17, 0, 34, 5);
  pop();

  pop();

  // tower 2
  push();
  translate(100, 355);

  // tower body
  stroke(212, 194, 150);
  strokeWeight(2);
  fill(25, 30, 50);
  rect(-50, -55, 100, 220);

  // roof
  fill(35, 40, 65);
  triangle(-55, -55, 0, -95, 55, -55);

  // clock face
  fill(245, 240, 220);
  circle(0, 0, 80);

  // center dot
  fill(212, 194, 150);
  circle(0, 0, 6);

  // clock hand
  push();
  rotate(frameCount * 0.007);
  rectMode(CENTER);
  fill(212, 194, 150);
  noStroke();
  rect(17, 0, 34, 5);
  pop();

  pop();
}

function circles() { // the sun and moon
  push();
  translate(width / 2, height / 2);
  rotate(frameCount * 0.007);

  noStroke();

  fill(255, 220, 120); // moon color

  circle(80, -350, 100);
  pop();
}

function night() {
  for (let y = 0; y < height; y++) {
    let r = map(y, 0, height, 8, 20);
    let g = map(y, 0, height, 15, 40);
    let b = map(y, 0, height, 45, 90);

    stroke(r, g, b);
    line(0, y, width, y);
  }
  stars();
}

function stars(x, y) {
  timer += 1; // help from TA
  if (timer >= duration) {
    xRandom = random(-1, 700);
    yRandom = random(0, 50);
    timer = 0;
  }

  push();
  translate(x, y);

  noStroke();

  // star 1
  let glow1 = map(sin(frameCount * 0.05), -1, 1, 100, 255);
  fill(255, 255, 200, glow1);
  circle(100 + xRandom, 80 + yRandom, 4);

  // star 2
  let glow2 = map(sin(frameCount * 0.07), -1, 1, 100, 255);
  fill(255, 255, 200, glow2);
  circle(300 + xRandom, 60 + yRandom, 5);

  // star 3
  let glow3 = map(sin(frameCount * 0.06), -1, 1, 100, 255);
  fill(255, 255, 200, glow3);
  circle(500 + xRandom, 120 + yRandom, 4);

  // star 4
  let glow4 = map(sin(frameCount * 0.08), -1, 1, 100, 255);
  fill(255, 255, 200, glow4);
  circle(200 + xRandom, 40 + yRandom, 3);

  pop();
}

function daylight() {
  for (let y = 0; y < height; y++) {
    let r = map(y, 0, height, 70, 180);
    let g = map(y, 0, height, 150, 220);
    let b = map(y, 0, height, 255, 255);

    stroke(r, g, b);
    line(0, y, width, y);
  }
  
  clouds()
}

function clouds(){
  
}
