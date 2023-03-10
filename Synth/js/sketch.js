let slider;

const synth = new Tone.PolySynth();
const reverb = new Tone.JCReverb(0.4);
synth.connect(reverb);

let notes = {

  'a': 'C4',
  's': 'D4',
  'd': 'E4',
  'f': 'F4',
  'g': 'G4',
  'h': 'A4',
  'j': 'B4',
  'k': 'C5'

}

function setup() {
  createCanvas(600, 400);

  slider = new Nexus.Slider("#slider");
  reverb.toDestination();

  synth.release = 2;
  synth.resonance = 0.90;

  slider.on('change', (v) =>
  {
    reverb.roomSize.value = v;
  }); 

}

function draw() {
  background(0,0,0);
  text("Slid to affect the reverb of each sound.", 40, 40);
  fill(255)
  text("Press letters a= C key, s= D key, d= E Key, f= F Key, g= G key, h= A key, j= B key, k= C key", 20, 200);
  fill(255)
}

function keyPressed() {
  let toPlay = notes[key];
  console.log(toPlay);
  synth.triggerAttackRelease(toPlay, 0.5);
}