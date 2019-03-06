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

var turn = 1;

var updateDisplay = (clickObj) => {

    if ((turn % 2) == 1) {
        clickObj.target.innerText = 'x';
        ++turn;
    } else {
        clickObj.target.innerText = 'o';
        ++turn;
    }

    console.log(clickObj.target.innerText);
}

for (let i = 0; i < cellBtns.length; i++) {
    cellBtns[i].addEventListener('click', updateDisplay, false);
}