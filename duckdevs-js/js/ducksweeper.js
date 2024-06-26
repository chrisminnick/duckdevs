const board = [[]];
const visited = [[]];
let duckPositions;
let placesCleared;
let markingDecoys; // bool to signify is currently marking decoys
let isFilled; // if the board is filled up yet
let countUpInterval; // timer

const gameTable = document.getElementById("ducksweeperGameBoard");
const gameInfo = document.getElementById("gameInfo");
const startButton = document.getElementById("newGameButton");
startButton.addEventListener("click", newGame);
const markDecoyButton = document.getElementById("markDuckButton");
const duckAudio = document.getElementById("audioPlayer");
const timerSpan = document.getElementById("timerBlock");

markDecoyButton.addEventListener("click", (event) => {
  if (markingDecoys == false) {
    markingDecoys = true;
    markDecoyButton.style.backgroundColor = "darkgray";
    markDecoyButton.style.color = "lightgray";
  } else {
    markingDecoys = false;
    markDecoyButton.removeAttribute("style");
  }
});

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function fillEmptyMap(array, width, height) {
  for (var x = 0; x < width; x++) {
    array[x] = [];
    for (var y = 0; y < height; y++) {
      array[x][y] = 0;
    }
  }
}

function displayBoard() {
  for (let i = 0; i < 10; i++) {
    // let row = gameTable.insertRow(i);
    for (let j = 0; j < 10; j++) {
      // visited[i][j];
      let tempCell = document.getElementById(`${i},${j}`);
      if (board[i][j] === -1) {
        tempCell.innerHTML = "🦆";
      } else if (board[i][j] === 0) {
        tempCell.innerHTML = " ";
      } else {
        tempCell.innerHTML = board[i][j];
        if (visited[i][j] === 0) {
          tempCell.style.backgroundColor = "lightorange";
        }
      }

      //if not visited background orange
      // if wrong duck display red
    }
  }
}

function populateBoard(numDucks, r, c) {
  for (let i = 0; i < numDucks; i++) {
    let x = 0;
    let y = 0;
    do {
      x = getRandomInt(10);
      y = getRandomInt(10);
    } while (board[x][y] === -1 || x === r || y === c); // ensure first click not duck

    board[x][y] = -1;
    duckPositions.push([x, y]);
    // update duck position info
    for (let r = x - 1; r < x + 2; r++) {
      for (let c = y - 1; c < y + 2; c++) {
        if (r == x && c == y) continue;
        if (r < 0 || r > 9 || c < 0 || c > 9) continue;
        if (board[r][c] === -1) continue;
        board[r][c]++;
      }
    }
  }
}
function numberDFS(x, y) {
  let localVisited = [[]];
  fillEmptyMap(localVisited, 10, 10);
  const stack = [[x, y]];

  while (stack.length) {
    const current = stack.pop();
    x = current[0];
    y = current[1];
    if (visited[x][y] == 0) {
      placesCleared++;
      visited[x][y] = 1;
    }

    if (localVisited[x][y] == 0) {
      localVisited[x][y] = 1;
      let tempId = `${x},${y}`;
      document.getElementById(tempId).innerHTML =
        board[x][y] != 0 ? board[x][y] : " ";

      if (board[x][y] != 0) continue;
      for (let r = x - 1; r < x + 2; r++) {
        for (let c = y - 1; c < y + 2; c++) {
          if (r == x && c == y) continue;
          if (r < 0 || r > 9 || c < 0 || c > 9) continue;
          if (board[r][c] === -1) continue;
          stack.push([r, c]);
        }
      }
    }
  }
}
function clickHandler(event) {
  let cell = document.getElementById(event.target.id);
  let arr = event.target.id.split(",").map(Number);
  let x = arr[0];
  let y = arr[1];
  // console.log(arr, board[x][y]);

  if (visited[x][y] == 1) return;

  // mark decoys
  if (markingDecoys == true) {
    if (cell.innerText == "🚩") cell.innerText = "🌱";
    else if (cell.innerText == "🌱") cell.innerText = "🚩";
    else console.log("ERROR - no matching flags for decoy");
    return;
  }

  if (cell.innerText == "🚩") return;
  visited[x][y] = 1;
  placesCleared++;

  if (!isFilled) {
    populateBoard(10, x, y);
    isFilled = true;
    startTimer();
  }

  // game over - clicked on duck
  if (board[x][y] === -1) {
    gameInfo.innerText = "Oh no! You scared away the ducks :(";
    displayBoard();
    stopTimer();
    startButton.innerText = "Play again?";
    duckAudio.play();
  } else if (board[x][y] === 0) {
    // clear all 0 and adjacent numbers to 0
    numberDFS(x, y);
  } else {
    // let cell = document.getElementById(event.target.id);
    cell.innerHTML = board[x][y];
  }

  if (placesCleared == 90) {
    stopTimer();
    gameInfo.innerHTML = "Congrats! You found all the ducks!";
    duckPositions.forEach((pos) => {
      document.getElementById(`${pos[0]},${pos[1]}`).innerHTML = "🦆";
      visited[pos[0]][pos[1]] = 1;
    });
  }
}

function resetTimer() {
  timerSpan.textContent = "00:00";
  clearInterval(countUpInterval);
}
function stopTimer() {
  clearInterval(countUpInterval);
}
function startTimer(st = 0) {
  let currentTime = st;

  countUpInterval = setInterval(() => {
    currentTime++;
    let minutes = Math.floor(currentTime / 60)
      .toString()
      .padStart(2, "0");
    let seconds = (currentTime % 60).toString().padStart(2, "0");
    timerSpan.textContent = `${minutes}:${seconds}`;
  }, 1000);
}

function newGame() {
  placesCleared = 0;
  markingDecoys = false;
  duckPositions = [];
  isFilled = false;
  resetTimer();

  gameTable.removeAttribute("hidden");
  gameTable.innerHTML = "";
  startButton.innerText = "New Game";
  markDecoyButton.disabled = false;
  markDecoyButton.removeAttribute("style");

  gameInfo.innerHTML = "";
  fillEmptyMap(board, 10, 10);
  fillEmptyMap(visited, 10, 10);

  for (let i = 0; i < 10; i++) {
    let row = gameTable.insertRow(i);
    for (let j = 0; j < 10; j++) {
      let cell = row.insertCell(j);
      // cell.innerHTML = board[i][j]; // debug only
      cell.innerHTML = "🌱";
      cell.id = `${i},${j}`;
      cell.addEventListener("click", (e) => clickHandler(e));
    }
  }
}
