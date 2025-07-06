/**
 * Represents a throwable object (e.g., a bottle) in the game.
 * Handles throwing, gravity, splash animation, and sound effects.
 *
 * @class
 * @extends MovableObject
 */
class ThrowableObjects extends MovableObject {
  /**
   * The horizontal speed of the throwable object.
   * @type {number}
   */
  speedX;

  /**
   * The vertical speed of the throwable object.
   * @type {number}
   */
  speedY;

  /**
   * Interval ID for the bottle rotation animation.
   * @type {number}
   */
  bottleAnimationInterval;

  /**
   * Indicates if the object is currently visible.
   * @type {boolean}
   */
  visible;

  /**
   * Interval ID for the throw movement.
   * @type {number}
   */
  interval;

  /**
   * Interval ID for the splash animation.
   * @type {number}
   */
  animationInterval;

  /**
   * Interval ID for the bottle splash sequence.
   * @type {number}
   */
  bottleSplashInterval;

  /**
   * Audio object for the bottle break sound.
   * @type {HTMLAudioElement}
   */
  bottleBreakSound = new Audio("audio/bottle_break.mp3");

  /**
   * Indicates if sound effects should be stopped.
   * @type {boolean}
   * @default false
   */
  stopSounds = false;

  /**
   * Indicates if the bottle is in the splash state.
   * @type {boolean}
   * @default true
   */
  isSplashing = true;

  /**
   * Image paths for the bottle rotation animation.
   * @type {string[]}
   */
  IMAGES_BOTTLES = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  /**
   * Image paths for the bottle splash animation.
   * @type {string[]}
   */
  IMAGES_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  /**
   * Creates a new ThrowableObjects instance, loads images, and starts the throw animation.
   *
   * @constructor
   * @param {number} x - The initial x position.
   * @param {number} y - The initial y position.
   */
  constructor(x, y) {
    super().loadImage("img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
    this.loadImages(this.IMAGES_BOTTLES);
    this.loadImages(this.IMAGES_SPLASH);
    this.throwBottleAnimation();
    this.x = 0;
    this.y = 0;
    this.height = 100;
    this.width = 80;
    this.throw(x, y);
  }

  /**
   * Starts the bottle rotation animation.
   *
   * @function
   */
  throwBottleAnimation() {
    this.bottleAnimationInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLES);
    }, 100);
  }

  /**
   * Starts the throw movement, applies gravity, and checks for ground collision.
   *
   * @function
   * @param {number} x - The starting x position.
   * @param {number} y - The starting y position.
   */
  throw(x, y) {
    this.x = x;
    this.y = y;
    this.speedY = 13;
    this.applyGravity();
    this.interval = setInterval(() => {
      if (this.y > 340 || this.x >= 2000) {
        this.splashingBottle();
        clearInterval(this.interval);
      } else {
        this.x += 10;
      }
    }, 24);
  }

  /**
   * Handles the splash animation and sound when the bottle hits the ground.
   *
   * @function
   */
  splashingBottle() {
    this.y = this.y;
    this.speedY = 0;
    if (this.x >= 2000) {
      this.x = 2000;
    }
    clearInterval(this.bottleAnimationInterval);
    let frame = 0;
    if (!this.stopSounds) {
      soundManager.play("bottleBreak");
    }
    this.startSplashAnimation(frame);
  }

  /**
   * Starts the splash animation sequence.
   *
   * @function
   * @param {number} frame - The starting frame index.
   */
  startSplashAnimation(frame) {
    this.animationInterval = setInterval(() => {
      if (frame >= this.IMAGES_SPLASH.length) {
        clearInterval(this.animationInterval);
        this.stopGravity();
        this.loadImage("");
        this.y = 10000;
        return;
      }
      this.playAnimation(this.IMAGES_SPLASH);
      frame++;
    }, 25);
  }

  /**
   * Handles the splash animation and sound when the bottle hits an enemy.
   *
   * @function
   */
  splashingOnEnemy() {
    this.stopGravity();
    this.x = this.x;
    this.y = this.y;
    clearInterval(this.interval);
    clearInterval(this.animationInterval);
    clearInterval(this.bottleAnimationInterval);
    this.keepXPosition();
    this.speedY = 0;
    this.startBottleSplash();
    soundManager.play("bottleBreak");
  }

  /**
   * Keeps the bottle's x position fixed during the splash animation.
   *
   * @function
   */
  keepXPosition() {
    setInterval(() => {
      let i = this.x;
        this.x = i;
      
    }, 20);
  }

  /**
   * Starts the bottle splash animation and moves the bottle off-screen after it finishes.
   *
   * @function
   */
  startBottleSplash() {
    this.bottleSplashInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_SPLASH);
      setInterval(() => {
        this.y = 10000;
        clearInterval(this.bottleSplashInterval);
      }, 50);
    }, 100);
  }
}
