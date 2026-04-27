let skaterX;
let skaterY;
let skaterSize = 90;

let riverY;
let riverH = 150;

let offsetX = 0;
let worldScroll = 0;

let showChoice = false;
let choiceMade = "";
let nextChoicePoint = 900; 

let normalChoiceCount = 0;

let cliffStart = 4300;
let cliffX;

let showFinalChoice = false;
let finalChoiceMade = "";

let ending = "";
let fallingY = 0;
let fallingSpeed = 0;
let skaterForward = 0;

let cracks = [
  [0.25, 0.50, 0.38, 0.43],
  [0.38, 0.43, 0.44, 0.57],
  [0.56, 0.28, 0.69, 0.21],
  [0.69, 0.21, 0.75, 0.35],
  [0.75, 0.82, 0.85, 0.75]
];

let trees = [];

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.id("p5-canvas");
  canvas.parent("p5-canvas-container");

  riverY = height * 0.62;
  skaterX = width / 2;
  skaterY = riverY + riverH * 0.18;

  cliffX = 5000;

  makeTrees();

}

function draw() {
  background(220, 235, 245);

  // river 
  frozenriver(offsetX, riverY, width, riverH);
  frozenriver(offsetX - width, riverY, width, riverH);

  // land and grass + cliff
  drawLand();
  drawGrass();
  

  // trees
  for (let i = 0; i < trees.length; i++) {
    trees[i].display();
  }

  drawCliff();

 

// normal yes/no choices only happen 3 times
if (
  worldScroll > nextChoicePoint &&
  !showChoice &&
  normalChoiceCount < 3 &&
  !showFinalChoice
) {
  showChoice = true;
}

// final choice appears when the skater reaches the cliff edge
let cliffScreenX = cliffX - worldScroll;

if (
  normalChoiceCount >= 3 &&
  cliffScreenX < skaterX + 110 &&
  finalChoiceMade === ""
) {
  showFinalChoice = true;
}

 // skater (FIX)
  drawSkater();

  updateEnding();


if (showChoice) {
  drawChoiceScreen();
}

if (showFinalChoice) {
  drawFinalChoiceScreen();
}

}


function drawChoiceScreen() {
  push();

  // dark transparent overlay
  fill(0, 0, 0, 120);
  rect(0, 0, width, height);

  // question text
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("Do you want to continue?", width / 2, height / 2 - 90);

  // yes button
  fill(240);
  rect(width / 2 - 140, height / 2, 110, 55, 15);
  fill(0);
  textSize(24);
  text("Yes", width / 2 - 85, height / 2 + 28);

  // no button
  fill(240);
  rect(width / 2 + 30, height / 2, 110, 55, 15);
  fill(0);
  text("No", width / 2 + 85, height / 2 + 28);

  pop();
}


function drawFinalChoiceScreen() {
  push();

  fill(0, 0, 0, 150);
  rect(0, 0, width, height);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(30);
  text("Are you really, really sure you want to continue?", width / 2, height / 2 - 90);

  fill(240);
  rect(width / 2 - 150, height / 2, 120, 55, 15);
  fill(0);
  textSize(24);
  text("Yes", width / 2 - 90, height / 2 + 28);

  fill(240);
  rect(width / 2 + 30, height / 2, 120, 55, 15);
  fill(0);
  text("No", width / 2 + 90, height / 2 + 28);

  pop();
}

function updateEnding() {
  if (ending === "ice") {
    fallingY += fallingSpeed;
    fallingSpeed += 0.25;

    drawBreakingIce();
  }

  if (ending === "cliff") {
    // after final yes, scrolling will move the skater forward
    if (skaterForward > 180) {
      fallingY += fallingSpeed;
      fallingSpeed += 0.25;
    }
  }
}

function drawBreakingIce() {
  push();

  stroke(255);
  strokeWeight(3);

  line(skaterX - 80, skaterY + 20, skaterX - 30, skaterY + 50);
  line(skaterX - 30, skaterY + 50, skaterX + 20, skaterY + 30);
  line(skaterX + 20, skaterY + 30, skaterX + 70, skaterY + 60);

  line(skaterX - 40, skaterY - 20, skaterX - 10, skaterY + 30);
  line(skaterX + 30, skaterY - 10, skaterX + 10, skaterY + 40);

  pop();
}

function drawSkater() {
  push();

  let x = skaterX + skaterForward;
  let y = skaterY + fallingY;

  fill(30);
  noStroke();
  circle(x, y, skaterSize);

  pop();
}


function mousePressed() {
  if (showFinalChoice) {
  if (
    mouseX > width / 2 - 150 &&
    mouseX < width / 2 - 30 &&
    mouseY > height / 2 &&
    mouseY < height / 2 + 55
  ) {
    finalChoiceMade = "yes";
    showFinalChoice = false;
    ending = "cliff";
  }

  if (
    mouseX > width / 2 + 30 &&
    mouseX < width / 2 + 150 &&
    mouseY > height / 2 &&
    mouseY < height / 2 + 55
  ) {
    finalChoiceMade = "no";
    showFinalChoice = false;
    ending = "ice";
    fallingSpeed = 1;
  }

  return;
}

  if (showChoice) {
    // yes button area
    if (
      mouseX > width / 2 - 140 &&
      mouseX < width / 2 - 30 &&
      mouseY > height / 2 &&
      mouseY < height / 2 + 55
    ) {
      choiceMade = "yes";
      showChoice = false;
      nextChoicePoint += 1500;
      normalChoiceCount++;
    }

    // no button area
    if (
      mouseX > width / 2 + 30 &&
      mouseX < width / 2 + 140 &&
      mouseY > height / 2 &&
      mouseY < height / 2 + 55
    ) {
      choiceMade = "no";
      showChoice = false;
      nextChoicePoint += 1500;
      normalChoiceCount++;
    }
  }
}


function mouseWheel(event) {
  if (showChoice || showFinalChoice) {
    return false;
  }

  let moveAmount = event.delta * 0.35;

  if (ending === "cliff") {
  skaterForward += abs(moveAmount) * 0.5;

  if (skaterForward > 180 && fallingSpeed === 0) {
    fallingSpeed = 1;
  }

  return false;
}

  offsetX -= moveAmount;

  if (offsetX > width) {
    offsetX -= width;
  }

  if (offsetX < 0) {
    offsetX += width;
  }

  // world changes as you scroll
  worldScroll += abs(moveAmount);
  return false;
}
