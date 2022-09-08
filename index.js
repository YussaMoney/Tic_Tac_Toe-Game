const cells = document.querySelectorAll('.cell');
const turnText = document.querySelector('.turn-text');
const winningBox = document.querySelector('.winning-box');
const winningText = document.querySelector('.winning-text');
const restartBtn = document.querySelector('#restart')
let gameStat = ['', '', '', '', '', '', '', '', '',];
let currentPlayer = 'X';
let gameRunning;

// winningCombo
let winningCombo = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

startGame() ;

function startGame() {
  cells.forEach((cell) => {
    cell.addEventListener('click', cellClicked)
  })
  gameRunning = true;
  turnText.textContent = `It's ${currentPlayer}'s turn`
}

// cellClicked
function cellClicked(e) {
  const cellIndex = e.target.getAttribute('index')

  if (gameStat[cellIndex] !== '') {
    return;
  }

  updateCell(e.target, cellIndex);
  switchPlayer();
  checkWinning();
}

function updateCell(cell, index) {
  gameStat[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.style.cursor = 'not-allowed';
  switchPlayer();
};

// switchPlayer
function switchPlayer() {
  currentPlayer = currentPlayer == 'X' ? 'O' : 'X';
  turnText.textContent = `It's ${currentPlayer}'s turn`
};

// checkWinning
function checkWinning() {
  let winner;

  for (let i = 0; i < winningCombo.length; i++) {
    const condition = winningCombo[i];
    let cellA = gameStat[condition[0]];
    let cellB = gameStat[condition[1]];
    let cellC = gameStat[condition[2]];

    if (cellA == '' || cellB == '' || cellC == '') {
      continue;
    }
    if (cellA == cellB && cellB == cellC) {
      winner = true;
      break;
    }
  }
  
  if (winner) {
    winningText.textContent = `${currentPlayer} Won!`
    winningBox.classList.add('appear');
    turnText.style.display = 'none';
    gameRunning = false;
    return;

  } else if (!gameStat.includes('')) {
    winningText.textContent = `Draw!`
    winningBox.classList.add('appear');
    gameRunning = false;
  } else {
    switchPlayer()
  }
}

// restartGame
function restartGame() {
  currentPlayer = 'X';
  gameStat = ['', '', '', '', '', '', '', '', '',];
  cells.forEach((cell) => {
    cell.textContent = '';
    cell.style.cursor = 'pointer';
  });
  gameRunning = true;
  winningBox.classList.remove('appear');
  turnText.style.display = 'block';
}

restartBtn.addEventListener('click', restartGame);
