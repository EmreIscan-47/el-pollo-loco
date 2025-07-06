/**
 * Represents a status bar in the game (health, coins, bottles, or endboss).
 * Handles the display and updating of the status bar based on game state.
 *
 * @class
 * @extends DrawableObjects
 */
class StatusBar extends DrawableObjects {
  /**
   * Image paths for the health status bar.
   * @type {string[]}
   */
  IMAGES_HEALTH = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  /**
   * Image paths for the coins status bar.
   * @type {string[]}
   */
  IMAGES_COINS = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];

  /**
   * Image paths for the bottle status bar.
   * @type {string[]}
   */
  IMAGES_BOTTLE = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
  ];

  /**
   * Image paths for the endboss status bar.
   * @type {string[]}
   */
  IMAGES_ENDBOSS = [
    "img/7_statusbars/2_statusbar_endboss/orange/orange0.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange20.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange40.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange60.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange80.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange100.png",
  ];

  /**
   * The current percentage value for the status bar.
   * @type {number}
   * @default 100
   */
  percentage = 100;

  /**
   * The collected value (used for coins or bottles).
   * @type {number}
   * @default 0
   */
  collect = 0;

  /**
   * Creates a new StatusBar instance, loads the relevant images, and sets its position and value.
   *
   * @constructor
   * @param {string} imgs - The type of status bar ("HEALTH", "COINS", "BOTTLE", "ENDBOSS").
   * @param {number} y - The vertical position of the status bar.
   * @param {number} x - The horizontal position of the status bar.
   * @param {number} percentage - The initial percentage value.
   */
  constructor(imgs, y, x, percentage) {
    super();
    this.loadImages(this.IMAGES_HEALTH);
    this.loadImages(this.IMAGES_COINS);
    this.loadImages(this.IMAGES_BOTTLE);
    this.loadImages(this.IMAGES_ENDBOSS);
    this.x = x;
    this.y = y;
    this.width = 150;
    this.height = 50;
    this.loadStatusBar(imgs, percentage);
  }

  /**
   * Loads the appropriate status bar image based on type and percentage.
   *
   * @param {string} imgs - The type of status bar.
   * @param {number} percentage - The percentage to display.
   */
  loadStatusBar(imgs, percentage) {
    switch (imgs) {
      case "HEALTH":
        this.setHealthStatusBar(percentage);
        break;
      case "COINS":
        this.setCoinsStatusBar(percentage);
        break;
      case "BOTTLE":
        this.setBottleStatusBar(percentage);
        break;
      case "ENDBOSS":
        this.setEndbossStatusBar(percentage);
        break;
      default:
        break;
    }
  }

  /**
   * Sets the health status bar image based on the given percentage.
   *
   * @param {number} percentage - The health percentage (0-100).
   */
  setHealthStatusBar(percentage) {
    this.percentage = percentage / 20;
    let path = this.IMAGES_HEALTH[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Sets the coins status bar image based on the given percentage.
   *
   * @param {number} percentage - The coin percentage (0-100).
   */
  setCoinsStatusBar(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_COINS[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Sets the bottle status bar image based on the given percentage.
   *
   * @param {number} percentage - The bottle percentage (0-100).
   */
  setBottleStatusBar(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_BOTTLE[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Sets the endboss status bar image based on the given percentage.
   *
   * @param {number} percentage - The endboss health percentage (0-100).
   */
  setEndbossStatusBar(percentage) {
    this.percentage = percentage / 20;
    let path = this.IMAGES_ENDBOSS[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the image index to use based on the current percentage.
   *
   * @returns {number} The index of the image to use.
   */
  resolveImageIndex() {
    if (this.percentage == 5) {
      return 5;
    } else if (this.percentage >= 4) {
      return 4;
    } else if (this.percentage >= 3) {
      return 3;
    } else if (this.percentage >= 2) {
      return 2;
    } else if (this.percentage >= 1) {
      return 1;
    } else {
      return 0;
    }
  }
}
