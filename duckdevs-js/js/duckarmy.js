function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

async function createDuckArmy() {
  const duckDiv = document.getElementById("duckarmy");
  const armySize = document.getElementById("armysize").value;
  const duckAudio = document.getElementById("audioPlayer");

  document.getElementById("duckarmy").innerHTML = '';

  for (let i = 0; i < armySize; i++) {
    duckDiv.append("🦆");
    await sleep(100);
  }

  duckAudio.play();
  alert('Your duck army is ready!')
}

async function battleDuckArmy() {
  const duckDiv = document.getElementById("duckarmy");
  const compDuckDiv = document.getElementById("compduckarmy");
  const userArmySize = document.getElementById("armysize").value;
  const compArmySize = getRandomInt(1, userArmySize * 1.5);
  const duckAudio = document.getElementById("audioPlayer");
  const duckBattleWinStatusDiv = document.getElementById("duckbattlewinstatus");

  document.getElementById("duckarmy").innerHTML = "";
  document.getElementById("compduckarmy").innerHTML = "";
  document.getElementById("duckbattlewinstatus").innerHTML = "";

  for (let i = 0; i < userArmySize; i++) {
    duckDiv.append("🦆");
    await sleep(100);
  }

  for (let i = 0; i < compArmySize; i++) {
    compDuckDiv.append("🦆");
    await sleep(100);
  }

  duckAudio.play();
  
  if (userArmySize > compArmySize) {
    duckBattleWinStatusDiv.append("Winner!");
  } else if (userArmySize === compArmySize) {
    duckBattleWinStatusDiv.append("Tie");
  } else {
    duckBattleWinStatusDiv.append("You lost!");
  }
  
}
