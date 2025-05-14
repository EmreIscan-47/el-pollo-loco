class ThrowableObjects extends MovableObject {
speedX;
speedY;
IMAGES_BOTTLES = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png"

];

IMAGES_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png"
    
];
constructor (x, y) {
    super().loadImage("img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
    this.loadImages(this.IMAGES_BOTTLES);
    this.loadImages(this.IMAGES_SPLASH);
    this.throwBottleAnimation();
    this.x = 0;
    this.y = 0;
    this.height = 100;
    this.width = 80;
    this.throw(x, y);

}

throwBottleAnimation(){
    setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLES)
    }, 100);
}

    throw(x, y) {
      this.x = x;
      this.y = y;
      this.speedY = 20;
      this.applyGravity();
      setInterval(() => {
        if (this.y > 296) {

            this.applyGravity();
            this.playAnimation(this.IMAGES_SPLASH)
        
        } else {
            this.x += 10;
        }
      }, 25)
    }
}