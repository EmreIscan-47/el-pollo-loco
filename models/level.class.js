/**
 * Represents a level in the game, containing enemies, clouds, and background objects.
 *
 * @class
 */
class Level {
  /**
   * The array of enemy objects present in the level.
   * @type {Array}
   */
  enemies;

  /**
   * The array of cloud objects present in the level.
   * @type {Array}
   */
  clouds;

  /**
   * The array of background objects present in the level.
   * @type {Array}
   */
  backgroundObjects;

  /**
   * The x-coordinate at which the level ends.
   * @type {number}
   * @default 1800
   */
  level_end_x = 1800;

  /**
   * Creates a new Level instance with the specified enemies, clouds, and background objects.
   *
   * @constructor
   * @param {Array} enemies - The enemies in this level.
   * @param {Array} clouds - The clouds in this level.
   * @param {Array} backgroundObjects - The background objects in this level.
   */
  constructor(enemies, clouds, backgroundObjects) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
  }
}
