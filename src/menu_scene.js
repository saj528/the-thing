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
    this.add.text(300, 200, "Controls \n WASD: Movement \n F: Alien transform \n Mouse1: Shoot acid", {
      font: "18px Arial",
      fill: "#ff0000",
      align: "center",
    })
    
    this.startBtn = this.add.text(350, 300, "START", {
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