/**
 * Represents a chicken enemy in the game.
 * Handles movement, animation, and sound effects for the chicken.
 *
 * @class
 * @extends MovableObject
 */
class Chicken extends MovableObject {
  /**
   * The name of the enemy.
   * @type {string}
   */
  name;

  /**
   * Interval ID for the chicken's walking animation.
   * @type {number}
   */
  animateChickenInterval;

  /**
   * Interval ID for the chicken's movement to the left (currently unused).
   * @type {number}
   */
  animateLeftInterval;

  /**
   * Image paths for the chicken's walking animation.
   * @type {string[]}
   */
  IMAGES_WALKING = ["img/3_enemies_chicken/chicken_normal/1_walk/1_w.png", "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png", "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png"];

  /**
   * The index of the currently displayed animation image.
   * @type {number}
   * @default 0
   */
  currentImage = 0;

  /**
   * Indicates if all sounds should be stopped.
   * @type {boolean}
   * @default false
   */
  stopSounds = false;

  /**
   * The offset values for the chicken's collision box.
   * @type {{top: number, right: number, bottom: number, left: number}}
   */
  offset = {
    top: 9,
    right: 4,
    bottom: 10,
    left: 4,
  };

  /**
   * Creates a new Chicken instance, loads its images, sets initial position and size,
   * and starts its animation.
   *
   * @constructor
   */
  constructor() {
    super();
    this.name = "chicken";
    this.loadImage("img/3_enemies_chicken/chicken_normal/1_walk/2_w.png");
    this.x = 500 + Math.random() * 800;
    this.y = 340;
    this.height = 80;
    this.width = 80;
    this.loadImages(this.IMAGES_WALKING);
    this.animateChicken();
    this.speed = 1.5 + Math.random() * 1.25;
  }

  /**
   * Handles the chicken's death animation and moves it off-screen after a delay.
   *
   * @function
   */
  chickenDead() {
    const deadIntervall = setInterval(() => {
      clearInterval(this.animateChickenInterval);
      clearInterval(this.animateLeftInterval);
      this.loadImage("img/3_enemies_chicken/chicken_normal/2_dead/dead.png");
      setInterval(() => {
        this.loadImage("");
        clearInterval(deadIntervall);
        this.y = 1000;
      }, 500);
    }, 200);
    soundManager.play("chickenDead");
  }

  /**
   * Starts the walking animation for the chicken and plays the chicken sound.
   *
   * @function
   */
  animateChicken() {
    this.animateChickenInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
      if (!this.stopSounds) {
        soundManager.play("chickenSound", 0.1);
      }
    }, 6500 / 60);

    this.animateLeftInterval = setInterval(() => {
      this.moveLeft();
    }, 2000 / 60);
  }
}
