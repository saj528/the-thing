
const Phaser = require('phaser');

module.exports.create = function create ()
{
  this.map = this.add.tilemap('test');
  const tileset = this.map.addTilesetImage('snow');
  this.map.createDynamicLayer('base', tileset);

  // this.lights.enable().setAmbientColor(0x555555);
  // this.lights.addLight(500, 250, 200);

  // Create world bounds
  this.physics.world.setBounds(0, 0, 100 * 32, 100 * 32);

  // Add player, and reticle sprites
  this.player = this.physics.add.sprite(800, 600, 'player_handgun');
  this.reticle = this.physics.add.sprite(800, 700, 'target');
  // this.zone = this.physics.add
  //   .sprite(800, 650, 'box')
  //   .setDisplaySize(45, 45)
  //   .setImmovable(true)
  //   .setCollideWorldBounds(true)
  //   .setVisible(false);
  this.box = this.physics.add
    .sprite(800, 650, 'box')
    .setDisplaySize(25, 25)
    .setImmovable(true)
    .setCollideWorldBounds(true);

  this.text = this.add.text(this.box.x + 20, this.box.y, "use", {
    font: "18px Arial",
    fill: "#ff0000",
    align: "center",
    backgroundColor: "#00ffff"
  });
  this.text.setOrigin(0.5, 0.5);
  this.text.setVisible(false);

  this.zone = new Phaser.Geom.Rectangle(this.box.x - 25, this.box.y - 25, 50, 50);
  this.physics.add.collider(this.player, this.box)
  this.map.createStaticLayer('decor', tileset);

  // Set image/sprite properties
  this.player.setOrigin(0.5, 0.5).setDisplaySize(48, 48).setCollideWorldBounds(true).setDrag(1000, 1000)
  this.player.body.setMaxVelocity(200, 200)
  this.reticle.setOrigin(0.5, 0.5).setDisplaySize(15, 15).setCollideWorldBounds(true);

  //the thing boolean
  this.player.isThing = true

  this.overlay = this.add.image(0, 0, 'overlay');

  // Set camera zoom
  this.cameras.main.zoom = 1;

  // Creates object for input with WASD kets
  this.moveKeys = this.input.keyboard.addKeys({
      'up': Phaser.Input.Keyboard.KeyCodes.W,
      'down': Phaser.Input.Keyboard.KeyCodes.S,
      'left': Phaser.Input.Keyboard.KeyCodes.A,
      'right': Phaser.Input.Keyboard.KeyCodes.D,
      'use': Phaser.Input.Keyboard.KeyCodes.E,
      'transform': Phaser.Input.Keyboard.KeyCodes.F,
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

  //the thing transform
  this.input.keyboard.on('keydown_F', (event) => {
    if (this.player.isThing === true)
    this.input.enabled = false;
    this.player.setTexture('phase1');
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

  this.text = this.add.text(this.box.x + 20, this.box.y, "use", {
    font: "18px Arial",
    fill: "#ff0000",
    align: "center",
    backgroundColor: "#00ffff"
  });
  this.text.setOrigin(0.5, 0.5);
  this.text.setVisible(false);


}