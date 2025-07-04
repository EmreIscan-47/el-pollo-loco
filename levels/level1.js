/**
 * The global variable holding the current level instance.
 * @type {Level}
 */
let level1;

/**
 * Initializes the first level of the game by creating a new Level instance
 * with predefined enemies, clouds, and background objects.
 *
 * @function
 * @global
 */
function initLevel() {
  level1 = new Level(
    [
      new Chicken(), 
      new Chicken(), 
      new Chicken(),
      new LittleChicken(),
      new LittleChicken(),
      new LittleChicken(),
      new Endboss()
    ],
    [
      new Cloud()
    ],
    [
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -719),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", -719),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -719),
      new BackgroundObject("img/5_background/layers/air.png", -719),

      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/air.png", 0),
      
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 718),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 718),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 718),
      new BackgroundObject("img/5_background/layers/air.png", 718),

      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 718*2),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 718*2),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 718*2),
      new BackgroundObject("img/5_background/layers/air.png", 718*2),
      
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 718*3),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 718*3),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 718*3),
      new BackgroundObject("img/5_background/layers/air.png", 718*3)
    ]
  );
}
