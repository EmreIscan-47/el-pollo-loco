let canvas;
let world;
let keyboard = new Keyboard();
const soundManager = new SoundManager();
let lastKeyTime = Date.now();
let timerInterval = null;
let startTheGame = true;
let backgroundMusicLoop;
const keyboardLeftREF = document.getElementById("keyboard-left");
const keyboardRightREF = document.getElementById("keyboard-right");
const keyboardSpaceREF = document.getElementById("keyboard-space");
const keyboardThrowREF = document.getElementById("keyboard-throw");
const gamePadLeftREF = document.getElementById("game-pad-left");
const gamePadRightREF = document.getElementById("game-pad-right");
const gamePadJumpREF = document.getElementById("game-pad-jump");
const gamePadBottleREF = document.getElementById("game-pad-bottle");

/**
 * Initializes the game by loading all sounds and checking the mute status.
 *
 * @function
 */
function init() {
  loadAllSounds();
  checkSoundMute();
}

/**
 * Starts the game. Depending on the current state of the start image,
 * it either prepares the game or resets the start screen.
 *
 * @function
 */
function startGame() {
  let startImgREF = document.getElementById("start-img");
  let startButtonREF = document.getElementById("start-buttons");
  let controlsInGameREF = document.getElementById("controls-in-game");
  let startGameREF = document.getElementById("start-button");
  let gamePadREF = document.getElementById("game-pad-visibility");

  if (!startImgREF.classList.contains("d-none")) {
    prepareGame(startImgREF, startButtonREF, controlsInGameREF, startGameREF, gamePadREF);
  } else {
    resetStartScreen(startImgREF, gamePadREF, startButtonREF);
  }
}

/**
 * Prepares the game environment, initializes the level and world,
 * and shows the game UI after a short delay.
 *
 * @function
 * @param {HTMLElement} startImgREF - Reference to the start image element.
 * @param {HTMLElement} startButtonREF - Reference to the start buttons container.
 * @param {HTMLElement} controlsInGameREF - Reference to the in-game controls container.
 * @param {HTMLElement} startGameREF - Reference to the start game button.
 * @param {HTMLElement} gamePadREF - Reference to the game pad visibility element.
 */
function prepareGame(startImgREF, startButtonREF, controlsInGameREF, startGameREF, gamePadREF) {
  canvas = document.getElementById("canvas");
  canvas.style.border = "5px solid black";
  startGameREF.setAttribute("disabled", "");
  initLevel();
  world = new World(canvas, keyboard, false);
  setTimeout(() => {
    showGameUI(startImgREF, startButtonREF, controlsInGameREF, gamePadREF);
  }, 1000);
}

/**
 * Displays the game UI, hides the start screen elements,
 * starts background music, and initiates idle checking.
 *
 * @function
 * @param {HTMLElement} startImgREF - Reference to the start image element.
 * @param {HTMLElement} startButtonREF - Reference to the start buttons container.
 * @param {HTMLElement} controlsInGameREF - Reference to the in-game controls container.
 * @param {HTMLElement} gamePadREF - Reference to the game pad visibility element.
 */
function showGameUI(startImgREF, startButtonREF, controlsInGameREF, gamePadREF) {
  startImgREF.classList.add("d-none");
  startButtonREF.classList.add("d-none");
  gamePadREF.classList.remove("d-none");
  controlsInGameREF.classList.remove("d-none");
  backgroundMusicLoop = soundManager.play("backgroundMusic", 0.2, true);
  if (backgroundMusicLoop.play()) {
    backgroundMusicLoop.play();
  }
  soundManager.play("startGame");
  startIdleCheck();
}

/**
 * Resets the start screen by showing the start image and button,
 * and hiding the game pad.
 *
 * @function
 * @param {HTMLElement} startImgREF - Reference to the start image element.
 * @param {HTMLElement} gamePadREF - Reference to the game pad visibility element.
 * @param {HTMLElement} startButtonREF - Reference to the start buttons container.
 */
function resetStartScreen(startImgREF, gamePadREF, startButtonREF) {
  startImgREF.classList.remove("d-none");
  gamePadREF.classList.add("d-none");
  startButtonREF.classList.remove("d-none");
}

/**
 * Handles the display logic for the win screen.
 * If the end image is currently visible, it hides it.
 * Otherwise, it triggers the win screen appearance.
 *
 * @function
 */
function winScreen() {
  let endImgREF = document.getElementById("end-img");
  let controlsInGameREF = document.getElementById("controls-in-game");
  let endButtonsREF = document.getElementById("end-screen-buttons");
  let endScreenImgREF = document.getElementById("end-screen-img");
  let gamePadREF = document.getElementById("game-pad-visibility");
  if (!endImgREF.classList.contains("d-none")) {
    endImgREF.classList.add("d-none");
  } else {
    winScreenAppears(endImgREF, endScreenImgREF, gamePadREF, endButtonsREF, controlsInGameREF);
  }
}

/**
 * Shows the win screen by updating UI elements, pausing background music,
 * playing the win sound, and revealing end screen buttons after a short delay.
 *
 * @function
 * @param {HTMLElement} endImgREF - Reference to the end image element.
 * @param {HTMLImageElement} endScreenImgREF - Reference to the end screen image element.
 * @param {HTMLElement} gamePadREF - Reference to the game pad visibility element.
 * @param {HTMLElement} endButtonsREF - Reference to the end screen buttons container.
 * @param {HTMLElement} controlsInGameREF - Reference to the in-game controls container.
 */
function winScreenAppears(endImgREF, endScreenImgREF, gamePadREF, endButtonsREF, controlsInGameREF) {
  endImgREF.classList.remove("d-none");
  endScreenImgREF.src = "img/You won, you lost/You won A.png";
  gamePadREF.classList.add("d-none");
  backgroundMusicLoop.pause();
  soundManager.pause("endBossSound");
  soundManager.play("youWinSound");
  setTimeout(() => {
    endButtonsREF.classList.remove("d-none");
  }, 1200);
  controlsInGameREF.classList.add("d-none");
}

/**
 * Handles the display logic for the game lost screen.
 * If the end image is currently visible, it hides it.
 * Otherwise, it triggers the lost screen appearance.
 *
 * @function
 */
function gameLostScreen() {
  let endImgREF = document.getElementById("end-img");
  let controlsInGameREF = document.getElementById("controls-in-game");
  let endButtonsREF = document.getElementById("end-screen-buttons");
  let endScreenImgREF = document.getElementById("end-screen-img");
  let gamePadREF = document.getElementById("game-pad-visibility");
  if (!endImgREF.classList.contains("d-none")) {
    endImgREF.classList.add("d-none");
  } else {
    gameLostScreenAppears(endImgREF, controlsInGameREF, endButtonsREF, endScreenImgREF, gamePadREF);
  }
}

/**
 * Shows the game lost screen by updating UI elements, pausing background music,
 * playing the lose sound, and revealing end screen buttons after a short delay.
 *
 * @function
 * @param {HTMLElement} endImgREF - Reference to the end image element.
 * @param {HTMLElement} controlsInGameREF - Reference to the in-game controls container.
 * @param {HTMLElement} endButtonsREF - Reference to the end screen buttons container.
 * @param {HTMLImageElement} endScreenImgREF - Reference to the end screen image element.
 * @param {HTMLElement} gamePadREF - Reference to the game pad visibility element.
 */
function gameLostScreenAppears(endImgREF, controlsInGameREF, endButtonsREF, endScreenImgREF, gamePadREF) {
  endImgREF.classList.remove("d-none");
  gamePadREF.classList.add("d-none");
  endScreenImgREF.src = "img/You won, you lost/Game over A.png";
  if (backgroundMusicLoop.pause()) {
    backgroundMusicLoop.pause();
  }
  soundManager.pause("endBossSound");
  soundManager.play("youLoseSound");
  setTimeout(() => {
    endButtonsREF.classList.remove("d-none");
  }, 1200);
  controlsInGameREF.classList.add("d-none");
}

/**
 * Toggles the game's drawing and pause state.
 * If the game is running, it stops and pauses the game.
 * If the game is stopped, it resumes and redraws the game.
 *
 * @function
 */
function stopDrawing() {
  if (!world.stopGame) {
    world.stopGame = true;
    world.pauseTheGame();
  } else {
    world.stopGame = false;
    world.pauseTheGame();
    world.draw();
  }
}


function deleteWorld() {
  let endImgREF = document.getElementById("end-img");
  let endButtonsREF = document.getElementById("end-screen-buttons");
  let controlsInGameREF = document.getElementById("controls-in-game");
  let gamePadREF = document.getElementById("game-pad-visibility");
  if (!endImgREF.classList.contains("d-none")) {
    restartGame(endImgREF, endButtonsREF, controlsInGameREF, gamePadREF);
  } else {
    endImgREF.classList.remove("d-none");
    endButtonsREF.classList.remove("d-none");
  }
  world = null;
  initLevel();
  world = new World(canvas, keyboard, false);
}

function restartGame(endImgREF, endButtonsREF, controlsInGameREF, gamePadREF) {
  controlsInGameREF.classList.remove("d-none");
  endImgREF.classList.add("d-none");
  endButtonsREF.classList.add("d-none");
  gamePadREF.classList.remove("d-none");
  backgroundMusicLoop = soundManager.play("backgroundMusic", 0.2, true);
  if (backgroundMusicLoop.play()) {
    backgroundMusicLoop.play();
  }
}

function returnToStartScreen() {
  let startImgREF = document.getElementById("start-img");
  let startButtonREF = document.getElementById("start-buttons");
  let endImgREF = document.getElementById("end-img");
  let startGameREF = document.getElementById("start-button");
  if (!endImgREF.classList.contains("d-none")) {
    endImgREF.classList.add("d-none");
    startImgREF.classList.remove("d-none");
    startButtonREF.classList.remove("d-none");
    startGameREF.removeAttribute("disabled");
  } else {
    startImgREF.classList.add("d-none");
    startButtonREF.classList.add("d-none");
    endImgREF.classList.remove("d-none");
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
window.addEventListener("touchend", resetTimer);

timerInterval = setInterval(updateIdleTime, 100);

window.addEventListener("onkeypress", (e) => {
  console.log(e);
});

window.addEventListener("keydown", (event) => {
  if (event.keyCode == 37) {
    keyboardPress(event.keyCode);
    keyboard.LEFT = true;
  } else if (event.keyCode == 38) {
    keyboard.UP = true;
  } else if (event.keyCode == 39) {
    keyboardPress(event.keyCode);
    keyboard.RIGHT = true;
  } else if (event.keyCode == 40) {
    keyboard.DOWN = true;
  } else if (event.keyCode == 32) {
    keyboardPress(event.keyCode);
    keyboard.SPACE = true;
  } else if (event.keyCode == 68) {
    keyboardPress(event.keyCode);
    keyboard.THROWBOTTLE = true;
  }
});

function keyboardPress(keyCode) {
  switch (keyCode) {
    case 37:
      keyboardLeftREF.style.transform = "scale(1.7)";
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
    keyboardDown(event.keyCode);
    keyboard.LEFT = false;
  } else if (event.keyCode == 39) {
    keyboardDown(event.keyCode);
    keyboard.RIGHT = false;
  } else if (event.keyCode == 40) {
    keyboard.DOWN = false;
  } else if (event.keyCode == 32) {
    keyboardDown(event.keyCode);
    keyboard.SPACE = false;
  } else if (event.keyCode == 68) {
    keyboardDown(event.keyCode);
    keyboard.THROWBOTTLE = false;
  }
});

function openControls() {
  let controlsInfoREF = document.getElementById("controls-info");
  if (!controlsInfoREF.classList.contains("d-none")) {
    controlsInfoREF.classList.add("d-none");
  } else {
    controlsInfoREF.classList.remove("d-none");
  }
}

function openStory() {
  let storyInfoREF = document.getElementById("story-info");
  if (!storyInfoREF.classList.contains("d-none")) {
    storyInfoREF.classList.add("d-none");
  } else {
    storyInfoREF.classList.remove("d-none");
  }
}

function noClose(event) {
  event.stopPropagation();
}

function checkSoundMute() {
  let soundOffSrc = "img/0_svgs/volume-muted-icon.svg";
  let soundOnSrc = "img/0_svgs/volume-icon.svg";
  let soundIconREF = document.getElementById("sound-icon");
  console.log(localStorage.getItem("soundMute") == true);

  if (localStorage.getItem("soundMute") == "true") {
    soundIconREF.src = soundOffSrc;
    soundManager.soundMute = true;
  } else {
    soundIconREF.src = soundOnSrc;
    soundManager.soundMute = false;
  }
}

function changeSound() {
  let soundOffSrc = "img/0_svgs/volume-muted-icon.svg";
  let soundOnSrc = "img/0_svgs/volume-icon.svg";
  let soundIconREF = document.getElementById("sound-icon");

  if (soundIconREF.src.endsWith(soundOffSrc)) {
    soundIconREF.src = soundOnSrc;
    soundManager.soundMute = false;
    localStorage.setItem("soundMute", false);
  } else {
    soundIconREF.src = soundOffSrc;
    soundManager.soundMute = true;
    localStorage.setItem("soundMute", true);
  }
}

function loadAllSounds() {
  soundManager.load("jump", "audio/808216_17002826-hq.mp3");
  soundManager.load("characterMove", "audio/moveSound.mp3");
  soundManager.load("chickenSound", "audio/chicken_sound.mp3");
  soundManager.load("footStep", "audio/footStep.mp3");
  soundManager.load("chickenDead", "audio/enemyDead.mp3");
  soundManager.load("bottleBreak", "audio/bottle_break.mp3");
  soundManager.load("endBossDead", "audio/endBossDeadSound.mp3");
  soundManager.load("startGame", "audio/gameStartSound.mp3");
  soundManager.load("characterHurt", "audio/hurtSound.mp3");
  soundManager.load("characterSnoring", "audio/characterSnoring.mp3");
  soundManager.load("coinCollect", "audio/coinCollect.mp3");
  soundManager.load("endBossSound", "audio/endBossSound.mp3");
  soundManager.load("endBossHurt", "audio/endBossHurt.mp3");
  soundManager.load("youWinSound", "audio/youWinSound.mp3");
  soundManager.load("youLoseSound", "audio/youLoseSound.mp3");
  soundManager.load("backgroundMusic", "audio/backgroundMusic.mp3");
  soundManager.load("bottleCollect", "audio/bottleCollect.mp3");
}

function startIdleCheck() {
  idleInterval = setInterval(() => {
    if (keyboard.LEFT || keyboard.RIGHT || keyboard.SPACE || keyboard.THROWBOTTLE) {
      resetTimer();
    } else {
      updateIdleTime();
    }
  }, 300);
}

gamePadLeftREF.addEventListener("touchstart", (e) => {
  e.preventDefault();
  keyboard.LEFT = true;
});

gamePadLeftREF.addEventListener("touchend", (e) => {
  e.preventDefault();
  keyboard.LEFT = false;
});

gamePadRightREF.addEventListener("touchstart", (e) => {
  e.preventDefault();
  keyboard.RIGHT = true;
});

gamePadRightREF.addEventListener("touchend", (e) => {
  e.preventDefault();
  keyboard.RIGHT = false;
});

gamePadJumpREF.addEventListener("touchstart", (e) => {
  e.preventDefault();
  keyboard.SPACE = true;
});

gamePadJumpREF.addEventListener("touchend", (e) => {
  e.preventDefault();
  keyboard.SPACE = false;
});

gamePadBottleREF.addEventListener("touchstart", (e) => {
  e.preventDefault();
  keyboard.THROWBOTTLE = true;
});

gamePadBottleREF.addEventListener("touchend", (e) => {
  e.preventDefault();
  keyboard.THROWBOTTLE = false;
});
