function setup() {
  createCanvas(600, 600);
  colorMode(HSB);
}

function draw() {
  
background(255, 204, 50);
fill('green');
circle(300,300,300);

fill('red')
star(300,300,60,150,5)

strokeWeight(5);
stroke(0, 0, 255);
}

function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = .95; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
