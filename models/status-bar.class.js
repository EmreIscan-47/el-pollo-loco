class StatusBar extends DrawableObjects {
  IMAGES_HEALTH = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  IMAGES_COINS = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];

  IMAGES_BOTTLE = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
  ];
  
  percentage = 100;
  collect = 0;
  constructor(imgs, y, percentage) {
    super();
    this.loadImages(this.IMAGES_HEALTH);
    this.loadImages(this.IMAGES_COINS);
    this.loadImages(this.IMAGES_BOTTLE);
    this.x = 20;
    this.y = y;
    this.width = 150;
    this.height = 50;
    this.loadStatusBar(imgs, percentage);
  }

loadStatusBar(imgs, percentage){
  let path;
  switch (imgs) {
    case "HEALTH":
      this.percentage = percentage / 20;
        path = this.IMAGES_HEALTH[this.resolveImageIndex()];
        this.img = this.imageCache[path];
      break;
      case "COINS":
        this.percentage = percentage;
          path = this.IMAGES_COINS[this.resolveImageIndex()];
          this.img = this.imageCache[path];
        break;
        case "BOTTLE":
      this.percentage = percentage;
        path = this.IMAGES_BOTTLE[this.resolveImageIndex()];
        this.img = this.imageCache[path];
      break;
    default:
      console.log("Nothing here");
      
      break;
  }
}

 

  resolveImageIndex() {
    if (this.percentage == 5) {
      return 5;
    } else if (this.percentage >= 4) {
      return 4;
    } else if (this.percentage >= 3) {
      return 3;
    } else if (this.percentage >= 2) {
      return 2;
    } else if (this.percentage >= 1) {
      return 1;
    } else {
      return 0;
    }
  }
}
