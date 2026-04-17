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