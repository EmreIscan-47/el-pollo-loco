class Coins extends CollectableObjects {
    offset = {
    top: 35,
    right: 35,
    bottom: 35,
    left: 35,
  };
  constructor() {
    super();
    this.loadImage("img/8_coin/coin_2.png");
    this.x = 200 + Math.random() * 2000;
    if (this.x > 2000) {
      this.x -= 300;
    }
    this.y = 340;
    this.height = 80;
    this.width = 80;
  }
}
