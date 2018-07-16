const Phaser = require('phaser');

const { preload } = require('./preload');
const { create } = require('./create');
const { update } = require('./update');

const config = {
  type: Phaser.WEBGL,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: true
    }
  },
  scene: {
      preload: preload,
      create: create,
      update: update,
      extend: {
                  player: null,
                  reticle: null,
                  moveKeys: null,
                  bullets: null,
                  lastFired: 0,
                  time: 0,
              }
  }
};

const game = new Phaser.Game(config);
