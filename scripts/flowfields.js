let canvas;
let ctx;
let flowField;
let flowFieldAnimation;

window.onload = function () {
    canvas = document.getElementById('flowfields');
    ctx = canvas.getContext('2d'); //context
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height);
    flowField.animate(0); // line animation
}

window.addEventListener('resize', function () {
    this.cancelAnimationFrame(flowFieldAnimation);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height);
    flowField.animate(0); // line animation
});

const mouse = {
    x: 0,
    y: 0
}

// Makes flowfields responsive to mouse movement
// window.addEventListener('mousemove', function (e) {
//     mouse.x = e.x;
//     mouse.y = e.y;
// })

class FlowFieldEffect {
    #ctx;
    #width;
    #height;
    constructor(ctx, width, height) {
        this.#ctx = ctx;
        this.#ctx.lineWidth = 1; // line thickness
        this.#width = width;
        this.#height = height;
        this.lastTime = 0;
        this.interval = 10000 / 60;
        this.timer = 0;
        this.cellSize = 50; // bigger number = less lines
        this.gradient;
        this.#createGradient();
        this.#ctx.strokeStyle = this.gradient; // line color
        this.radius = 100; //
        this.vr = .5; // rotation speed
    }

    #createGradient() {
        let backgroundColor = "#e432f4" // purple
        let mainColor1 = "#00ffff" // blue
        let accentColor1 = "#f4fb33" // yellow
        let accentColor2 = "#bbff99" // green
        this.gradient = this.#ctx.createLinearGradient(0, 0, this.#width, this.#height);
        this.gradient.addColorStop("0.05", backgroundColor);
        this.gradient.addColorStop("0.1", mainColor1);
        this.gradient.addColorStop("0.15", accentColor1);
        this.gradient.addColorStop("0.2", backgroundColor);
        this.gradient.addColorStop("0.25", accentColor2);
        this.gradient.addColorStop("0.3", mainColor1);
        this.gradient.addColorStop("0.35", accentColor1);
        this.gradient.addColorStop("0.4", backgroundColor);
        this.gradient.addColorStop("0.45", accentColor2);
        this.gradient.addColorStop("0.5", mainColor1);
        this.gradient.addColorStop("0.55", accentColor1);
        this.gradient.addColorStop("0.6", backgroundColor);
        this.gradient.addColorStop("0.65", accentColor2);
        this.gradient.addColorStop("0.7", mainColor1);
        this.gradient.addColorStop("0.75", accentColor1);
        this.gradient.addColorStop("0.8", backgroundColor);
        this.gradient.addColorStop("0.85", accentColor2);
        this.gradient.addColorStop("0.9", mainColor1);
        this.gradient.addColorStop("0.95", backgroundColor);

    }

    #drawLine(angle, x, y) {
        let positionX = x;
        let positionY = y;
        let dx = mouse.x - positionX;
        let dy = mouse.y - positionY;
        let distance = dx * dx + dy * dy;
        const length = distance * 1000; // size of hole around mouse
        if (distance > 600000) {
            distance = 600000;
        } else if (distance < 50000) {
            distance = 50000;

        }
        this.#ctx.beginPath();
        this.#ctx.moveTo(x, y);
        this.#ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
        this.#ctx.stroke();
    }
    animate(timeStamp) {
        const deltaTime = timeStamp - this.lastTime;
        this.lastTime = timeStamp;
        if (this.timer > this.interval) {
            this.#ctx.clearRect(0, 0, this.#width, this.#height);
            this.radius += this.vr
            if (this.radius > 104 || this.radius < 100) { this.vr *= -1 }; // Causes lines to reverse rotation direction

            for (let y = 0; y < this.#height; y += this.cellSize) {
                for (let x = 0; x < this.#width; x += this.cellSize) {
                    const angle = (Math.cos(mouse.x * x * 0.0001) + Math.sin(mouse.y * y * 0.0001)) * this.radius;
                    this.#drawLine(angle, x, y);
                }
            }

            this.timer = 0;
        } else {
            this.timer += deltaTime;
        }
        flowFieldAnimation = requestAnimationFrame(this.animate.bind(this));
    }
}
