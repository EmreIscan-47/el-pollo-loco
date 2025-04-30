class Cloud extends MovableObject{

    // img/5_background/layers/4_clouds/1.png

    constructor () {
        super();
        this.loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = 0 + Math.random() * 300;
        this.y = 20;
        this.height = 300;
        this.width = 500;
    }
}