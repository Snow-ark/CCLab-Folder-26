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