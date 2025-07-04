/**
 * Represents a small chicken enemy in the game.
 * Handles movement, walking animation, and death behavior.
 *
 * @class
 * @extends MovableObject
 */
class LittleChicken extends MovableObject {
  /**
   * Image paths for the little chicken's walking animation.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  /**
   * The offset values for the little chicken's collision box.
   * @type {{top: number, right: number, bottom: number, left: number}}
   */
  offset = {
    top: 8,
    right: 2,
    bottom: 0,
    left: 2,
  };

  /**
   * Indicates if all sounds should be stopped.
   * @type {boolean}
   * @default false
   */
  stopSounds = false;

  /**
   * Creates a new LittleChicken instance, loads its image, sets position and size,
   * loads animation frames, and starts the walking animation.
   *
   * @constructor
   */
  constructor() {
    super();
    /**
     * The name of the enemy.
     * @type {string}
     */
    this.name = "little_chicken";
    this.loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");

    /**
     * The horizontal position of the little chicken on the canvas.
     * Randomized between 200 and 1700.
     * @type {number}
     */
    this.x = 200 + Math.random() * 1500;

    /**
     * The vertical position of the little chicken on the canvas.
     * @type {number}
     */
    this.y = 365;

    /**
     * The height of the little chicken.
     * @type {number}
     */
    this.height = 50;

    /**
     * The width of the little chicken.
     * @type {number}
     */
    this.width = 50;

    this.loadImages(this.IMAGES_WALKING);
    this.animateLittleChicken();

    /**
     * The movement speed of the little chicken.
     * Randomized between 1.5 and 2.75.
     * @type {number}
     */
    this.speed = 1.5 + Math.random() * 1.25;
  }

  /**
   * Handles the little chicken's death animation and moves it off-screen after a delay.
   *
   * @function
   */
  chickenDead() {
    const deadIntervall = setInterval(() => {
      clearInterval(this.animateChickenInterval);
      clearInterval(this.animateLeftInterval);
      this.loadImage("img/3_enemies_chicken/chicken_small/2_dead/dead.png");
      setInterval(() => {
        this.loadImage("");
        clearInterval(deadIntervall);
        this.y = 1000;
      }, 500);
    }, 200);
    soundManager.play("chickenDead");
  }

  /**
   * Starts the walking animation and movement to the left for the little chicken.
   *
   * @function
   */
  animateLittleChicken() {
    /**
     * Interval ID for the walking animation.
     * @type {number}
     */
    this.animateChickenInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 6500 / 60);

    /**
     * Interval ID for the leftward movement.
     * @type {number}
     */
    this.animateLeftInterval = setInterval(() => {
      this.moveLeft();
    }, 2000 / 60);
  }
}
