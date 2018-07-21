const Phaser = require('phaser');

module.exports.MenuScene = class MenuScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'menu',
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
    })
      .setInteractive();
    this.startBtn.on('pointerdown', this.start, this);
    this.startBtn.on('pointerover', () => this.startBtn.setFill('#ffff00'), this);
    this.startBtn.on('pointerout', () => this.startBtn.setFill('#ff0000'), this);
  }

  update() {
  }

  start() {
    this.scene.manager.switch('menu', 'main');
  }

}