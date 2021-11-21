class Obstacle {
    constructor(x, y, width, height, speed, type) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.type = type;
        this.frameX = 0;
        this.frameY = 0;
        this.randomize = Math.floor(Math.random() * 30 + 30);
        this.carType = Math.floor(Math.random() * numberOfCars);
    }
    draw(){
        if (this.type === 'turtle') {
            if (frame % this.randomize === 0) {
                if (this.frameX >= 1) {
                    this.frameX = 0
                } else {
                    this.frameX++;
                }
            }
                ctx1.drawImage(turtle, this.frameX * 70, this.frameY * 70, 70, 70, this.x, this.y, this.width, this.height);
            } else if (this.type === 'log') {
                ctx1.drawImage(log, this.x, this.y, this.width, this.height);
            } else {
                ctx2.drawImage(car, this.frameX * this.width, this.carType * this.height, grid * 2, grid, this.x, this.y, this.width, this.height);
            }
            
        // ctx3.fillStyle = "red";
        // ctx3.fillRect(this.x, this.y, this.width, this.height);
    }
    update(){
        // moves obstacles horizontally
        this.x += this.speed + gameSpeed;
        // resets obstacles behind edge after moving off screen
        if (this.speed > 0) {
            if(this.x > canvas.width + this.width) {
                this.x = 0 - this.width;
                this.carType = Math.floor(Math.random() * numberOfCars);
            }
        } else {
            if(this.x < 0 - this.width) {
                this.frameX = 1;
                this.x = canvas.width + this.width;
                this.carType = Math.floor(Math.random() * numberOfCars);
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
    // car lane 3 - road top
    for (let i = 0; i < 2; i++) {
        let x = i * 400;
        carsArray.push(new Obstacle(x, canvas.height - grid * 4 - 20, grid * 2, grid, 2, 'car'));
    }
    // log lane 4 - river bottom
    for (let i = 0; i < 2; i++) {
        let x = i * 400;
        logsArray.push(new Obstacle(x, canvas.height - grid * 5 - 20, grid * 2, grid, -2, 'log'));
    }
    // log lane 5 - river top
    for (let i = 0; i < 3; i++) {
        let x = i * 250;
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
    // Collision with car
    for (let i = 0; i < carsArray.length; i++) {
        if (collision(frogger, carsArray[i])) {
            ctx4.drawImage(collisions, 0, 100, 100, 100, frogger.x, frogger.y, 50, 50);
            resetGame();
        }
    }
    // Collision with logs/turtles
    if (frogger.y < 250 && frogger.y > 100) {
        safe = false;

        for (let i = 0; i < logsArray.length; i++) {
            if (collision(frogger, logsArray[i])) {
                frogger.x += logsArray[i].speed;
                safe = true;
            }
        }
        if (!safe) {
            for (let i=0; i < 30; i++){
                ripplesArray.unshift(new Particle(frogger.x, frogger.y));
            }
            resetGame();
        }
    }
}