/**
 * Represents the Endboss enemy in the game.
 * Handles all animations, states, and interactions for the boss character.
 *
 * @class
 * @extends MovableObject
 */
class Endboss extends MovableObject {
  /**
   * Image paths for the alert animation.
   * @type {string[]}
   */
  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  /**
   * Image paths for the walking animation.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  /**
   * Image paths for the attack animation.
   * @type {string[]}
   */
  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  /**
   * Image paths for the hurt animation.
   * @type {string[]}
   */
  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  /**
   * Image paths for the dead animation.
   * @type {string[]}
   */
  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  /**
   * The name of the boss.
   * @type {string}
   */
  name;

  /**
   * The boss's current energy (health).
   * @type {number}
   * @default 100
   */
  energy = 100;

  /**
   * The boss's maximum energy (health).
   * @type {number}
   * @default 100
   */
  checkEnergy = 100;

  /** @type {number} */ animateEndbossInterval;
  /** @type {number} */ animateWalkingInterval;
  /** @type {number} */ animateLeftInterval;
  /** @type {number} */ animateAlertInterval;
  /** @type {number} */ animateAttackInterval;
  /** @type {number} */ animateHurtInterval;
  /** @type {number} */ deadInterval;

  /**
   * Indicates if the end boss battle has started.
   * @type {boolean}
   * @default false
   */
  startEndBattle = false;

  /**
   * Indicates if the boss is currently attacking the character.
   * @type {boolean}
   * @default false
   */
  attackCharacter = false;

  /**
   * Indicates if the boss has been hit.
   * @type {boolean}
   * @default true
   */
  endBossGotHit = true;

  /**
   * Indicates if the boss is dead.
   * @type {boolean}
   * @default false
   */
  endBossIsDead = false;

  /**
   * Indicates if boss sounds should be stopped.
   * @type {boolean}
   * @default false
   */
  stopSounds = false;

  /**
   * Helper variable for sound playback.
   * @type {number}
   * @default 0
   */
  i = 0;

  /**
   * Helper variable for sound playback.
   * @type {number}
   * @default 0
   */
  j = 0;

  /**
   * Audio loop for the end boss sound.
   * @type {HTMLAudioElement}
   */
  endBossSoundLoop;

  /**
   * The offset values for the boss's collision box.
   * @type {{top: number, left: number, right: number, bottom: number}}
   */
  offset = {
    top: 100,
    left: 30,
    right: 90,
    bottom: 10,
  };

  /**
   * Creates a new Endboss instance, loads images, sets position and size, and starts the battle logic.
   *
   * @constructor
   */
  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.name = "Endboss";
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);

    /**
     * The horizontal position of the boss on the canvas.
     * @type {number}
     */
    this.x = 3000;

    /**
     * The height of the boss.
     * @type {number}
     */
    this.height = 500;

    /**
     * The width of the boss.
     * @type {number}
     */
    this.width = 500;

    /**
     * The vertical position of the boss on the canvas.
     * @type {number}
     */
    this.y = -30;

    this.startEndBossBattle(false, false, false);

    this.deadInterval = setInterval(() => {
      if (this.energy == 0) {
        this.endBossIsDead = true;
      }
      if (this.endBossIsDead) {
        this.endBossDead();
      }
    }, 1000);

    /**
     * The movement speed of the boss (randomized).
     * @type {number}
     */
    this.speed = 2.5 + Math.random() * 6.25;
  }

  /**
   * Controls the animation and state transitions for the end boss.
   *
   * @param {boolean} startEndBattle - Whether to start the battle.
   * @param {boolean} attackCharacter - Whether the boss should attack.
   * @param {boolean} hurtEndboss - Whether the boss should play the hurt animation.
   */
  startEndBossBattle(startEndBattle, attackCharacter, hurtEndboss) {
    if (startEndBattle) {
      clearInterval(this.animateAlertInterval);
      clearInterval(this.animateAttackInterval);
      clearInterval(this.animateHurtInterval);
      this.animateEndBoss();
    } else if (attackCharacter) {
      clearInterval(this.animateWalkingInterval);
      clearInterval(this.animateLeftInterval);
      clearInterval(this.animateHurtInterval);
      this.animateAttack();
    } else if (hurtEndboss) {
      clearInterval(this.animateWalkingInterval);
      clearInterval(this.animateLeftInterval);
      this.animateHurtEndboss();
    } else {
      this.animate();
    }
  }

  /**
   * Plays the alert animation for the boss.
   */
  animate() {
    this.animateAlertInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_ALERT);
    }, 6500 / 5);
  }

  /**
   * Plays the walking animation and moves the boss to the left.
   * Also starts the end boss sound loop.
   */
  animateEndBoss() {
    if (!this.endBossIsDead) {
      this.animateWalkingInterval = setInterval(() => {
        this.playAnimation(this.IMAGES_WALKING);
      }, 6500 / 60);
      this.animateLeftInterval = setInterval(() => {
        this.moveLeft();
        if (this.j == 0) {
          this.j++;
          this.endBossSoundLoop = soundManager.play("endBossSound", 1, true);
          this.endBossSoundLoop.play();
        }
      }, 2000 / 60);
    }
  }

  /**
   * Plays the attack animation for the boss.
   * When finished, returns to the alert/walking animation.
   */
  animateAttack() {
    if (!this.endBossIsDead) {
      let frame = 0;
      this.animateAttackInterval = setInterval(() => {
        if (frame >= this.IMAGES_ATTACK.length) {
          this.startEndBossBattle(true, false, false);
        } else {
          let i = frame % this.IMAGES_ATTACK.length;
          let path = this.IMAGES_ATTACK[i];
          this.img = this.imageCache[path];
          frame++;
        }
      }, 100);
    }
  }

  /**
   * Plays the hurt animation for the boss.
   * When finished, returns to the alert/walking animation and plays the hurt sound.
   */
  animateHurtEndboss() {
    if (!this.endBossIsDead) {
      let frame = 0;
      this.animateHurtInterval = setInterval(() => {
        if (frame >= this.IMAGES_HURT.length) {
          this.endBossGotHit = true;
          this.startEndBossBattle(true, false, false);
          this.endBossHurtSound();
          return;
        } else {
          let i = frame % this.IMAGES_HURT.length;
          let path = this.IMAGES_HURT[i];
          this.img = this.imageCache[path];
          frame++;
        }
      }, 100);
    }
  }

  /**
   * Plays the boss's hurt sound and resumes the main sound loop after a short delay.
   */
  endBossHurtSound() {
    this.endBossSoundLoop.pause();
    soundManager.play("endBossHurt", 0.7);
    setTimeout(() => {
      this.endBossSoundLoop.play();
    }, 500);
  }

  /**
   * Handles the boss's death animation and sound, and clears all intervals.
   */
  endBossDead() {
    this.endBossSoundLoop.pause();
    this.clearEverything();
    setInterval(() => {
      this.playAnimation(this.IMAGES_DEAD);
    }, 200);
    if (!this.stopSounds && this.i == 0) {
      soundManager.play("endBossDead", 0.5);
      this.i++;
    }
  }

  /**
   * Clears all animation intervals for the boss.
   */
  clearEverything() {
    clearInterval(this.animateAlertInterval);
    clearInterval(this.animateAttackInterval);
    clearInterval(this.animateWalkingInterval);
    clearInterval(this.animateLeftInterval);
    clearInterval(this.animateHurtInterval);
  }
}
