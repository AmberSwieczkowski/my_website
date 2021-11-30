var canvas = document.querySelector('#practice1');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// c.fillStyle = 'rgba(400, 100, 100, 1)';
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = 'rgba(100, 400, 100, 1)';
// c.fillRect(200, 200, 200, 200);
// c.fillStyle = 'rgba(100, 100, 400, 1)';
// c.fillRect(400, 400, 300, 300);
// console.log(canvas);

// Lines
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(250, 100);
// c.lineTo(450, 300);
// c.lineTo(250, 500);
// c.lineTo(50, 300);
// c.strokeStyle = "#fff";
// c.lineWidth = 5;
// c.stroke();

// Arcs / Circles
// c.beginPath();
// c.arc(800, 300, 150, 0, Math.PI * 4, false);
// c.strokeStyle = 'black';
// c.stroke();

// for (var i = 0; i < 50; i++) {
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;
    
// Arcs / Circles

    // c.beginPath();
    // c.arc(x, y, 30, 0, Math.PI * 4, false);
    // c.strokeStyle = 'orange';
    // c.stroke();

// Lines
//     c.beginPath();
//     c.moveTo(x, y);
//     c.lineTo(x + 200, y - 200);
//     c.lineTo(x + 400, y);
//     c.lineTo(x + 200, y + 200);
//     c.lineTo(x, y);
//     c.strokeStyle = "#fff";
//     c.lineWidth = 5;
//     c.stroke();
// }

var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 60;
var minRadius = 5;

var colorArray = [
    '#FFB980', // orange
    '#FC7686', // red
    '#C182DB', // purple
    '#A4E2F5', // blue
    '#ECFA95', // green
];

window.addEventListener('mousemove', 
    function(event) {
        mouse.x = event.x;
        mouse.y = event.y - 150;
        console.log(mouse)
})

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
})

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.lineWidth = 5;
        c.fill();

    }

    this.update = function() {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx
        }
    
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy
        }
    
        this.x += this.dx;
        this.y += this.dy;

        // Mouse Interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > - 50 &&  mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.draw();
    }
   
}

var circleArray = []

function init() {

    circleArray = [];

for (var i = 0; i < 3000; i++) {
    var radius = Math.random() * 4 + 1;
    var x = Math.random() * (innerWidth - radius*2) + radius;
    var y = Math.random() * (innerHeight - radius*2) + radius;
    var dx = (Math.random() - 0.5) * 3;
    var dy = (Math.random() - 0.5) * 3;
    
    circleArray.push(new Circle(x, y, dx, dy, radius));
;
}
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}

animate();
init();