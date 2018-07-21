const Phaser = require('phaser');

module.exports.HudScene = class HudScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'hud',
      // active: true,
    });
  }

  preload() {
  }

  create() {
    this.health = this.add.text(30, 30, "HP: 100 / 100", {
      font: "18px Arial",
      fill: "#ff0000",
      align: "center",
    }).setScrollFactor(0);
  }

  update() {
  }

}