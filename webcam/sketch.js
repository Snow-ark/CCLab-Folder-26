let cam;
let s = 5;
let chars = ["", "*"]

function setup() {
  createCanvas(640, 480);
  cam = createCapture(VIDEO);
   //cam.hide()
}

function draw() {
  background(0);
  push();
  scale(-1, 1);
  translate(-width, 0);
  image(cam, 0, 0);
  cam.loadPixels();

  for (let y =0; y<= height; y += s){
    for(let x =0; x <= width; x +=s){
      // let d = dist(mouseX, mouseY, x, y);
      // let size = map(d, 0, width, 20, 0);

      let index = (x + y *cam.width) *4
      let r = (cam.pixels[index]);
      let g = (cam.pixels[index+1]);
      let b = (cam.pixels[index +2]);

      let avg = (r + g + b) /3
      // let charIndex = floor(map(avg, 0, 255, 0, chars.length))
      // fill(255)
      // textSize(size);
      // text(chars[charIndex], x, y)

      let size = map(avg, 0, 255, 0, s)

      fill(0, g, 255);
      rect(x, y, size);
    }
  }
  pop();
}
