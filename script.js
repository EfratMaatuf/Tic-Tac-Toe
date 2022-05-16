const board = document.getElementById("board");
let BOARD_SIZE = 3;
const array = [];
let player = "X";

const changeBoard = (e) => {
  if (player == "X") {
    e.target.innerText = "❌";
    array[parseInt(e.target.id[0])][parseInt(e.target.id[1])] = "X";
    checkWin() ? winning() : null;
    player = "O";
    e.target.removeEventListener("click", changeBoard);
  } else {
    e.target.innerText = "⭕";
    array[parseInt(e.target.id[0])][parseInt(e.target.id[1])] = "O";
    checkWin() ? winning() : null;
    player = "X";
    e.target.removeEventListener("click", changeBoard);
  }
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
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      let el = document.getElementById(`${i}${j}`);
      el.removeEventListener("click", changeBoard);
    }
  }
  console.log(player);
};
const buildBoard = () => {
  for (let i = 0; i < BOARD_SIZE; i++) {
    array[i] = [];
    let divRow = document.createElement("div");
    divRow.className = `row`;
    for (let j = 0; j < BOARD_SIZE; j++) {
      array[i][j] = "";
      let cardEl = document.createElement("div");
      cardEl.innerHTML = "❤️";
      cardEl.className = `cards col-1 col-md-${12 / BOARD_SIZE}`;
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
      square.addEventListener("click", changeBoard);
    }
  }
};

buildBoard();
let buttonNewGame = document.querySelector(".buttonNewGame");
buttonNewGame.addEventListener("click", () => {
  newGame();
});

//*******changeStatus******* */
const changeStatus = (size) => {
  modal.style.display = "none";
  BOARD_SIZE = size;
  board.innerHTML = "";
  buildBoard();
};
let bottonChangeStatus = document.querySelector(".bottonChangeStatus");
let modal = document.querySelector(".modal");
bottonChangeStatus.addEventListener("click", () => {
  modal.style.display = "block";
});
let close = document.querySelector(".close");
close.addEventListener("click", () => {
  modal.style.display = "none";
});
let buttonBoard3 = document.querySelector(".buttonBoard3");
buttonBoard3.addEventListener("click", () => {
  changeStatus(3);
});
let buttonBoard4 = document.querySelector(".buttonBoard4");
buttonBoard4.addEventListener("click", () => {
  changeStatus(4);
});
let buttonBoard5 = document.querySelector(".buttonBoard5");
buttonBoard5.addEventListener("click", () => {
  changeStatus(5);
});
let buttonBoard6 = document.querySelector(".buttonBoard6");
buttonBoard6.addEventListener("click", () => {
  changeStatus(6);
});
