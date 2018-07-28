
module.exports.isColliding = function isColliding(player) {
  if (isCollidingWithTile(player)) {
    player.isColliding = true;
  }
}

module.exports.isCollidingWithTile = function isCollidingWithTile(player) {
  for (let tile of collidableTiles) {
    if (isOverlap(player, tile)) {
      return true;
    }
  }
  return false;
}

module.exports.isOverlap = function isOverlap(rect1, rect2) {
  return rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.height + rect1.y > rect2.y;
}

module.exports.applyPhysics = function applyPhysics(obj) {
  obj.x += obj.vx;
  obj.y += obj.vy;
  obj.vx += obj.ax;
  obj.vy += obj.ay;
}

module.exports.revertPhysics = function revertPhysics(obj) {
  obj.x -= obj.vx;
  obj.y -= obj.vy;
  obj.vx -= obj.ax;
  obj.vy -= obj.ay;
}