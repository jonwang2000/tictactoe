/*

main.js

Written by: Jonathan Wang

Deals with tic tac toe JS app

*/


// DOM variable initialization
var oneCell = document.getElementById('cell1');
var twoCell = document.getElementById('cell2');
var threeCell = document.getElementById('cell3');
var fourCell = document.getElementById('cell4');
var fiveCell = document.getElementById('cell5');
var sixCell = document.getElementById('cell6');
var sevenCell = document.getElementById('cell7');
var eightCell = document.getElementById('cell8');
var nineCell = document.getElementById('cell9');

var resetBtn = document.getElementById('resetBtn');

var cellBtns = document.getElementsByClassName('cell');

var winDiv = document.getElementById('winnerText');


// Array containing all cells
var allCells = [oneCell, twoCell, threeCell, fourCell, fiveCell, sixCell, sevenCell, eightCell, nineCell];


// Global Variables
var turn = 1;
var playableBool = true;
var counter = 0;

// For reference, these arrays are ordered c1, c2, c3, r1, r2, r3, d1, d2 where c's are columns, r's are rows, d's diagonal
var xCellCount = [0, 0, 0, 0, 0, 0, 0, 0],
    oCellCount = [0, 0, 0, 0, 0, 0, 0, 0];

// updateCell changes the state of a cell if it's empty; otherwise doesn't
var updateCell = (clickObj) => {

    //console.log(clickObj.target.id);

    if (clickObj.target.innerText == '' && playableBool == true) {

        if ((turn % 2) == 1) {
            clickObj.target.innerText = 'x';
            updateCellCount(xCellCount, clickObj.target.id);
            ++turn;
        } else {
            clickObj.target.innerText = 'o';
            updateCellCount(oCellCount, clickObj.target.id);
            ++turn;
        }

        ++counter;
    }

    if (counter == 9) {
        winDiv.innerText = "Draw!"
    }

    checkWin();

    //console.log(clickObj.target.innerText);
}


// Adding event listeners for cells
for (let i = 0; i < cellBtns.length; i++) {
    cellBtns[i].addEventListener('click', updateCell, false);
}


// resetBtn.onclick is an anonymous function that sets all cells back to empty
resetBtn.onclick = () => {
    for (i = 0; i < allCells.length; i++) {
        allCells[i].innerText = '';
    }

    turn = 1; // Restting turn counter
    playableBool = true;

    xCellCount = [0, 0, 0, 0, 0, 0, 0, 0];
    oCellCount = [0, 0, 0, 0, 0, 0, 0, 0];

    winDiv.innerText = '';

    counter = 0;
}

function updateCellCount(cellCount, cellNo) {

    console.log(cellNo);

    switch (cellNo) {
        case 'cell1':
            ++cellCount[0];
            ++cellCount[3];
            ++cellCount[6];
            break;
        case 'cell2':
            ++cellCount[1];
            ++cellCount[3];
            break;
        case 'cell3':
            ++cellCount[2];
            ++cellCount[3];
            ++cellCount[7];
            break;
        case 'cell4':
            ++cellCount[0];
            ++cellCount[4];
            break;
        case 'cell5':
            ++cellCount[1];
            ++cellCount[4];
            ++cellCount[6];
            ++cellCount[7];
            break;
        case 'cell6':
            ++cellCount[2];
            ++cellCount[4];
            break;
        case 'cell7':
            ++cellCount[7];
            ++cellCount[0];
            ++cellCount[5];
            break;
        case 'cell8':
            ++cellCount[1];
            ++cellCount[5];
            break;
        case 'cell9':
            ++cellCount[6];
            ++cellCount[2];
            ++cellCount[5];
            break;
        default:
            console.log("How on earth did you get here?");
            break;
    }
}

function checkWin() {
    if (xCellCount.includes(3)) {
        console.log("X wins!");
        playableBool = false;
        winDiv.innerText = "X wins!";
    } else if (oCellCount.includes(3)) {
        console.log("O wins!");
        playableBool = false;
        winDiv.innerText = "O wins!";
    }
}