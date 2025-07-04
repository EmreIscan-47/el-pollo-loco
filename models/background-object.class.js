/**
 * Represents a background object in the game.
 * Extends the MovableObject class and is used to display background images.
 *
 * @class
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
  /**
   * The vertical position of the background object on the canvas.
   * @type {number}
   */
  y = 0;

  /**
   * The width of the background object.
   * @type {number}
   */
  width = 722;

  /**
   * The height of the background object.
   * @type {number}
   */
  height = 480;

  /**
   * Creates a new BackgroundObject, loads its image, and sets its horizontal position.
   *
   * @constructor
   * @param {string} imagePath - The path to the background image file.
   * @param {number} x - The horizontal position of the background object on the canvas.
   */
  constructor(imagePath, x) {
    super();
    this.loadImage(imagePath);

    /**
     * The horizontal position of the background object on the canvas.
     * @type {number}
     */
    this.x = x;
  }
}
