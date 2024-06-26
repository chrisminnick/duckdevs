let tickInterval;
let startTime = -1;
let gameWindow = document.querySelector(".game__window");
let gameInfo = document.querySelector(".game__info__container");
let maxX = 375;
let maxY = 375;
let gameState = "inactive";
let lastEnterPressTime = 0;
let lapCount = 0;
let checkCount = 0;

class DuckRacer {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 25;
    this.height = 25;
    this.velX = 0;
    this.velY = 0;
    this.outerCircleX = 200;
    this.outerCircleY = 200;
    this.outerCircleRadius = 225;
    this.innerCircleX = 200;
    this.innerCircleY = 200;
    this.innerCircleRadius = 110;
    this.duckRadius = 12.5;
    this.addDuck();
    this.createOuterCircle();
    this.createCenterCircle();
    this.createFinishLine();
    this.createCheckPoint();
  }

  addDuck() {
    this.duckRacer = document.createElement("div");
    this.duckRacer.classList.add("duck__racer");
    this.duckRacer.textContent = "🦆";
    this.duckRacer.style.left = `${this.x}px`;
    this.duckRacer.style.top = `${this.y}px`;
    gameWindow.appendChild(this.duckRacer);
  }

  getDuckCenter(duckX, duckY) {
    return [duckX + this.duckRadius, duckY + this.duckRadius];
  }

  createOuterCircle() {
    this.outerCircle = document.createElement("div");
    this.outerCircle.classList.add("outer__circle");
    gameWindow.appendChild(this.outerCircle);
  }

  createCenterCircle() {
    this.centerCircle = document.createElement("div");
    this.centerCircle.classList.add("center__circle");
    gameWindow.appendChild(this.centerCircle);
  }

  createFinishLine() {
    this.finishLine = document.createElement("div");
    this.finishLine.classList.add("finish__line");
    this.finishLineX = 0;
    this.finishLineY = 175;
    this.finishLineWidth = 150;
    this.finishLineHeight = 45;
    this.finishLine.style.left = `${this.finishLineX}px`;
    this.finishLine.style.top = `${this.finishLineY}px`;
    this.finishLine.style.width = `${this.finishLineWidth}px`;
    this.finishLine.style.height = `${this.finishLineHeight}px`;
    gameWindow.appendChild(this.finishLine);
  }

  createCheckPoint() {
    this.checkPointX = 300;
    this.checkPointY = 175;
    this.checkPointWidth = 150;
    this.checkPointHeight = 45;
  }

  setVelX(newVelX) {
    this.velX = newVelX;
  }

  setVelY(newVelY) {
    this.velY = newVelY;
  }

  moveDuck() {
    if (this.x + this.velX < 0 || this.x + this.velX > maxX) {
      this.velX = 0;
    }
    if (this.y + this.velY < 0 || this.y + this.velY > maxY) {
      this.velY = 0;
    }

    let tempX = this.x + this.velX;
    let tempY = this.y + this.velY;

    let duckCenter = this.getDuckCenter(tempX, tempY);
    if (
      !this.circleCollision(
        duckCenter[0],
        duckCenter[1],
        this.outerCircleX,
        this.outerCircleY,
        this.outerCircleRadius - 2 * this.duckRadius
      ) ||
      this.circleCollision(
        duckCenter[0],
        duckCenter[1],
        this.innerCircleX,
        this.innerCircleY,
        this.innerCircleRadius
      )
    ) {
      this.velX = 0;
      this.velY = 0;
    }

    this.x += this.velX;
    this.y += this.velY;

    if (
      this.rectangleCollision(
        this.x,
        this.y,
        this.width,
        this.height,
        this.finishLineX,
        this.finishLineY - 25,
        this.finishLineWidth,
        this.finishLineHeight
      )
    ) {
      if (this.velY === -1) {
        this.updateLapCount();
        console.log(lapCount);
      }
    }

    if (
      this.rectangleCollision(
        this.x,
        this.y,
        this.width,
        this.height,
        this.checkPointX,
        this.checkPointY,
        this.checkPointWidth,
        this.checkPointHeight
      )
    ) {
      if (this.velY === 1) {
        this.updateCheckCount();
        console.log(checkCount);
      }
    }
  }

  circleCollision(duckX, duckY, circleX, circleY, circleRadius) {
    const distance = Math.sqrt((duckX - circleX) ** 2 + (duckY - circleY) ** 2);
    return distance < this.duckRadius + circleRadius;
  }

  rectangleCollision(x1, y1, width1, height1, x2, y2, width2, height2) {
    let x1Right = x1 + width1;
    let y1Bottom = y1 + height1;
    let x2Right = x2 + width2;
    let y2Bottom = y2 + height2;

    if (x1 >= x2Right || x1Right <= x2 || y1 >= y2Bottom || y1Bottom <= y2) {
      return false;
    }

    return true;
  }

  updateLapCount() {
    if (lapCount === checkCount - 1) {
      lapCount += 1;
    }
  }

  updateCheckCount() {
    if (checkCount === lapCount) {
      checkCount += 1;
    }
  }

  reset() {
    this.x = 25;
    this.y = 175;
    this.velX = 0;
    this.velY = 0;
  }

  tick() {
    this.moveDuck();
    this.render();
  }

  render() {
    this.duckRacer.style.left = `${this.x}px`;
    this.duckRacer.style.top = `${this.y}px`;
    // console.log(this.x, this.y);
  }
}

function startTick() {
  tickInterval = setInterval(tick, 1000 / 60);
}

function stopTick() {
  clearInterval(tickInterval);
}

function tick() {
  timer();
  playerDuck.tick();
  checkLapCount();
  //   console.log("Tick");
}

function timer() {
  if (startTime === -1) {
    startTime = Date.now();
  }
  const currentTime = Date.now();
  let elapsedTime = Math.floor((currentTime - startTime) / 1000);
  displayTime(elapsedTime);
}

function timerStop() {
  startTime = -1;
  displayTime(-1);
}

function displayTime(elapsedTime) {
  const timerSpan = document.getElementById("timer");
  if (elapsedTime === -1) {
    timerSpan.textContent = "00:00";
  } else {
    const minutes = Math.floor(elapsedTime / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (elapsedTime % 60).toString().padStart(2, "0");
    timerSpan.textContent = `${minutes}:${seconds}`;
  }
}

function checkLapCount() {
  displayLapCount();
  if (lapCount == 3) {
    stopTick();
  }
}

function displayLapCount() {
  const lapCountSpan = document.getElementById("lap__count");
  lapCountSpan.textContent = `LAP COUNT: ${lapCount}/3`;
}

const startButton = document.getElementById("start");
startButton.addEventListener("click", function () {
  startFunction();
});

function startFunction() {
  startTick();
  gameStart();
  gameState = "active";
  lapCount = 0;
  checkCount = 0;
}

const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", function () {
  resetFunction();
});

function resetFunction() {
  stopTick();
  timerStop();
  gameStop();
  gameState = "inactive";
  lapCount = 0;
  checkCount = 0;
  displayLapCount();
}

function gameStart() {
  document.addEventListener("keydown", movePlayer);
  document.addEventListener("keyup", stopPlayer);
}

function gameStop() {
  document.removeEventListener("keydown", movePlayer);
  document.addEventListener("keyup", stopPlayer);
  playerDuck.reset();
  playerDuck.tick();
}

function movePlayer(event) {
  switch (event.key) {
    case "ArrowUp":
      playerDuck.setVelY(-1);
      break;
    case "ArrowDown":
      playerDuck.setVelY(1);
      break;
    case "ArrowLeft":
      playerDuck.setVelX(-1);
      break;
    case "ArrowRight":
      playerDuck.setVelX(1);
      break;
  }
}

function stopPlayer(event) {
  switch (event.key) {
    case "ArrowUp":
      playerDuck.setVelY(0);
      break;
    case "ArrowDown":
      playerDuck.setVelY(0);
      break;
    case "ArrowLeft":
      playerDuck.setVelX(0);
      break;
    case "ArrowRight":
      playerDuck.setVelX(0);
      break;
  }
}

function enterFunction(event) {
  const now = Date.now();
  if (event.key === "Enter" && now - lastEnterPressTime > 1000) {
    lastEnterPressTime = now;
    if (gameState === "active") {
      resetFunction();
    } else {
      startFunction();
    }
  }
}

let playerDuck = new DuckRacer(25, 175);
document.addEventListener("keydown", enterFunction);
