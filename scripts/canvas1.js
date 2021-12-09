let canvas;
let ctx;
let flowField;
let flowFieldAnimation;

window.onload = function() {
    canvas = document.getElementById('canvas1');
    ctx = canvas.getContext('2d'); //context
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height);
    flowField.animate(0); // line animation
}

window.addEventListener('resize', function() {
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
window.addEventListener('mousemove', function(e) {
    mouse.x = e.x;
    mouse.y = e.y;
})

class FlowFieldEffect {
    #ctx;
    #width;
    #height;
    constructor(ctx, width, height){
        this.#ctx = ctx;
        this.#ctx.lineWidth = 1; // line thickness
        this.#width = width;
        this.#height = height;
        this.lastTime = 0;
        this.interval = 1000/60;
        this.timer = 0;
        this.cellSize = 10;
        this.gradient;
        this.#createGradient();
        this.#ctx.strokeStyle = this.gradient; // line color
        this.radius = 2;
        this.vr = 0.1;
    }

    #createGradient(){
        this.gradient = this.#ctx.createLinearGradient(0, 0, this.#width, this.#height);
        this.gradient.addColorStop("0.1", "#bbff99");
        this.gradient.addColorStop("0.2", "#00ffff");
        this.gradient.addColorStop("0.3", "#00ffff");
        this.gradient.addColorStop("0.4", "#bbff99");
        this.gradient.addColorStop("0.5", "#00ffff");
        this.gradient.addColorStop("0.6", "#00ffff");
        this.gradient.addColorStop("0.7", "#00ffff");
        this.gradient.addColorStop("0.8", "#bbff99");
        this.gradient.addColorStop("0.9", "#00ffff");

    }

    #drawLine(angle, x, y){
        let positionX = x;
        let positionY = y;
        let dx = mouse.x - positionX;
        let dy = mouse.y - positionY;
        let distance = dx * dx + dy * dy;
        const length = distance * 0.0001;
        if(distance > 600000) {
            distance = 600000;
        } else if (distance < 50000) {
            distance = 50000;

        }
        this.#ctx.beginPath();
        this.#ctx.moveTo(x, y);
        this.#ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
        this.#ctx.stroke();
    }
    animate(timeStamp){
        const deltaTime = timeStamp - this.lastTime;
        this.lastTime = timeStamp;
        if (this.timer > this.interval){
            this.#ctx.clearRect(0, 0, this.#width, this.#height);
            this.radius += this.vr
            if (this.radius > 5 || this.radius < -5) {this.vr *= -1};

            for (let y = 0; y < this.#height; y += this.cellSize){
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