const game = require('./index');

module.exports.update = function update (time, delta)
{
  // Rotates this.player to face towards reticle
  this.player.rotation = Phaser.Math.Angle.Between(this.player.x, this.player.y, this.reticle.x, this.reticle.y);

  // Camera position is average between this.reticle and this.player positions
  const avgX = ((this.player.x+this.reticle.x)/2)-400;
  const avgY = ((this.player.y+this.reticle.y)/2)-300;
  this.cameras.main.scrollX = avgX;
  this.cameras.main.scrollY = avgY;

  // Make this.reticle move with this.player
  this.reticle.body.velocity.x = this.player.body.velocity.x;
  this.reticle.body.velocity.y = this.player.body.velocity.y;

  // Constrain velocity of this.player
  constrainVelocity(this.player, 500);

  // Constrain position of reticle
  constrainReticle(this.reticle, this.player, 550);
}

