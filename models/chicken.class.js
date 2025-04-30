class Chicken extends MovableObject {
  

    constructor () {
        super();
        this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/2_w.png');
        this.x = 200 + Math.random() * 300;
        this.y = 340;
        this.height = 80;
        this.width = 80;
    }
}