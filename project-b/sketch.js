console.log("loaded");

let AUDIO_THRESHOLD = 0.2;
let particles = [];
let totalNum = 70; // number of particles here
let audioLevel;
let buildings = []; // empty;
let cvs;

function setup() {
    cvs = createCanvas(1100, 500);
    cvs.parent("canvasContainer");
    background(200, 40);
    angleMode(DEGREES);

    // generate Particles
    for (let i = 0; i < totalNum; i++) {
        particles.push(new Particle(random(width), random(height)));
    }
    // generate buildings
    let inc = 30;
    for (let x = 0; x < width; x += inc) {
        buildings.push(new Building(x, height));
    }

    // Microphone setup
    mic = new p5.AudioIn();
    mic.start();
}

function draw() {
    background(50, 5);
    audioLevel = mic.getLevel();
    audioLevel = map(audioLevel, 0.0, 0.7, 0.0, 1.0, true);

    //  particles update and display
    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.move();
        p.display();

        if (audioLevel > AUDIO_THRESHOLD) {
            p.increaseSpeed();
        } else {
            p.decreaseSpeed();
        }
    }

    // draw buildings
    for (let i = 0; i < buildings.length; i++) {
        let b = buildings[i];
        b.changeColor();
        b.display();
    }
}

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.dia = random(20, 40);
        this.xSpd = random(1, 2);
        this.ySpd = random(-1, 1);
        this.colorBase = [random(100, 256), 20, random(100, 2, 256)];
        this.colorActive = [255, 255, 255];
    }
    move() {
        this.x += this.xSpd;
        this.y += this.ySpd;
        if (this.y > height || this.y < 0) {
            // Set vertical boundaries
            this.ySpd *= -1;
        }
        if (this.x > width) {
            // regenerate at 0 when it reaches the end
            this.x = 0;
        }
    }
    display() {
        push();
        translate(this.x, this.y);

        rectMode(CENTER);
        fill(100);
        rotate(random(360));
        fill(this.colorActive);
        noStroke();
        ellipse(0, 0, this.dia * 1.5, this.dia * 0.7);
        //circle(0,0, this.dia)

        pop();
    }
    decreaseSpeed() {
        this.xSpd *= 0.97; // -0.03%
        this.xSpd = constrain(this.xSpd, 1, 20);
        if (this.colorActive[0] < 255) { this.colorActive[0] += 2; }
        if (this.colorActive[1] < 255) { this.colorActive[1] += 2; }
        if (this.colorActive[2] < 255) { this.colorActive[2] += 2; }
    }
    increaseSpeed() {
        if (this.xSpd < 20) {
            // cap speed
            this.xSpd *= 1.1; // +10%
        }
        // change color
        if (this.colorBase[0] < this.colorActive[0]) {
            this.colorActive[0] -= 8;
        }
        if (this.colorBase[1] < this.colorActive[1]) {
            this.colorActive[1] -= 8;
        }
        if (this.colorBase[2] < this.colorActive[2]) {
            this.colorActive[2] -= 8;
        }
    }
}

class Building {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = random(40, 80);
        this.h = random(100, 250);
        //
        this.r = 255;
        this.g = 255;
        this.b = 0;
        //
        this.freq = 0;
        this.variation = random(80, 100);
    }
    changeColor() {
        this.freq += audioLevel * this.variation;
        this.r = 2 * map(sin(this.freq), -1, 1, 15, 0);
        this.g = map(sin(this.freq), -1, 1, 15, 0);
        this.b = map(sin(this.freq * 0.3), -1, 1, 15, 0);
    }
    display() {
        push();
        translate(this.x, this.y);
        fill(this.r, this.g, this.b);
        rect(0, 0, this.w, -this.h);
        pop();
    }
}
