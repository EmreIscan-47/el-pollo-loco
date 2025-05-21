class World {
  character = new Character();
  endboss = new Endboss();
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
  bottleAmountThrown;
  runIntervall;
  attackIntervall;
  animateWalkingIntervall;
  startBattleIntervall;

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
    this.statusBar[2].loadStatusBar("BOTTLE", this.character.collectedBottles);
    setInterval(() => {
      this.checkThrowObjects();
    }, 1400);
    this.startBattleIntervall = setInterval(() => {
      this.startWalkingEndbossAnimation();
    }, 20);
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    this.runIntervall = setInterval(() => {
      this.checkCollisionsEnemy();
      this.checkCollisionsCoins();
      this.checkCollisionsBottles();
      this.checkCollisionWithEndboss();
    }, 20);
  }

  checkThrowObjects() {
    if (this.keyboard.THROWBOTTLE && this.character.collectedBottles != 0) {
      this.character.collectedBottles -= 1;

      this.statusBar[2].loadStatusBar(
        "BOTTLE",
        this.character.collectedBottles
      );
      let bottle = new ThrowableObjects(
        this.character.x,
        this.character.y + 100
      );
      this.throwableObjects.push(bottle);
      console.log(this.throwableObjects.length);

      this.bottleAmountThrown = this.throwableObjects.length;
    }
  }

  startWalkingEndbossAnimation() {
    if (this.character.collectedCoins == 5) {
      clearInterval(this.startBattleIntervall);

      this.level.enemies[3].startEndBossBattle(true);
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
      if (this.character.isCollidingOnTop(enemy)) {
        this.character.speedY = 15;
        enemy.chickenDead();
      } else if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusBar[0].loadStatusBar("HEALTH", this.character.energy);
      }
    });
  }

  checkEndBossAttack() {}

  checkCollisionWithEndboss() {
    if (this.throwableObjects[this.bottleAmountThrown - 1] != undefined) {
      this.level.enemies.forEach((enemy) => {
        if (
          this.throwableObjects[this.bottleAmountThrown - 1].isColliding(enemy)
        ) {
          if (enemy.name == "Endboss") {
            clearInterval(this.runIntervall);
            this.throwableObjects[this.bottleAmountThrown - 1].splashingOnEnemy(
              this.x,
              this.y
            );
            this.run();
          }
        }
      });
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.ctx.globalCompositeOperation = "destination-over";
    this.ctx.translate(-this.camera_x, 0);
    this.addObjectsToMap(this.statusBar);
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.callAllAddObjectsToMap();
    this.ctx.translate(-this.camera_x, 0);
    // Draw() wird immer wieder aufgerufen
    self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  callAllAddObjectsToMap() {
    this.addObjectsToMap(this.collectableObjectsCoins);
    this.addObjectsToMap(this.collectableObjectsBottle);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.backgroundObjects);
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
