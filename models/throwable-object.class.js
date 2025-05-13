class ThrowableObjects extends MovableObject {
speedX;
speedY;

constructor (x, y) {
    super().loadImage("img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
    this.x = 0;
    this.y = 0;
    this.height = 100;
    this.width = 80;
    this.throw(x, y);
}

    throw(x, y) {
      this.x = x;
      this.y = y;
      this.speedY = 20;
      this.applyGravity();
      setInterval(() => {
        this.x += 10;
      }, 25)
    }
}