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
    this.x = 200 + Math.random() * 1500;
    if (this.x > 2000) {
      this.x -= 300;
    }
    this.y = 340;
    this.height = 80;
    this.width = 80;
  }
}
