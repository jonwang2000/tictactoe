var oneCell = document.getElementById('cell1');
var twoCell = document.getElementById('cell2');
var threeCell = document.getElementById('cell3');
var fourCell = document.getElementById('cell4');
var fiveCell = document.getElementById('cell5');
var sixCell = document.getElementById('cell6');
var sevenCell = document.getElementById('cell7');
var eightCell = document.getElementById('cell8');
var nineCell = document.getElementById('cell9');

var allCells = [oneCell, twoCell, threeCell, fourCell, fiveCell, sixCell, sevenCell, eightCell, nineCell];

var resetBtn = document.getElementById('resetBtn');

var cellBtns = document.getElementsByClassName('cell');

var turn = 1;

// updateCell changes the state of a cell if it's empty; otherwise doesn't
var updateCell = (clickObj) => {

    if (clickObj.target.innerText == '') {

        if ((turn % 2) == 1) {
            clickObj.target.innerText = 'x';
            ++turn;
        } else {
            clickObj.target.innerText = 'o';
            ++turn;
        }
    }

    console.log(clickObj.target.innerText);
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
}