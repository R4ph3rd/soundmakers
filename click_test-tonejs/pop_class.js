/* inspired by a Matt Deslaurier's sketch, https://gist.github.com/mattdesl/50fa00622294a86261edf3c7fbee2d3e */

function Bubble(note) {

    this.x = mouseX
    this.y = mouseY
    this.duration = random(1,2)
    this.n = 0
    let sizi = random(width/6, width /4)
    this.angle = random(TWO_PI)
    this.form = random(3)

    if (note == notes[0]){
      this.c1 = violet
      this.c2 = blue
      this.seuil = 0.7
    }
    else if (note == notes[1]){
        this.c1 = pink
        this.c2 = orange
        this.seuil = 1
      }
    else if (note == notes[2]){
      this.c1 = violet
      this.c2 = yellow
      this.seuil = 1.2
    }
    else if (note == notes[3]){
      this.c1 = blue
      this.c2 = pink
      this.seuil = 1.2
    }
    else if (note == notes[4]){
      this.c1 = orange
      this.c2 = yellow
      this.seuil = 1.7
    }
    else if (note == notes[5]){
      this.c1 = violet
      this.c2 = pink
      this.seuil = 0.7
    }


  

    this.display = function(){
        this.n += 0.05
        tween = sin(this.n/this.duration) 
        this.siz = sizi * tween
        push()
        translate(this.x, this.y)
        rotate(this.angle)
        for (let i = this.siz ; i > this.siz/1.5 ; i--){
            let g = map(i, this.siz, this.siz/1.5, 0, this.seuil)
            let c = lerpColor(this.c1, this.c2, g)

            //fill(c)
            //noStroke()
            noFill()
            stroke(c)
            strokeWeight(1)
            if ( this.form < 1 ) rect(0, 0, i, i)
            if ( this.form < 2 ) ellipse(0, 0, i, i)
            if (this.form > 2) {
                let x1 = i;
                let y1 = 0;                
                let x2 = i * cos(TWO_PI / 3);
                let y2 = i * sin(TWO_PI / 3);
                let x3 = i * cos(-TWO_PI / 3);
                let y3 = i * sin(-TWO_PI / 3);
                triangle (x1,y1,x2,y2,x3,y3)
            }
        }
        pop()
    }
}