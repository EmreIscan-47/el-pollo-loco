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
  IMAGES_WALKING = ["img/3_enemies_chicken/chicken_small/1_walk/1_w.png", "img/3_enemies_chicken/chicken_small/1_walk/2_w.png", "img/3_enemies_chicken/chicken_small/1_walk/3_w.png"];

  /**
   * The offset values for the little chicken's collision box.
   * @type {{top: number, right: number, bottom: number, left: number}}
   */
  offset = {
    top: 10,
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
   * Interval ID for the animation or movement loop of little chicken enemies.
   *
   * @type {number}
   */
  littleChickenLoop;

  /**
   * Creates a new LittleChicken instance, loads its image, sets position and size,
   * loads animation frames, and starts the walking animation.
   *
   * @constructor
   */
  constructor() {
    super();
    this.name = "little_chicken";
    this.loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.x = 200 + Math.random() * 1500;
    this.y = 365;
    this.height = 50;
    this.width = 50;
    this.loadImages(this.IMAGES_WALKING);
    this.animateLittleChicken();
    this.speed = 1.5 + Math.random() * 1.25;
    if (!soundManager.soundMute) {
      this.littleChickenLoop = soundManager.play("littleChickenSound", 0.3, true);
      this.littleChickenLoop.play();
    }
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
    if (!soundManager.soundMute) {
      this.littleChickenLoop.pause();
    }
    soundManager.play("chickenDead");
  }

  /**
   * Starts the walking animation and movement to the left for the little chicken.
   *
   * @function
   */
  animateLittleChicken() {
    this.animateChickenInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 6500 / 60);

    this.animateLeftInterval = setInterval(() => {
      this.moveLeft();
    }, 2000 / 60);
  }
}
