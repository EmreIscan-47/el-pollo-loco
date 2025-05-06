class BackgroundObject extends MovableObject {
y =0;
width = 722;
height = 480;
    constructor(imagePath, x) {
         super();
         this.loadImage(imagePath);

         this.x = x;
    }
}