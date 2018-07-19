const Phaser = require('phaser');

// Ensures reticle does not move offscreen and dist(radius) from player
function constrainReticle(reticle, player, radius)
{
var distX = reticle.x-player.x; // X distance between player & reticle
var distY = reticle.y-player.y; // Y distance between player & reticle

// Ensures reticle cannot be moved offscreen
if (distX > 800)
    reticle.x = player.x+800;
else if (distX < -800)
    reticle.x = player.x-800;

if (distY > 600)
    reticle.y = player.y+600;
else if (distY < -600)
    reticle.y = player.y-600;

// Ensures reticle cannot be moved further than dist(radius) from player
var distBetween = Phaser.Math.Distance.Between(player.x, player.y, reticle.x, reticle.y);
if (distBetween > radius)
{
    // Place reticle on perimeter of circle on line intersecting player & reticle
    var scale = distBetween/radius;

    reticle.x = player.x + (reticle.x-player.x)/scale;
    reticle.y = player.y + (reticle.y-player.y)/scale;
}
}


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

  // this.box.clearTint();
  if (Phaser.Geom.Rectangle.Overlaps(this.player.getBounds(), this.zone)) {
    this.text.setVisible(true);
  } else {
    this.text.setVisible(false);
  }

  // Constrain position of reticle
  constrainReticle(this.reticle, this.player, 550);

  if (Phaser.Geom.Rectangle.Overlaps(this.player.getBounds(), this.zone)) {
    this.text.setVisible(true)
    if (this.moveKeys['use'].isDown) {
      console.log('CHODE');
    }
  } else{
    this.text.setVisible(false)
  }

  this.overlay.x = this.player.x;
  this.overlay.y = this.player.y;

  this.flashlight.x = this.player.x;
  this.flashlight.y = this.player.y;
  this.flashlight.rotation = this.player.rotation

  const directions = [
    [800, 800],
    [800, -800],
    [-800, 800],
    [-800, -800],
    [0, 800],
    [0, -800],
    [-800, 0],
    [-800, 0],
  ]
  if (Math.random() < 0.05 && this.ai.health > 0) {
    const direction = directions[parseInt(Math.random() * directions.length)];
    this.ai.setAccelerationX(direction[0]);
    this.ai.setAccelerationY(direction[1]);
  }

  if (this.sys.arcadePhysics.overlap(this.player, this.ai)) {
    if (this.player.canAttack && this.moveKeys['attack'].isDown) {
      this.ai.setTintFill(0xff0000);

      this.sys.time.addEvent({
        delay: 200,
        callback: () => {
          if (this.ai.health > 0) {
            this.ai.clearTint();
          }
        }
      });

      this.player.canAttack = false;

      this.sys.time.addEvent({
        delay: 800,
        callback: () => {
          this.player.canAttack = true;
        }
      });

      this.ai.health -= 35;
      console.log('hurting AI: ', this.ai.health, 'hp remaining');

      if (this.ai.health <= 0) {
        this.ai.setAccelerationX(0);
        this.ai.setAccelerationY(0);
        console.log('ai killed');
      }
    }
  }

}

