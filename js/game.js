let canvas;
let world;
let keyboard = new Keyboard();
let lastKeyTime = Date.now();
let timerInterval = null;
let startTheGame = true;
const keyboardLeftREF = document.getElementById("keyboard-left");
const keyboardRightREF = document.getElementById("keyboard-right");
const keyboardSpaceREF = document.getElementById("keyboard-space");
const keyboardThrowREF = document.getElementById("keyboard-throw");

function init() {}

function startGame() {
  let startImgREF = document.getElementById("start-img");
  let startButtonREF = document.getElementById("start-buttons");
  let controlsInGameREF = document.getElementById("controls-in-game");
  if (!startImgREF.classList.contains("d-none")) {
    startImgREF.classList.add("d-none");
    startButtonREF.classList.add("d-none");
    controlsInGameREF.classList.remove("d-none");
    canvas = document.getElementById("canvas");
    canvas.style.border = "5px solid black";
    world = new World(canvas, keyboard);
  } else {
    startImgREF.classList.remove("d-none");
    startButtonREF.classList.remove("d-none");
  }
}

function updateIdleTime() {
  const idleSeconds = ((Date.now() - lastKeyTime) / 1000).toFixed(1);
  if (10 >= idleSeconds && idleSeconds >= 2) {
    keyboard.longIdle = false;
    keyboard.shortIdle = true;
  } else if (idleSeconds > 10) {
    keyboard.longIdle = true;
    keyboard.shortIdle = false;
  } else {
    keyboard.longIdle = false;
    keyboard.shortIdle = false;
  }
}

function resetTimer() {
  lastKeyTime = Date.now();
  updateIdleTime();
}

window.addEventListener("keydown", resetTimer);

timerInterval = setInterval(updateIdleTime, 100);

window.addEventListener("onkeypress", (e) => {
  console.log(e);
});

window.addEventListener("keydown", (event) => {
  if (event.keyCode == 37) {
    keyboardPress(event.keyCode)
    keyboard.LEFT = true;
  } else if (event.keyCode == 38) {
    keyboard.UP = true;
  } else if (event.keyCode == 39) {
    keyboardPress(event.keyCode)
    keyboard.RIGHT = true;
  } else if (event.keyCode == 40) {
    keyboard.DOWN = true;
  } else if (event.keyCode == 32) {
    keyboardPress(event.keyCode)
    keyboard.SPACE = true;
  } else if (event.keyCode == 68) {
    keyboardPress(event.keyCode)
    keyboard.THROWBOTTLE = true;
  }
});

function keyboardPress(keyCode) {
  switch (keyCode) {
    case 37:
      keyboardLeftREF.style.transform = "scale(1.2)";
      break;
    case 39:
      keyboardRightREF.style.transform = "scale(1.2)";
      break;
    case 32:
      keyboardSpaceREF.style.transform = "scale(1.2)";
      break;
    case 68:
      keyboardThrowREF.style.transform = "scale(1.2)";
      break;
    default:
      break;
  }
}

function keyboardDown(keyCode) {
  switch (keyCode) {
    case 37:
      keyboardLeftREF.style.transform = "scale(1)";
      break;
    case 39:
      keyboardRightREF.style.transform = "scale(1)";
      break;
    case 32:
      keyboardSpaceREF.style.transform = "scale(1)";
      break;
    case 68:
      keyboardThrowREF.style.transform = "scale(1)";
      break;
    default:
      break;
  }
}

window.addEventListener("keyup", (event) => {
  if (event.keyCode == 37) {
    keyboardDown(event.keyCode)
    keyboard.LEFT = false;
  } else if (event.keyCode == 39) {
    keyboardDown(event.keyCode)
    keyboard.RIGHT = false;
  } else if (event.keyCode == 40) {
    keyboard.DOWN = false;
  } else if (event.keyCode == 32) {
    keyboardDown(event.keyCode)
    keyboard.SPACE = false;
  } else if (event.keyCode == 68) {
    keyboardDown(event.keyCode)
    keyboard.THROWBOTTLE = false;
  }
});
