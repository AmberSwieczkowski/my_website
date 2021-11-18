class Obstacle {
    constructor(x, y, width, height, speed, type) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.type = type;
    }
    draw(){
        ctx3.fillStyle = "red";
        ctx3.fillRect(this.x, this.y, this.width, this.height);
    }
    update(){
        // moves obstacles horizontally
        this.x += this.speed * gameSpeed;
        // resets obstacles behind edge after moving off screen
        if (this.speed > 0) {
            if(this.x > canvas.width + this.width) {
                this.x = 0 - this.width;
            }
        } else {
            if(this.x < 0 - this.width) {
                this.x = canvas.width + this.width;
            }
        }
    }
}
function initObstacles() {
    // car lane 1 - road bottom
    for (let i = 0; i < 2; i++) {
        let x = i * 350;
        carsArray.push(new Obstacle(x, canvas.height - grid * 2 - 20, grid * 2, grid, 1, 'car'));
    }
    // car lane 2 - road middle
    for (let i = 0; i < 2; i++) {
        let x = i * 300;
        carsArray.push(new Obstacle(x, canvas.height - grid * 3 - 20, grid * 2, grid, -2, 'car'));
    }
    // bus lane 3 - road top
    for (let i = 0; i < 2; i++) {
        let x = i * 400;
        carsArray.push(new Obstacle(x, canvas.height - grid * 4 - 20, grid * 3, grid, 2, 'car'));
    }
    // log lane 4 - river bottom
    for (let i = 0; i < 2; i++) {
        let x = i * 400;
        logsArray.push(new Obstacle(x, canvas.height - grid * 5 - 20, grid * 2, grid, -2, 'log'));
    }
    // log lane 5 - river middle
    for (let i = 0; i < 2; i++) {
        let x = i * 200;
        logsArray.push(new Obstacle(x, canvas.height - grid * 6 - 20, grid, grid, 1, 'turtle'));
    }
}
initObstacles();

function handleObstacles() {
    for (let i = 0; i < carsArray.length; i++) {
        carsArray[i].update();
        carsArray[i].draw();
    }
    for (let i = 0; i < logsArray.length; i++) {
        logsArray[i].update();
        logsArray[i].draw();
    }
}