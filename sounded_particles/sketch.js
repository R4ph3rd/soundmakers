let maxag = 8000
let notes = [ 'E3','E4', 'A3' ]
let blue, violet, pink, yellow, orange

let agent = [];
let noiseStep, noiseForce ;
let strokeWidth = 0.3;
let c = []

let timer, timeTo
let sound
//create a synth and connect it to the master output (your speakers)
var synthe = new Tone.Synth(
  ({
  oscillator: { type: 'sine' },
  envelope: {
    attack: 0.0001,
    decay: 1,
    sustain: 0.6,
    release: 60,
    detune:8
  },    
  reverb:{
    decay: 40,
    wet: 0.5,
    preDelay: 0.2
  }
})).toMaster()

let mouse

let carrier; // this is the oscillator we will hear
let modulator; // this oscillator will modulate the frequency of the carrier

let analyzer; // we'll use this visualize the waveform

// the carrier frequency pre-modulation
let carrierBaseFreq = 220;

// min/max ranges for modulator
let modMaxFreq = 60
let modMinFreq = 65
let modMaxDepth = -230;
let modMinDepth = -250;


function setup() {
  let cnv = createCanvas(windowWidth, windowHeight)
  smooth()
  strokeWeight(1)
  background(0)
  rectMode(CENTER)

  noiseStep = random(150, 600);
  noiseForce = random(20);

  sound = false

  timer = millis()
  timeTo = millis()

  c[0] = color('#285de4'); //blue
  c[1] = color('#9654d1') //violet 
  c[2] = color('#ffc257'); // yellow
  c[3] = color('#cc4cca')//pink
  c[4] = color('#ff876e')

  for (let i = 0; i < maxag; i ++) agent[i] = new Agent();

  mouse = createVector(mouseX, mouseY)

  carrier = new p5.Oscillator('sine');
  carrier.amp(0); // set amplitude
  carrier.freq(carrierBaseFreq); // set frequency
  carrier.start(); // start oscillating

  // try changing the type to 'square', 'sine' or 'triangle'
  modulator = new p5.Oscillator('sawtooth');
  modulator.start();

  // add the modulator's output to modulate the carrier's frequency
  modulator.disconnect();
  carrier.freq(modulator);

  // create an FFT to analyze the audio
  analyzer = new p5.FFT();

  // fade carrier in/out on mouseover / touch start
 // toggleAudio(cnv);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight)
}

function draw() {
  background(0,10) 

  for (let i = 0; i < maxag; i ++) {
    agent[i].update();
    agent[i].display();
  }
}

function mousePressed(){
sound = true
  if( sound){
  mouse.set(mouseX, mouseY)

  // map mouseY to modulator freq between a maximum and minimum frequency
  let modFreq = map(mouseY, height, 0, modMinFreq, modMaxFreq);
  modulator.freq(modFreq);

  // change the amplitude of the modulator
  // negative amp reverses the sawtooth waveform, and sounds percussive
  let modDepth = map(mouseX, 0, width, modMinDepth, modMaxDepth);
  modulator.amp(modDepth);

  carrier.amp(1.0, 0.01);

}
}

function mouseDragged(){ 
  mouse.set(mouseX, mouseY)
  let modFreq = map(mouseY, height, 0, modMinFreq, modMaxFreq);
  modulator.freq(modFreq);
    let modDepth = map(mouseX, 0, width, modMinDepth, modMaxDepth);
  modulator.amp(modDepth);
}

function mouseReleased(){
   sound = false
   carrier.amp(0.0, 1.0);
  }

function keyPressed(){
  if (key == 's' || key == 'S' ) saveFrame("noisy_fluctuations-###.png");

  if (keyCode == ENTER ) {
    noiseStep = random(150, 600);
    noiseForce = random(20);
    for (let i = 0; i < maxag; i ++) agent[i] = new Agent();
  }
}
/*
// helper function to toggle sound
function toggleAudio(cnv) {
  cnv.mouseOver(function() {
    
  });
  cnv.touchStarted(function() {
    carrier.amp(1.0, 0.01);
  });
  cnv.mouseOut(function() {
    carrier.amp(0.0, 1.0);
  });
}*/
