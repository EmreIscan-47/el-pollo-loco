class World {
  character = new Character();
  level = level1;
  ctx;
  canvas;
  keyboard;
  camera_x = 0;
  statusBar = [
    new StatusBar("HEALTH", 0, 100),
    new StatusBar("COINS", 50, 0),
    new StatusBar("BOTTLE", 100, 0),
  ];
  throwableObjects = [];

  collectableObjectsCoins = [
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins(),
  ];

  collectableObjectsBottle = [
    new Bottle(),
    new Bottle(),
    new Bottle(),
    new Bottle(),
    new Bottle(),
    new Bottle(),
    new Bottle(),
  ];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollisionsEnemy();
      this.checkCollisionsCoins();
      this.checkCollisionsBottles();
      this.checkThrowObjects();
    }, 200);
  }

  checkThrowObjects() {
    if (this.keyboard.THROWBOTTLE) {
      let bottle = new ThrowableObjects(
        this.character.x,
        this.character.y + 100
      );
      this.throwableObjects.push(bottle);
    }
  }

  checkCollisionsCoins() {
    this.collectableObjectsCoins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        if (this.character.collectedCoins <= 4) {
          this.character.collectedCoins += 1;
          this.statusBar[1].loadStatusBar(
            "COINS",
            this.character.collectedCoins
          );
          coin.loadImage("");
          coin.y = -1000;
        } else {
        }

      }
    });
  }

  checkCollisionsBottles() {
    this.collectableObjectsBottle.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        if (this.character.collectedBottles <= 4) {
          this.character.collectedBottles += 1;
          bottle.loadImage("");
          bottle.y = -1000;
          this.statusBar[2].loadStatusBar(
            "BOTTLE",
            this.character.collectedBottles
          );
        }
      }
    });
  }

  checkCollisionsEnemy() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        console.log(
          "Collision with Character, energy",
          this.character.energy,
          this.character.checkEnergy
        );
        this.character.hit();
        this.statusBar[0].loadStatusBar("HEALTH", this.character.energy);
      }
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.ctx.globalCompositeOperation = "destination-over";
    this.ctx.translate(-this.camera_x, 0);
    this.addObjectsToMap(this.statusBar);
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);

    this.addObjectsToMap(this.collectableObjectsCoins);
    this.addObjectsToMap(this.collectableObjectsBottle);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.backgroundObjects);

    this.ctx.translate(-this.camera_x, 0);
    // Draw() wird immer wieder aufgerufen
    self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(obj) {
    obj.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
