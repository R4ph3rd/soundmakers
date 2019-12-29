
  let threshold = 5 ;
  let spin = 1.05 ;
  let friction = .005 ;

  let particles = [];
  let maxParticles = 1000;

  let target ;

  let backgroundAlpha = 0 ;
  let primary, secondary ;
  let mouse;

function setup () {
    let canvas =  createCanvas(window.innerWidth, window.innerHeight);
    let p5canvas = document.getElementById('my-canvas')

    primary =  color(211, 30, 74, 5);
    secondary =  color(245, 222, 177, 5);

    canvas.parent(p5canvas)
     background(20);

     strokeWeight(.5);
     stroke(primary);
     smooth();
    // mouseX = width*0.5
    // mouseY = height*0.5
    mouse =  createVector(canvas.width / 2, canvas.height / 2);
    target =  createVector(canvas.width / 2, canvas.height / 2);
    
    for (let i = 0 ; i < maxParticles ; i ++){
      let angle =  random( TWO_PI) ;
      let x = ( width / 2) + ( random( width / 8) *  cos(angle)) ;
      let y = ( height / 2) + ( random( width / 8) *  sin(angle)) ;
      particles[i] = new Particle(x, y, threshold);
     //  ellipse(x,y,5,5)
    }
  }

function windowResized() {
     resizeCanvas(window.innerWidth, window.innerHeight);
  }

function draw() {
     background(20, .5);
    

    for (let i = 0 ; i < particles.length ; i ++){
      particles[i].update();
      particles[i].display();
    }

    if ( accelerationX){
      console.log('accel',  accelerationX)
      mouse.x =  map( rotationX, - 180, 180, 0,  width);
      mouse.y =  map( rotationY, - 180, 180, 0,  height);

      let yoff = -  random(.005, .5)
      target.add(.3 * (mouse.x - target.x),  noise(yoff));
      
    } else {
      mouse.x =  mouseX
      mouse.y =  mouseY
    }
  }

 function mouseMoved() {
    if (mouse.y >  height - ( height / 12)){ 
      let yoff = -  random(.005, .5)
      target.add(.3 * (mouse.x - target.x),  noise(yoff));
    
    } else {
      target.add( .3 * (mouse.x - target.x), .3 * (mouse.y - target.y));
    }
  }


function mouseDragged() {
    backgroundAlpha ++ ;
     background(20, backgroundAlpha);
 }

function mouseReleased() {
    backgroundAlpha = 0 ;
  }

function touchStarted(){
    return false
  }

  class Particle{

    constructor(x, y, threshold){
      this.easeShold =  random(1 / threshold, threshold);
      this.pos =  createVector(x, y);
      this.oldPos = this.pos.copy();
      this.ease =  createVector( width / 2,  height / 2);
      this.ease.normalize();
    }

    update(){
      this.oldPos.set(this.pos);
      this.ease.div(spin);
      this.ease.add(friction * (target.x - this.pos.x) * this.easeShold,
                    friction * (target.y - this.pos.y) * this.easeShold);
      if ( mouseY >  height - ( height / 12)){
        let ypos =  random( .005, .5) ;
        ypos = this.pos.y >  height * 3 / 4 ? ypos : ypos * -1 ;

        this.pos.add(this.ease.x, ypos);
      } else {
        this.pos.add(this.ease.x, this.ease.y);  
      }
      
    }

    display(){
       line(this.pos.x, this.pos.y, this.oldPos.x, this.oldPos.y);
    }
  }
