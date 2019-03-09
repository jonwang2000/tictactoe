/*

main.js

Written by: Jonathan Wang

Deals with tic tac toe JS app

NOTES
- reset is currently a hard reset
- poor data structure design atm, redesign later

*/


// DOM variable initialization
// ============================================================================================
var oneCell = document.getElementById('cell1');
var twoCell = document.getElementById('cell2');
var threeCell = document.getElementById('cell3');
var fourCell = document.getElementById('cell4');
var fiveCell = document.getElementById('cell5');
var sixCell = document.getElementById('cell6');
var sevenCell = document.getElementById('cell7');
var eightCell = document.getElementById('cell8');
var nineCell = document.getElementById('cell9');

var cellBtns = document.getElementsByClassName('cell');

// Buttons:
var resetBtn = document.getElementById('resetBtn');
var cpuBtn = document.getElementById('cpuStartBtn');
var playerBtn = document.getElementById('playerStartBtn');


// Winner Text
var winDiv = document.getElementById('winnerText');


// Array containing all cells
var allCells = [oneCell, twoCell, threeCell, fourCell, fiveCell, sixCell, sevenCell, eightCell, nineCell];


// Global Variables
// ============================================================================================
var turn = 1;
var playableBool = true;
var counter = 0;
var clickableBool = false;

var boardArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];

var playerVar = 'x';
var cpuVar = 'o';

// Functions
// ============================================================================================

// Some changes to previous code: updateCell now takes in a cell (as in cell1) and mutates it
// Will return true or false based on if an update went through
function updateCell(cell) {

    if (cell.innerText == '' && playableBool == true) {

        if ((turn % 2) == 1) {
            cell.innerText = 'x';
            updateCellCount(boardArray, cell.id, 'x');
            ++turn;
        } else {
            cell.innerText = 'o';
            updateCellCount(boardArray, cell.id, 'o');
            ++turn;
        }

        ++counter;

        if (counter == 9) {
            playableBool == false;
            winDiv.innerText = "Draw!"
        }

        checkWin();

        return true;
    } else {
        return false;
    }

}

// Used to get random integer, helper for random CPU placeholder
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Picks a random integer from 0-8 based on if that cell is empty or not
function getValidCell() {
    var valid = false;
    var output = 0;

    while (valid == false) {
        output = getRandomInt(0, 8);

        if (boardArray[output] != 'x' && boardArray[output] != 'o') {
            break;
        }
    }

    return output;
}

// CPU makes a move, .5 second delay
function cpuTurn() {
    clickableBool = false;

    setTimeout(function () {
        updateCell(allCells[minimax(boardArray, cpuVar).index]);
        clickableBool = true;
    }, 500);

}

// Minimax algorithm for CPU to never lose
function minimax(newBoard, player) {

    var availSpots = emptyCells(boardArray);

    if (winCondition(newBoard, playerVar)) {
        return {
            score: -10
        };
    } else if (winCondition(newBoard, cpuVar)) {
        return {
            score: 10
        };
    } else if (availSpots.length === 0) {
        return {
            score: 0
        };
    }
    var moves = [];
    for (var i = 0; i < availSpots.length; i++) {
        var move = {};
        move.index = newBoard[availSpots[i]];
        newBoard[availSpots[i]] = player;

        if (player == cpuVar) {
            var result = minimax(newBoard, playerVar);
            move.score = result.score;
        } else {
            var result = minimax(newBoard, cpuVar);
            move.score = result.score;
        }

        newBoard[availSpots[i]] = move.index;

        moves.push(move);
    }

    var bestMove;
    if (player === cpuVar) {
        var bestScore = -10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        var bestScore = 10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    return moves[bestMove];
}


// Called by event listener for click, has CPU do move afterwards
// CPU will not do move if counter is 9, preventing infinite while loop
var clickCell = (clickObj) => {

    var x = false;

    if (clickableBool == true) {
        x = updateCell(clickObj.target);
    }

    if (x == true && counter < 9) {
        cpuTurn();
    }

}


// Adding event listeners for cells
for (let i = 0; i < cellBtns.length; i++) {
    cellBtns[i].addEventListener('click', clickCell, false);
}


// resetBtn.onclick is an anonymous function that sets all cells back to empty
resetBtn.onclick = () => {
    for (i = 0; i < allCells.length; i++) {
        allCells[i].innerText = '';
    }

    // Resets all globals
    turn = 1;
    playableBool = false;
    clickableBool = false;

    boardArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    winDiv.innerText = '';

    counter = 0;
}

cpuBtn.onclick = () => {
    cpuVar = 'x';
    playerVar = 'o';
    cpuTurn();
    playableBool = true;
}

playerBtn.onclick = () => {
    cpuVar = 'o';
    playerVar = 'x';
    clickableBool = true;
    playableBool = true;
}

// updateCellCount(cellCount, cellNo) updates cellCount array, adding to c1 ... d2
// This is so that when one of those values is 3, the game is won
function updateCellCount(cellCount, cellNo, player) {

    //console.log(cellNo);

    switch (cellNo) {
        case 'cell1':
            cellCount[0] = player;
            break;
        case 'cell2':
            cellCount[1] = player;
            break;
        case 'cell3':
            cellCount[2] = player;
            break;
        case 'cell4':
            cellCount[3] = player;
            break;
        case 'cell5':
            cellCount[4] = player;
            break;
        case 'cell6':
            cellCount[5] = player;
            break;
        case 'cell7':
            cellCount[6] = player;
            break;
        case 'cell8':
            cellCount[7] = player;
            break;
        case 'cell9':
            cellCount[8] = player;
            break;
        default:
            console.log("How on earth did you get here?");
            break;
    }
}

// checkWin() does what it says
function checkWin() {
    if (winCondition(boardArray, 'x')) {
        //console.log("X wins!");
        playableBool = false;
        winDiv.innerText = "X wins!";
    } else if (winCondition(boardArray, 'o')) {
        //console.log("O wins!");
        playableBool = false;
        winDiv.innerText = "O wins!";
    }
}

function emptyCells(arr) {
    return arr.filter(x => x != 'x' && x != 'o');
}

function winCondition(arr, player) {
    if ((arr[0] == player && arr[1] == player && arr[2] == player) ||
        (arr[3] == player && arr[4] == player && arr[5] == player) ||
        (arr[6] == player && arr[7] == player && arr[8] == player) ||
        (arr[0] == player && arr[3] == player && arr[6] == player) ||
        (arr[1] == player && arr[4] == player && arr[7] == player) ||
        (arr[2] == player && arr[5] == player && arr[8] == player) ||
        (arr[0] == player && arr[4] == player && arr[8] == player) ||
        (arr[2] == player && arr[4] == player && arr[6] == player)) {
        return true;
    } else {
        return false;
    }
}


/* Notes:

- Basic game functionality works, but very unsatisfied with code, clean up later
- I have no idea how I'm gonna implement the CPU even playing lmao

*/