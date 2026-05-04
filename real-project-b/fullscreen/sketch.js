let skaterX;
let skaterY;
let skaterSize = 90;

let skaterSpinImg;
let skaterSpin;

let skaterImg;
let skaterRight;

let seagullImg;
let seagull;

let choiceStartTime = 0;
let choiceTimeLimit = 5000;

let birdActive = false;
let birdPhase = "";
let birdHasSkater = false;
let gameLocked = false;
let birdX;
let birdY;

let situations = ["duck", "crack", "boulder"];
let currentSituation = "";
let situationActive = false;

let situationOrder = [];
let situationIndex = 0;

let boulderX;
let boulderTriggered = false;

let duckDone = false;
let duckImg;
let duck;
let duckX;
let duckY;
let duckStarted = false;
let duckSpeed = 0.8;
let duckBubbleStarted = false;

let chickenGif;
let lavaChickenSound;

let chickenVisible = false;
let chickenX;
let chickenY;
let chickenTimer = 0;
let nextChickenTime = 3000;

let catGif;
let catSound;
let catVisible = false;
let catX;
let catY;
let catTimer = 0;
let nextCatTime = 5000;

let crackX;
let crackTriggered = false;

let introText = "She once wished to glide across the ice, believing it would feel like flying.";
let showIntro = true;
let introAlpha = 0;

let narrationText = "";
let narrationAlpha = 0;

let endingText = "";
let endingAlpha = 0;
let showEndingText = false;

let riverY;
let riverH = 150;

let offsetX = 0;
let worldScroll = 0;

let showChoice = false;
let choiceMade = "";
let nextChoicePoint = 1800; 
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
let snowflakes = [];
let maxSnow = 60;

let bgMusic;
let gotThisSound;
let iceCrackSound;
let windSound;
let skatingSound;
let audioStarted = false;
let memeActive = false;



function preload() {
  skaterImg = loadImage("ice-skater.png");
  seagullImg = loadImage("seagull.png");
  duckImg = loadImage("duck.gif");
  skaterSpinImg = loadImage("spin.png");

  bgMusic = loadSound("yakuso.mp3");
  gotThisSound = loadSound("i-got-this.mp3");
  iceCrackSound = loadSound("ice-crack.mp3");
  windSound = loadSound("wind.mp3");
  skatingSound = loadSound("skating.mp3");

  chickenGif = loadImage("dancing chicken.gif");
  lavaChickenSound = loadSound("lava-chicken.mp3");
  catGif = loadImage("oiia.gif");
  catSound = loadSound("oiia cat.mp3");
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.id("p5-canvas");
  canvas.parent("p5-canvas-container");

  riverY = height * 0.62;
  skaterX = width / 2;
  skaterY = riverY + riverH * 0.18;

  cliffX = 5000;

  makeTrees();
skaterRight = skaterImg.get(0, 0, skaterImg.width, skaterImg.height);

skaterRight = cleanSkater(skaterRight, [
  { x: 0, y: 0, w: 90, h: 60 },
  { x: 0, y: 100, w: 20, h: 50 }
]);
skaterSpin = cleanSkater(skaterSpinImg, [
  { x: 230, y: 210, w: 500, h: 200} 
]);

seagull = cleanSeagull(seagullImg);

duck = duckImg;


let lastSituation = random(["crack", "boulder"]);
situationOrder = ["duck", "crack", "boulder"];
let lastIndex = situationOrder.indexOf(lastSituation);
situationOrder.splice(lastIndex, 1);
situationOrder = shuffle(situationOrder);
situationOrder.push(lastSituation);

for (let i = 0; i < maxSnow; i++) {
  snowflakes.push(new Snowflake());
}
}

function draw() {
background(220, 235, 245);
if (bgMusic.isPlaying()) {
  if (bgMusic.currentTime() >= bgMusic.duration() - 0.05) {
    bgMusic.jump(0.32);
  }
}
if (windSound && windSound.isPlaying()) {
  let progress = constrain(worldScroll / cliffX, 0, 1);

  let windVolume = map(progress, 0, 1, 0.05, 0.65);
  let musicVolume = map(progress, 0, 1, 0.2, 0);

  if (ending === "ice" || ending === "cliff" || showEndingText) {
    windVolume = 0.7;
    musicVolume = 0;
  }

  windSound.setVolume(windVolume, 0.2);
  bgMusic.setVolume(musicVolume, 0.2);
}


drawMountains();
drawLand();
drawSnow();

// river 
frozenriver(offsetX, riverY, width, riverH);
frozenriver(offsetX - width, riverY, width, riverH);

drawGrass();
  

  // trees
  for (let i = 0; i < trees.length; i++) {
    trees[i].display();
  }

  drawCliff(cliffX, worldScroll, riverY, riverH);

 if (
  duckStarted &&
  duckDone &&
  !showChoice &&
  millis() - choiceStartTime > 1000 &&
  !gameLocked &&
  ending !== "bird" &&
  !memeActive
) {
  showChoice = true;
  situationActive = false;
  choiceStartTime = millis();
}



// final choice 
let cliffScreenX = cliffX - worldScroll;

if (
  normalChoiceCount >= 3 &&
  cliffScreenX < skaterX + 110 &&
  finalChoiceMade === "" &&
  !showFinalChoice &&
  !gameLocked &&
  !memeActive
) {
  showFinalChoice = true;
  choiceStartTime = millis();
}

 
  

  updateEnding();
  updateBirdEnding();
  drawSeagull();
  drawSituation();
  drawIntro();
  drawNarration();
  updateChicken();
  drawChicken();
  updateCat();
  drawCat();
  drawSkater();


if (showChoice) {
  drawChoiceScreen();
}

if (showFinalChoice) {
  drawFinalChoiceScreen();
}

drawEndingText();

}

class Snowflake {
  constructor() {
    this.x = random(width);
    this.y = random(-height, 0);
    this.size = random(2, 5);
    this.speedY = random(0.5, 1.5);
    this.speedX = random(-0.3, 0.3);
    this.alpha = random(120, 200);
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;

    // slight wind drift
    this.x += map(worldScroll, 0, cliffX, 0.1, 0.5);

    if (this.y > height) {
      this.y = random(-50, 0);
      this.x = random(width);
    }
  }

  display() {
    noStroke();
    fill(255, this.alpha);
    ellipse(this.x, this.y, this.size);
  }
}

function drawSnow() {
  // increased snow at the end
  let targetSnow = map(worldScroll, 0, cliffX, 40, 90);

  while (snowflakes.length < targetSnow) {
    snowflakes.push(new Snowflake());
  }

  for (let flake of snowflakes) {
    flake.update();
    flake.display();
  }
}

function drawChoiceScreen() {
  push();

  // dark overlay
  fill(0, 0, 0, 120);
  rect(0, 0, width, height);

  // question
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

  let timeLeft = ceil((choiceTimeLimit - (millis() - choiceStartTime)) / 1000);

fill(255);
textSize(22);
text("Time left: " + timeLeft, width / 2, height / 2 - 40);

if (timeLeft <= 0) {
  startBirdEnding();
}

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

  let timeLeft = ceil((choiceTimeLimit - (millis() - choiceStartTime)) / 1000);

  fill(255);
  textSize(22);
  text("Time left: " + timeLeft, width / 2, height / 2 - 40);

  if (timeLeft <= 0) {
    startBirdEnding();
  }

  pop();
}

function updateEnding() {
  if (ending === "ice") {
    if (skatingSound.isPlaying()) {
      skatingSound.stop();
    }

    fallingY += fallingSpeed;
    fallingSpeed += 0.25;
    drawBreakingIce();

    if (fallingY > height * 0.55) {
      showEndingText = true;
      gameLocked = true;
    }
  }

  if (ending === "cliff") {
    if (skaterForward > 180) {
      if (skatingSound.isPlaying()) {
        skatingSound.stop();
      }

      fallingY += fallingSpeed;
      fallingSpeed += 0.25;
      showEndingText = true;
      gameLocked = true;
    }
  }
}

function drawSkater() {
  push();

  let x = skaterX + skaterForward;
  let y = skaterY + fallingY - 60;

  imageMode(CENTER);

  if (memeActive) {
  translate(x, y);

  let spin = sin(frameCount * 0.12);
scale(spin, 1);

rotate(sin(frameCount * 0.12) * 0.1);

  image(skaterSpin, 0, 0, skaterSize * 2.5, skaterSize * 3.0);
} else {
  image(skaterRight, x, y, skaterSize * 2.5, skaterSize * 3.0);
}

  pop();
}

function removeWhiteBackground(img) {
  img.loadPixels();

  for (let i = 0; i < img.pixels.length; i += 4) {
    let r = img.pixels[i];
    let g = img.pixels[i + 1];
    let b = img.pixels[i + 2];

    if (r > 235 && g > 235 && b > 235) {
      img.pixels[i + 3] = 0;
    }
  }

  img.updatePixels();
  return img;
}

function cleanSkater(img, eraseParts) {
  img.loadPixels();

  for (let i = 0; i < img.pixels.length; i += 4) {
    let r = img.pixels[i];
    let g = img.pixels[i + 1];
    let b = img.pixels[i + 2];

    if (r > 220 && g > 220 && b > 220) {
      img.pixels[i + 3] = 0;
    } else {
      img.pixels[i] = 40;
      img.pixels[i + 1] = 40;
      img.pixels[i + 2] = 40;
    }
  }

  img.updatePixels();

  let g = createGraphics(img.width, img.height);
  g.clear();
  g.image(img, 0, 0);

  g.erase();
  for (let part of eraseParts) {
    g.rect(part.x, part.y, part.w, part.h);
  }
  g.noErase();

  return g;
}

function cleanChicken(img) {
  img.loadPixels();

  for (let i = 0; i < img.pixels.length; i += 4) {
    let r = img.pixels[i];
    let g = img.pixels[i + 1];
    let b = img.pixels[i + 2];

    // remove white / light background
    if (r > 220 && g > 220 && b > 220) {
      img.pixels[i + 3] = 0;
    }
  }

  img.updatePixels();
  return img;
}

function updateChicken() {
  if (showChoice || showFinalChoice || gameLocked || ending !== "") return;

  if (!chickenVisible && millis() > nextChickenTime) {
    if (random(1) < 0.01) {
      chickenVisible = true;
      chickenX = width * 0.18;
      chickenY = riverY - 120;
      chickenTimer = millis();
    }
  }

  if (chickenVisible && millis() - chickenTimer > 5000) {
    chickenVisible = false;
    nextChickenTime = millis() + random(4000, 9000);
  }
}

function drawChicken() {
  if (!chickenVisible) return;

  push();
  imageMode(CENTER);


  blendMode(MULTIPLY);
  image(chickenGif, chickenX, chickenY, 80, 80);

  pop();
}

function updateCat() {
  if (showChoice || showFinalChoice || gameLocked || ending !== "") return;

  if (!catVisible && millis() > nextCatTime) {
    if (random(1) < 0.008) {
      catVisible = true;
      catX = random(width * 0.18, width * 0.45);
      catY = random(riverY - 210, riverY - 140);
      catTimer = millis();
    }
  }

  if (catVisible && millis() - catTimer > 5000) {
    catVisible = false;
    nextCatTime = millis() + random(6000, 12000);
  }
}

function drawCat() {
  if (!catVisible) return;

  push();
  imageMode(CENTER);

  
  blendMode(MULTIPLY);
  image(catGif, catX, catY, 95, 95);

  pop();
}

function drawIntro() {
  if (!showIntro) return;

  introAlpha += 3;
  introAlpha = constrain(introAlpha, 0, 255);

  push();

  fill(255, 245, 230, introAlpha * 0.9);
  stroke(70, introAlpha);
  rect(width * 0.15, height - 80, width * 0.7, 50, 15);

  noStroke();
  fill(30, introAlpha);
  textAlign(CENTER, CENTER);
  textSize(16);
  text(introText, width / 2, height - 55);

  pop();
}

function drawEndingText() {
  if (!showEndingText || endingText === "") return;

  endingAlpha += 2;
  endingAlpha = constrain(endingAlpha, 0, 255);

  push();

  fill(0, 0, 0, 160);
  rect(0, 0, width, height);

  fill(255, endingAlpha);
  textAlign(CENTER, CENTER);
  textSize(24);
  textWrap(WORD);

  text(endingText, width * 0.2, height * 0.4, width * 0.6, 200);

  pop();
}

function drawBreakingIce() {
  push();

  stroke(255);
  strokeWeight(3);

  // crack ON the river surface
  let crackY = riverY + riverH * 0.2;

  line(skaterX - 80, crackY + 10, skaterX - 30, crackY + 40);
  line(skaterX - 30, crackY + 40, skaterX + 20, crackY + 20);
  line(skaterX + 20, crackY + 20, skaterX + 70, crackY + 50);

  line(skaterX - 40, crackY - 15, skaterX - 10, crackY + 20);
  line(skaterX + 30, crackY - 5, skaterX + 10, crackY + 30);

  pop();
}

function cleanSeagull(img) {
  img.loadPixels();

  for (let i = 0; i < img.pixels.length; i += 4) {
    let r = img.pixels[i];
    let g = img.pixels[i + 1];
    let b = img.pixels[i + 2];

    // remove white background
    if (r > 235 && g > 235 && b > 235) {
      img.pixels[i + 3] = 0;
    }
  }

  img.updatePixels();
  return img;
}

function startBirdEnding() {
  if (skatingSound.isPlaying()) {
  skatingSound.stop();
}
  showChoice = false;
  showFinalChoice = false;

  gameLocked = true;
  birdActive = true;
  birdPhase = "dive";
  birdHasSkater = false;
  ending = "bird";

  birdX = width + 220;
  birdY = -80;
}

function updateBirdEnding() {
  if (!birdActive) {
    return;
  }

  let skaterHeadX = skaterX + skaterForward + 35;
  let skaterHeadY = skaterY + fallingY - 175;

  if (birdPhase === "dive") {
    // fly toward the skater's head
    birdX = lerp(birdX, skaterHeadX, 0.035);
    birdY = lerp(birdY, skaterHeadY, 0.035);

    let d = dist(birdX, birdY, skaterHeadX, skaterHeadY);

    if (d < 20) {
      birdPhase = "carry";
      birdHasSkater = true;
    }
  }

  if (birdPhase === "carry") {
    // fly up and left with the skater
    birdX -= 6;
    birdY -= 4;

    skaterX = birdX - skaterForward - 25;
    skaterY = birdY + 115 - fallingY;
  }
}

function drawSeagull() {
  if (birdActive) {
    push();
    imageMode(CENTER);
    image(seagull, birdX, birdY, 280, 180);
    pop();
  }
}

function drawSituation() {
  if (!situationActive) return;

  if (currentSituation === "duck") {
    drawDucks();
  }

  if (currentSituation === "crack") {
  drawCrackSituation();
}

  if (currentSituation === "boulder") {
  drawBoulder();
}
}

function drawDucks() {
  duckY += 0.22;

  let duckScale = map(duckY, riverY - 145, skaterY - 80, 0.35, 0.9);
  duckScale = constrain(duckScale, 0.25, 0.9);

  push();
  imageMode(CENTER);
  blendMode(MULTIPLY);
  image(duck, duckX, duckY, 100 * duckScale, 100 * duckScale);
  pop();

  if (duckY > skaterY - 150) {
    drawCuteBubble();

    if (!duckBubbleStarted) {
      duckBubbleStarted = true;
      choiceStartTime = millis();
    }
  }

  if (duckBubbleStarted && millis() - choiceStartTime > 5000) {
    duckDone = true;
  }
}

function cleanDuck(img) {
  img.loadPixels();

  for (let i = 0; i < img.pixels.length; i += 4) {
    let r = img.pixels[i];
    let g = img.pixels[i + 1];
    let b = img.pixels[i + 2];

    // remove white / paper background
    if (r > 210 && g > 210 && b > 200) {
      img.pixels[i + 3] = 0;
    }
  }

  img.updatePixels();
  return img;
}

function drawCuteBubble() {
  push();

  let bubbleX = skaterX + skaterForward + 55;
  let bubbleY = skaterY + fallingY - 230;

  fill(255);
  stroke(40);
  strokeWeight(2);
  ellipse(bubbleX, bubbleY, 90, 50);

  triangle(
    bubbleX - 15, bubbleY + 20,
    bubbleX + 5, bubbleY + 20,
    bubbleX - 10, bubbleY + 45
  );

  noStroke();
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(16);
  text("cute!", bubbleX, bubbleY);

  pop();
}

function drawCrackSituation() {
  // crack stays on river
  let y = riverY + riverH * 0.3;


  push();
  stroke(255);
  strokeWeight(6);
  noFill();

  line(crackX - 120, y, crackX - 60, y + 40);
  line(crackX - 60, y + 40, crackX, y + 10);
  line(crackX, y + 10, crackX + 80, y + 50);
  line(crackX + 80, y + 50, crackX + 140, y + 20);

  line(crackX - 60, y + 40, crackX - 90, y + 90);
  line(crackX, y + 10, crackX + 20, y - 50);
  line(crackX + 80, y + 50, crackX + 110, y + 100);

  pop();

  if (abs(crackX - skaterX) < 80 && !crackTriggered) {
  crackTriggered = true;
  iceCrackSound.setVolume(0.6);
  iceCrackSound.play();
  showChoice = true;
  choiceStartTime = millis();
  situationActive = false;
}
}

function drawBoulder() {
  let y = riverY + riverH * 0.28;

  push();
  noStroke();
  fill(95, 85, 80);
  ellipse(boulderX, y, 190, 135);

  fill(130, 120, 115);
  ellipse(boulderX - 40, y - 30, 55, 35);
  pop();

  if (abs(boulderX - skaterX) < 110 && !boulderTriggered) {
  boulderTriggered = true;
  showChoice = true;
  choiceStartTime = millis();
  situationActive = false;
}
}


function drawNarration() {
  if ((!situationActive && !memeActive) || narrationText === "") return;

  narrationAlpha += 5;
  narrationAlpha = constrain(narrationAlpha, 0, 255);

  push();
  let textToShow = narrationText;

  if (memeActive) {
  textToShow = "It's okay to have fun once in a while.";
}
  fill(255, 245, 230, narrationAlpha * 0.9);
  stroke(70, narrationAlpha);
  strokeWeight(2);
  rect(width * 0.12, height - 75, width * 0.76, 55, 18);

  noStroke();
  fill(30, narrationAlpha);
  textAlign(CENTER, CENTER);
  textSize(16);
  textWrap(WORD);
  text(textToShow, width * 0.16, height - 60, width * 0.68, 35);
  pop();
}

function mousePressed() {
  startAllAudio();
  if (!bgMusic.isPlaying()) {
bgMusic.setVolume(0, 0);
bgMusic.loop();
bgMusic.jump(0.70);
bgMusic.setVolume(0.2, 2); 
}

  if (chickenVisible) {
  let dChicken = dist(mouseX, mouseY, chickenX, chickenY);

  if (dChicken < 60) {
    if (!lavaChickenSound.isPlaying()) {
  memeActive = true;

  bgMusic.setVolume(0);
  windSound.setVolume(0);
  skatingSound.stop();

  lavaChickenSound.setVolume(0.7);
  lavaChickenSound.play();
}
  }
}

if (catVisible) {
  let dCat = dist(mouseX, mouseY, catX, catY);

  if (dCat < 65) {
    if (!catSound.isPlaying()) {
      catSound.setVolume(0.7);
      if (!catSound.isPlaying()) {
  memeActive = true;

  bgMusic.setVolume(0);
  windSound.setVolume(0);
  skatingSound.stop();

  catSound.setVolume(0.7);
  catSound.play();
}
    }
  }
}

let d = dist(mouseX, mouseY, skaterX + skaterForward, skaterY + fallingY - 60);

if (d < 120 && !showChoice && !showFinalChoice && !gameLocked) {
  gotThisSound.setVolume(0.5);
  gotThisSound.play();
}


  if (gameLocked) {
  return;
}
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
endingText = "She kept going even when she wasn't sure anymore. And sometimes, chasing a dream means falling for it.";
endingAlpha = 0;
showEndingText = false;
skaterForward = 0;
fallingSpeed = 0;
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
    iceCrackSound.setVolume(0.6);
    iceCrackSound.play();
    endingText = "She chose to stop since she was afraid of what lay ahead. But stopping didn't save her from falling.";
    endingAlpha = 0;
    showEndingText = false;
    fallingSpeed = 0.6;
  }

  return;
}

  if (showChoice) {
    // yes 
    if (
      mouseX > width / 2 - 140 &&
      mouseX < width / 2 - 30 &&
      mouseY > height / 2 &&
      mouseY < height / 2 + 55
    ) {
      choiceMade = "yes";
      showChoice = false;
      nextChoicePoint += 2500;
      normalChoiceCount++;
      duckStarted = false;

if (normalChoiceCount >= 3) {
  situationActive = false;
}
      situationActive = false;
      duckStarted = false;
      duckDone = false;
      duckBubbleStarted = false;
      situationIndex++;
      crackTriggered = false;
      boulderTriggered = false;
    }

  // no
    if (
      mouseX > width / 2 + 30 &&
      mouseX < width / 2 + 140 &&
      mouseY > height / 2 &&
      mouseY < height / 2 + 55
    ) {
      choiceMade = "no";
      showChoice = false;

      // seagull ending
      startBirdEnding();
    }
  }
}

function mouseWheel(event) {
  startAllAudio();
 if (lavaChickenSound.isPlaying()) {
  lavaChickenSound.stop();
}

if (catSound && catSound.isPlaying()) {
  catSound.stop();
}

if (memeActive) {
  memeActive = false;

  bgMusic.setVolume(0.2, 0.5);
  windSound.setVolume(0.1, 0.5);
}

  showIntro = false;
  if (gameLocked) return false;
  if (showChoice || showFinalChoice) return false;
  
  let moveAmount = abs(event.delta) * 0.35;
  if (!skatingSound.isPlaying() && !showChoice && !showFinalChoice && !gameLocked) {
  skatingSound.setVolume(0.7);
  skatingSound.play();
}
  let windSlow = map(constrain(worldScroll / cliffX, 0, 1), 0, 1, 1, 0.45);
  moveAmount = moveAmount * windSlow;
  if (ending === "cliff") {
  skaterForward += moveAmount * 0.5;

  if (skaterForward > 180) {
    fallingSpeed = 0.6;
  }

  return false;
}
  

  if (!duckStarted && normalChoiceCount < 3 && situationIndex < situationOrder.length) {
  currentSituation = situationOrder[situationIndex];
  situationActive = true;
  duckStarted = true;

  if (currentSituation === "duck") {
    duckX = width * 0.72;
    duckY = riverY - 145;
    duckDone = false;
    duckBubbleStarted = false;
    narrationText = "A small duck waddles out from the trees. For a moment, the skater remembers why she loved ice skating";
    narrationAlpha = 0;
  }

  if (currentSituation === "crack") {
    crackX = width + 200;
    crackTriggered = false;
    narrationText = "The ice ahead begins to split. Doubt spreads beneath her skates, asking if she should stop before she falls.";
    narrationAlpha = 0;
  }

  if (currentSituation === "boulder") {
  boulderX = width + 220;
  boulderTriggered = false;
  narrationText = "A heavy boulder blocks the river path. The dream suddenly feels impossible.";
  narrationAlpha = 0;
  }
}

if (situationActive && currentSituation === "duck" && !duckDone) {
  offsetX -= moveAmount;

if (offsetX > width) offsetX -= width;
if (offsetX < 0) offsetX += width;

return false;
}

  offsetX -= moveAmount;

  if (offsetX > width) offsetX -= width;
  if (offsetX < 0) offsetX += width;

  worldScroll += moveAmount * 0.45;
  if (currentSituation === "crack" && situationActive) {
  crackX -= moveAmount * 0.35;
}

if (currentSituation === "boulder" && situationActive) {
  boulderX -= moveAmount * 0.35;
}
  return false;
}
