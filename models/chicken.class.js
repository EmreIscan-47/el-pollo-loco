class Chicken extends MovableObject {
    IMAGES_WALKING = [
        "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
        "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png"
      ];
      currentImage = 0;
    constructor () {
        super();
        this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/2_w.png');
        this.x = 200 + Math.random() * 500;
        this.y = 340;
        this.height = 80;
        this.width = 80;
        this.loadImages(this.IMAGES_WALKING);
        this.animateChicken();
        this.speed = 1.5 + Math.random() * 1.25
    }


    animateChicken() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING)
          }, 6500 / 60);
          this.moveLeft();
    }
}