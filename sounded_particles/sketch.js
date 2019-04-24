let maxag = 8000
let notes = [ 'E2' ]
let blue, violet, pink, yellow, orange

let agent = [];
let noiseStep, noiseForce ;
let strokeWidth = 0.3;
let c = []

let timer, timeTo
//create a synth and connect it to the master output (your speakers)
var synthe = new Tone.Synth(
  ({
  oscillator: { type: 'sine' },
  envelope: {
    attack: 0.001,
    decay: 0.5,
    sustain: 0.00001,
    release: 6
  },
  reverb:{
    decay: 4,
    wet: 0.5,
    preDelay: 0.2
  }
})).toMaster()

function setup() {
  createCanvas(windowWidth, windowHeight)
  smooth()
  strokeWeight(1)
  background(0)
  rectMode(CENTER)

  noiseStep = random(150, 600);
  noiseForce = random(20);

  timer = millis()
  timeTo = millis()

  c[0] = color('#285de4'); //blue
  c[1] = color('#9654d1') //violet 
  c[2] = color('#ffc257'); // yellow
  c[3] = color('#cc4cca')//pink
  c[4] = color('#ff876e')

  for (let i = 0; i < maxag; i ++) agent[i] = new Agent();
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight)
}

function draw() {
  background(0,10) 
/*
  while (timer < timeTo + 5000){
    timer = millis()
    Text('Tap ENTER to reset agent positions, click to submit them to your power' , width / 2 , height / 2)
  }*/

  for (let i = 0; i < maxag; i ++) {
    agent[i].update();
    agent[i].display();
  }
}

function keyPressed(){
  if (key == 's' || key == 'S' ) saveFrame("noisy_fluctuations-###.png");

  if (keyCode == ENTER ) {
    noiseStep = random(150, 600);
    noiseForce = random(20);
    for (let i = 0; i < maxag; i ++) agent[i] = new Agent();
  }
}