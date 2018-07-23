const Phaser = require('phaser');

module.exports.HudScene = class HudScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'hud',
    });
  }

  preload() {
    this.load.image('pain', 'assets/pain.png');
  }

  create() {
    this.pain = this.add.image(400, 300, 'pain');
    this.pain.setScrollFactor(0);
    this.pain.setVisible(false);

    this.health = this.add.text(30, 30, 'HP: 100', {
      font: '18px Arial',
      fill: '#ff0000',
      align: 'center',
    }).setScrollFactor(0);

    this.temperature = this.add.text(30, 60, 'Body: 98.1F', {
      font: '18px Arial',
      fill: '#0000ff',
      align: 'center',
    }).setScrollFactor(0);

    const mainScene = this.scene.manager.getScene('main');
    mainScene.player.on('hurt', () => {
      this.pain.setVisible(true);
      this.sys.time.addEvent({
        delay: 100,
        callback: () => this.pain.setVisible(false)
      });
    });
  }

  update() {
    const mainScene = this.scene.manager.getScene('main');
    this.temperature.setText(`Body: ${mainScene.player.temperature.toFixed(1)}F`);
    this.health.setText(`HP: ${mainScene.player.health}`);
  }

}