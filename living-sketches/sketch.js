let scanned = [];
let flowers;
let orb;
let currentFrame = 0;

let flowerX = 350;
let flowerY = 350;
let flowerScale = 0.25;
let flowerAngle = 0;

let orbX;
let orbY;
let orbitAngle = 0;
let orbitRadius = 200;
let orbScale = 0.2;


function preload() {
  for (let i = 0; i <= 3; i++) {
    scanned.push(loadImage("flower-" + i + ".jpg"));
  }
}

function setup() {
  createCanvas(800, 500);
imageMode(CENTER);
  // eraseBg(scanned, 10); // erase background
  flowers = crop(scanned, 0, 900, 800, 800);
  orb = crop(scanned, 800, 900, 300, 300);

}

function draw() {
  background(255);
let d = dist(mouseX, mouseY, flowerX, flowerY);
let floatY = sin(frameCount * 0.05) * 10;


if (d < 120) { // scale
    flowerScale = 0.35;
  } else {
    flowerScale = 0.25;
  }

  if (d < 120) { // rotation
    flowerAngle = sin(frameCount * 0.08) * 0.3;
  } else {
    flowerAngle = 0;
  }

  let speed;
if (d < 100) {
  speed = 30;   // faster
} else {
  speed = 70;   // slower
}

currentFrame = floor(frameCount / speed) % flowers.length;
  
  push();
  translate (flowerX, flowerY + floatY);
  rotate (PI+flowerAngle);
  scale (flowerScale);

  image(flowers[currentFrame], 
    0, // start X
    0, // start Y
    flowers[0].width, 
    flowers[0].height
  )
  pop();

  //orb thingy
  orbitAngle += 0.02;
  orbX = flowerX + cos(orbitAngle) * orbitRadius;
  orbY = flowerY + floatY + sin(orbitAngle) * orbitRadius;
  
  image(
  orb[currentFrame],
  orbX,
  orbY,
  orb[0].width * orbScale,
  orb[0].height * orbScale
);







}

function keyPressed(){ // just to shift where you want the flower to be
  if (keyCode === LEFT_ARROW) {
    flowerX -= 10;
  }
  if (keyCode === RIGHT_ARROW) {
    flowerX += 10;
  }
  if (keyCode === UP_ARROW) {
    flowerY -= 10;
  }
  if (keyCode === DOWN_ARROW) {
    flowerY += 10;
  }
}








// You shouldn't need to modify these helper functions:

function crop(imgs, x, y, w, h) {
  let cropped = [];
  for (let i = 0; i < imgs.length; i++) {
    cropped.push(imgs[i].get(x, y, w, h));
  }
  return cropped;
}

function eraseBg(imgs, threshold = 10) {
  for (let i = 0; i < imgs.length; i++) {
    let img = imgs[i];
    img.loadPixels();
    for (let j = 0; j < img.pixels.length; j += 4) {
      let d = 255 - img.pixels[j];
      d += 255 - img.pixels[j + 1];
      d += 255 - img.pixels[j + 2];
      if (d < threshold) {
        img.pixels[j + 3] = 0;
      }
    }
    img.updatePixels();
  }
  // this function uses the pixels array
  // we will cover this later in the semester - stay tuned
}
