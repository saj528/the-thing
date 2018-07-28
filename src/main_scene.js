const Phaser = require('phaser');

const { socket } = require('./socket')

const { preload } = require('./preload');
const { create } = require('./create');
const { update } = require('./update');

module.exports.MainScene = class MainScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'main',
    });

    this.playerMap = {};
    this.acidBallMap = {};
    this.nextFire = 0;
  }

  preload() {
    preload.call(this);
  }

  create() {
    this.sys.time.addEvent({
      delay: 30,
      loop: true,
      callback: () => {
        const keys = {}
        Object.keys(this.moveKeys).forEach((key) => {
          keys[key] = this.moveKeys[key].isDown;
        });
        if (this.player) {
          socket.emit('update', {
            rotation: this.player.rotation,
            keys,
          });
        }
      }
    });

    create.call(this);
    this.scene.manager.start('hud');
  }

  update() {
    update.call(this);
  }

}