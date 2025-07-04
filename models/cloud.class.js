/**
 * Represents a cloud in the game background.
 * Clouds are animated and move to the left across the screen.
 *
 * @class
 * @extends MovableObject
 */
class Cloud extends MovableObject {

  /**
   * Creates a new Cloud instance, loads its image, sets initial position and size,
   * and starts its leftward animation.
   *
   * @constructor
   */
  constructor() {
    super();
    this.loadImage("img/5_background/layers/4_clouds/1.png");

    /**
     * The horizontal position of the cloud on the canvas.
     * Randomized between 0 and 500.
     * @type {number}
     */
    this.x = 0 + Math.random() * 500;

    /**
     * The vertical position of the cloud on the canvas.
     * @type {number}
     */
    this.y = 20;

    /**
     * The height of the cloud.
     * @type {number}
     */
    this.height = 300;

    /**
     * The width of the cloud.
     * @type {number}
     */
    this.width = 500;

    this.animate();
  }

  /**
   * Animates the cloud by moving it to the left.
   *
   * @function
   */
  animate() {
    this.moveLeft();
  }
}
