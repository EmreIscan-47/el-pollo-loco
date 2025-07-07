/**
 * Handles all collision checks and collision logic for the World.
 */
class WorldCollisionManager {
  /**
   * @param {World} world - The world instance to manage collisions for.
   */
  constructor(world) {
    this.world = world;
  }

  /**
   * Checks for collisions between the character and coins, collects coins if collided.
   */
  checkCollisionsCoins() {
    this.world.collectableObjectsCoins.forEach((coin) => {
      if (this.world.character.isColliding(coin)) {
        if (this.world.character.collectedCoins <= 4) {
          this.world.character.collectedCoins += 1;
          this.world.statusBar[1].loadStatusBar("COINS", this.world.character.collectedCoins);
          coin.loadImage("");
          coin.y = -1000;
          soundManager.play("coinCollect");
        }
      }
    });
  }

  /**
   * Checks for collisions between the character and bottles, collects bottles if collided.
   */
  checkCollisionsBottles() {
    this.world.collectableObjectsBottle.forEach((bottle) => {
      if (this.world.character.isColliding(bottle)) {
        if (this.world.character.collectedBottles <= 4) {
          this.world.character.collectedBottles += 1;
          bottle.loadImage("");
          bottle.y = -1000;
          soundManager.play("bottleCollect");
          this.world.statusBar[2].loadStatusBar("BOTTLE", this.world.character.collectedBottles);
        }
      }
    });
  }

  /**
   * Checks for collisions between the character and enemies, handles collision logic.
   */
  checkCollisionsEnemy() {
    for (let i = 0; i < this.world.level.enemies.length; i++) {
      const enemy = this.world.level.enemies[i];
      if (this.world.character.isCollidingOnTop(enemy)) {
        this.handleTopCollision(enemy);
        break;
      } else if (this.world.character.isColliding(enemy)) {
        this.handleEnemyCollision(enemy);
      }
    }
  }

  /**
   * Handles the logic when the character lands on top of an enemy.
   * @param {MovableObject} enemy - The enemy object.
   */
  handleTopCollision(enemy) {
    this.world.character.speedY = 15;
    enemy.chickenDead();
  }

  /**
   * Handles the logic when the character collides with an enemy.
   * @param {MovableObject} enemy - The enemy object.
   */
  handleEnemyCollision(enemy) {
    this.handleHpOfCharacter(enemy);
    if (this.world.character.energy == 0) {
      this.world.gameOver = true;
      setInterval(() => {
        if (!soundManager.soundMute && !this.world.gameOver) {
          this.world.level.enemies[6].endBossSoundLoop.pause();
        }
      }, 1500);
    }
    this.world.statusBar[0].loadStatusBar("HEALTH", this.world.character.energy);
    if (enemy.name == "Endboss") {
      enemy.startEndBossBattle(false, true, false);
    }
  }

  /**
   * Handles the reduction of the character's health points (HP) when colliding with an enemy.
   * Chickens and little chickens deal less damage, while other enemies (e.g., Endboss) deal more.
   *
   * @param {MovableObject} enemy - The enemy object that the character has collided with.
   */
  handleHpOfCharacter(enemy) {
    if (enemy.name == "chicken" || enemy.name == "little_chicken") {
      this.world.character.hit(10, enemy.name);
    } else {
      this.world.character.hit(25, enemy.name);
    }
  }

  /**
   * Checks for collisions between thrown bottles and enemies.
   */
  checkCollisionWithBottle() {
    if (this.world.throwableObjects[this.world.bottleAmountThrown - 1] != undefined) {
      this.world.level.enemies.forEach((enemy) => {
        for (let index = 0; index < this.world.throwableObjects.length; index++) {
          if (this.world.throwableObjects[index].isColliding(enemy)) {
            this.handleEnemyCollisionWithBottle(enemy, index);
          }
        }
      });
    }
  }

  /**
   * Handles the logic when a thrown bottle collides with an enemy.
   * @param {MovableObject} enemy - The enemy object.
   * @param {number} index - The index of the throwable object.
   */
  handleEnemyCollisionWithBottle(enemy, index) {
    if (enemy.name == "chicken" || (enemy.name == "little_chicken" && enemy.chickenDead())) {
      this.handleChickenCollision(enemy, index);
    }
    if (enemy.name == "Endboss") {
      this.handleEndbossCollision(enemy, index);
    }
  }

  /**
   * Handles the logic when a bottle hits a chicken or little chicken.
   * @param {MovableObject} enemy - The enemy object.
   * @param {number} index - The index of the throwable object.
   */
  handleChickenCollision(enemy, index) {
    enemy.chickenDead();
    this.world.throwableObjects[index].splashingOnEnemy(this.world.x, this.world.y);
  }

  /**
   * Handles the logic when a bottle hits the endboss.
   * @param {MovableObject} enemy - The enemy object.
   * @param {number} index - The index of the throwable object.
   */
  handleEndbossCollision(enemy, index) {
    if (enemy.endBossGotHit) {
      enemy.endBossGotHit = false;
      clearInterval(this.world.runIntervall);
      this.world.throwableObjects[index].splashingOnEnemy(this.world.x, this.world.y);
      enemy.startEndBossBattle(false, false, true);
      enemy.energy -= 20;
      this.handleEndbossDefeat(enemy);
      this.world.statusBar[3].loadStatusBar("ENDBOSS", enemy.energy);
      this.world.run();
    }
  }

  /**
   * Handles the logic when the endboss is defeated.
   * @param {MovableObject} enemy - The endboss object.
   */
  handleEndbossDefeat(enemy) {
    if (enemy.energy == 0) {
      this.world.character.characterWon = true;
      this.world.gameOver = true;
      this.world.winScreenShown = true;
    }
  }
}
