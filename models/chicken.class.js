class Chicken extends MovableObject {
  name;
  animateChickenInterval;
  animateLeftInterval;
    IMAGES_WALKING = [
        "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
        "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png"
      ];
      currentImage = 0;

    
    
    constructor () {
        super();
        this.name = "chicken;"
        this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/2_w.png');
        this.x = 200 + Math.random() * 1500;
        this.y = 340;
        this.height = 80;
        this.width = 80;
        this.loadImages(this.IMAGES_WALKING);
        this.animateChicken();
        this.speed = 1.5 + Math.random() * 1.25
    }
    
    chickenDead() {
      const deadIntervall = setInterval(() => {
         clearInterval(this.animateChickenInterval);
      clearInterval(this.animateLeftInterval);
      this.loadImage("img/3_enemies_chicken/chicken_normal/2_dead/dead.png");
      setInterval(() => {
        this.loadImage("");
        clearInterval(deadIntervall);
        this.y = 1000;
      }, 500);
      }, 200);
     
    }

    animateChicken() {
       this.animateChickenInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING)
          }, 6500 / 60);
         this.animateLeftInterval = setInterval(() => {
            this.moveLeft();
          }, 2000 / 60);
    }
}