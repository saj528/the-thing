const game = require('./index');

module.exports.create = function create ()
{
  // Create world bounds
  this.physics.world.setBounds(0, 0, 1600, 1200);

  // Add background, player, and reticle sprites
  var background = this.add.image(800, 600, 'background');
  this.player = this.physics.add.sprite(800, 600, 'player_handgun');
  this.reticle = this.physics.add.sprite(800, 700, 'target');

  // Set image/sprite properties
  background.setOrigin(0.5, 0.5).setDisplaySize(1600, 1200);
  this.player.setOrigin(0.5, 0.5).setDisplaySize(132, 120).setCollideWorldBounds(true).setDrag(500, 500);
  this.reticle.setOrigin(0.5, 0.5).setDisplaySize(25, 25).setCollideWorldBounds(true);

  // Set camera zoom
  this.cameras.main.zoom = 0.5;

  // Creates object for input with WASD kets
  this.moveKeys = this.input.keyboard.addKeys({
      'up': Phaser.Input.Keyboard.KeyCodes.W,
      'down': Phaser.Input.Keyboard.KeyCodes.S,
      'left': Phaser.Input.Keyboard.KeyCodes.A,
      'right': Phaser.Input.Keyboard.KeyCodes.D
  });

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

  // Stops player acceleration on uppress of WASD keys
  this.input.keyboard.on('keyup_W', (event) => {
      if (this.moveKeys['down'].isUp)
          this.player.setAccelerationY(0);
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

  // Locks pointer on mousedown
  game.canvas.addEventListener('mousedown', function () {
      game.input.mouse.requestPointerLock();
  });

  // Exit pointer lock when Q or escape (by default) is pressed.
  this.input.keyboard.on('keydown_Q', function (event) {
      if (game.input.mouse.locked)
          game.input.mouse.releasePointerLock();
  }, 0, this);

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