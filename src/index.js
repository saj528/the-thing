const Phaser = require('phaser');

const { MainScene } = require('./main_scene');
const { MenuScene } = require('./menu_scene');

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
  scene: [
    MenuScene,
    MainScene,
  ]
};

const game = new Phaser.Game(config);
