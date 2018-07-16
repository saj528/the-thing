const Phaser = require('phaser');
 
const { preload } = require('./preload');
const { create } = require('./create');
const { update } = require('./update');

var config = {
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

var game = new Phaser.Game(config);

// Ensures sprite speed doesnt exceed maxVelocity while update is called
function constrainVelocity(sprite, maxVelocity)
{
  if (!sprite || !sprite.body)
    return;

  var angle, currVelocitySqr, vx, vy;
  vx = sprite.body.velocity.x;
  vy = sprite.body.velocity.y;
  currVelocitySqr = vx * vx + vy * vy;

  if (currVelocitySqr > maxVelocity * maxVelocity)
  {
      angle = Math.atan2(vy, vx);
      vx = Math.cos(angle) * maxVelocity;
      vy = Math.sin(angle) * maxVelocity;
      sprite.body.velocity.x = vx;
      sprite.body.velocity.y = vy;
  }
}

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
