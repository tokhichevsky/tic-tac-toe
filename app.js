const $game = document.querySelector(".game");
const $board = document.querySelector(".board");
const $status = document.querySelector(".status");

const virtualBoard = Array(9).fill(-1);
const marks = ['X', 'O'];
const playerOrder = Math.round(Math.random());
const winningPositions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6], [0, 3, 6], [1, 4, 7], [2, 5, 8]];

const $cells = []

let isGameEnd = false;

for (let i = 0; i < 9; i++) {
    const $cell = document.createElement("div");
    $cells.push($cell);
    $cell.classList.add("cell");
    $board.appendChild($cell);
    $cell.addEventListener("click", () => {
        if ($cell.innerText === '' && !isGameEnd) {
            putMark(i, playerOrder);
            checkWinner($status);
            moveAI();
            checkWinner($status);
        }
    })
}

if (1 - playerOrder === 0) putMark(Math.round(Math.random() * 8), 1 - playerOrder);

function putMark(pos, player) {
    $cells[pos].innerText = marks[player];
    virtualBoard[pos] = player;
}

function moveAI() {
    if (!isGameEnd) putMark(strategy(virtualBoard, 1 - playerOrder).index, 1 - playerOrder);
}

function checkWinner(label) {
    if (isWin(virtualBoard, playerOrder)) {
        isGameEnd = true;
        label.innerText = "Player won!";
    } else if (isWin(virtualBoard, 1 - playerOrder)) {
        isGameEnd = true;
        label.innerText = "Player lost!";
    } else if (virtualBoard.filter(x => x === -1).length === 0) {
        label.innerText = "Friendship won!";
    }
}

function isWin(board, player) {
    for (let winPosIdx = 0; winPosIdx < winningPositions.length; winPosIdx++) {
        let result = true;

        for (let i = 0; i < 3; i++) {
            result = result && (board[winningPositions[winPosIdx][i]] === player);
        }
        if (result === true) return true;
    }
    return false;
}



function strategy(board, player) {
    const moves = []
    const availPos = board.reduce((prev, cur, idx) => {
        if (cur === -1) {
            prev.push(idx);
        }
        return prev;
    }, []);

    if (isWin(board, 1 - playerOrder)) {
        return { score: 100 };
    } else if (isWin(board, playerOrder)) {
        return { score: -100 };
    } else if (availPos.length === 0) {
        return { score: 0 };
    }
    for (let i = 0; i < availPos.length; i++) {
        const move = { index: availPos[i] }
        board[availPos[i]] = player;
        move.score = strategy(board, 1 - player).score;
        board[availPos[i]] = -1;
        moves.push(move);
    }

    let bestMove = { index: moves[0].index, score: moves[0].score };
    const isAIPlayer = (player === 1 - playerOrder);

    for (let i = 0; i < moves.length; i++) {
        if (isAIPlayer && (moves[i].score > bestMove.score) || !isAIPlayer && (moves[i].score < bestMove.score)) {
            bestMove = moves[i];
        }
    }
    return bestMove;
}