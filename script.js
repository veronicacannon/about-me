const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let board = Array(9).fill(null);
let turn = 0;
let mark = 'X';

const squares = document.querySelectorAll('.square');

function checkForDraw(turn) {
  if (turn === 9) {
    squares.forEach(square => square.style.background = '#BDBDBE');
    squares.forEach(square => square.disabled = true);
  }
}

function checkForWin() {
  for (let row of winningCombinations) {
    const [first_cell, second_cell, third_cell] = row;
    if (board[first_cell] && board[first_cell] === board[second_cell] && board[first_cell] === board[third_cell]) {
      squares.forEach(square => square.disabled = true);
      row.forEach(i => {
        squares[i].style.background = '#7E5FA8';
        squares[i].style.color = 'white';
      });
    }
  }
}

function processMark(button, idx){
  button.disabled = true;

  turn % 2 === 0 ? mark = "X" : mark = "O";
  button.textContent = mark;
  board[idx] = mark;
  turn++;
}

squares.forEach((button, idx) => {
  button.addEventListener('click', () => {
    processMark(button, idx);
    checkForWin();
    checkForDraw();
  });
});
