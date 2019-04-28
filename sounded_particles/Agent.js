
function Agent() {

    let stepSize, angle
    let  noisySpeed = 0.4
    let cAgent 
    let dir = random(1) > 0.5 ? 1 : -1 

    this.pos = createVector(random(width), random(height));
    this.oldPos = createVector(this.pos.x, this.pos.y);
    stepSize = random(1, 8);

       let cc = int(map (cos(this.pos.x * this.pos.y), -1, 0.9, 0, 2))
      if (cc > 3) cc = 3;
    cAgent = c[cc];

    this.update = function() {
      angle = map(noise(this.pos.x/noiseStep, this.pos.y/noiseStep), 0, 1, 0, TWO_PI) ;// * noiseForce;
      angle = (angle - angle * 0.8) * noiseForce;

      this.pos.x += sin( pow(random(noisySpeed) + cos(angle), 2) * stepSize * dir)
      this.pos.y += cos( pow(random(noisySpeed) + sin(angle), 2) * stepSize * dir)

      //mouse attraction
      if (mouseIsPressed == true){
          if (dist(this.pos.x,this.pos.y, mouse.x, mouse.y) < 350 ) {
            
            let gravity = p5.Vector.sub(mouse, this.pos); //make vector pointing towards centralPoint
            gravity.normalize();
            gravity.mult(9.81);
            this.pos.add(p5.Vector.div(gravity))
          }

      }
      
      
      
    //in case that it goes out 
      if ( this.pos.x > width + 5 || this.pos.x < -5 || this.pos.y > height + 5 || this.pos.y < -5) {
        this.pos.x = random(width);
        this.pos.y = random(height);
        this.oldPos.set(this.pos);
      }
    }

    this.display = function(){
      stroke(cAgent, 10);
      line(this.oldPos.x, this.oldPos.y, this.pos.x, this.pos.y);
      this.oldPos.set(this.pos);
    }

}