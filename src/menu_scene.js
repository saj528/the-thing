const Phaser = require('phaser');

module.exports.MenuScene = class MenuScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'menu',
    });
  }

  preload() {
    this.load.image('target', 'assets/demoscene/ball.png');
    this.load.image('menuBG', 'assets/menuBackground.jpeg');
  }

  create() {

    this.add
    .sprite(400, 300, 'menuBG')
    .setDisplaySize(410, 600)
    this.add.text(300, 100, "Controls \n WASD: Movement \n F: Alien transform \n Mouse1: Shoot acid \n E: interact \n SpaceBar: Attack", {
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