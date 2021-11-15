var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

c.fillStyle = 'rgba(400, 100, 100, 1)';
c.fillRect(100, 100, 100, 100);
c.fillStyle = 'rgba(100, 400, 100, 1)';
c.fillRect(200, 200, 200, 200);
c.fillStyle = 'rgba(100, 100, 400, 1)';
c.fillRect(400, 400, 300, 300);
console.log(canvas);

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

for (var i = 0; i < 50; i++) {
    var x = Math.random() * window.innerWidth;
    var y = Math.random() * window.innerHeight;
    
// Arcs / Circles

    c.beginPath();
    c.arc(x, y, 30, 0, Math.PI * 4, false);
    c.strokeStyle = 'orange';
    c.stroke();

// Lines
    c.beginPath();
    c.moveTo(x, y);
    c.lineTo(x + 200, y - 200);
    c.lineTo(x + 400, y);
    c.lineTo(x + 200, y + 200);
    c.lineTo(x, y);
    c.strokeStyle = "#fff";
    c.lineWidth = 5;
    c.stroke();
}