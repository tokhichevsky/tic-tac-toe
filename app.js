const $game = document.querySelector(".game");
const $board = document.querySelector(".board");

let virtualBoard = Array(9).fill(-1);
const marks = ['X', 'O'];
const playerOrder = Math.round(Math.random());
const winningPositions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6], [0, 3, 6], [1, 4, 7], [2, 5, 8]];

let $cells = []
for (let i = 0; i < 9; i++) {
    const $cell = document.createElement("div");
    $cells.push($cell);
    $cell.classList.add("cell");
    $board.appendChild($cell);
    $cell.addEventListener("click", () => {
        if ($cells[i].innerText === '') {
            putMark(i, playerOrder);
        }
    })
    
}

if (1 - playerOrder === 0) putMark(Math.round(Math.random() * 8), 1 - playerOrder);

function putMark(pos, player) {
    $cells[pos].innerText = marks[player];
    virtualBoard[pos] = player;
} 

function isWin(board, player) {
    for (let winPosIdx = 0; winPosIdx < winningPositions.length; winPosIdx++) {
        let result = false;
        for (let i = 0; i < 3; i++) {
            result &= (board[winningPositions[winPosIdx][i]] === player);
        }
        if (result === true) return true;
    }
    return false;
}

function strategy(board, player) {
    if (isWin(board, playerOrder)) {
        return { score: 100 };
    }
}