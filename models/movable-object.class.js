class MovableObject {
    x = 20;
    y = 230;
    img;
    height = 150;
    width = 100;
    imageCache = [];
    speed = 1.5
    otherDirection = false;


   loadImage(path) {
    this.img = new Image(); 
    this.img.src = path;
   }

   loadImages(arr) {

    arr.forEach((path) => {
        let img  = new Image();
        img.src = path;
        this.imageCache[path] = img;
    });
   }

   positionFigure(x, y, height, width) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
   }

    moveRight() {
        console.log('Moving right');
    }

    moveLeft() {
        setInterval( () => {
            this.x -= this.speed;
            if (this.x < -450) {
                this.x = 800;
            }
        }, 2000 / 60)
    }
    constructor() {
        
    }
}