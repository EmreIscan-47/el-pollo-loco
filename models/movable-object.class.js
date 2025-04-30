class MovableObject {
    x = 20;
    y = 230;
    img;
    height = 150;
    width = 100;

   loadImage(path) {
    this.img = new Image(); 
    this.img.src = path;
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

    moveLeft(){
        
    }
    constructor() {
        
    }
}