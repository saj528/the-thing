const Phaser = require('phaser');

module.exports.MenuScene = class MenuScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'menu',
      // active: true,
    });
  }

  preload() {
    this.load.image('target', 'assets/demoscene/ball.png');
  }

  create() {
    this.startBtn = this.add.text(400, 300, "start", {
      font: "18px Arial",
      fill: "#ff0000",
      align: "center",
      backgroundColor: "#00ffff"
    }).setInteractive();
    this.startBtn.on('pointerdown', this.start, this);
  }

  update() {
  }

  start() {
    this.scene.start('main');
  }

}