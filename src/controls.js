
module.exports.controls = function controls() {

  this.sys.canvas.addEventListener('mousedown', () => {
    this.input.mouse.requestPointerLock();
  });

  this.input.keyboard.on('keydown_Q', (event) => {
    if (this.input.mouse.locked) {
      this.input.mouse.releasePointerLock();
    }
  }, 0);

  this.input.on('pointermove', (pointer) => {
    if (!this.player) return;

    if (this.input.mouse.locked) {
      this.reticle.x += pointer.movementX;
      this.reticle.y += pointer.movementY;

      var distX = this.reticle.x-this.player.x;
      var distY = this.reticle.y-this.player.y;

      if (distX > 800)
        this.reticle.x = this.player.x+800;
      else if (distX < -800)
        this.reticle.x = this.player.x-800;

      if (distY > 600)
        this.reticle.y = this.player.y+600;
      else if (distY < -600)
        this.reticle.y = this.player.y-600;
    }
  }, this);
}