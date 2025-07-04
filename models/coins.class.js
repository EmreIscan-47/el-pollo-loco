/**
 * Represents a coin collectible in the game.
 * Extends the DrawableObjects class and is used for coin objects that can be collected by the player.
 *
 * @class
 * @extends DrawableObjects
 */
class Coins extends DrawableObjects {
  /**
   * The offset values for the coin's collision box.
   * @type {{top: number, right: number, bottom: number, left: number}}
   */
  offset = {
    top: 35,
    right: 35,
    bottom: 35,
    left: 35,
  };

  /**
   * Creates a new Coins instance, loads its image, and sets its position and size.
   *
   * @constructor
   */
  constructor() {
    super();
    this.loadImage("img/8_coin/coin_2.png");

    /**
     * The horizontal position of the coin on the canvas.
     * Randomized between 200 and 2200, but not exceeding 2000.
     * @type {number}
     */
    this.x = 200 + Math.random() * 2000;
    if (this.x > 2000) {
      this.x -= 300;
    }

    /**
     * The vertical position of the coin on the canvas.
     * @type {number}
     */
    this.y = 340;

    /**
     * The height of the coin.
     * @type {number}
     */
    this.height = 80;

    /**
     * The width of the coin.
     * @type {number}
     */
    this.width = 80;
  }
}
