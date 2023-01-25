function setup() {
  createCanvas(800, 400);
  colorMode(HSB);
  noStroke();
  angleMode(DEGREES);
}

function draw() {
  background(0, 0, 0);
  fill('yellow')
  arc(200,200,350,350,225,135);

  fill('red')
  rect(420, 200, 350, 175); 
  ellipse(595, 200, 350, 350); 
  fill("white"); 
  ellipse(505, 195, 95, 95);
  ellipse(685, 195, 95, 95);
  fill("blue");
  ellipse(685, 195, 55, 55);
  ellipse(505, 195, 55, 55);
}
