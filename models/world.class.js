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
  statusBar = [
    new StatusBar("HEALTH", 0, 20, 100),
    new StatusBar("COINS", 50, 20, 0),
    new StatusBar("BOTTLE", 100, 20, 0)
  ];

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
   * Array of collectible coin objects in the world.
   * @type {Coins[]}
   */
  collectableObjectsCoins = [
    new Coins(), new Coins(), new Coins(), new Coins(),
    new Coins(), new Coins(), new Coins(), new Coins()
  ];

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
  ];

  /**
   * Creates a new World instance, initializes game objects, and starts the game loop.
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
    this.gameOver = false;
    this.statusBar[2].loadStatusBar("BOTTLE", this.character.collectedBottles);
    setInterval(() => {
      this.checkThrowObjects();
    }, 500);
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
   */
  run() {
    this.runIntervall = setInterval(() => {
      this.checkCollisionsEnemy();
      this.checkCollisionsCoins();
      this.checkCollisionsBottles();
      this.checkCollisionWithBottle();
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
        console.log(this.thrownBottle);
        this.statusBar[2].loadStatusBar("BOTTLE", this.character.collectedBottles);
        this.bottle = new ThrowableObjects(this.character.x, this.character.y + 100);
        this.throwableObjects.push(this.bottle);
        this.bottleAmountThrown = this.throwableObjects.length;
        setInterval(() => {
          this.thrownBottle = false;
        }, 1500);
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
      let endbossBar = new StatusBar("ENDBOSS", 0, 500, 100);
      this.statusBar.push(endbossBar);
    }
  }

  /**
   * Checks for collisions between the character and coins, collects coins if collided.
   */
  checkCollisionsCoins() {
    this.collectableObjectsCoins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        if (this.character.collectedCoins <= 4) {
          this.character.collectedCoins += 1;
          this.statusBar[1].loadStatusBar("COINS", this.character.collectedCoins);
          coin.loadImage("");
          coin.y = -1000;
          soundManager.play("coinCollect");
        }
      }
    });
  }

  /**
   * Checks for collisions between the character and bottles, collects bottles if collided.
   */
  checkCollisionsBottles() {
    this.collectableObjectsBottle.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        if (this.character.collectedBottles <= 4) {
          this.character.collectedBottles += 1;
          bottle.loadImage("");
          bottle.y = -1000;
          soundManager.play("bottleCollect");
          this.statusBar[2].loadStatusBar("BOTTLE", this.character.collectedBottles);
        }
      }
    });
  }

  /**
   * Checks for collisions between the character and enemies, handles collision logic.
   */
  checkCollisionsEnemy() {
    for (let i = 0; i < this.level.enemies.length; i++) {
      const enemy = this.level.enemies[i];
      if (this.character.isCollidingOnTop(enemy)) {
        this.handleTopCollision(enemy);
        break;
      } else if (this.character.isColliding(enemy)) {
        this.handleEnemyCollision(enemy);
      }
    }
  }

  /**
   * Handles the logic when the character lands on top of an enemy.
   * @param {MovableObject} enemy - The enemy object.
   */
  handleTopCollision(enemy) {
    this.character.speedY = 15;
    enemy.chickenDead();
  }

  /**
   * Handles the logic when the character collides with an enemy.
   * @param {MovableObject} enemy - The enemy object.
   */
  handleEnemyCollision(enemy) {
    this.character.hit();
    if (this.character.energy == 0) {
      this.gameOver = true;
      setInterval(() => {
        this.level.enemies[6].endBossSoundLoop.pause();
      }, 1500);
    }
    this.statusBar[0].loadStatusBar("HEALTH", this.character.energy);
    if (enemy.name == "Endboss") {
      enemy.startEndBossBattle(false, true, false);
    }
  }

  /**
   * Checks for collisions between thrown bottles and enemies.
   */
  checkCollisionWithBottle() {
    if (this.throwableObjects[this.bottleAmountThrown - 1] != undefined) {
      this.level.enemies.forEach((enemy) => {
        for (let index = 0; index < this.throwableObjects.length; index++) {
          if (this.throwableObjects[index].isColliding(enemy)) {
            this.handleEnemyCollisionWithBottle(enemy, index);
          }
        }
      });
    }
  }

  /**
   * Handles the logic when a thrown bottle collides with an enemy.
   * @param {MovableObject} enemy - The enemy object.
   * @param {number} index - The index of the throwable object.
   */
  handleEnemyCollisionWithBottle(enemy, index) {
    if (enemy.name == "chicken" || (enemy.name == "little_chicken" && enemy.chickenDead())) {
      this.handleChickenCollision(enemy, index);
    }
    if (enemy.name == "Endboss") {
      this.handleEndbossCollision(enemy, index);
    }
  }

  /**
   * Handles the logic when a bottle hits a chicken or little chicken.
   * @param {MovableObject} enemy - The enemy object.
   * @param {number} index - The index of the throwable object.
   */
  handleChickenCollision(enemy, index) {
    enemy.chickenDead();
    console.log(enemy.name);
    this.throwableObjects[index].splashingOnEnemy(this.x, this.y);
  }

  /**
   * Handles the logic when a bottle hits the endboss.
   * @param {MovableObject} enemy - The enemy object.
   * @param {number} index - The index of the throwable object.
   */
  handleEndbossCollision(enemy, index) {
    if (enemy.endBossGotHit) {
      enemy.endBossGotHit = false;
      clearInterval(this.runIntervall);
      this.throwableObjects[index].splashingOnEnemy(this.x, this.y);
      enemy.startEndBossBattle(false, false, true);
      enemy.energy -= 20;
      this.handleEndbossDefeat(enemy);
      this.statusBar[3].loadStatusBar("ENDBOSS", enemy.energy);
      this.run();
    }
  }

  /**
   * Handles the logic when the endboss is defeated.
   * @param {MovableObject} enemy - The endboss object.
   */
  handleEndbossDefeat(enemy) {
    if (enemy.energy == 0) {
      this.character.characterWon = true;
      this.gameOver = true;
      this.winScreenShown = true;
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
      console.log("Now it is true");
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
