let sounds = new Tone.Players({

  "Dogs": "sounds/dog.wav",
  "Cats": "sounds/cat.wav",
  "Bees": "sounds/bee.wav",
  "Hawks": "sounds/hawk.mp3"

})

const delay = new Tone.FeedbackDelay("8n", 0.5);

let soundNames = ["Dogs", "Cats", "Hawks", "Bees"];
let buttons = [];

let dSlider;
let fSlider;

// let button1, button2, button3;

function setup() {
  createCanvas(400, 400);
  sounds.connect(delay);
  delay.toDestination();

  soundNames.forEach((word, index) => {
    buttons[index] = createButton(word);
    buttons[index].position(index, index*75);
    buttons[index].mousePressed( () => buttonSound(word))
  })

  dSlider = createSlider(0., 1., 0.5, 0.05);
  dSlider.mouseReleased( () => {
    delay.delayTime.value = dSlider.value();
  })

  fSlider = createSlider(0., 1., 0.5, 0.05);
  fSlider.mouseReleased( () => {
    delay.feedback.value = fSlider.value();
  })


}

function draw() {
  background(10, 10, 10);
  
  text('Beware DOGS', 50, 15);
  fill(240,240,240)

  text('Cat Attack', 50, 90);
  fill(240,240,240)

  text('Hawk Spotting', 60, 165);
  fill(240,240,240)

  text('BEE movie reference', 55, 240);
  fill(240,240,240)

  text('press the buttons for sound', 10, 280);
  fill(240,240,240)

  text('v Controls speed of feedback', 5, 380);
  fill(240,240,240)
  
  text('v Adds feedback to audio', 180, 380);
  fill(240,240,240)
}

function buttonSound(whichSound) {
    sounds.player(whichSound).start();
}