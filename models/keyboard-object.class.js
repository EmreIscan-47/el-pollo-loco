/**
 * Represents the state of keyboard controls for the game.
 * Stores the status of all relevant keys and idle states.
 *
 * @class
 */
class Keyboard {
  /**
   * Indicates if the left arrow key is pressed.
   * @type {boolean}
   * @default false
   */
  LEFT = false;

  /**
   * Indicates if the right arrow key is pressed.
   * @type {boolean}
   * @default false
   */
  RIGHT = false;

  /**
   * Indicates if the spacebar is pressed.
   * @type {boolean}
   * @default false
   */
  SPACE = false;

  /**
   * Indicates if the up arrow key is pressed.
   * @type {boolean}
   * @default false
   */
  UP = false;

  /**
   * Indicates if the down arrow key is pressed.
   * @type {boolean}
   * @default false
   */
  DOWN = false;

  /**
   * Indicates if the jump key is pressed.
   * @type {boolean}
   * @default false
   */
  JUMP = false;

  /**
   * Indicates if the throw bottle key is pressed.
   * @type {boolean}
   * @default false
   */
  THROWBOTTLE = false;

  /**
   * Indicates if the player is in a short idle state.
   * @type {boolean}
   * @default false
   */
  shortIdle = false;

  /**
   * Indicates if the player is in a long idle state.
   * @type {boolean}
   * @default false
   */
  longIdle = false;

  /**
   * Creates a new Keyboard instance.
   *
   * @constructor
   */
  constructor() {
    
  }
}
