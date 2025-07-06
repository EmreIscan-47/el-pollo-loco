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

    this.x = 200 + Math.random() * 2000;
    if (this.x > 2000) {
      this.x -= 300;
    }
    this.y = 340;
    this.height = 80;
    this.width = 80;
  }
}
