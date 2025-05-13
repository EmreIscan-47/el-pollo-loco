class MovableObject extends DrawableObjects {
  speed = 1.5;
  otherDirection = false;
  speedY = 0;
  acceleration = 1;
  energy = 100;
  checkEnergy;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  jump() {
    this.speedY = 18;
  }
  isAboveGround() {
    if(this instanceof ThrowableObjects) {
      return true;
    } else {
      return this.y < 156;
    }
  }

  

  isColliding(mo) {
    return (
      this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x &&
      this.y < mo.y + mo.height
    );
  }

   /* isColliding(mo) {
  return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
  this.y + this.height - this.offset.bottom > mo.y + mo.offset.top && 
  this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
  this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
} */

  positionFigure(x, y, height, width) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
  }

  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  }

  moveLeft() {
    this.x -= this.speed;
  }
  
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }


  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    }
  }

  isHurt() {
   return this.checkEnergy > this.energy && this.checkEnergy >= 0
  }

  isDead() {
    return this.energy == 0;
  }

}
