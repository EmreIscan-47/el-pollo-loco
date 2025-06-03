class World {
  character = new Character();
  level = level1;
  ctx;
  canvas;
  keyboard;
  camera_x = 0;
  statusBar = [
    new StatusBar("HEALTH", 0, 20, 100),
    new StatusBar("COINS", 50, 20, 0),
    new StatusBar("BOTTLE", 100, 20, 0),
  ];
  throwableObjects = [];
  bottleAmountThrown;
  runIntervall;
  attackIntervall;
  animateWalkingIntervall;
  startBattleIntervall;
  thrownBottle = false;

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
    new Bottle("right"),
    new Bottle("left"),
    new Bottle("right"),
    new Bottle("left"),
    new Bottle("right"),
    new Bottle("left"),
    new Bottle("right"),
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
    }, 500);
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
      if (!this.thrownBottle) {
        this.character.collectedBottles -= 1;

        this.thrownBottle = true;
        console.log(this.thrownBottle);

        this.statusBar[2].loadStatusBar(
          "BOTTLE",
          this.character.collectedBottles
        );
        let bottle = new ThrowableObjects(
          this.character.x,
          this.character.y + 100
        );
        this.throwableObjects.push(bottle);

        this.bottleAmountThrown = this.throwableObjects.length;
        setInterval(() => {
          this.thrownBottle = false;
        }, 1500);
      }
    }
  }

  startWalkingEndbossAnimation() {
    if (this.character.collectedCoins == 5) {
      clearInterval(this.startBattleIntervall);
      this.level.enemies[6].startEndBossBattle(true, false, false);
      let endbossBar = new StatusBar("ENDBOSS", 0, 500, 100);
      this.statusBar.push(endbossBar);
    }
  }

  checkCollisionsCoins() {
    this.collectableObjectsCoins.forEach((coin) => {
      if (this.character.isCollidingObjects(coin)) {
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
      if (this.character.isCollidingObjects(bottle)) {
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
        console.log(enemy);
        
        if ((enemy.name == "Endboss")) {
          
          enemy.startEndBossBattle(false, true, false);
        }
      }
    });
  }

  checkEndBossAttack() {}

  checkCollisionWithEndboss() {
    if (this.throwableObjects[this.bottleAmountThrown - 1] != undefined) {
      this.level.enemies.forEach((enemy) => {
        for (let index = 0; index < this.throwableObjects.length; index++) {
          if (this.throwableObjects[index].isCollidingObjects(enemy)) {
            if (enemy.name == "chicken" && enemy.chickenDead()) {
               enemy.chickenDead();
            }
            
            if (enemy.name == "Endboss") {
              if (enemy.endBossGotHit) {
                enemy.endBossGotHit = false;
                clearInterval(this.runIntervall);
                this.throwableObjects[
                  index
                ].splashingOnEnemy(this.x, this.y);
                enemy.startEndBossBattle(false, false, true);
                enemy.energy -= 20;
                if (enemy.energy == 0) {
                  this.character.characterWon = true;
                }
                this.statusBar[3].loadStatusBar("ENDBOSS", enemy.energy);
                this.run();
              }
            }
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
    mo.drawOffsetFrame(this.ctx)

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
