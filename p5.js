let stars = [];
let canvas;
let ctx;
let speed = 0.5;

function setup() {


    canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('p5-container');
    ctx = canvas.elt.getContext('2d');
    background(0);

    // create stars
    for (let i = 0; i < 200; i++) {
        stars.push(new Star(random(1000), random(1000), random(1, 4)));
    }

    // on scroll func
    window.onscroll = function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        canvas.position.y = -scrollTop * speed;
    };
}

// func draw
function draw() {
    // clear canvas (good practice)
    ctx.clearRect(0, 0, width, height);


    // stars needs to update then display
    for (let i = 0; i < stars.length; i++) {
        stars[i].update();
        stars[i].display();
    }

    // the text info
    fill(255);
    textSize(38);
    textAlign(CENTER, CENTER);
    text('Among the 300 trillion stars in the sky...', width / 2, height / 2);


    // add new star every update
    if (stars.length < 200) {
        stars.push(new Star(random(1000), random(1000), random(0.1, 0.5)));
    }
}

class Star {
    constructor(x, y, size) {
        // random x,y generation
        this.x = random(width);
        this.y = random(height);

        this.size = random(1, 4);
        this.angle = random(TWO_PI);

        // adjust here for speed
        this.speed = random(0.0001, 0.0005);

        // adjust here for alpha
        this.alpha = 255;
        this.visible = true;

        // adjust here for interval
        this.blinkInterval = random(10, 50);

        // start the blink timer at 0
        this.blinkTimer = 0;
    }



    update() {
        // angle and speed
        this.angle += this.speed;

        // blink timer
        this.blinkTimer++;


        // blinker timer check
        if (this.blinkTimer >= this.blinkInterval) {
            this.visible = !this.visible;
            if (this.visible) {
                this.alpha = 255;
            }
            this.blinkTimer = 0;
        }
    }


    display() {

        if (this.visible) {
            fill(255, this.alpha);
            noStroke();
            ellipse(this.x, this.y, this.size, this.size);
        }
        // adjust alpha here
        this.alpha -= 5;
        this.alpha = constrain(this.alpha, 0, 255); // make sure alpha stays in the range
    }
}
