const particles = [];



function setup (){
    createCanvas(window.innerWidth, window.innerHeight)
    // console.log(random(width));

    //how many particles do we want to create? we can use a loop for this
    //make it dynamic so the number of particles is relative to the size of the window
    const particlesLength = Math.floor(window.innerWidth / 10);
    // console.log(particlesLength);

    for(let i = 0; i < particlesLength; i++){
        //add to particles array
        particles.push(new Particle());
    }
}

function draw(){
    background(255, 255, 255)
    particles.forEach((p, index)=> {
        p.update();
        p.draw();
        p.checkParticles(particles.slice(index));
    });
}

class Particle {
    constructor(){
        //Position
        this.pos = createVector(random(width), random(height));

        //velocity
        this.vel = createVector(random(-2, 2), random(-2,2));

        //size
        this.size = 10;
    }

    //update movement with velocity
    update(){
        this.pos.add(this.vel);
        this.edges();
    }

    //draw a single particle
    draw(){
        //take away the border using stroke
        noStroke()
        fill('rgba(246, 36, 89, 0.5)')
        circle(this.pos.x, this.pos.y, this.size);
    }

    //detect edges
    edges(){
        //detect each side
        if(this.pos.x < 0 || this.pos.x > width){
            //then turn the dot around
            this.vel.x *= -1
        }

        if(this.pos.y < 0 || this.pos.y > height){
            //then turn the dot around
            this.vel.y *= -1
        }
    }

    //connect particles
    checkParticles(particles){
        particles.forEach(particle => {
            const d = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
            //create a line if it is a certain distance
            if(d < 120){
                stroke('rgba(150, 40, 27, 0.1)')
                line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y)
            }
        });
    }

}