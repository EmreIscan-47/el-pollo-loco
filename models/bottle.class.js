/**
 * Represents a bottle object in the game.
 * Extends the DrawableObjects class and can be placed on the ground in different orientations.
 *
 * @class
 * @extends DrawableObjects
 */
class Bottle extends DrawableObjects {
  /**
   * The offset values for the bottle's collision box.
   * @type {{top: number, right: number, bottom: number, left: number}}
   */
  offset = {
    top: 5,
    right: 15,
    bottom: 5,
    left: 30,
  }; 

  /**
   * Creates a new Bottle object, loads its image based on orientation,
   * and sets its position and size.
   *
   * @constructor
   * @param {string} bottleOnGround - The orientation of the bottle on the ground ("right" or other).
   */
  constructor(bottleOnGround) {
    super();
    if (bottleOnGround == "right") {
      this.loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    } else {
      this.loadImage("img/6_salsa_bottle/2_salsa_bottle_on_ground.png");
    }

    /**
     * The horizontal position of the bottle on the canvas.
     * Randomized between 200 and 2200, but not exceeding 2000.
     * @type {number}
     */
    this.x = 200 + Math.random() * 2000;
    if (this.x > 2000) {
      this.x -= 300;
    }

    /**
     * The vertical position of the bottle on the canvas.
     * @type {number}
     */
    this.y = 340;

    /**
     * The height of the bottle.
     * @type {number}
     */
    this.height = 80;

    /**
     * The width of the bottle.
     * @type {number}
     */
    this.width = 80;
  }
}
