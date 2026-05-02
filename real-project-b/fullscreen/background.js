//background

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
  push();
  noStroke();
let fade = map(worldScroll, 0, (cliffX - width) * 1.6, 255, 40);
  
  if (fade < 40) fade = 40;

  // upper grassy bank beside the river
  fill(115, 155, 105, fade);
  beginShape();
  vertex(0, riverY - 245);
  vertex(width, riverY - 245);
  vertex(width, riverY + 5);

  bezierVertex(width * 0.75, riverY - 10, width * 0.5, riverY + 10, 0, riverY - 5);

  endShape(CLOSE);

  // lower grassy bank beside the river
  fill(125, 165, 110, fade);
  beginShape();
  vertex(0, riverY + riverH + 25);

  bezierVertex(width * 0.25, riverY + riverH + 5, width * 0.55, riverY + riverH + 35, width, riverY + riverH + 15);

  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);

  pop();
}

function drawMountains() {
  push();
  noStroke();

  // far mountains
  fill(160, 180, 185);
  triangle(-100, riverY - 260, 180, riverY - 520, 460, riverY - 260);
  triangle(280, riverY - 260, 620, riverY - 560, 980, riverY - 260);
  triangle(760, riverY - 260, 1080, riverY - 500, 1400, riverY - 260);

  // snow caps
  fill(240, 248, 250);
  triangle(180, riverY - 520, 120, riverY - 460, 235, riverY - 460);
  triangle(620, riverY - 560, 555, riverY - 485, 690, riverY - 485);
  triangle(1080, riverY - 500, 1025, riverY - 440, 1140, riverY - 440);

  pop();
}

function drawGrass() {
  let grassAmount = 120 - worldScroll * 0.012;
  if (grassAmount < 15) {
    grassAmount = 15;
  }

  strokeWeight(2);

  for (let i = 0; i < grassAmount; i++) {
    let gx = map(i, 0, grassAmount - 1, 0, width);

    let gy = riverY + riverH + 28 + noise(i * 0.2) * 18;

    let gh = 14 + noise(i * 0.3) * 20;

    let grassAlpha = 180 - worldScroll * 0.02;
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
    let ty = riverY - random(220, 150);
    let ts = random(0.45, 1);

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

    let fade = map(worldScroll, 0, cliffX - width, 255, 20);
    if (fade < 0) {
      fade = 0;
    }

    let shrink = 1 - worldScroll * 0.00002;
    if (shrink < 0.45) {
      shrink = 0.45;
    }

    scale(shrink);

    if (fade > 0) {
      noStroke();

      // trunk
      fill(105, 75, 55, fade);
      rect(-7, 10, 14, 75);

      // christmas tree layers
      fill(45, 105, 70, fade);
      triangle(0, -95, -45, -25, 45, -25);

      fill(35, 95, 60, fade);
      triangle(0, -65, -55, 15, 55, 15);

      fill(25, 85, 50, fade);
      triangle(0, -30, -65, 65, 65, 65);
    }

    pop();
  }
}

function drawCliff() {
  let cliffScreenX = cliffX - worldScroll;

  if (cliffScreenX < width + 300) {
    push();

    noStroke();

    // same background beyond the cliff
    fill(220, 235, 245);
    rect(cliffScreenX + 120, 0, width, height);

    // river continues to the edge
    fill(170, 210, 230);
    beginShape();
    vertex(cliffScreenX - 450, riverY);
    vertex(cliffScreenX + 120, riverY - 15);
    vertex(cliffScreenX + 120, riverY + riverH + 10);
    vertex(cliffScreenX - 450, riverY + riverH);
    endShape(CLOSE);

    // cliff top
    fill(125, 115, 105);
    beginShape();
    vertex(cliffScreenX - 180, riverY + riverH - 20);
    vertex(cliffScreenX + 120, riverY + riverH - 35);
    vertex(cliffScreenX + 190, riverY + riverH - 15);
    vertex(cliffScreenX + 120, riverY + riverH + 15);
    vertex(cliffScreenX - 180, riverY + riverH + 20);
    endShape(CLOSE);

    // downward cliff wall shape
    fill(85, 75, 70);
    beginShape();
    vertex(cliffScreenX + 120, riverY + riverH - 35);
    vertex(cliffScreenX + 190, riverY + riverH - 15);

    // curved front sticking out, then bending downward
    bezierVertex(
      cliffScreenX + 250, riverY + riverH + 80,
      cliffScreenX + 210, riverY + riverH + 190,
      cliffScreenX + 145, height
    );

    vertex(cliffScreenX - 70, height);

    // left cliff wall under the river
    bezierVertex(
      cliffScreenX - 40, riverY + riverH + 200,
      cliffScreenX - 80, riverY + riverH + 80,
      cliffScreenX - 180, riverY + riverH - 20
    );

    endShape(CLOSE);

    // darker side shadow
    fill(60, 55, 55);
    beginShape();
    vertex(cliffScreenX + 145, riverY + riverH + 5);
    vertex(cliffScreenX + 190, riverY + riverH - 15);
    bezierVertex(
      cliffScreenX + 245, riverY + riverH + 100,
      cliffScreenX + 200, riverY + riverH + 220,
      cliffScreenX + 145, height
    );
    vertex(cliffScreenX + 80, height);
    endShape(CLOSE);

    // rock lines
    stroke(120, 110, 105);
    strokeWeight(2);
    line(cliffScreenX + 20, riverY + riverH + 20, cliffScreenX - 10, height);
    line(cliffScreenX + 80, riverY + riverH + 10, cliffScreenX + 40, height);
    line(cliffScreenX + 145, riverY + riverH + 20, cliffScreenX + 110, height);

    // cracked ice near edge
    stroke(230, 245, 255);
    strokeWeight(2);
    line(cliffScreenX - 150, riverY + 45, cliffScreenX - 75, riverY + 70);
    line(cliffScreenX - 75, riverY + 70, cliffScreenX - 20, riverY + 55);
    line(cliffScreenX - 105, riverY + 110, cliffScreenX - 35, riverY + 125);

    pop();
  }
}