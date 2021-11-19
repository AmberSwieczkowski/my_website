function animateFrogger(){
    ctx1.clearRect(0, 0, canvas.width, canvas.height);
    ctx2.clearRect(0, 0, canvas.width, canvas.height);
    ctx3.clearRect(0, 0, canvas.width, canvas.height);
    ctx4.clearRect(0, 0, canvas.width, canvas.height);
    ctx5.clearRect(0, 0, canvas.width, canvas.height);


    handleRipples();
    ctx2.drawImage(background_lvl2, 0, 0, canvas.width, canvas.height);
    handleParticles();
    frogger.draw();
    frogger.update();

    handleObstacles();
    handleScoreBoard();
    ctx4.drawImage(grass, 0, 0, canvas.width, canvas.height);
    frame++;
    requestAnimationFrame(animateFrogger);
}
animateFrogger();

// Event Listeners
window.addEventListener('keydown', function(e) {
    keys = [];
    keys[e.key] = true;
    /* keyCode uses 37=left | 38=up | 39=right | 40=down | 32=space */
    if (keys["ArrowLeft"] || keys["ArrowUp"] || keys["ArrowRight"] || keys["ArrowDown"] || keys[" "]){
        frogger.jump();
        console.log(e);
    }
});

window.addEventListener('keyup', function(e) {
    delete keys[e.key];
    frogger.moving = false;
    frogger.frameX = 0;
});

/* Resets frog to beginning after moving past top of canvas */
function scored() {
    score++;
    gameSpeed += 0.2;
    frogger.x = canvas.width/2 - frogger.width/2;
    frogger.y = canvas.height - frogger.height - 40;
}

function handleScoreBoard() {
    ctx4.fillStyle = 'black';
    ctx4.strokeStyle = 'black';
    ctx4.font = '15px Verdana';
    ctx4.strokeText('Score', 265, 15);
    ctx4.font = '60px Verdana';
    ctx4.fillText(score, 270, 65);
    ctx4.font = '15px Verdana';
    ctx4.fillText('Collisions: ' + collisionsCount, 10, 175);
    ctx4.fillText('Game Speed: ' + gameSpeed.toFixed(1), 10, 195);
}

// Collision detection between two rectangles
function collision(first, second) {
    return !( first.x > second.x + second.width || first.x + first.width < second.x || first.y > second.y + second.height || first.y + first.height < second.y);
}

function resetGame() {
    frogger.x = canvas.width/2 - frogger.width/2;
    frogger.y = canvas.height - frogger.height - 40;
    score = 0;
    collisionsCount++;
    gameSpeed = 1;
}