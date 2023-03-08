var ufo, plucky, osc, env, fil, lfo, noise, gainNode;
var greetings = "Play Radar Sound. Click & hold the mouse button!";

function preload(){
	img = loadImage('js/radar.jpg');
}

function setup(){
	createCanvas(612,612);

    plucky = new Tone.MetalSynth().toMaster();

    osc = new Tone.FatOscillator({
        "type": "sine",
        "spread" : 80,
        "count" : 30
    }).start();

    env = new Tone.Envelope({
        "attack": 0.9,
        "decay": 0.03,
        "sustain": 1,
        "release": 1
    });

    fil = new Tone.Filter(300,"lowpass");

	lfo = new Tone.LFO({
		min: 80,
		max: 170,
		frequency: '440'
	}).start();
	
	lfo.connect(fil.frequency);

	gainNode = new Tone.Gain();
		env.connect(gainNode.gain);
		fil.connect(gainNode);
		osc.connect(gainNode);
	gainNode.toMaster();
}

function draw(){
	textSize(24);
	text(greetings,5,30);
}

function mousePressed(){
	image(img,50,50);
	theSound();
}

function mouseReleased(){
	bGround();
}

function theSound(){
	env.triggerAttackRelease(5);
	plucky.triggerAttack(9);
}

function bGround(){
	background('white');
}