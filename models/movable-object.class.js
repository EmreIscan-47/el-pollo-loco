/**
 * Represents a movable object in the game.
 * Extends DrawableObjects and adds movement, gravity, collision, and animation logic.
 *
 * @class
 * @extends DrawableObjects
 */
class MovableObject extends DrawableObjects {
  /**
   * The horizontal movement speed of the object.
   * @type {number}
   * @default 1.5
   */
  speed = 1.5;

  /**
   * Indicates if the object is facing the other direction.
   * @type {boolean}
   * @default false
   */
  otherDirection = false;

  /**
   * The current vertical speed (for jumping/falling).
   * @type {number}
   * @default 0
   */
  speedY = 0;

  /**
   * The acceleration applied to the object (gravity).
   * @type {number}
   * @default 1
   */
  acceleration = 1;

  /**
   * The object's current energy (health).
   * @type {number}
   * @default 100
   */
  energy = 100;

  /**
   * The object's maximum energy (health).
   * @type {number}
   */
  checkEnergy;

  /**
   * Interval ID for gravity application.
   * @type {number}
   */
  gravityInterval;

  /**
   * Audio object for the jump sound.
   * @type {HTMLAudioElement}
   */
  jumpSound = new Audio("audio/808216_17002826-hq.mp3");

  /**
   * Audio object for the movement sound.
   * @type {HTMLAudioElement}
   */
  moveSound = new Audio("audio/moveSound.mp3");

  /**
   * Audio object for the chicken sound.
   * @type {HTMLAudioElement}
   */
  chickenSound = new Audio("audio/chicken_sound.mp3");

  /**
   * Indicates if the game is stopped for this object.
   * @type {boolean}
   * @default false
   */
  stopGame = false;

  /**
   * The offset values for the object's collision box.
   * @type {{top: number, left: number, right: number, bottom: number}}
   */
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  /**
   * The offset values for the object's head collision box.
   * @type {{top: number, left: number, right: number, bottom: number}}
   */
  offset_head = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  /**
   * Applies gravity to the object by updating its vertical position and speed.
   * Starts an interval that repeatedly applies gravity.
   *
   * @function
   */
  applyGravity() {
    this.gravityInterval = setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Stops the gravity effect by clearing the gravity interval.
   *
   * @function
   */
  stopGravity() {
    clearInterval(this.gravityInterval);
  }

  /**
   * Makes the object jump by setting its vertical speed and playing the jump sound.
   *
   * @function
   */
  jump() {
    this.speedY = 18;
    soundManager.play("jump");
  }

  /**
   * Checks if the object is above the ground.
   * ThrowableObjects are always considered above ground.
   *
   * @function
   * @returns {boolean} True if above ground, otherwise false.
   */
  isAboveGround() {
    if (this instanceof ThrowableObjects) {
      return true;
    } else {
      return this.y < 155;
    }
  }

  /**
   * Checks for a simple collision with another movable object.
   *
   * @function
   * @param {MovableObject} mo - The other movable object.
   * @returns {boolean} True if colliding, otherwise false.
   */
  isCollidingObjects(mo) {
    return (
      this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x &&
      this.y < mo.y + mo.height
    );
  }

  /**
   * Checks if this object is colliding on top of another object.
   * Used for detecting if a character lands on an enemy.
   *
   * @function
   * @param {MovableObject} mo - The other movable object.
   * @returns {boolean} True if colliding on top, otherwise false.
   */
  isCollidingOnTop(mo) {
    const tolerance = 20;
    const characterFootX = this.x + this.width / 2;
    const headEdge = 15;
    const isCentered =
      characterFootX > mo.x - headEdge &&
      characterFootX < mo.x + mo.width + headEdge;
    const landsOnTop =
      this.y + this.height > mo.y && this.y + this.height < mo.y + tolerance;
    return isCentered && landsOnTop;
  }

  /**
   * Checks for a collision with another movable object, considering offsets.
   *
   * @function
   * @param {MovableObject} mo - The other movable object.
   * @returns {boolean} True if colliding, otherwise false.
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * Sets the position and size of the object.
   *
   * @function
   * @param {number} x - The new x position.
   * @param {number} y - The new y position.
   * @param {number} height - The new height.
   * @param {number} width - The new width.
   */
  positionFigure(x, y, height, width) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
  }

  /**
   * Moves the object to the right by its speed, if the game is not stopped.
   *
   * @function
   */
  moveRight() {
    if (!this.stopGame) {
      this.x += this.speed;
      this.otherDirection = false;
    }
  }

  /**
   * Moves the object to the left by its speed, if the game is not stopped.
   *
   * @function
   */
  moveLeft() {
    if (!this.stopGame) {
      this.x -= this.speed;
    }
  }

  /**
   * Plays an animation by cycling through the provided images.
   *
   * @function
   * @param {string[]} images - Array of image paths for the animation.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Reduces the object's energy, moves it backwards, and applies a small vertical speed.
   * Ensures energy does not drop below zero.
   *
   * @function
   */
  hit() {
    this.energy -= 5;
    this.x -= 20;
    this.speedY = 1;
    if (this.energy < 0) {
      this.energy = 0;
    }
  }

  /**
   * Checks if the object has been hurt (energy has dropped).
   *
   * @function
   * @returns {boolean} True if hurt, otherwise false.
   */
  isHurt() {
    return this.checkEnergy > this.energy && this.checkEnergy >= 0;
  }

  /**
   * Checks if the object is dead (energy is zero).
   *
   * @function
   * @returns {boolean} True if dead, otherwise false.
   */
  isDead() {
    return this.energy == 0;
  }
}
