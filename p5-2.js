let stars = [];
let numStars = 300;

let sun;
let planets = [];
let numPlanets = 8;

// color system
let planetColors = [
    '#ff5733', // = merc
    '#9cb3ff', // = venus
    '#e6e6e6', // = Earth
    '#ffcc66', // = mars
    '#ffcb73', // = jup
    '#f4a460', // = saturn
    '#4d4dff', // = ur anus
    '#99ccff'  // = neptune
];

let distancesFromSun = [
    0,      // = sun
    80,     // = mercury
    130,    // = venus
    180,    // = earth
    230,    // = mars
    360,    // = jup
    500,    // = saturn
    700,    // = ur
    900     // = neptune
];

let planetSizes = [
    30,    // sun
    10,    // merc
    25,    // venus
    30,    // earth
    20,    // mars
    120,   // jup
    100,   // saturn
    50,    // ura
    45     // neptune
];

function setup() {

    // canvas will be whatever width or height is set of the window
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('p5-container');
    ctx = canvas.elt.getContext('2d');


    // make the stars
    for (let i = 0; i < numStars; i++) {
        let x = random(width);
        let y = random(height);
        let radius = random(1, 3);
        stars.push(new Star(x, y, radius));
    }


    // sun
    sun = new Sun(width / 2, height / 2, planetSizes[0], planetColors[0]);

    // planets
    for (let i = 1; i < numPlanets; i++) {
        let x = distancesFromSun[i];
        let y = height / 2;
        let radius = planetSizes[i];
        let color = planetColors[i % planetColors.length];
        planets.push(new Planet(x, y, radius, color));
    }
}


// draw
function draw() {
    background(0);

    // display stars (dont need to update cuz they are static)
    for (let i = 0; i < stars.length; i++) {
        stars[i].display();
    }

    // sun
    sun.display();

    // planets
    for (let i = 0; i < planets.length; i++) {
        planets[i].display();
    }
}


// mouse click function to orbit
function mouseClicked() {
    // Toggle orbiting state of all planets
    for (let i = 0; i < planets.length; i++) {
        planets[i].orbiting = !planets[i].orbiting;
    }
}

// star constructor
class Star {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    // display stars
    display() {
        noStroke();
        fill(255);
        ellipse(this.x, this.y, this.radius, this.radius);
    }
}

// sun constructor
class Sun {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.gradientColors = ['#fffbac', '#ffef8a', '#ffe066', '#ffdb44', '#ffd61f'];
    }

    // display sun
    display() {
        // sun effect

        for (let i = 0; i < this.gradientColors.length; i++) {
            let gradientColor = color(this.gradientColors[i]);
            gradientColor.setAlpha(100 - i * 15);
            fill(gradientColor);
            ellipse(this.x, this.y, this.radius * 2 + i * 20, this.radius * 2 + i * 20);
        }

        // draw sun
        fill(this.color);
        ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
    }
}

// planet constructor
class Planet {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.orbiting = true;
        this.angle = random(TWO_PI);
    }

    // display
    display() {
        if (this.orbiting) {
            let orbitRadius = dist(this.x, this.y, sun.x, sun.y);
            this.angle += 0.01;

            // funny mah thing
            this.x = sun.x + cos(this.angle) * orbitRadius;
            this.y = sun.y + sin(this.angle) * orbitRadius;
        }
        fill(this.color);
        ellipse(this.x, this.y, this.radius, this.radius);
    }
}
