/* inspired by a Matt Deslaurier's sketch, https://gist.github.com/mattdesl/50fa00622294a86261edf3c7fbee2d3e */

let notes = [ 'C5', 'A3', 'D4', 'G4', 'A4', 'F4' ]
let blue, violet, pink, yellow, orange
var bubbles = []
let bouncy = false

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
  background(0)
  rectMode(CENTER)
  
  blue = color('#285de4')
  violet = color('#9654d1')
  yellow = color('#ffc257')
  pink = color('#cc4cca')
  orange = color('#ff876e')

}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight)
}

function draw() {
  background(0) 

  for (let i = 0 ; i < bubbles.length ; i ++) {
    bubbles[i].display()
    if (bouncy == false ) {
      if((bubbles.length > 0) && (bubbles[i].n > 0) && (bubbles[i].siz < 1)) bubbles.splice(i,1)
    }
  }
}

function mouseClicked(){
  //play a middle 'C' for the duration of an 8th note
  let note = notes[int(random(notes.length))]
  synthe.triggerAttackRelease(note, '16n')
  bubbles.push(new Bubble(note))
}

function keyPressed(){

  if(keyCode == ENTER){
    if (bouncy == false) bouncy = true
    else bouncy = false
  }
}