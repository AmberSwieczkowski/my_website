const square = document.querySelectorAll('.cookie__square');
const cookie = document.querySelectorAll('.cookie__image');
const timeLeft = document.querySelector('#time__left');
let score = document.querySelector('#cookie__collection__score');

let result = 0;
let currentTime = timeLeft.textContent;
const numberOfSquares = 16;

function randomSquare() {
    square.forEach(className => {
        className.classList.remove('cookie__image');
    })
    let randomPosition = square[Math.floor(Math.random() * numberOfSquares)];
    randomPosition.classList.add('cookie__image');

    // assign the id of the randomPosition to hitPosition for us to use later
    hitPosition = randomPosition.id
}

square.forEach(id => {
    id.addEventListener('mousedown', () => {
        if(id.id === hitPosition) {
            result = result +1;
            score.textContent = result;
        }
    })
})

function moveCookie() {
    let timerId = null;
    timerId = setInterval(randomSquare, 500);
}

moveCookie();

function countDown() {
    currentTime--;
    timeLeft.textContent = currentTime;

    if(currentTime === 0) {
        clearInterval(timerId);
        alert(`Game Over. You collected ${result} cookies!`)
    }
}

let timerId = setInterval(countDown, 1000);