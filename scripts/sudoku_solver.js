var grid1 = [
    [7, 3, 0, 8, 6, 1, 0, 0, 0],
    [0, 9, 0, 0, 4, 2, 3, 7, 0],
    [6, 4, 0, 0, 0, 0, 5, 1, 8],

    [9, 0, 1, 4, 0, 8, 0, 6, 0],
    [3, 0, 6, 0, 0, 5, 4, 9, 1],
    [0, 0, 7, 0, 1, 6, 8, 0, 0],

    [0, 7, 4, 1, 0, 0, 0, 0, 3],
    [0, 1, 0, 6, 8, 0, 7, 2, 4],
    [8, 0, 3, 7, 2, 0, 0, 0, 9],
]

var grid2 = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],

    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],

    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 0, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
]
let game1 = true
let grid;

let gameboard = document.getElementById('sudokuGameboard')
let boxes = document.getElementsByClassName('box')
let gridAlreadyCreated = false

let newGame = () => {
    document.getElementById('newGameButton').disabled = true
    document.getElementById('solveButton').removeAttribute('disabled')
    console.log('New Game')
    deleteGrid()
    if (game1) {
        grid = grid1
        game1 = false
    } else {
        grid = grid2
        game1 = true
    }
    if (!gridAlreadyCreated) {
        createGrid()
        gridAlreadyCreated = true
    }
    let row = 0
    let column = 0
    for (let i = 0; i < boxes.length; i++) {
        let eachBox = boxes[i]
        let sudokuBoxValue = grid[row][column]
        if (sudokuBoxValue !== 0) {
            eachBox.innerHTML = sudokuBoxValue
            eachBox.classList.add('solvedBox')
        } else {
            eachBox.innerHTML = ' '
        }
        if (column >= 8) {
            row++
            column = 0
        } else {
            column++
        }
    }
}

let createGrid = () => {
    for (let i = 0; i < 81; i++) {
        let sudokuBox = document.createElement('div')
        sudokuBox.classList.add('box')
        sudokuBox.innerHTML = ' '
        gameboard.appendChild(sudokuBox)
    }
    console.log(boxes)
}

let deleteGrid = () => {
    for (let i = 0; i < boxes.length; i++) {
        let eachBox = boxes[i]
        eachBox.innerHTML = ' '
        eachBox.classList.remove('unsolvedBox')
    }
}

let isPossible = (row, column, number) => {
    // Is the number possible in the row?
    for (let i = 0; i < 9; i++) {
        if (grid[row][i] === number) {
            return false
        }
    }

    // Is the number possible in the column?
    for (let i = 0; i < 9; i++) {
        if (grid[i][column] === number) {
            return false
        }
    }

    // Is the number possible in the square?
    let x0 = Math.floor((column / 3)) * 3
    let y0 = Math.floor((row / 3)) * 3
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[y0 + i][x0 + j] === number) {
                return false
            }
        }
    }
    return true
}

let iterations = 0
const sleep = ms => new Promise(r => setTimeout(r, ms));

let solve = async () => {
    solving = true
    for (let row = 0; row < 9; row++) {
        for (let column = 0; column < 9; column++) {
            if (grid[row][column] === 0) {
                for (let number = 1; number < 10; number++) {
                    if (isPossible(row, column, number)) {
                        grid[row][column] = number;
                        iterations++
                        solve();
                        grid[row][column] = 0;
                    }
                }
                return
            }
        }
    }
    const solvedGrid = JSON.parse(JSON.stringify([...grid]))
    console.log(JSON.parse(JSON.stringify(solvedGrid)))
    let row = 0
    let column = 0
    for (let i = 0; i < boxes.length; i++) {
        let eachBox = boxes[i]
        if (eachBox.innerHTML === ' ') {
            eachBox.classList.add('unsolvedBox')
            console.log('solving...')
        }
        let sudokuBoxValue = solvedGrid[row][column]
        eachBox.innerHTML = sudokuBoxValue
        if (column >= 8) {
            row++
            column = 0
        } else {
            column++
        }
        await sleep(100)
    }
    document.getElementById('newGameButton').removeAttribute('disabled')
}


let printSolution = async () => {
    await solve()
    document.getElementById('solveButton').disabled = true
}
