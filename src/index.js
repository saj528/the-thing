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
      debug: false
    }
  },
  scene: [
    MenuScene,
    MainScene,
    HudScene
  ]
};

let remaining = 3;

function onLoad() {
  remaining--;
  if (remaining <= 0) {
    const game = new Phaser.Game(config);
  }
}

window.flashlight = new Image();
window.light = new Image();
window.overlay = new Image();
window.flashlight.src = '../assets/flashlight2.png';
window.light.src = '../assets/light.png';
window.overlay.src = '../assets/overlay.png';
window.flashlight.addEventListener('load', onLoad);
window.light.addEventListener('load', onLoad);
window.overlay.addEventListener('load', onLoad);

