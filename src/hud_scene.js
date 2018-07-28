const Phaser = require('phaser');
const state = require('./server_state');

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

    this.winner = this.add.text(20, 270, 'Humans have won the game', {
      font: '50px Arial',
      fill: '#00FF00',
      align: 'center',
    });
    this.winner.setVisible(false);

    this.waiting = this.add.text(20, 270, 'Waiting for more players', {
      font: '50px Arial',
      fill: '#00FF00',
      align: 'center',
    });
    this.waiting.setVisible(false);

    this.starting = this.add.text(40, 270, 'Game about to start!', {
      font: '40px Arial',
      fill: '#00FFFF',
      align: 'center',
    });
    this.starting.setVisible(false);

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

    this.events.on('flash', () => {
      this.pain.setVisible(true);
      this.sys.time.addEvent({
        delay: 100,
        callback: () => this.pain.setVisible(false)
      });
    });
  }

  update() {
    const mainScene = this.scene.manager.getScene('main');
    if (!mainScene.player) return;

    if (mainScene.player.isAlien) {
      this.health.setVisible(false);
      this.temperature.setVisible(false);
    } else {
      this.health.setVisible(true);
      this.temperature.setVisible(true);
    }

    this.waiting.setVisible(state.waiting);

    if (state.winner) {
      this.winner.setVisible(true);
      this.winner.setText(`${state.winner}s have won the game!`);
    } else {
      this.winner.setVisible(false);
    }

    if (state.starting) {
      this.starting.setVisible(true);
    } else {
      this.starting.setVisible(false);
    }

    this.temperature.setText(`Body: ${mainScene.player.temperature.toFixed(1)}F`);
    this.health.setText(`HP: ${mainScene.player.health}`);
  }

}