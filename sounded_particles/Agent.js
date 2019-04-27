
function Agent() {

    let stepSize, angle
    let  noisySpeed = 0.4
    let cAgent 
    let dir = random(1) > 0.5 ? 1 : -1 

    this.pos = createVector(random(width), random(height));
    this.oldPos = createVector(this.pos.x, this.pos.y);
    stepSize = random(1, 8);
   // let colorPos = let (map(this.pos.x * this.pos.y,0,width * height, 0, c.length));
       let cc = int(map (cos(this.pos.x * this.pos.y), -1, 0.9, 0, 3))
      if (cc > 3) cc = 3;
    cAgent = c[cc];

    this.update = function() {
      angle = map(noise(this.pos.x/noiseStep, this.pos.y/noiseStep), 0, 1, 0, TWO_PI) ;// * noiseForce;
      angle = (angle - angle * 0.8) * noiseForce;

      this.pos.x += sin( pow(random(noisySpeed) + cos(angle), 2) * stepSize * dir)
      this.pos.y += cos( pow(random(noisySpeed) + sin(angle), 2) * stepSize * dir)

      //mouse attraction
      if (mouseIsPressed == true){
          if (dist(this.pos.x,this.pos.y, mouse.x, mouse.y) < 200 ) {
            
            let gravity = p5.Vector.sub(mouse, this.pos); //make vector pointing towards centralPoint
            //let distance = p5.Vector.mag(gravity); //distance between particle and centralPoint
           // let gravitation = (9.81 * this.mass) / (distance * distance * 1.2); // formule de gravite pour la force gravitionnelle
            gravity.normalize();
            gravity.mult(9.81);
            this.pos.add(p5.Vector.div(gravity))

           //let note = notes[int(random(notes.length))]
           //synthe.triggerAttackRelease(note, '16n')
          }

      }
      
      
      
    //in case that it goes out 
      if ( this.pos.x > width + 5 || this.pos.x < -5 || this.pos.y > height + 5 || this.pos.y < -5) {
        this.pos.x = random(width);
        this.pos.y = random(height);
        this.oldPos.set(this.pos);
      }
     // noisy += noisySpeed;
    }

    this.display = function(){
     // noFill()
      stroke(cAgent);
      line(this.oldPos.x, this.oldPos.y, this.pos.x, this.pos.y);
      //point(this.oldPos.x, this.oldPos.y)
      //rect(this.pos.x, this.pos.y,1,1)
      this.oldPos.set(this.pos);
    }

}