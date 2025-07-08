/**
 * Represents the game world, containing all game objects, logic, and rendering.
 *
 * @class
 */
class World {
  /**
   * The main character in the world.
   * @type {Character}
   */
  character = new Character();

  /**
   * The current level object.
   * @type {Level}
   */
  level = level1;

  /**
   * The 2D rendering context for the canvas.
   * @type {CanvasRenderingContext2D}
   */
  ctx;

  /**
   * The HTML canvas element.
   * @type {HTMLCanvasElement}
   */
  canvas;

  /**
   * The keyboard input handler.
   * @type {Keyboard}
   */
  keyboard;

  /**
   * The current camera x offset.
   * @type {number}
   * @default 0
   */
  camera_x = 0;

  /**
   * Array of status bars (health, coins, bottles, etc.).
   * @type {StatusBar[]}
   */
  statusBar = [new StatusBar("HEALTH", 0, 20, 100), new StatusBar("COINS", 50, 20, 0), new StatusBar("BOTTLE", 100, 20, 0)];

  /**
   * Array of throwable objects (e.g., bottles).
   * @type {ThrowableObjects[]}
   */
  throwableObjects = [];

  /**
   * The number of bottles that have been thrown.
   * @type {number}
   */
  bottleAmountThrown;

  /** @type {number} */ runIntervall;
  /** @type {number} */ attackIntervall;
  /** @type {number} */ animateWalkingIntervall;
  /** @type {number} */ startBattleIntervall;

  /**
   * Indicates if a bottle has been thrown and is in the air.
   * @type {boolean}
   * @default false
   */
  thrownBottle = false;

  /**
   * Indicates if all sounds should be stopped.
   * @type {boolean}
   * @default false
   */
  stopSounds = false;

  /**
   * The most recently thrown bottle object.
   * @type {ThrowableObjects}
   */
  bottle;

  /**
   * Indicates if the win screen is currently shown.
   * @type {boolean}
   * @default false
   */
  winScreenShown = false;

  /**
   * Indicates if the game is currently stopped.
   * @type {boolean}
   * @default false
   */
  stopGame = false;

  /**
   * The collision manager handles all collision detection and collision-related logic for the world.
   * @type {WorldCollisionManager}
   */
  collisionManager;

  /**
   * Indicates whether the end game sequence has started.
   *
   * @type {boolean}
   * @default false
   */
  endGameStarted = false;

  /**
   * Array of collectible coin objects in the world.
   * @type {Coins[]}
   */
  collectableObjectsCoins = [new Coins(), new Coins(), new Coins(), new Coins(), new Coins()];

  /**
   * Array of collectible bottle objects in the world.
   * @type {Bottle[]}
   */
  collectableObjectsBottle = [
    new Bottle("right"),
    new Bottle("left"),
    new Bottle("right"),
    new Bottle("left"),
    new Bottle("right"),
    new Bottle("left"),
    new Bottle("right"),
    new Bottle("right"),
  ];

  /**
   * Creates a new World instance, initializes game objects, starts the game loop, initializes the collision manager,
   * and sets up all other game objects and logic..
   *
   * @constructor
   * @param {HTMLCanvasElement} canvas - The canvas element to render on.
   * @param {Keyboard} keyboard - The keyboard input handler.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.collisionManager = new WorldCollisionManager(this);
    this.gameOver = false;
    this.statusBar[2].loadStatusBar("BOTTLE", this.character.collectedBottles);
    setInterval(() => {
      this.checkThrowObjects();
    }, 200);
    this.startBattleIntervall = setInterval(() => {
      this.startWalkingEndbossAnimation();
    }, 20);
  }

  /**
   * Sets the world reference for the character.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Starts the main game loop for collision checks and updates.
   * Uses the collision manager to perform all collision checks.
   */
  run() {
    this.runIntervall = setInterval(() => {
      this.collisionManager.checkCollisionsEnemy();
      this.collisionManager.checkCollisionsCoins();
      this.collisionManager.checkCollisionsBottles();
      this.collisionManager.checkCollisionWithBottle();
    }, 40);
  }

  /**
   * Checks if the player can throw a bottle and handles the throw logic.
   */
  checkThrowObjects() {
    if (this.keyboard.THROWBOTTLE && this.character.collectedBottles != 0 && !this.stopSounds) {
      if (!this.thrownBottle) {
        this.character.collectedBottles -= 1;
        this.thrownBottle = true;
        this.statusBar[2].loadStatusBar("BOTTLE", this.character.collectedBottles);
        this.bottle = new ThrowableObjects(this.character.x, this.character.y + 100, this.endGameStarted);
        this.throwableObjects.push(this.bottle);
        this.bottleAmountThrown = this.throwableObjects.length;
        setTimeout(() => {
          this.thrownBottle = false;
        }, 1000);
      }
    }
  }

  /**
   * Starts the endboss walking animation when the player has collected enough coins.
   */
  startWalkingEndbossAnimation() {
    if (this.character.collectedCoins == 5) {
      clearInterval(this.startBattleIntervall);
      this.level.enemies[6].startEndBossBattle(true, false, false);
      let endbossBar = new StatusBar("ENDBOSS", 0, 500, 200);
      this.endGameStarted = true;
      this.statusBar.push(endbossBar);
    }
  }

  /**
   * Stops all sounds in the game (character, enemies, etc.).
   */
  stopAllSounds() {
    this.character.stopSounds = true;
    this.stopSounds = true;
    this.level.enemies.forEach((enemy) => {
      enemy.stopSounds = true;
    });
  }

  /**
   * Pauses or resumes the game and all related sounds.
   */
  pauseTheGame() {
    if (this.stopGame) {
      soundManager.soundMute = true;
      this.character.stopGame = true;
      this.level.enemies.forEach((enemy) => {
        enemy.stopGame = true;
      });
    } else {
      soundManager.soundMute = false;
      this.character.stopGame = false;
      this.level.enemies.forEach((enemy) => {
        enemy.stopGame = false;
      });
    }
  }

  /**
   * Main draw loop for rendering the game world.
   */
  draw() {
    if (!this.stopGame) {
      this.canvasDrawing();
      if (this.gameOver) {
        if (!this.time) {
          this.time = Date.now();
        }
        if (Date.now() - this.time > 4000) {
          this.handleGameOver();
          return;
        }
      }
      this.requestNextFrame();
    }
  }

  /**
   * Handles the game over logic and displays the appropriate end screen.
   */
  handleGameOver() {
    if (this.winScreenShown) {
      winScreen();
    } else {
      gameLostScreen();
    }
    this.stopAllSounds();
  }

  /**
   * Requests the next animation frame for the game loop.
   */
  requestNextFrame() {
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Handles all canvas drawing operations for the current frame.
   */
  canvasDrawing() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.ctx.globalCompositeOperation = "destination-over";
    this.ctx.translate(-this.camera_x, 0);
    this.addObjectsToMap(this.statusBar);
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.callAllAddObjectsToMap();
    this.ctx.translate(-this.camera_x, 0);
  }

  /**
   * Adds all relevant game objects to the map for rendering.
   */
  callAllAddObjectsToMap() {
    this.addObjectsToMap(this.collectableObjectsCoins);
    this.addObjectsToMap(this.collectableObjectsBottle);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.backgroundObjects);
  }

  /**
   * Adds an array of objects to the map for rendering.
   * @param {Array} obj - Array of objects to add.
   */
  addObjectsToMap(obj) {
    obj.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Adds a single object to the map for rendering, handling flipping if needed.
   * @param {MovableObject} mo - The object to add.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
    mo.drawOffsetFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Flips the image horizontally for objects facing the other direction.
   * @param {MovableObject} mo - The object to flip.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Restores the image orientation after flipping.
   * @param {MovableObject} mo - The object to restore.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
