/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new myBot(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class myBot {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.floatOffset = 0;
    this.speed = 0.05;

    //color
    this.bodyColor = [230, 230, 230];
    this.armColor = [210, 210, 210];
    this.darkColor = [90, 90, 90];
    this.lightBlue = [111, 225, 242];
    this.eyeColor = [90, 218, 237];
    this.antennaColor = [170, 170, 170];
    this.headColor = [240, 240, 240];
    this.neckColor = [180, 180, 180];

    //[x, y, w, h]
    this.parts = {
      wheels: [
    [-30, 30, 15, 80],
    [15, 30, 15, 80]
  ],
  neck: [
    [-10, -30, 20, 30]
  ],
  antennaBars: [
    [-50, -40, 100, 15],
    [-50, -80, 10, 40],
    [40, -80, 10, 40]
  ],
  antennaTips: [
    [-52.5, -90, 15, 15],
    [37.5, -90, 15, 15]
  ],
  head: [
    [-35, -60, 70, 50]
  ],
  arms: [
    [-50, 5, 30, 50],
    [20, 5, 30, 50]
  ],
  body: [
    [-40, 0, 80, 60]
  ],
  eyes: [
    [-25, -50, 10, 30],
    [15, -50, 10, 30]
  ]
};
  }
  update() {
    this.floatOffset = sin(frameCount * this.speed) * 20;
  }
  display() {
    
    push();
    translate(this.x, this.y +70);

    noStroke();

    // wheels
    fill(this.darkColor[0], this.darkColor[1], this.darkColor[2]);
    for (let i = 0; i < this.parts.wheels.length; i++) {
      let p = this.parts.wheels[i];
      rect(p[0], p[1], p[2], p[3]);
    }


    // bouncing part
  push();
  translate(0, this.floatOffset);

  // neck
  fill(this.neckColor[0], this.neckColor[1], this.neckColor[2]);
  for (let i = 0; i < this.parts.neck.length; i++) {
    let p = this.parts.neck[i];
    rect(p[0], p[1], p[2], p[3]);
  }

  // antenna bars
  fill(this.antennaColor[0], this.antennaColor[1], this.antennaColor[2]);
  for (let i = 0; i < this.parts.antennaBars.length; i++) {
    let p = this.parts.antennaBars[i];
    rect(p[0], p[1], p[2], p[3]);
  }

  // antenna tips
  fill(this.lightBlue[0], this.lightBlue[1], this.lightBlue[2]);
  for (let i = 0; i < this.parts.antennaTips.length; i++) {
    let p = this.parts.antennaTips[i];
    rect(p[0], p[1], p[2], p[3]);
  }

  // head
  fill(this.headColor[0], this.headColor[1], this.headColor[2]);
  for (let i = 0; i < this.parts.head.length; i++) {
    let p = this.parts.head[i];
    rect(p[0], p[1], p[2], p[3]);
  }

  // arms
  fill(this.armColor[0], this.armColor[1], this.armColor[2]);
  for (let i = 0; i < this.parts.arms.length; i++) {
    let p = this.parts.arms[i];
    rect(p[0], p[1], p[2], p[3]);
  }

  // body
  fill(this.bodyColor[0], this.bodyColor[1], this.bodyColor[2]);
  for (let i = 0; i < this.parts.body.length; i++) {
    let p = this.parts.body[i];
    rect(p[0], p[1], p[2], p[3]);
  }

  // eyes
  fill(this.eyeColor[0], this.eyeColor[1], this.eyeColor[2]);
  for (let i = 0; i < this.parts.eyes.length; i++) {
    let p = this.parts.eyes[i];
    rect(p[0], p[1], p[2], p[3]);
  }

  pop();


    // ⬆️ draw your dancer above ⬆️
    // ******** //

pop();
}
}



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/