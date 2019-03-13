const player1 = '<i class="fas fa-times"></i>';
const player2 = '<i class="fas fa-circle"></i>';
const gameWrapper = document.getElementById("game-wrapper");
const gameEnd = document.getElementById("game-end");
const playerWinnerSpan = document.getElementById("player-winner");
const pools = document.querySelectorAll(".pool");
let turn = 0;
let winner = null;
let playerWinner = null;

const combinations = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

let score = [
  ["","",""],
  ["","",""],
  ["","",""]
];

pools.forEach((pool) => {
  pool.addEventListener("click", chosed);
});

function chosed(e) {
  if(e.currentTarget.innerHTML !== "") return;
  let row = e.currentTarget.dataset.row;
  let column = e.currentTarget.dataset.column;
  score[row][column] = turn % 2 === 0 ? player1 : player2;
  e.target.innerHTML = turn % 2 === 0 ? player1 : player2;
  let checkScoreReturn = checkScore();
  if(checkScoreReturn == player1 || checkScoreReturn == player2 || turn == 8) {
    gameWrapper.style.display = "none";
    gameEnd.style.display = "block";
    if(checkScoreReturn == player1) {
      playerWinner = "Wygrał Gracz 1";
    } else if(checkScoreReturn == player2) {
      playerWinner = "Wygrał Gracz 2";
    } else {
      playerWinner = "Nikt nie wygrał, Remis!";
    }
    playerWinnerSpan.innerHTML = playerWinner;
  };
  turn++;
}

function checkScore() {
  const result = score.reduce((total, row) => total.concat(row));
  let moves = {
    '<i class="fas fa-times"></i>': [],
    '<i class="fas fa-circle"></i>': []
  };
  result.forEach((field, index) => moves[field] ? moves[field].push(index) : null);
  combinations.forEach(combination => {
    if(combination.every(index => moves[player1].indexOf(index) > -1)) {
      winner = player1;
    }
    if(combination.every(index => moves[player2].indexOf(index) > -1)) {
      winner = player2;
    }
  });
  return winner;
}
