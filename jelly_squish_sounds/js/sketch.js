let sounds = new Tone.Players({
  "ocean": "assets/jellyBGmusic.wav",
  "endgame": "assets/gameover.wav",
  "points": "assets/oldblip.wav",
  "miss": "assets/miss.wav"
})

let spriteSheet;

let walkingAnimation;

let spriteSheetFilenames = ["Jellies.png"];
let spriteSheets = [];
let animations = [];

const GameState = {
  Start: "Start",
  Playing: "Playing",
  GameOver: "GameOver"
};

const delay = new Tone.FeedbackDelay("8n", 0.5);

let game = { score: 0, maxScore: 0, maxTime: 30, elapsedTime: 0, totalSprites: 60, state: GameState.Start, targetSprite: 0 };

function preload() {
  for(let i=0; i < spriteSheetFilenames.length; i++) {
    spriteSheets[i] = loadImage("assets/" + spriteSheetFilenames[i]);
  }
}

function setup() {
  createCanvas(600, 600);

  sounds.connect(delay);
  delay.toDestination();
  sounds.player("miss").volume.value = -8;

  imageMode(CENTER);
  angleMode(DEGREES);

  reset();
}

function reset() {
  game.elapsedTime = 0;
  game.score = 0;
  game.totalSprites = random(20,50);

  animations = [];
  for(let i=0; i < game.totalSprites; i++) {
    animations[i] = new WalkingAnimation(random(spriteSheets),48,48,random(50,500),random(50,500),7,random(0.5,3),6,random([0,1]));
  }
}

function draw() {
  switch(game.state) {
    case GameState.Playing:
      background(color(0,0,255))
  
      for(let i=0; i < animations.length; i++) {
        animations[i].draw();
      }
      fill(0);
      textSize(40);
      text(game.score,20,40);
      let currentTime = game.maxTime - game.elapsedTime;
      text(ceil(currentTime), 300,40);
      game.elapsedTime += deltaTime / 1000;

      if (currentTime < 0)
        game.state = GameState.GameOver;
        sounds.player("endgame").start();
      break;
    case GameState.GameOver:
      game.maxScore = max(game.score,game.maxScore);
      sounds.player("ocean").stop("-0.5");
      background(0);
      fill(255);
      textSize(40);
      textAlign(CENTER);
      text("Game Over!",300,200);
      textSize(35);
      text("Score: " + game.score,300,270);
      text("Max Score: " + game.maxScore,300,350);
      break;
    case GameState.Start:
      background(0);
      fill(255);
      textSize(50);
      textAlign(CENTER);
      text("Jelly Squishers",300,200);
      textSize(30);
      text("Press Any Key to Start",300,300);
      break;
  }
  
}

function keyPressed() {
  
  switch(game.state) {
    case GameState.Start:
      sounds.player("ocean").start();
      sounds.player("ocean").loop = true;
      game.state = GameState.Playing;
      break;
    case GameState.GameOver:
      reset();
      game.state = GameState.Playing;
      break;
  }
}

function mousePressed() {
  switch(game.state) {
    case GameState.Playing:
      for (let i=0; i < animations.length; i++) {
        let contains = animations[i].contains(mouseX,mouseY);
        if (contains) {
          if (animations[i].moving != 0) {
            animations[i].stop();
            if (animations[i].spritesheet === spriteSheets[game.targetSprite]){
              sounds.player("points").start();

              sounds.player("ocean").playbackRate += .1;

              game.score += 1;
              animations.speed += 1;
            }
            else{
              game.score -= 1;
            }
          }
          else {
            if (animations[i].xDirection === 1)
              animations[i].moveRight();
            else
              animations[i].moveLeft();
          }
        }
        else{
          sounds.player("miss").start();
        }
      }
      break;
  }
  
}

class WalkingAnimation {
  constructor(spritesheet, sw, sh, dx, dy, animationLength, speed, framerate, vertical = false, offsetX = 0, offsetY = 0) {
    this.spritesheet = spritesheet;
    this.sw = sw;
    this.sh = sh;
    this.dx = dx;
    this.dy = dy;
    this.u = 0;
    this.v = 0;
    this.animationLength = animationLength;
    this.currentFrame = 0;
    this.moving = 1;
    this.xDirection = 1;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.speed = speed;
    this.framerate = framerate*speed;
    this.vertical = vertical;
  }

  draw() {

    this.u = (this.moving != 0) ? this.currentFrame % this.animationLength : this.u;
    push();
    translate(this.dx,this.dy);
    if (this.vertical)
      rotate(90);
    scale(this.xDirection,1);

    image(this.spritesheet,0,0,this.sw,this.sh,this.u*this.sw+this.offsetX,this.v*this.sh+this.offsetY,this.sw,this.sh);
    pop();
    let proportionalFramerate = round(frameRate() / this.framerate);
    if (frameCount % proportionalFramerate == 0) {
      this.currentFrame++;
    }
  
    if (this.vertical) {
      this.dy += this.moving*this.speed;
      this.move(this.dy,this.sw / 4,height - this.sw / 4);
    }
    else {
      this.dx += this.moving*this.speed;
      this.move(this.dx,this.sw / 4,width - this.sw / 4);
    }

    
  }

  move(position,lowerBounds,upperBounds) {
    if (position > upperBounds) {
      this.moveLeft();
    } else if (position < lowerBounds) {
      this.moveRight();
    }
  }

  moveRight() {
    this.moving = 1;
    this.xDirection = 1;
    this.v = 0;
  }

  moveLeft() {
    this.moving = -1;
    this.xDirection = -1;
    this.v = 0;
  }

  contains(x,y) {
    let insideX = x >= this.dx - 26 && x <= this.dx + 25;
    let insideY = y >= this.dy - 35 && y <= this.dy + 35;
    return insideX && insideY;
  }

  stop() {
    this.moving = 0;
    this.u = 8;
    this.v = 0;
  }
}
