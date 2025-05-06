class MovableObject {
    x = 20;
    y = 230;
    img;
    height = 150;
    width = 100;
    imageCache = [];
    speed = 1.5
    otherDirection = false;
currentImage = 0;

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
    playAnimation(images) {
        let i = this.currentImage % this.IMAGES_WALKING.length;
        let path = this.IMAGES_WALKING[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
    constructor() {
        
    }
}