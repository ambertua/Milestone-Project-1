// Elements from HTML
let playerText = document.getElementById('playerText');
let restartBtn = document.getElementById('restartBtn');
let boxes = Array.from(document.getElementsByClassName('box'));

// Winning boxes from CSS
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');

// Player X and player O score elements
// const playerXScore = document.querySelector('.player-x .score');
// const playerOScore = document.querySelector('.player-o .score');

// Game variables
let gameActive = true;
let movesPlayed = 0;
// let xScore = 0;
// let oScore = 0;

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null); // Array to keep track of X's and O's in each space

// Start Game
const startGame = () => {
  boxes.forEach((box) => {
    box.addEventListener('click', boxClicked);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  startGame();
});

// Boxes clicked
function boxClicked(e) {
  const id = e.target.id;

  if (!spaces[id]) { // IF space empty...
    spaces[id] = currentPlayer; 
    e.target.innerText = currentPlayer;

    if (playerHasWon() !== false) {
      playerText.innerHTML = `${currentPlayer} wins!`; // Update to show winner
      let winning_blocks = playerHasWon();
      winning_blocks.map((box) => (boxes[box].style.backgroundColor = winnerIndicator));
      return;
    }

    currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT; // Switch players
    // checkGameStatus();
  }
}

//  Combinations
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Who wins
function playerHasWon() {
  for (const condition of winningCombos) {
    let [a, b, c] = condition;

    if (spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]) {
      return [a, b, c];
    }
  }
  return false; 
}

// Game status
// function checkGameStatus() {
//   // Check for win combos
//   winningCombos.forEach((combo) => {
//     if (
//       spaces[combo[0]] &&
//       spaces[combo[0]] === spaces[combo[1]] &&
//       spaces[combo[1]] === spaces[combo[2]]
//     ) {
//       // Mark game as inactive
//       gameActive = false;

//       // Highlight winning combo
//       boxes[combo[0]].classList.add('active');
//       boxes[combo[1]].classList.add('active');
//       boxes[combo[2]].classList.add('active');

//       // Update message and player score
//       playerText.innerText = `Player ${currentPlayer} wins!`;
//       updateScore();

//       return;
//     }
//   });

// // Score update
// function updateScore() {
//   // Update score for current player
//   if (currentPlayer === 'X') {
//     xScore++;
//     playerXScore.innerText = xScore;
//   } else {
//     oScore++;
//     playerOScore.innerText = oScore;
//   }
// }

restartBtn.addEventListener('click', restart);

function restart() {
  // Reset game variables
  gameActive = true;
  movesPlayed = 0;
  currentPlayer = X_TEXT;
  spaces = Array(9).fill(null);

  // Clear board
  boxes.forEach((box) => {
    box.innerText = "";
    box.style.backgroundColor = "";
    box.classList.remove('active');
  });

  // Update player text
  playerText.innerText = "Tic Tac Toe";

  // // Reset score
  // xScore = 0;
  // oScore = 0;
  // playerXScore.innerText = xScore;
  // playerOScore.innerText = oScore;

  // Start game
  startGame();
}

