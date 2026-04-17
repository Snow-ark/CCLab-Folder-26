let c = []; //NEED FIXING !
let b = [];
let yay;

function preload(){
  yay = loadSound("yay.wav")
}

function setup() {
  createCanvas(400, 400);
  yay.play();
  // c = new Cloud(200, 200, 100)
}

function mousePressed() {
  c.push(new Cloud(mouseX, mouseY, random(40, 80)))

}


function draw() {
  background(150, 125, 255);
  text(b.length, 50, 50);

  // if (mouseIsPressed){
  //   b.push(new Firework (mouseX, mouseY));
  // }

  for (let i = 0; i< b.length; i++){
    b[i].update();
    b[i].display();
  }


  for (let i = 0; i < c.length; i++) {
    for (let j = 0; i < c.length; j++){
      if (j != i){
    c[i].checkCollision (c[i]);
      }
    }
    if (c[i]. isRaining){
      b.push(new Firework (c[i].x, c[i].y));
    }
    c[i].move();
    c[i].display();
  }

  for (let i = c.length - 1; i >= 0; i--) {
    if (c[i].isDone) {
      c.splice(i, 1)
    }
  }

  for (let i= b.length - 1; i >=0; i--){
    if (b[i].isDone){
      b.splice(i, 1)
    }
  }

}

class Cloud {
  constructor(x, y, s) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.speedX = random(-2, 2);
    this.speedY = random(-2, 2);

    this.isDone = false;
    this.isRaining = false;
    this.sound = yay;
  }

  checkBounds() {
    if (this.x > width || this.y > height || this.x < 0 || this.y < 0) {
      this.isDone = true;
    }
  }

checkCollision(other){
   let d = dist( this.x, this.y, other.x, other.y)
   if (d < (this.s + other.s) / 2){
    this.speedX = 0.01 * this.speedX
    this.sound.play();
    this.isRaining = true;
   } else{
    this.isRaining = false
    }
   
  }


  move() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
  display() {
    push()
    translate(this.x, this.y)
    // rotate(frameCount * 0.05)
    noStroke()
    fill(200, 220, 150)
    circle(0, 0, this.s)

    for (let a = 0; a < 2 * PI; a += PI / 4) {
      push();
      rotate(a);
      circle(this.s * 0.4, this.s * 0.1, this.s * 0.5);
      pop();
    }

    // blushes
    noStroke()
    fill(255, 10, 255, 100)
    ellipse(0 - this.s / 4, 0 + this.s / 20, this.s / 8, this.s / 10)
    ellipse(0 + this.s / 4, 0 + this.s / 20, this.s / 8, this.s / 10)

    // eyes
    noStroke();
    fill(0);
    circle(0 - this.s / 5, 0, this.s / 10);
    circle(0 + this.s / 5, 0, this.s / 10);

    stroke(0)
    noFill()
    strokeWeight(this.s / 20)
    arc(0, 0 + this.s / 10, this.s / 5, this.s / 10, 0, PI)
    pop()
    this.checkBounds();
  }
}

class Firework {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.size = random(2, 10);
    this.hue = random(0, 360);

    this.speedX = random(-3, 3);
    this.speedY = random(-1, -3);

    this.isDone = false;
  }

  checkBounds() {
    if (this.x > width || this.x < 0 || this.y > height || this.y < 0) {
      this.isDone = true;
    }
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
  display() {

    push();
    translate(this.x, this.y);

    colorMode(HSB)
    fill(this.hue, 80, 100)
    noStroke();
    circle(0, 0, this.size);

    pop();
    this.checkBounds();
  }
}