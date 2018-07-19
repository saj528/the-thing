
module.exports.createPlayer = function createPlayer(x, y) {
  const player = this.physics.add.sprite(x, y, 'player_handgun');
  player
    .setOrigin(0.5, 0.5)
    .setDisplaySize(48, 48)
    .setCollideWorldBounds(true)
    .setDrag(1000, 1000)
  player.body
    .setMaxVelocity(200, 200)
    .setSize(30, 30)
    .setOffset(17, 17);
  player.canAttack = true;
  player.health = 100;
  return player;
}

module.exports.setupCollisionsForPlayer = function setupCollisionForPlayer(player) {
  this.physics.add.collider(player, this.decorLayer);
}