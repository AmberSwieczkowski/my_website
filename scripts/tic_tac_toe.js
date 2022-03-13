const xClass = 'x'
const oClass = 'o'
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('ticTacToeBoard')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('ticTacToeRestartButton')
const winningMessageTextElement = document.querySelector('[ data-winning-message-text]')
let oTurn;

cellElements.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
})

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
    oTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(xClass);
        cell.classList.remove(oClass);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHoverClass()
    // Reset board for reset button
    winningMessageElement.classList.remove('show')
}

function handleClick(e) {
    const cell = e.target
    const currentClass = oTurn ? oClass : xClass
    // Place Tic
    placeTic(cell, currentClass)
    // Check for Win or Draw
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!'
    } else {
        winningMessageTextElement.innerText = `${oTurn ? "O's" : "X's"} Win!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(xClass) ||
            cell.classList.contains(oClass)
    })
}

function placeTic(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    oTurn = !oTurn
}

function setBoardHoverClass() {
    board.classList.remove(xClass)
    board.classList.remove(oClass)
    if (oTurn) {
        board.classList.add(oClass)
    } else {
        board.classList.add(xClass)
    }
}

// Returns true if the current class is the same for all three of the indices found in any of the winningCombinations arrays.
function checkWin(currentClass) {
    // Returns true if any of the values inside winningCombinations is true
    return winningCombinations.some(combinations => {
        // Returns true if all of the indices in the combination have the same class
        return combinations.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}
