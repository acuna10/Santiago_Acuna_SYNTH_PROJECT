//Santiago Acuna JR. CONNECT 4//

let playerRed = "Red";
let playerYellow = "Yellow";
let currPlayer = playerRed;
let gameOver = false;
let board;
let rows = 6;
let columns = 7;
let currentColumns = [];


window.onload = function() {
    setGame();
}

function setGame() {
    board = [];
    currentColumns = [5, 5, 5, 5, 5, 5, 5];

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            row.push(' ');
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}

function setPiece() {
    if (gameOver) {
        return;
    }

    let location = this.id.split("-");
    let r = parseInt(location[0]);
    let c = parseInt(location[1]);
    r = currentColumns[c]; 

    if (r < 0) {
        return;
    }

    board[r][c] = currPlayer; 
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (currPlayer == playerRed) {
        tile.classList.add("red-piece");
        currPlayer = playerYellow;
    }
    else {
        tile.classList.add("yellow-piece");
        currPlayer = playerRed;
    }

    r -= 1; 
    currentColumns[c] = r; 
    checkWinner();
}

function checkWinner() {

// CHECK VERTICALLY
for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows - 3; r++) {
        if (board[r][c] != ' ') {
            if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                gameWinner(r, c);
                return;
            }
        }
    }
}
     //CHECK HORIZONTALLY
     for (let r = 0; r < rows; r++) {
         for (let c = 0; c < columns - 3; c++){
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
                    gameWinner(r, c);
                    return;
                }
            }
         }
    }
    // CHECK DIAGONAL #1
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                    gameWinner(r, c);
                    return;
                }
            }
        }
    }

    // CHECK DIAGONAL #2
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                    gameWinner(r, c);
                    return;
                }
            }
        }
    }
}



function gameWinner(r, c) {
    let winner = document.getElementById("winner");
    if (board[r][c] == playerRed) {
        winner.innerText = "Red Wins";             
    } else {
        winner.innerText = "Yellow Wins";
    }
    gameOver = true;
}

