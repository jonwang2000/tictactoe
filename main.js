/*

main.js

Written by: Jonathan Wang

Deals with tic tac toe JS app

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

// For reference, these arrays are ordered c1, c2, c3, r1, r2, r3, d1, d2 where c's are columns, r's are rows, d's diagonal
var xCellCount = Array(8).fill(0);
    oCellCount = Array(8).fill(0);

var activeCells = Array(9).fill(false);



// Functions
// ============================================================================================

// updateCell changes the state of a cell if it's empty; otherwise doesn't
var updateCell = (clickObj) => {

    //console.log(clickObj.target.id);

    if (clickObj.target.innerText == '' && playableBool == true) {

        console.log(clickObj.target.id)

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

    // Resets all globals
    turn = 1;
    playableBool = true;

    xCellCount = Array(8).fill(0);
    oCellCount = Array(8).fill(0);

    activeCells = Array(9).fill(false);

    winDiv.innerText = '';

    counter = 0;
}



// updateCellCount(cellCount, cellNo) updates cellCount array, adding to c1 ... d2
// This is so that when one of those values is 3, the game is won
function updateCellCount(cellCount, cellNo) {

    //console.log(cellNo);

    switch (cellNo) {
        case 'cell1':
            ++cellCount[0];
            ++cellCount[3];
            ++cellCount[6];
            activeCells[0] = true;
            break;
        case 'cell2':
            ++cellCount[1];
            ++cellCount[3];
            activeCells[1] = true;
            break;
        case 'cell3':
            ++cellCount[2];
            ++cellCount[3];
            ++cellCount[7];
            activeCells[2] = true;
            break;
        case 'cell4':
            ++cellCount[0];
            ++cellCount[4];
            activeCells[3] = true;
            break;
        case 'cell5':
            ++cellCount[1];
            ++cellCount[4];
            ++cellCount[6];
            ++cellCount[7];
            activeCells[4] = true;
            break;
        case 'cell6':
            ++cellCount[2];
            ++cellCount[4];
            activeCells[5] = true;
            break;
        case 'cell7':
            ++cellCount[7];
            ++cellCount[0];
            ++cellCount[5];
            activeCells[6] = true;
            break;
        case 'cell8':
            ++cellCount[1];
            ++cellCount[5];
            activeCells[7] = true;
            break;
        case 'cell9':
            ++cellCount[6];
            ++cellCount[2];
            ++cellCount[5];
            activeCells[8] = true;
            break;
        default:
            console.log("How on earth did you get here?");
            break;
    }
}

// checkWin() does what it says
function checkWin() {
    if (xCellCount.includes(3)) {
        //console.log("X wins!");
        playableBool = false;
        winDiv.innerText = "X wins!";
    } else if (oCellCount.includes(3)) {
        //console.log("O wins!");
        playableBool = false;
        winDiv.innerText = "O wins!";
    }
}

// Function for testing purposes in console
function checkArrs() {
    console.log(xCellCount);
    console.log(oCellCount);
    console.log(activeCells);
}

/* Notes:

- Basic game functionality works, but very unsatisfied with code, clean up later
- I have no idea how I'm gonna implement the CPU even playing lmao

*/