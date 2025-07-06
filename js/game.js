/**
 * The HTML canvas element used for rendering the game.
 * @type {HTMLCanvasElement}
 */
let canvas;

/**
 * The main game world instance.
 * @type {World}
 */
let world;

/**
 * The keyboard input handler instance.
 * @type {Keyboard}
 */
let keyboard = new Keyboard();

/**
 * The global sound manager instance.
 * @type {SoundManager}
 */
const soundManager = new SoundManager();

/**
 * Timestamp of the last key press (used for input timing).
 * @type {number}
 */
let lastKeyTime = Date.now();

/**
 * Interval ID for the game timer.
 * @type {number|null}
 */
let timerInterval = null;

/**
 * Indicates if the game should start (e.g., for splash/start screen).
 * @type {boolean}
 * @default true
 */
let startTheGame = true;

/**
 * Audio element for looping background music.
 * @type {HTMLAudioElement}
 */
let backgroundMusicLoop;

/**
 * Reference to the left keyboard button in the DOM.
 * @type {HTMLElement}
 */
const keyboardLeftREF = document.getElementById("keyboard-left");

/**
 * Reference to the right keyboard button in the DOM.
 * @type {HTMLElement}
 */
const keyboardRightREF = document.getElementById("keyboard-right");

/**
 * Reference to the space keyboard button in the DOM.
 * @type {HTMLElement}
 */
const keyboardSpaceREF = document.getElementById("keyboard-space");

/**
 * Reference to the throw keyboard button in the DOM.
 * @type {HTMLElement}
 */
const keyboardThrowREF = document.getElementById("keyboard-throw");

/**
 * Reference to the left gamepad button in the DOM.
 * @type {HTMLElement}
 */
const gamePadLeftREF = document.getElementById("game-pad-left");

/**
 * Reference to the right gamepad button in the DOM.
 * @type {HTMLElement}
 */
const gamePadRightREF = document.getElementById("game-pad-right");

/**
 * Reference to the jump gamepad button in the DOM.
 * @type {HTMLElement}
 */
const gamePadJumpREF = document.getElementById("game-pad-jump");

/**
 * Reference to the bottle/gamepad throw button in the DOM.
 * @type {HTMLElement}
 */
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
 * Updates the idle time for the keyboard and sets short/long idle flags.
 *
 * @function
 */
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

/**
 * Resets the idle timer and updates idle time state.
 *
 * @function
 */
function resetTimer() {
  lastKeyTime = Date.now();
  updateIdleTime();
}

// Event listeners for resetting idle timer on key or touch events
window.addEventListener("keydown", resetTimer);
window.addEventListener("touchend", resetTimer);

// Periodically updates idle time
timerInterval = setInterval(updateIdleTime, 100);

// Debug event listener for keypress events
window.addEventListener("onkeypress", (e) => {
  console.log(e);
});

/**
 * Handles keyboard keydown events and updates keyboard state accordingly.
 */
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

/**
 * Visually highlights the pressed key on the virtual keyboard.
 *
 * @function
 * @param {number} keyCode - The code of the pressed key.
 */
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

/**
 * Resets the visual highlight of the released key on the virtual keyboard.
 *
 * @function
 * @param {number} keyCode - The code of the released key.
 */
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

/**
 * Handles keyboard keyup events and updates keyboard state accordingly.
 */
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

/**
 * Toggles the visibility of the controls information overlay.
 *
 * @function
 */
function openControls() {
  let controlsInfoREF = document.getElementById("controls-info");
  if (!controlsInfoREF.classList.contains("d-none")) {
    controlsInfoREF.classList.add("d-none");
  } else {
    controlsInfoREF.classList.remove("d-none");
  }
}

/**
 * Toggles the visibility of the story information overlay.
 *
 * @function
 */
function openStory() {
  let storyInfoREF = document.getElementById("story-info");
  if (!storyInfoREF.classList.contains("d-none")) {
    storyInfoREF.classList.add("d-none");
  } else {
    storyInfoREF.classList.remove("d-none");
  }
}


function openImpressum() {
    let impressumInfoREF = document.getElementById("impressum-info");
  if (!impressumInfoREF.classList.contains("d-none")) {
    impressumInfoREF.classList.add("d-none");
  } else {
   impressumInfoREF.classList.remove("d-none");
  }
}

function buttonClickSound() {
  soundManager.play("buttonClick");
}

/**
 * Prevents the closing of overlays when clicking inside them by stopping event propagation.
 *
 * @function
 * @param {Event} event - The event object.
 */
function noClose(event) {
  event.stopPropagation();
}

/**
 * Checks and updates the sound mute state based on localStorage,
 * and updates the sound icon accordingly.
 *
 * @function
 */
function checkSoundMute() {
  let soundOffSrc = "img/0_svgs/volume-muted-icon.svg";
  let soundOnSrc = "img/0_svgs/volume-icon.svg";
  let soundIconREF = document.getElementById("sound-icon");

  if (localStorage.getItem("soundMute") == "true") {
    soundIconREF.src = soundOffSrc;
    soundManager.soundMute = true;
  } else {
    soundIconREF.src = soundOnSrc;
    soundManager.soundMute = false;
  }
}

/**
 * Toggles the sound mute state and updates the sound icon and localStorage.
 *
 * @function
 */
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

/**
 * Loads all required sound effects and background music into the sound manager.
 *
 * @function
 */
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
  soundManager.load("buttonClick", "audio/buttonClick.mp3")
}

/**
 * Starts checking for player inactivity and updates idle state accordingly.
 *
 * @function
 */
function startIdleCheck() {
  idleInterval = setInterval(() => {
    if (keyboard.LEFT || keyboard.RIGHT || keyboard.SPACE || keyboard.THROWBOTTLE) {
      resetTimer();
    } else {
      updateIdleTime();
    }
  }, 300);
}

// Touch controls for gamepad buttons

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
