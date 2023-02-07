
let spriteSheet;
let sw = 80;
let sh = 90;
let sx = 0;
let sy = 0;
let u = 0;
let v = 0;
let animationLength = 9;
let currentFrame = 0;
let x = 200;
let moving = 0;
let xDirection = 1;

let spriteSheet2;


function preload() {
  spriteSheet = loadImage("assets/Splunky.png");
  spriteSheet2 = loadImage("assets/Bluey.png");
  spriteSheet3 = loadImage("assets/yellowy.png");
}

function setup() {
  createCanvas(600, 600);
  imageMode(CENTER);
}

function draw() {
  background(220);
  
  if (moving != 0)
    u = currentFrame % animationLength;
  else
    u = 0;

  translate(x,200);
  scale(xDirection,1);

  image(spriteSheet,0,0,80,80,u*sw,v*sh,sw,sh);
  image(spriteSheet2,20,200,80,80,u*sw,v*sh,sw,sh);
  image(spriteSheet3,30,100,80,80,u*sw,v*sh,sw,sh);

  if (frameCount % 6 == 0) {
    currentFrame++;
  }

  x += moving;
}

function keyPressed(){
  if(keyCode === RIGHT_ARROW){
    moving = 1;
    xDirection = 1;
  } else if (keyCode === LEFT_ARROW){
    moving = -1;
    xDirection = -1;
  }
}

function keyReleased(){
  if (keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW){
    moving = 0;
  }
}