class Endboss extends MovableObject {
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

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

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

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  name;
  energy = 100;
  checkEnergy = 100;
  animateEndbossInterval;
  animateWalkingIntervall;
  animateLeftInterval;
  animateAlertInterval;
  animateAttackInterval;
  animateHurtInterval;
  deadInterval;
  startEndBattle = false;
  attackCharacter = false;
  endBossGotHit = true;
  endBossDeadd = false;

  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.name = "Endboss";
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 2000;
    this.height = 500;
    this.width = 500;
    this.y = -30;
    this.startEndBossBattle(false, false, false);
    this.deadInterval = setInterval(() => {
       
      if (this.energy == 0) {
        this.endBossDeadd = true;
      }
      if (this.endBossDeadd) {
        console.log("Yoo");
        this.endBossDead();
      }
    }, 1000);

    this.speed = 1.5 + Math.random() * 4.25;
  }

  startEndBossBattle(startEndBattle, attackCharacter, hurtEndboss) {
    if (startEndBattle) {
      clearInterval(this.animateAlertInterval);
      clearInterval(this.animateAttackInterval);
      clearInterval(this.animateHurtInterval), this.animateEndBoss();
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

  animate() {
    this.animateAlertInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_ALERT);
    }, 6500 / 5);
  }

  animateEndBoss() {
    this.animateWalkingInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 6500 / 60);
    this.animateLeftInterval = setInterval(() => {
      this.moveLeft();
    }, 2000 / 60);
  }

  animateAttack() {
    let frame = 0;
    this.animateAttackInterval = setInterval(() => {
      if (frame >= this.IMAGES_ATTACK.length) {
        console.log("Yo1");
        this.startEndBossBattle(true, false, false);
      } else {
        let i = frame % this.IMAGES_ATTACK.length;
        let path = this.IMAGES_ATTACK[i];
        this.img = this.imageCache[path];
        frame++;
      }
    }, 100);
  }

  animateHurtEndboss() {
    let frame = 0;
    console.log(frame >= this.IMAGES_HURT.length);

    this.animateHurtInterval = setInterval(() => {
      if (frame >= this.IMAGES_HURT.length) {
        this.endBossGotHit = true;
        this.startEndBossBattle(true, false, false);
        return;
      } else {
        let i = frame % this.IMAGES_HURT.length;
        let path = this.IMAGES_HURT[i];
        this.img = this.imageCache[path];
        frame++;
      }
    }, 100);
  }

   endBossDead() {
    this.clearEverything();
    setInterval(() => {
        
       this.playAnimation(this.IMAGES_DEAD)
        
      
    }, 200);
  
  }

  clearEverything() {
   
    clearInterval(this.animateAlertInterval);
    clearInterval(this.animateAttackInterval);
    clearInterval(this.animateWalkingInterval);
    clearInterval(this.animateLeftInterval);
    clearInterval(this.animateHurtInterval);
  }
}
