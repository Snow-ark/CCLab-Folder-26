let skaterX;
let skaterY;
let skaterSize = 90;

let riverY;
let riverH = 150;

let offsetX = 0;
let worldScroll = 0;

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

  makeTrees();
}

function draw() {
  background(220, 235, 245);

  // river 
  frozenriver(offsetX, riverY, width, riverH);
  frozenriver(offsetX - width, riverY, width, riverH);

  // land and grass 
  drawLand();
  drawGrass();

  // trees
  for (let i = 0; i < trees.length; i++) {
    trees[i].display();
  }

  // skater (FIX)
  fill(30);
  noStroke();
  circle(skaterX, skaterY, skaterSize);
}

function frozenriver(x, y, w, h) {
  noStroke();

  // main river
  fill(170, 210, 230);
  beginShape();
  vertex(x, y);

  bezierVertex(
    x + w * 0.20, y - h * 0.20,
    x + w * 0.40, y + h * 0.15,
    x + w * 0.60, y - h * 0.05
  );

  bezierVertex(
    x + w * 0.80, y - h * 0.25,
    x + w * 0.90, y + h * 0.10,
    x + w, y - h * 0.10
  );

  vertex(x + w, y + h);

  bezierVertex(
    x + w * 0.85, y + h * 1.20,
    x + w * 0.65, y + h * 0.75,
    x + w * 0.50, y + h
  );

  bezierVertex(
    x + w * 0.30, y + h * 1.20,
    x + w * 0.15, y + h * 0.70,
    x, y + h * 0.85
  );

  endShape(CLOSE);

  // highlight
  fill(200, 235, 245, 120);
  beginShape();
  vertex(x, y + h * 0.15);

  bezierVertex(
    x + w * 0.20, y,
    x + w * 0.40, y + h * 0.30,
    x + w * 0.60, y + h * 0.10
  );

  bezierVertex(
    x + w * 0.80, y - h * 0.05,
    x + w * 0.90, y + h * 0.25,
    x + w, y + h * 0.05
  );

  vertex(x + w, y + h * 0.60);

  bezierVertex(
    x + w * 0.85, y + h * 0.80,
    x + w * 0.65, y + h * 0.50,
    x + w * 0.50, y + h * 0.70
  );

  bezierVertex(
    x + w * 0.30, y + h * 0.90,
    x + w * 0.15, y + h * 0.55,
    x, y + h * 0.65
  );

  endShape(CLOSE);

  // cracks
  stroke(230, 245, 255);
  strokeWeight(2);
  noFill();

  for (let i = 0; i < cracks.length; i++) {
    let c = cracks[i];
    line(
      x + w * c[0],
      y + h * c[1],
      x + w * c[2],
      y + h * c[3]
    );
  }
}

function drawLand() {
  noStroke();
  fill(232, 238, 232);

  rect(0, riverY + riverH + 18, width, height - (riverY + riverH + 18));
}

function drawGrass() {
  let grassAmount = 120 - worldScroll * 0.025;
  if (grassAmount < 15) {
    grassAmount = 15;
  }

  strokeWeight(2);

  for (let i = 0; i < grassAmount; i++) {
    let gx = map(i, 0, grassAmount - 1, 0, width);

    let gy = riverY + riverH + 28 + noise(i * 0.2) * 18;

    let gh = 14 + noise(i * 0.3) * 20;

    let grassAlpha = 180 - worldScroll * 0.04;
    if (grassAlpha < 40) {
      grassAlpha = 40;
    }

    stroke(95, 140, 95, grassAlpha);

    line(gx, gy, gx - 3, gy - gh);
    line(gx, gy, gx, gy - gh - 5);
    line(gx, gy, gx + 3, gy - gh);
  }
}

function makeTrees() {
  trees = [];

  for (let i = 0; i < 18; i++) {
    let tx = map(i, 0, 17, 60, width - 60);
    let ty = riverY - random(120, 200);
    let ts = random(0.75, 1.25);

    trees.push(new Tree(tx, ty, ts));
  }
}

class Tree {
  constructor(x, y, s) {
    this.x = x;
    this.y = y;
    this.s = s;
  }

  display() {
    push();

    let drawX = this.x - worldScroll * 0.12;

    while (drawX < -100) {
      drawX += width + 200;
    }

    translate(drawX, this.y);
    scale(this.s);

    let fade = 255 - worldScroll * 0.06;
    if (fade < 0) {
      fade = 0;
    }

    let shrink = 1 - worldScroll * 0.00012;
    if (shrink < 0.45) {
      shrink = 0.45;
    }

    scale(shrink);

    if (fade > 0) {
      noStroke();

      // trunk
      fill(110, 80, 60, fade);
      rect(-8, 0, 16, 70);

      // top
      fill(70, 120, 70, fade);
      ellipse(0, -20, 70, 70);
      ellipse(-20, -5, 50, 50);
      ellipse(20, -5, 50, 50);
    }

    pop();
  }
}

function mouseWheel(event) {
  let moveAmount = event.delta * 0.35;

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