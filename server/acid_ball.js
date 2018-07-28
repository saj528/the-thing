const { isOverlap, applyPhysics, revertPhysics } = require('./physics');
const uuid = require('uuid/v4');

module.exports = class AcidBall {
  constructor(data) {
    this.SPEED = 15;
    this.x = data.x;
    this.y = data.y;
    this.owner = data.owner;
    this.width = 15;
    this.height = 15;
    this.vx = Math.cos(data.rotation) * this.SPEED;
    this.vy = Math.sin(data.rotation) * this.SPEED;
    this.remove = false;
    this.id = uuid();

    setTimeout(() => {
      this.remove = true;
    }, 2000);
  }


  update(entityManager) {
    this.x += this.vx;
    this.y += this.vy;

    for (let player of entityManager.getPlayers()) {
      if (player.id === this.owner) continue;
      if (isOverlap(this, player)) {
        player.hurt(13);
        this.remove = true;
        break;
      }
    }

    for (let tile of entityManager.map.getWallTiles()) {
      if (isOverlap(this, tile)) {
        this.remove = true;
        break;
      }
    }
  }
}