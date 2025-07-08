/**
 * Handles the display logic for the win screen.
 * If the end image is currently visible, it hides it.
 * Otherwise, it triggers the win screen appearance.
 *
 * @function
 */
function winScreen() {
  let endImgREF = document.getElementById("end-img");
  let endButtonsREF = document.getElementById("end-screen-buttons");
  let endScreenImgREF = document.getElementById("end-screen-img");
  let gamePadREF = document.getElementById("game-pad-visibility");
  if (!endImgREF.classList.contains("d-none")) {
    endImgREF.classList.add("d-none");
  } else {
    winScreenAppears(endImgREF, endScreenImgREF, gamePadREF, endButtonsREF);
  }
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
  let endButtonsREF = document.getElementById("end-screen-buttons");
  let endScreenImgREF = document.getElementById("end-screen-img");
  let gamePadREF = document.getElementById("game-pad-visibility");
  if (!endImgREF.classList.contains("d-none")) {
    endImgREF.classList.add("d-none");
  } else {
    gameLostScreenAppears(endImgREF, endButtonsREF, endScreenImgREF, gamePadREF);
  }
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
  let startGameREF = document.getElementById("start-button");
  let gamePadREF = document.getElementById("game-pad-visibility");

  if (!startImgREF.classList.contains("d-none")) {
    prepareGame(startImgREF, startButtonREF, startGameREF, gamePadREF);
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
 * @param {HTMLElement} startGameREF - Reference to the start game button.
 * @param {HTMLElement} gamePadREF - Reference to the game pad visibility element.
 */
function prepareGame(startImgREF, startButtonREF, startGameREF, gamePadREF) {
  canvas = document.getElementById("canvas");
  canvas.style.border = "5px solid black";
  startGameREF.setAttribute("disabled", "");
  initLevel();
  resetTimer();
  world = new World(canvas, keyboard, false);
  setTimeout(() => {
    showGameUI(startImgREF, startButtonREF, gamePadREF);
  }, 1000);
}

/**
 * Displays the game UI, hides the start screen elements,
 * starts background music, and initiates idle checking.
 *
 * @function
 * @param {HTMLElement} startImgREF - Reference to the start image element.
 * @param {HTMLElement} startButtonREF - Reference to the start buttons container.
 * @param {HTMLElement} gamePadREF - Reference to the game pad visibility element.
 */
function showGameUI(startImgREF, startButtonREF, gamePadREF) {
  startImgREF.classList.add("d-none");
  startButtonREF.classList.add("d-none");
  gamePadREF.classList.remove("d-none");
  backgroundMusicLoop = soundManager.play("backgroundMusic", 0.2, true);
  if (!soundManager.soundMute) {
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
 * Shows the win screen by updating UI elements, pausing background music,
 * playing the win sound, and revealing end screen buttons after a short delay.
 *
 * @function
 * @param {HTMLElement} endImgREF - Reference to the end image element.
 * @param {HTMLImageElement} endScreenImgREF - Reference to the end screen image element.
 * @param {HTMLElement} gamePadREF - Reference to the game pad visibility element.
 * @param {HTMLElement} endButtonsREF - Reference to the end screen buttons container.
 */
function winScreenAppears(endImgREF, endScreenImgREF, gamePadREF, endButtonsREF) {
  endImgREF.classList.remove("d-none");
  endScreenImgREF.src = "img/You won, you lost/You won A.png";
  gamePadREF.classList.add("d-none");
  if (!soundManager.soundMute) {
    backgroundMusicLoop.pause();
  }
  soundManager.pause("endBossSound");
  soundManager.play("youWinSound");
  world = null;
  setTimeout(() => {
    endButtonsREF.classList.remove("d-none");
  }, 1200);
}

/**
 * Shows the game lost screen by updating UI elements, pausing background music,
 * playing the lose sound, and revealing end screen buttons after a short delay.
 *
 * @function
 * @param {HTMLElement} endImgREF - Reference to the end image element.
 * @param {HTMLElement} endButtonsREF - Reference to the end screen buttons container.
 * @param {HTMLImageElement} endScreenImgREF - Reference to the end screen image element.
 * @param {HTMLElement} gamePadREF - Reference to the game pad visibility element.
 */
function gameLostScreenAppears(endImgREF, endButtonsREF, endScreenImgREF, gamePadREF) {
  endImgREF.classList.remove("d-none");
  gamePadREF.classList.add("d-none");
  endScreenImgREF.src = "img/You won, you lost/Game over A.png";
  if (!soundManager.soundMute) {
    backgroundMusicLoop.pause();
  }
  world = null;
  soundManager.pause("endBossSound");
  soundManager.play("youLoseSound");
  setTimeout(() => {
    endButtonsREF.classList.remove("d-none");
  }, 1200);
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

/**
 * Deletes the current game world and resets the game state.
 * If the end image is visible, restarts the game. Otherwise, shows the end image and buttons.
 *
 * @function
 */
function deleteWorld() {
  let endImgREF = document.getElementById("end-img");
  let endButtonsREF = document.getElementById("end-screen-buttons");
  let gamePadREF = document.getElementById("game-pad-visibility");
  if (!endImgREF.classList.contains("d-none")) {
    restartGame(endImgREF, endButtonsREF, gamePadREF);
  } else {
    endImgREF.classList.remove("d-none");
    endButtonsREF.classList.remove("d-none");
  }
  world = null;
  initLevel();
  world = new World(canvas, keyboard, false);
}

/**
 * Restarts the game by resetting UI elements and starting background music.
 *
 * @function
 * @param {HTMLElement} endImgREF - Reference to the end image element.
 * @param {HTMLElement} endButtonsREF - Reference to the end screen buttons container.
 * @param {HTMLElement} gamePadREF - Reference to the game pad visibility element.
 */
function restartGame(endImgREF, endButtonsREF, gamePadREF) {
  endImgREF.classList.add("d-none");
  endButtonsREF.classList.add("d-none");
  gamePadREF.classList.remove("d-none");
  backgroundMusicLoop = soundManager.play("backgroundMusic", 0.2, true);
  resetTimer();
  if (!soundManager.soundMute) {
    backgroundMusicLoop.play();
  }
}

/**
 * Returns to the start screen from the end screen, updating UI elements accordingly.
 *
 * @function
 */
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
    /* world = null; */
  } else {
    startImgREF.classList.add("d-none");
    startButtonREF.classList.add("d-none");
    endImgREF.classList.remove("d-none");
  }
}

/**
 * Handles touch events for the left gamepad button.
 */
gamePadLeftREF.addEventListener("touchstart", (e) => {
  e.preventDefault();
  keyboard.LEFT = true;
});
gamePadLeftREF.addEventListener("touchend", (e) => {
  e.preventDefault();
  keyboard.LEFT = false;
});

/**
 * Handles touch events for the right gamepad button.
 */
gamePadRightREF.addEventListener("touchstart", (e) => {
  e.preventDefault();
  keyboard.RIGHT = true;
});
gamePadRightREF.addEventListener("touchend", (e) => {
  e.preventDefault();
  keyboard.RIGHT = false;
});

/**
 * Handles touch events for the jump gamepad button.
 */
gamePadJumpREF.addEventListener("touchstart", (e) => {
  e.preventDefault();
  keyboard.SPACE = true;
});
gamePadJumpREF.addEventListener("touchend", (e) => {
  e.preventDefault();
  keyboard.SPACE = false;
});

/**
 * Handles touch events for the bottle throw gamepad button.
 */
gamePadBottleREF.addEventListener("touchstart", (e) => {
  e.preventDefault();
  keyboard.THROWBOTTLE = true;
});
gamePadBottleREF.addEventListener("touchend", (e) => {
  e.preventDefault();
  keyboard.THROWBOTTLE = false;
});
