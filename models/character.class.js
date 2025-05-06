class Character extends MovableObject {
  IMAGES_WALKING = [
    "../img/2_character_pepe/2_walk/W-21.png",
    "../img/2_character_pepe/2_walk/W-22.png",
    "../img/2_character_pepe/2_walk/W-23.png",
    "../img/2_character_pepe/2_walk/W-24.png",
    "../img/2_character_pepe/2_walk/W-25.png",
    "../img/2_character_pepe/2_walk/W-26.png"
  ];

  currentImage = 0;
  jump() {}
  constructor() {
    super();
    this.loadImage("../img/2_character_pepe/2_walk/W-21.png");
    this.y = 155;
    this.height = 280;
    this.loadImages(this.IMAGES_WALKING);

    this.animate();
  }

  animate() {
    setInterval(() => {
      let i = this.currentImage % this.IMAGES_WALKING.length;
      this.x += 5
      let path = this.IMAGES_WALKING[i];
      this.img = this.imageCache[path];
      this.currentImage++;
      if (this.x > 750) {
        this.x = -100;
    }
    }, 4500 / 60);
  }
}
