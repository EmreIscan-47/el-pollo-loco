let canvas;
let world;
let keyboard = new Keyboard();
let lastKeyTime = Date.now();
let timerInterval = null;
let startTheGame = true;

function init() {

}

function startGame() {
  let startImgREF = document.getElementById("start-img");
  let startButtonREF = document.getElementById("start-buttons")
  if (!startImgREF.classList.contains("d-none")) {
    startImgREF.classList.add("d-none");
    startButtonREF.classList.add("d-none");
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
  } else {
    startImgREF.classList.remove("d-none");
    startButtonREF.classList.remove("d-none")
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

window.addEventListener('keydown', resetTimer);

timerInterval = setInterval(updateIdleTime, 100);

window.addEventListener("onkeypress", (e) => {
  console.log(e);
});

window.addEventListener("keydown", (event) => {
  if (event.keyCode == 37) {
    keyboard.LEFT = true;
  } else if (event.keyCode == 38) {
    keyboard.UP = true;
  } else if (event.keyCode == 39) {
    keyboard.RIGHT = true;
  } else if (event.keyCode == 40) {
    keyboard.DOWN = true;
  } else if (event.keyCode == 32) {
    keyboard.SPACE = true;
  }else if (event.keyCode == 68) {
    keyboard.THROWBOTTLE = true;
  }
});


window.addEventListener("keyup", (event) => {
    if (event.keyCode == 37) {
      keyboard.LEFT = false;
    } else if (event.keyCode == 38) {
      keyboard.UP = false;
    } else if (event.keyCode == 39) {
      keyboard.RIGHT = false;
    } else if (event.keyCode == 40) {
      keyboard.DOWN = false;
    } else if (event.keyCode == 32) {
      keyboard.SPACE = false;
    } else if (event.keyCode == 68) {
      keyboard.THROWBOTTLE = false;
    }

  });