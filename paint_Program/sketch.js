x = 0
y = 0
z = 0
a = 10

function setup() {
  createCanvas(900, 600);
  background(255, 255, 255)
}

function draw() {
  frameRate(100000)
  strokeWeight(1)
  stroke(0)
  noFill()

  fill(240, 0, 220)
  square(20, 20, 40)
  
  fill(0, 0, 255)
  square(20, 65, 40)

  fill(0, 180, 255)
  square(20, 110, 40)
  
  fill(0, 179, 60)
  square(20, 155, 40)
  
  fill(255, 255, 0)
  square(20, 200, 40)
  
  fill(255, 117, 26)
  square(20, 245, 40)
  
  fill(255, 0, 0)
  square(20, 290, 40)
  
  fill(180, 90, 0)
  square(20, 335, 40)
  noFill()

  fill(0)
  square(20, 380, 40)
  noFill()

  fill(255, 255, 255)
  square(20, 425, 40)
  noFill()
}

function mouseDragged() {
  strokeWeight(a)

  if (mouseX >= 80) {
    stroke(x, y, z)
    line(mouseX, mouseY, pmouseX, pmouseY)
    noFill()
  }
}

function mouseReleased() {}

function mousePressed() {
  if (mouseX > 20 - 40 && mouseX < 20 + 40 && mouseY > 20 - 40 && mouseY < 20 + 40) {
    x = 153
    y = 0
    z = 153
  } else if (mouseX > 20 - 40 && mouseX < 20 + 40 && mouseY > 65 - 40 && mouseY < 65 + 40) {
    x = 0
    y = 0
    z = 255
  } else if (mouseX > 20 - 40 && mouseX < 20 + 40 && mouseY > 110 - 40 && mouseY < 110 + 40) {
    x = 0
    y = 180
    z = 255
  } else if (mouseX > 20 - 40 && mouseX < 20 + 40 && mouseY > 155 - 40 && mouseY < 155 + 40) {
    x = 0
    y = 179
    z = 60
  } else if (mouseX > 20 - 40 && mouseX < 20 + 40 && mouseY > 200 - 40 && mouseY < 200 + 40) {
    x = 255
    y = 255
    z = 0
  } else if (mouseX > 20 - 40 && mouseX < 20 + 40 && mouseY > 245 - 40 && mouseY < 245 + 40) {
    x = 255
    y = 117
    z = 26
  } else if (mouseX > 20 - 40 && mouseX < 20 + 40 && mouseY > 290 - 40 && mouseY < 290 + 40) {
    x = 255
    y = 0
    z = 0
  } else if (mouseX > 20 - 40 && mouseX < 20 + 40 && mouseY > 335 - 40 && mouseY < 335 + 40) {
    x = 180
    y = 90
    z = 0
  } else if (mouseX > 20 - 40 && mouseX < 20 + 40 && mouseY > 380 - 40 && mouseY < 380 + 40) {
    x = 0
    y = 0
    z = 0
  } else if (mouseX > 20 - 40 && mouseX < 20 + 40 && mouseY > 425 - 40 && mouseY < 425 + 40) {
    x = 255
    y = 255
    z = 255
  }
}