/**
 * Base class for all drawable objects in the game.
 * Handles image loading, caching, and drawing on the canvas.
 *
 * @class
 */
class DrawableObjects {
  /**
   * The current image object to be drawn.
   * @type {HTMLImageElement}
   */
  img;

  /**
   * Cache for loaded images, keyed by their source path.
   * @type {Object.<string, HTMLImageElement>}
   */
  imageCache = {};

  /**
   * The index of the currently displayed image (for animations).
   * @type {number}
   * @default 0
   */
  currentImage = 0;

  /**
   * The horizontal position of the object on the canvas.
   * @type {number}
   * @default 20
   */
  x = 20;

  /**
   * The vertical position of the object on the canvas.
   * @type {number}
   * @default 230
   */
  y = 230;

  /**
   * The height of the object.
   * @type {number}
   * @default 150
   */
  height = 150;

  /**
   * The width of the object.
   * @type {number}
   * @default 100
   */
  width = 100;

  /**
   * Loads a single image and assigns it to the object.
   *
   * @param {string} path - The path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Loads multiple images and stores them in the image cache.
   *
   * @param {string[]} arr - Array of image file paths to load.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Draws the current image of the object on the given canvas context.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Draws a blue frame around the object for debugging purposes.
   * Only applies to certain subclasses.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Endboss ||
      this instanceof LittleChicken
    ) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  /**
   * Draws a red frame around the object's offset collision box for debugging.
   * Only applies to certain subclasses.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  drawOffsetFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Endboss ||
      this instanceof LittleChicken
    ) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "red";
      ctx.rect(
        this.x + this.offset.left,
        this.y + this.offset.top,
        this.width - this.offset.left - this.offset.right,
        this.height - this.offset.bottom - this.offset.top
      );
      ctx.stroke();
    }
  }

  /**
   * Draws a red frame around the object's head offset collision box for debugging.
   * Only applies to the Endboss subclass.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  drawOffsetHeadFrame(ctx) {
    if (this instanceof Endboss) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "red";
      ctx.rect(
        this.x + this.offset_head.left,
        this.y + this.offset_head.top,
        this.width - this.offset_head.left - this.offset_head.right,
        this.height - this.offset_head.bottom - this.offset_head.top
      );
      ctx.stroke();
    }
  }
}
