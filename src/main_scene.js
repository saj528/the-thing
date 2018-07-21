const Phaser = require('phaser');

const { preload } = require('./preload');
const { create } = require('./create');
const { update } = require('./update');

module.exports.MainScene = class MainScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'main',
      extends: {
        player: null,
        reticle: null,
        moveKeys: null,
        bullets: null,
        lastFired: 0,
        time: 0,
      },
    });
  }

  preload() {
    preload.call(this);
  }

  create() {
    create.call(this);
    this.scene.manager.start('hud');
  }

  update() {
    update.call(this);
  }

}