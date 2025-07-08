/**
 * Represents the main character in the game.
 * Handles movement, state, animations, and interactions.
 *
 * @class
 * @extends MovableObject
 */
class Character extends MovableObject {
  /**
   * Image paths for the character's walking animation.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  /**
   * Image paths for the character's jumping animation.
   * @type {string[]}
   */
  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  /**
   * Image paths for the character's dying animation.
   * @type {string[]}
   */
  IMAGES_DYING = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  /**
   * Image paths for the character's hurt animation.
   * @type {string[]}
   */
  IMAGES_HURT = ["img/2_character_pepe/4_hurt/H-41.png", "img/2_character_pepe/4_hurt/H-42.png", "img/2_character_pepe/4_hurt/H-43.png"];

  /**
   * Image paths for the character's short idle animation.
   * @type {string[]}
   */
  IMAGES_SHORT_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  /**
   * Image paths for the character's long idle animation.
   * @type {string[]}
   */
  IMAGES_LONG_IDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  /**
   * Reference to the game world.
   * @type {World}
   */
  world;

  /**
   * The character's movement speed.
   * @type {number}
   * @default 2
   */
  speed = 2;

  /**
   * The index of the currently displayed animation image.
   * @type {number}
   * @default 0
   */
  currentImage = 0;

  /**
   * The current vertical speed (for jumping/falling).
   * @type {number}
   * @default 0
   */
  speedY = 0;

  /**
   * The character's acceleration (gravity).
   * @type {number}
   * @default 1
   */
  acceleration = 1;

  /**
   * The character's current energy (health).
   * @type {number}
   * @default 100
   */
  energy = 100;

  /**
   * The character's maximum energy (health).
   * @type {number}
   * @default 100
   */
  checkEnergy = 100;

  /**
   * The number of coins collected by the character.
   * @type {number}
   * @default 0
   */
  collectedCoins = 0;

  /**
   * The number of bottles collected by the character.
   * @type {number}
   * @default 5
   */
  collectedBottles = 5;

  /**
   * Counter for idle state.
   * @type {number}
   * @default 0
   */
  idleCount = 0;

  /**
   * Interval ID for the idle sound.
   * @type {number}
   */
  idleSoundIntervall;

  /**
   * The audio object for the character's movement sound.
   * @type {HTMLAudioElement}
   */
  moveSound = new Audio("audio/footStep.mp3");

  /**
   * Indicates if the character is dead.
   * @type {boolean}
   * @default false
   */
  characterDead = false;

  /**
   * Indicates if the character has won the game.
   * @type {boolean}
   * @default false
   */
  characterWon = false;

  /**
   * Indicates if all sounds should be stopped.
   * @type {boolean}
   * @default false
   */
  stopSounds = false;

  /**
   * Interval or reference for the snoring sound loop.
   * @type {number}
   */
  snoreLoop;

  /**
   * The offset values for the character's collision box.
   * @type {{top: number, left: number, right: number, bottom: number}}
   */
  offset = {
    top: 90,
    left: 20,
    right: 30,
    bottom: 10,
  };

  /**
   * Creates a new Character instance, loads all necessary images, sets initial position and size,
   * applies gravity, and starts the animation loop.
   *
   * @constructor
   */
  constructor() {
    super();
    this.loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.y = 155;
    this.height = 280;
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DYING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_SHORT_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.applyGravity("Character");
    this.animate();
  }

  /**
   * Starts the character's animation and movement intervals if the character has not won.
   *
   * @function
   */
  animate() {
    if (!this.characterWon) {
      this.startMovementInterval();
      this.startAnimationInterval();
      this.startHurtInterval();
    }
  }

  /**
   * Starts the interval for handling character movement and camera position.
   *
   * @function
   */
  startMovementInterval() {
    setInterval(() => {
      if (!this.characterDead && !this.characterWon) {
        this.handleHorizontalMovement();
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
          this.jump();
        }
        this.world.camera_x = -this.x + 150;
      }
    }, 1000 / 80);
  }

  /**
   * Handles horizontal movement of the character based on keyboard input.
   * Plays footstep sound if moving.
   *
   * @function
   */
  handleHorizontalMovement() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight();     
      if (!this.stopSounds && this.y > 154) {
        soundManager.play("footStep");
      }
    } else if (this.world.keyboard.LEFT && this.x > 0) {
      this.moveLeft();
      if (!this.stopSounds && this.y > 154) {
        soundManager.play("footStep");
      }
      this.otherDirection = true;
    }
  }

  /**
   * Starts the interval for handling animation states (walking, jumping, dying, idle).
   *
   * @function
   */
  startAnimationInterval() {
    setInterval(() => {
      if (this.isDead()) {
        this.characterDead = true;
        this.speedY += 10;
        this.playAnimation(this.IMAGES_DYING);
      }
      if (!this.characterDead && !this.characterWon) {
        this.handleAnimationStates();
      }
    }, 1000 / 10);
  }

  /**
   * Determines and plays the correct animation state based on character status.
   *
   * @function
   */
  handleAnimationStates() {
    if (this.isAboveGround()) {
      console.log(this.speedY);
      resetTimer();
      this.playAnimation(this.IMAGES_JUMPING);
      soundManager.pause("characterSnoring");
    } else {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
        soundManager.pause("characterSnoring");
      }
    }
    this.handleIdleAnimations();
  }

  /**
   * Handles idle animations and sounds based on idle state.
   *
   * @function
   */
  handleIdleAnimations() {
    if (this.world.keyboard.shortIdle && this.isAboveGround) {
      this.playAnimation(this.IMAGES_SHORT_IDLE);
    } else if (this.world.keyboard.longIdle) {
      this.playAnimation(this.IMAGES_LONG_IDLE);
      this.longIdleSound();
    } else {
      if (this.idleCount == 1) {
        if (!soundManager.soundMute) {
          this.snoreLoop.pause();
          this.snoreLoop.currentTime = 0;
        }
        this.idleCount = 0;
      }
    }
  }

  /**
   * Starts the interval for handling the hurt animation and logic.
   *
   * @function
   */
  startHurtInterval() {
    setInterval(() => {
      if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
        this.checkEnergy -= 5;
        this.x -= 2;
        soundManager.play("characterHurt");
        if (this.otherDirection == true) {
          this.x += 10;
        }
      }
    }, 1000 / 20);
  }

  /**
   * Plays the long idle (snoring) sound if not already playing.
   *
   * @function
   */
  longIdleSound() {
    if (this.idleCount == 0) {
      this.idleCount++;
      this.snoreLoop = soundManager.play("characterSnoring", 1.0, true);
      if (!soundManager.soundMute) {
        this.snoreLoop.play();
      }
    }
  }

  /**
   * Makes the character jump when landing on an enemy by stopping gravity and setting vertical speed.
   *
   * @function
   */
  jumpOnEnemy() {
    this.stopGravity();
    this.speedY = 28;
  }
}
