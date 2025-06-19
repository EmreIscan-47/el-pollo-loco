class LittleChicken extends MovableObject {
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];
  stopSounds = false;

  constructor() {
    super();
        this.name = "little_chicken";
        this.loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.x = 200 + Math.random() * 1500;
        this.y = 370;
        this.height = 50;
        this.width = 50;
        this.loadImages(this.IMAGES_WALKING);
        this.animateLittleChicken();
        this.speed = 1.5 + Math.random() * 1.25;
  }

  chickenDead() {
      const deadIntervall = setInterval(() => {
         clearInterval(this.animateChickenInterval);
      clearInterval(this.animateLeftInterval);
      this.loadImage("img/3_enemies_chicken/chicken_small/2_dead/dead.png");
      setInterval(() => {
        this.loadImage("");
        clearInterval(deadIntervall);
        this.y = 1000;
      }, 500);
      }, 200);
     let enemyDead = new Audio("audio/enemyDead.mp3");
    enemyDead.play();
    }
  animateLittleChicken() {
       this.animateChickenInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING)
          }, 6500 / 60);
        /*  this.animateLeftInterval = setInterval(() => {
            this.moveLeft();
          }, 2000 / 60); */
    }
}
