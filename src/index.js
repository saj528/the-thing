const Phaser = require('phaser');

const { MainScene } = require('./main_scene');
const { MenuScene } = require('./menu_scene');
const { HudScene } = require('./hud_scene');

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
    HudScene
  ]
};

const game = new Phaser.Game(config);
