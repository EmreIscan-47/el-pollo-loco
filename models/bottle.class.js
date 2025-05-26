class Bottle extends CollectableObjects{


    constructor(bottleOnGround) {
        super();
        if (bottleOnGround == "right") {
            this.loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
        }else {
            this.loadImage("img/6_salsa_bottle/2_salsa_bottle_on_ground.png");
        }
        
        this.x = 200 + Math.random() * 2000;
        if (this.x > 2000) {
            this.x -= 300;
        }
        this.y = 340;
        this.height = 80;
        this.width = 80;
    }

}