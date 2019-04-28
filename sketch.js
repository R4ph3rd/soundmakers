let maxag = 8000  
let threshold
let blue, violet, pink, yellow, orange

let agent = [];
let noiseStep, noiseForce ;
let strokeWidth = 0.3;
let c = []

let sound, mouse

let carrier; // this is the oscillator we will hear
let modulator; // this oscillator will modulate the frequency of the carrier

// the carrier frequency pre-modulation
let carrierBaseFreq = 40;

// min/max ranges for modulator
let modMaxFreq = 37
let modMinFreq = 40
let modMaxDepth = -200;
let modMinDepth = -230;
let modFreq, modDepth

//a polysynth composed of 60 Voices of Synth
var synth = new Tone.PolySynth(10, Tone.Synth).toMaster();
//set the attributes using the set interface
synth.set("detune", -800);


function setup() {
  let cnv = createCanvas(windowWidth, windowHeight)
  smooth()
  strokeWeight(1)
  background(0)
  rectMode(CENTER)

  // adapt number of agents and threshold of attraction according to screen size
  let diag = sqrt(pow(windowWidth,2) + pow(windowHeight,2))
  threshold =  ( 350 / 1600 ) * diag
  maxag = ( 8000 / 1600 ) * diag
  console.log("seuil : " + threshold)
  console.log("agents : 0" + maxag)

  noiseStep = random(150, 600);
  noiseForce = random(20);

  sound = false

  c[0] = color('#3b83d6'); //blue
  c[1] = color('#ff206e') //violet 
  c[2] = color('#41ead4'); // yellow
  c[3] = color('#ffffff')//bleu ciel
  c[4] = color('#00579A')

  for (let i = 0; i < maxag; i ++) agent[i] = new Agent();

  mouse = createVector(mouseX, mouseY)

  carrier = new p5.Oscillator('sine');
  carrier.amp(0); // set amplitude
  carrier.freq(carrierBaseFreq); // set frequency
  carrier.start(); // start oscillating

  // try changing the type to 'square', 'sine' or 'triangle'
  modulator = new p5.Oscillator('sine');
  modulator.start();

  // add the modulator's output to modulate the carrier's frequency
  modulator.disconnect();
  carrier.freq(modulator);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight)
}

function draw() {
  background(0,20) 

  for (let i = 0; i < maxag; i ++) {
    agent[i].update();
    agent[i].display();
  }
}

function mousePressed(){
sound = true
  if(sound){
  mouse.set(mouseX, mouseY)

    //play a chord
    synth.triggerAttackRelease(["E3", "A6"], "4n");

  // map mouseY to modulator freq between a maximum and minimum frequency
  modFreq = map(mouseY, height, 0, modMinFreq, modMaxFreq);
  modulator.freq(modFreq);

  // change the amplitude of the modulator
  // negative amp reverses the sawtooth waveform, and sounds percussive
  modDepth = map(mouseX, 0, width, modMinDepth, modMaxDepth);
  modulator.amp(modDepth);

  carrier.amp(1.0, 0.01);
  }
}

function mouseDragged(){ 
  mouse.set(mouseX, mouseY)
  modFreq = map(mouseY, height, 0, modMinFreq, modMaxFreq);
  modulator.freq(modFreq);
  modDepth = map(mouseX, 0, width, modMinDepth, modMaxDepth);
  modulator.amp(modDepth);
}

function mouseReleased(){
   sound = false
   carrier.amp(0.0, 1.0);
  }

function keyPressed(){
  if (keyCode == ENTER ) {
    noiseStep = random(150, 600);
    noiseForce = random(20);
    for (let i = 0; i < maxag; i ++) agent[i] = new Agent();
  }
}