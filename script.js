let game = {
  BOARD_SIZE: 3,
  array: [],
  player: "X",
  step: [],
  playersName: [],
  time: {
    _hr: 0,
    _sec: 0,
    _min: 0
  }
};
let flag = false;
let players = document.querySelector(".players");
const body = document.querySelector("body");
const board = document.getElementById("board");
const noWinner = document.querySelector(".noWinner");
const winnerName = document.querySelector("#winnerName");
const fireworks = document.querySelector(".fireworks");
const buttonDelete = document.getElementById("buttonDelete");


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
  game.playersName = [player1, player2];
  body.style.backgroundColor = "rgb(245, 230, 236)";
};
let buttonInsertNames = document.getElementById("submit");
buttonInsertNames.addEventListener("click", insertNames);

const changeBoard = (e) => {
  startTimer();
  if (game.player === "X") {
    e.target.innerText = "❌";
    game.array[parseInt(e.target.id[0])][parseInt(e.target.id[1])] = "X";
    game.step.unshift([[e.target.id[0], e.target.id[1]]]);
    checkWin()
      ? winning()
      : game.step.length === game.BOARD_SIZE ** 2
        ? teko()
        : null;
    game.player = "O";
  } else {
    e.target.innerText = "⭕";
    game.array[parseInt(e.target.id[0])][parseInt(e.target.id[1])] = "O";
    game.step.unshift([[e.target.id[0], e.target.id[1]]]);
    checkWin()
      ? winning()
      : game.step.length === game.BOARD_SIZE ** 2
        ? teko()
        : null;
    game.player = "X";
  }
  e.target.removeEventListener("click", changeBoard);
  e.target.style.cursor = "not-allowed";
};
const teko = () => {
  noWinner.style.display = "block";
  buttonDelete.removeEventListener("click", delete1);
  stopTimer();
  document.querySelector("#audioMistake").play();
};
const checkWin = () => {
  let i, j;
  //check row
  for (i = 0; i < game.BOARD_SIZE; i++) {
    for (j = 0; j < game.BOARD_SIZE; j++) {
      if (game.array[i][j] === "" || game.array[i][j] != game.player) {
        break;
      }
    }
    if (j === game.BOARD_SIZE) {
      return true;
    }
  }
  //check col
  for (i = 0; i < game.BOARD_SIZE; i++) {
    for (j = 0; j < game.BOARD_SIZE; j++) {
      if (game.array[j][i] === "" || game.array[j][i] != game.player) {
        break;
      }
    }
    if (j === game.BOARD_SIZE) {
      return true;
    }
  }
  for (i = 0; i < game.BOARD_SIZE; i++) {
    if (game.array[i][i] === "" || game.array[i][i] != game.player) {
      break;
    }
  }
  if (i === game.BOARD_SIZE) {
    return true;
  }
  for (j = 0; j < game.BOARD_SIZE; j++) {
    if (
      game.array[j][game.BOARD_SIZE - 1 - j] === "" ||
      game.array[j][game.BOARD_SIZE - 1 - j] != game.player
    ) {
      break;
    }
  }
  if (j === game.BOARD_SIZE) {
    return true;
  }
  return false;
};
const winning = () => {
  stopTimer();
  for (let i = 0; i < game.BOARD_SIZE; i++) {
    for (let j = 0; j < game.BOARD_SIZE; j++) {
      let el = document.getElementById(`${i}${j}`);
      el.style.cursor = "not-allowed";
      el.removeEventListener("click", changeBoard);
    }
  }
  fireworks.style.display = "block";
  body.style.background = "#000";
  scroll(0, 0);
  body.style.overflow = "hidden";
  if (game.player === 'X' && game.playersName[0] != "") {
    winnerName.innerText = `${game.playersName[0]} is the winner`;
  }
  else if (game.player === 'O' && game.playersName[1] != "") {
    winnerName.innerText = `${game.playersName[1]} is the winner`;
  }
  else {
    winnerName.innerText = `${game.player} is the winner`;
  }
  winnerName.style.display = "block";
  hightRes();
  console.log(`the winner: ${game.player} in ${time}`);
  buttonDelete.removeEventListener("click", delete1);
  document.querySelector("#audioVictory").play();
};
const hightRes = () => {
  let a = 0;
  for (let i = 0; i < game.BOARD_SIZE; i++) {
    for (let j = 0; j < game.BOARD_SIZE; j++) {
      if (game.array[i][j] != "") {
        a++;
      }
    }
  }
  Boolean(localStorage.peak)
    ? null
    : (localStorage.peak = JSON.stringify({
      name: "",
      time: "100",
      step: 100,
    }));

  if (
    time < JSON.parse(localStorage.peak).time ||
    a < JSON.parse(localStorage.peak).step
  ) {
    let namePlayer =
      game.player == "X" ? game.playersName[0] : game.playersName[1];

    localStorage.peak = JSON.stringify({
      name: namePlayer,
      time: time,
      step: a,
    });
  }

  // let peakShow = document.getElementById("peakShow");
  // peakShow.innerHTML = ` ${JSON.parse(localStorage.peak).name} | ${JSON.parse(localStorage.peak).time
  //   } | ${JSON.parse(localStorage.peak).step} steps `;


};
const buildBoard = () => {
  flag = true;
  for (let i = 0; i < game.BOARD_SIZE; i++) {
    game.array[i] = [];
    let divRow = document.createElement("div");
    divRow.className = `row`;
    for (let j = 0; j < game.BOARD_SIZE; j++) {
      game.array[i][j] = "";
      let cardEl = document.createElement("div");
      cardEl.innerHTML = "❤️";
      cardEl.className = `cards col-1 col-md-${12 / game.BOARD_SIZE
        } animate__animated animate__rollIn animate__delay-2s	`;
      cardEl.setAttribute("id", `${i}${j}`);
      cardEl.addEventListener("click", changeBoard);
      divRow.append(cardEl);
    }
    board.append(divRow);
  }
};
const newGame = () => {
  for (let i = 0; i < game.BOARD_SIZE; i++) {
    for (let j = 0; j < game.BOARD_SIZE; j++) {
      game.array[i][j] = "";
      game.player = "X";
      let square = document.getElementById(`${i}${j}`);
      square.innerText = "❤️";
      square.style.cursor = "default";
      square.addEventListener("click", changeBoard);
    }
  }

  fireworks.style.display = "none";
  body.style.backgroundColor = "rgb(245, 230, 236)";

  body.style.overflow = "scroll";
  winnerName.style.display = "none";
  noWinner.style.display = "none";
  buttonDelete.addEventListener("click", delete1);
  resetTimer();
  game.step = [];

};
const newGameButton = () => {
  newGame();
  body.style.background = "rgb(227, 178, 199)";
  players.style.display = "block";
  let stoper = document.getElementById("stopwatch");
  stoper.style.display = "none";
  let buttons = document.querySelector(".navbar");
  buttons.style.display = "none";
  board.style.display = "none";
};

const saveGame = () => {
  localStorage.game = JSON.stringify(game);
  newGame();
}


const loadGame = () => {
  newGame();
  if (localStorage.game) {
    game = JSON.parse(localStorage.game);
    board.innerHTML = "";
    console.log(game.BOARD_SIZE);
    for (let i = 0; i < game.BOARD_SIZE; i++) {
      console.log(i);
      let divRow = document.createElement("div");
      divRow.className = `row`;
      for (let j = 0; j < game.BOARD_SIZE; j++) {
        let cardEl = document.createElement("div");
        if (game.array[i][j] === "X") {
          cardEl.innerHTML = "❌";
        }
        if (game.array[i][j] === "O") {
          cardEl.innerHTML = "⭕";
        }
        if (game.array[i][j] === "") {
          cardEl.innerHTML = "❤️";
        }
        cardEl.className = `cards col-1 col-md-${12 / game.BOARD_SIZE}`;
        cardEl.setAttribute("id", `${i}${j}`);
        cardEl.addEventListener("click", changeBoard);
        divRow.append(cardEl);
      }
      board.append(divRow);
    }
    upTimer();
  } else {
    let textSaveLoad = document.querySelector("#textSaveLoad");
    let modalSaveLoad = document.querySelector("#modalSaveLoad");
    modalSaveLoad.style.display = "block";
    let closePopupSaveLoad = document.getElementById("closePopupSaveLoad");
    closePopupSaveLoad.addEventListener("click", () => {
      const popupSaveLoad = document.querySelector("#popupSaveLoad");
      popupSaveLoad.classList.remove("animate__zoomIn");
      popupSaveLoad.classList.add("animate__zoomOut");
      setTimeout(() => {
        modalSaveLoad.style.display = "none";
        popupSaveLoad.classList.remove("animate__zoomOut");
        popupSaveLoad.classList.add("animate__zoomIn");
      }, 500);
    });
  }
};
function delete1() {
  if (!game.step.length) {
    let modalCanNotDelete = document.querySelector("#modalCanNotDelete");
    modalCanNotDelete.style.display = "block";
    let closePopupCanNotDelete = document.getElementById(
      "closePopupCanNotDelete"
    );
    closePopupCanNotDelete.addEventListener("click", () => {
      const popupCanNotDelete = document.querySelector("#popupCanNotDelete");
      popupCanNotDelete.classList.remove("animate__zoomIn");
      popupCanNotDelete.classList.add("animate__zoomOut");
      setTimeout(() => {
        modalCanNotDelete.style.display = "none";
        popupCanNotDelete.classList.remove("animate__zoomOut");
        popupCanNotDelete.classList.add("animate__zoomIn");
      }, 500);
    });
    return;
  }
  game.array[game.step[0][0][0]][game.step[0][0][1]] = "";
  let carDelete = document.getElementById(
    `${game.step[0][0][0]}${game.step[0][0][1]}`
  );
  carDelete.innerHTML = "❤️";
  if (game.player == "X") {
    game.player = "O";
  } else {
    game.player = "X";
  }
  carDelete.addEventListener("click", changeBoard);
  game.step.shift();
}

let buttonNewGame = document.querySelector("#buttonNewGame");
buttonNewGame.addEventListener("click", newGameButton);

buttonDelete.addEventListener("click", delete1);

const changeStatus = (size) => {
  game.BOARD_SIZE = size;
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
let buttonChangeStatus = document.querySelector("#buttonChangeStatus");
let modal = document.querySelector(".modal");
buttonChangeStatus.addEventListener("click", () => {
  modal.style.display = "block";
});
let closePopupSizeBoard = document.querySelector("#closePopupSizeBoard");
closePopupSizeBoard.addEventListener("click", () => {
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

let buttonSaveGame = document.querySelector("#buttonSaveGame");
buttonSaveGame.addEventListener("click", saveGame);

let buttonLoadGame = document.querySelector("#buttonLoadGame");
buttonLoadGame.addEventListener("click", loadGame);

let modalPeak = document.querySelector("#modalPeak");
let buttonShowPeak = document.querySelector("#buttonShowPeak");
buttonShowPeak.addEventListener("click", () => {
  modalPeak.style.display = "block";
  let peakShow = document.getElementById("peakShow");
  peakShow.innerHTML = ` ${JSON.parse(localStorage.peak).name} | ${JSON.parse(localStorage.peak).time
    } | ${JSON.parse(localStorage.peak).step} steps `;

});
let closePopupPeak = document.getElementById("closePopupPeak");
closePopupPeak.addEventListener("click", () => {
  const popupPeak = document.querySelector("#popupPeak");
  popupPeak.classList.remove("animate__zoomIn");
  popupPeak.classList.add("animate__zoomOut");
  setTimeout(() => {
    modalPeak.style.display = "none";
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

    game.time._hr = hr
    game.time._sec = sec
    game.time._min = min;


    setTimeout("timerCycle()", 1000);
  }
}
function resetTimer() {
  timer.innerHTML = "00:00:00";
  stoptime = true;
  hr = 0;
  sec = 0;
  min = 0;

  game.time._hr = hr
  game.time._sec = sec
  game.time._min = min;
}
function upTimer() {
  timer.innerHTML = `${game.time._hr} : ${game.time._min} : ${game.time._sec}`;

  stoptime = true;
  hr = Number(game.time._hr);
  sec = Number(game.time._sec);
  min = Number(game.time._min);
}
