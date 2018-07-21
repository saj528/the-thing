module.exports.controls = function controls() {
  // Enables movement of player with WASD keys
  this.input.keyboard.on('keydown_W', (event) => {
    this.player.setAccelerationY(-800);
  });
  this.input.keyboard.on('keydown_S', (event) => {
    this.player.setAccelerationY(800);
  });
  this.input.keyboard.on('keydown_A', (event) => {
    this.player.setAccelerationX(-800);
  });
  this.input.keyboard.on('keydown_D', (event) => {
    this.player.setAccelerationX(800);
  });
  this.input.keyboard.on('keyup_W', (event) => {
    if (this.moveKeys['down'].isUp)
        this.player.setAccelerationY(0);
  // Stops player acceleration on uppress of WASD keys      
  });
  this.input.keyboard.on('keyup_S', (event) => {
      if (this.moveKeys['up'].isUp)
          this.player.setAccelerationY(0);
  });
  this.input.keyboard.on('keyup_A', (event) => {
      if (this.moveKeys['right'].isUp)
          this.player.setAccelerationX(0);
  });
  this.input.keyboard.on('keyup_D', (event) => {
      if (this.moveKeys['left'].isUp)
          this.player.setAccelerationX(0);
  });
   //the thing transform
   this.input.keyboard.on('keydown_F', (event) => {
    if (this.player.isThing === true)
    this.input.enabled = false;
    this.player.setAccelerationX(0);
    this.player.setAccelerationY(0);
    this.sys.time.addEvent({
        delay: 2000,
        callback: () => {
          if(this.player.texture.key === 'player_handgun'){
            this.player.setTexture('thing');
            this.input.enabled = true;
          } else{
              this.player.setTexture('player_handgun');
              this.input.enabled = true;
          }
        }
      })
  });

  // Locks pointer on mousedown
  this.sys.canvas.addEventListener('mousedown', () => {
      this.input.mouse.requestPointerLock();
  });

  // Exit pointer lock when Q or escape (by default) is pressed.
  this.input.keyboard.on('keydown_Q', (event) => {
      if (this.input.mouse.locked)
          this.input.mouse.releasePointerLock();
  }, 0);

  // Move reticle upon locked pointer move
  this.input.on('pointermove', (pointer) => {
    if (this.input.mouse.locked)
    {
        // Move reticle with mouse
        this.reticle.x += pointer.movementX;
        this.reticle.y += pointer.movementY;

        // Only works when camera follows player
        var distX = this.reticle.x-this.player.x;
        var distY = this.reticle.y-this.player.y;

        // Ensures this.reticle cannot be moved offscreen
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