class ThrowableObjects extends MovableObject {
  speedX;
  speedY;
  bottleAnimationInterval;
  visible;
  interval;
  animationInterval;
  bottleSplashInterval;
  bottleBreakSound = new Audio("audio/bottle_break.mp3");
  stopSounds = false;
  isSplashing = true;
  IMAGES_BOTTLES = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];
  constructor(x, y) {
    super().loadImage(
      "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"
    );
    this.loadImages(this.IMAGES_BOTTLES);
    this.loadImages(this.IMAGES_SPLASH);
    this.throwBottleAnimation();
    this.x = 0;
    this.y = 0;
    this.height = 100;
    this.width = 80;
    this.throw(x, y);
  }

  throwBottleAnimation() {
    this.bottleAnimationInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLES);
    }, 100);
  }

  throw(x, y) {
    this.x = x;
    this.y = y;
    this.speedY = 13;
    this.applyGravity();
    this.interval = setInterval(() => {
      if (this.y > 340) {
        this.splashingBottle();
        clearInterval(this.interval);
      } else {
        this.x += 10;
      }
    }, 24);
  }

  splashingBottle() {
    this.y = 340;
    this.speedY = 0;
    clearInterval(this.bottleAnimationInterval);
    let frame = 0;
    if (!this.stopSounds) {
       this.bottleBreakSound.play();
    }
   
    this.animationInterval = setInterval(() => {
      if (frame >= this.IMAGES_SPLASH.length) {
        clearInterval(this.animationInterval);
        this.stopGravity();
        this.loadImage("");
        return;
      }

      this.playAnimation(this.IMAGES_SPLASH);
      frame++;
    }, 25);
  }

  splashingOnEnemy() {
    this.stopGravity();
    this.x = this.x;
    this.y = this.y;
    clearInterval(this.interval);
    clearInterval(this.animationInterval);
    clearInterval(this.bottleAnimationInterval);
    setInterval(() => {
      let i = this.x;
      this.x = i;
    }, 20);
    this.speedY = 0;
    this.bottleSplashInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_SPLASH);
      setInterval(() => {
        this.y = 10000;
        clearInterval(this.bottleSplashInterval);
      }, 50);
    }, 100);
    this.bottleBreakSound.play();
  }
}
