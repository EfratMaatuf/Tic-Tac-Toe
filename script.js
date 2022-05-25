let BOARD_SIZE = 3;
let saveBoardSize;
let array = [];
let player = "X";
let saveArray = [];
let ifSave = false;
let flag = false;
let step = [];
let playersName = [];
let peak = ["", "100", 100];
let players = document.querySelector(".players");
const body = document.querySelector("body");
const board = document.getElementById("board");
const noWinner = document.querySelector(".noWinner");
const winnerName = document.querySelector("#winnerName");
const fireworks = document.querySelector(".fireworks");
const bottonDelete = document.getElementById("bottonDelete");

const insertNames = () => {
  players.classList.remove("animate__slideInDown");
  players.classList.add("animate__zoomOutUp");
  setTimeout(() => {
    players.style.display = "none";
    players.classList.remove("animate__zoomOutUp");
    players.classList.add("animate__slideInDown");
  }, 1500);
  board.style.display = "flex";
  flag == false ? buildBoard() : null;
  newGame();
  let stoper = document.getElementById("stopwatch");
  stoper.style.display = "flex";
  let buttons = document.querySelector(".navbar");
  buttons.style.display = "flex";
  let player1 = document.getElementById("name1").value;
  let player2 = document.getElementById("name2").value;
  playersName = [player1, player2];
};
let buttonInsertNames = document.getElementById("submit");
buttonInsertNames.addEventListener("click", insertNames);

const changeBoard = (e) => {
  startTimer();
  if (player == "X") {
    e.target.innerText = "❌";
    array[parseInt(e.target.id[0])][parseInt(e.target.id[1])] = "X";
    step.unshift([[e.target.id[0], e.target.id[1]]]);
    checkWin() ? winning() : step.length === BOARD_SIZE ** 2 ? teko() : null;
    player = "O";
  } else {
    e.target.innerText = "⭕";
    array[parseInt(e.target.id[0])][parseInt(e.target.id[1])] = "O";
    step.unshift([[e.target.id[0], e.target.id[1]]]);
    checkWin() ? winning() : step.length === BOARD_SIZE ** 2 ? teko() : null;
    player = "X";
  }
  e.target.removeEventListener("click", changeBoard);
  e.target.style.cursor = "not-allowed";
  //check if no winning
};
const teko = () => {
  console.log("teko");
  noWinner.style.display = "block";
  bottonDelete.removeEventListener("click", delete1);
  stopTimer();
  document.querySelector("#audioMistake").play();
};
const checkWin = () => {
  let i, j;
  //check row
  for (i = 0; i < BOARD_SIZE; i++) {
    for (j = 0; j < BOARD_SIZE; j++) {
      if (array[i][j] === "" || array[i][j] != player) {
        break;
      }
    }
    if (j === BOARD_SIZE) {
      return true;
    }
  }
  //check col
  for (i = 0; i < BOARD_SIZE; i++) {
    for (j = 0; j < BOARD_SIZE; j++) {
      if (array[j][i] === "" || array[j][i] != player) {
        break;
      }
    }
    if (j === BOARD_SIZE) {
      return true;
    }
  }
  for (i = 0; i < BOARD_SIZE; i++) {
    if (array[i][i] === "" || array[i][i] != player) {
      break;
    }
  }
  if (i === BOARD_SIZE) {
    return true;
  }
  for (j = 0; j < BOARD_SIZE; j++) {
    if (
      array[j][BOARD_SIZE - 1 - j] === "" ||
      array[j][BOARD_SIZE - 1 - j] != player
    ) {
      break;
    }
  }
  if (j === BOARD_SIZE) {
    return true;
  }
  return false;
};
const winning = () => {
  stopTimer();
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      let el = document.getElementById(`${i}${j}`);
      el.style.cursor = "not-allowed";
      el.removeEventListener("click", changeBoard);
    }
  }
  console.log(player);
  fireworks.style.display = "block";
  body.style.background = "#000";
  scroll(0, 0);
  body.style.overflow = "hidden";
  console.log(body.style.overflow);
  winnerName.innerText = `${player} is the winner`;
  winnerName.style.display = "block";
  hightRes();
  console.log(`the winner: ${player} in ${time}`);
  bottonDelete.removeEventListener("click", delete1);
  document.querySelector("#audioVictory").play();
};
const hightRes = () => {
  let a = 0;
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      if (array[i][j] != "") {
        a++;
      }
    }
  }
  if (time < peak[1] || a < peak[2]) {
    peak[0] = player == "X" ? playersName[0] : playersName[1];
    peak[1] = time;
    peak[2] = a;
  }
  let peakshow = document.getElementById("peakshow");
  peakshow.innerHTML = `The peak:  ${peak[0]}, ${peak[1]}, ${peak[2]} steps `;
  console.log(peakshow);
};
const buildBoard = () => {
  flag = true;
  for (let i = 0; i < BOARD_SIZE; i++) {
    array[i] = [];
    let divRow = document.createElement("div");
    divRow.className = `row`;
    for (let j = 0; j < BOARD_SIZE; j++) {
      array[i][j] = "";
      let cardEl = document.createElement("div");
      cardEl.innerHTML = "❤️";
      cardEl.className = `cards col-1 col-md-${
        12 / BOARD_SIZE
      } animate__animated animate__rollIn animate__delay-2s	`;
      cardEl.setAttribute("id", `${i}${j}`);
      cardEl.addEventListener("click", changeBoard);
      divRow.append(cardEl);
    }
    board.append(divRow);
  }
};
const newGame = () => {
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      array[i][j] = "";
      player = "X";
      let square = document.getElementById(`${i}${j}`);
      square.innerText = "❤️";
      square.style.cursor = "default";
      square.addEventListener("click", changeBoard);
    }
  }

  fireworks.style.display = "none";
  body.style.background = "white";
  body.style.overflow = "scroll";
  winnerName.style.display = "none";
  noWinner.style.display = "none";
  bottonDelete.addEventListener("click", delete1);
  resetTimer();
  step = [];
};
const newGamebuttom = () => {
  newGame();
  players.style.display = "flex";
  let stoper = document.getElementById("stopwatch");
  stoper.style.display = "none";
  let buttons = document.querySelector(".navbar");
  buttons.style.display = "none";
  board.style.display = "none";
};

const saveGame = () => {};
const loadGame = () => {};
function delete1() {
  array[step[0][0][0]][step[0][0][1]] = "";
  let carDelete = document.getElementById(`${step[0][0][0]}${step[0][0][1]}`);
  carDelete.innerHTML = "❤️";
  if (player == "X") {
    player = "O";
  } else {
    player = "X";
  }
  carDelete.addEventListener("click", changeBoard);
  step.shift();
}

let buttonNewGame = document.querySelector("#buttonNewGame");
buttonNewGame.addEventListener("click", newGamebuttom);

bottonDelete.addEventListener("click", delete1);

const changeStatus = (size) => {
  BOARD_SIZE = size;
  board.innerHTML = "";
  buildBoard();
  newGame();
  resetTimer();
  const popupSizeBoard = document.querySelector("#popupSizeBoard");
  popupSizeBoard.classList.remove("animate__zoomIn");
  popupSizeBoard.classList.add("animate__zoomOut");
  setTimeout(() => {
    modal.style.display = "none";
    popupSizeBoard.classList.remove("animate__zoomOut");
    popupSizeBoard.classList.add("animate__zoomIn");
  }, 500);
};
let bottonChangeStatus = document.querySelector("#bottonChangeStatus");
let modal = document.querySelector(".modal");
bottonChangeStatus.addEventListener("click", () => {
  modal.style.display = "block";
});
let close = document.querySelector(".close");
close.addEventListener("click", () => {
  const popupSizeBoard = document.querySelector("#popupSizeBoard");
  popupSizeBoard.classList.remove("animate__zoomIn");
  popupSizeBoard.classList.add("animate__zoomOut");
  setTimeout(() => {
    modal.style.display = "none";
    popupSizeBoard.classList.remove("animate__zoomOut");
    popupSizeBoard.classList.add("animate__zoomIn");
  }, 500);
});
let buttonBoard3 = document.querySelector("#buttonBoard3");
buttonBoard3.addEventListener("click", () => {
  changeStatus(3);
});
let buttonBoard4 = document.querySelector("#buttonBoard4");
buttonBoard4.addEventListener("click", () => {
  changeStatus(4);
});
let buttonBoard5 = document.querySelector("#buttonBoard5");
buttonBoard5.addEventListener("click", () => {
  changeStatus(5);
});
let buttonBoard6 = document.querySelector("#buttonBoard6");
buttonBoard6.addEventListener("click", () => {
  changeStatus(6);
});

let bottonSaveGame = document.querySelector("#bottonSaveGame");
bottonSaveGame.addEventListener("click", saveGame);

let bottonLoadGame = document.querySelector("#bottonLoadGame");
bottonLoadGame.addEventListener("click", loadGame);

let buttonShowPeak = document.querySelector("#peak");
let modal1 = document.querySelector(".modal1");
buttonShowPeak.addEventListener("click", () => {
  modal1.style.display = "block";
});
let close1 = document.getElementById("close1");
close1.addEventListener("click", () => {
  const popupPeak = document.querySelector("#popupPeak");
  popupPeak.classList.remove("animate__zoomIn");
  popupPeak.classList.add("animate__zoomOut");
  setTimeout(() => {
    modal1.style.display = "none";
    popupPeak.classList.remove("animate__zoomOut");
    popupPeak.classList.add("animate__zoomIn");
  }, 500);
});

const timer = document.getElementById("stopwatch");

let hr = 0;
let min = 0;
let sec = 0;
var stoptime = true;
let time = "";

function startTimer() {
  if (stoptime == true) {
    stoptime = false;
    timerCycle();
  }
}
function stopTimer() {
  if (stoptime == false) {
    stoptime = true;
  }
  time = hr + ":" + min + ":" + sec;
}

function timerCycle() {
  if (stoptime == false) {
    sec = parseInt(sec);
    min = parseInt(min);
    hr = parseInt(hr);

    sec = sec + 1;

    if (sec == 60) {
      min = min + 1;
      sec = 0;
    }
    if (min == 60) {
      hr = hr + 1;
      min = 0;
      sec = 0;
    }

    if (sec < 10 || sec == 0) {
      sec = "0" + sec;
    }
    if (min < 10 || min == 0) {
      min = "0" + min;
    }
    if (hr < 10 || hr == 0) {
      hr = "0" + hr;
    }

    timer.innerHTML = hr + ":" + min + ":" + sec;

    setTimeout("timerCycle()", 1000);
  }
}
function resetTimer() {
  timer.innerHTML = "00:00:00";
  stoptime = true;
  hr = 0;
  sec = 0;
  min = 0;
}
