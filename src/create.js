
const Phaser = require('phaser');
const { createPlayer, setupCollisionsForPlayer } = require('./objects');
const { controls } = require('./controls');

module.exports.create = function create ()
{
  this.map = this.add.tilemap('snow');
  const tileset = this.map.addTilesetImage('snow_16x16');
  this.map.createDynamicLayer('base', tileset);

  // this.lights.enable().setAmbientColor(0x555555);
  // this.lights.addLight(500, 250, 200);

  // Create world bounds
  this.physics.world.setBounds(0, 0, 100 * 32, 100 * 32);

  // Add player, and reticle sprites
  this.acidPuddles = this.add.systems.arcadePhysics.add.group();
  const createdAcidPuddles = this.acidPuddles.createMultiple({
    key: 'acid_puddle',
    active: false,
    repeat: 49,
    max: 50,
  });


  // this.ai = this.physics.add.sprite(600, 500, 'player_handgun');
  this.player = createPlayer.call(this, 800, 600);
  this.ai = createPlayer.call(this, 800, 600);
  this.reticle = this.physics.add.sprite(800, 700, 'target');

  //this.trans_anime = this.add.sprite('robot')
  //this.trans_anime.animations.add('birth',[1,2,3],1)
   this.zone = this.physics.add
    .sprite(800, 650, 'box')
    .setDisplaySize(45, 45)
    .setImmovable(true)
    .setCollideWorldBounds(true)
    .setVisible(false);

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
  this.decorLayer = this.map.createStaticLayer('decor', tileset);
  this.decorLayer.setCollision([100, 101, 140, 141, 124, 125], true);

  // Set image/sprite properties
  this.reticle.setOrigin(0.5, 0.5).setDisplaySize(15, 15).setCollideWorldBounds(true);

  //the thing boolean
  this.player.isThing = true

  this.overlay = this.add.image(0, 0, 'overlay');
  this.overlay.setVisible(false);
  this.flashlight = this.add.image(0, 0, 'flashlight');
  this.flashlight.setVisible(false);
  this.thingView = this.add.image(400, 300, 'thing_view');
  this.thingView.setScrollFactor(0);
  this.thingView.setVisible(false);

  if (this.player.isThing) {
    this.overlay.setVisible(true);
    this.thingView.setVisible(true);
  } else {
    this.flashlight.setVisible(true);
  }

  setupCollisionsForPlayer.call(this, this.player);
  setupCollisionsForPlayer.call(this, this.ai);

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
      'attack': Phaser.Input.Keyboard.KeyCodes.SPACE,
  });

  //alien acid projectile
  this.acidBalls = this.add.systems.arcadePhysics.add.group();
  const createdAcidBalls = this.acidBalls.createMultiple({
    key: 'acid_ball',
    active: false,
    repeat: 49,
    max: 50,
});

this.physics.add.collider(this.acidBalls, this.ai, (ai, acidBall) => {
  var acidPuddle = this.acidPuddles.getFirstDead();
  acidPuddle.active = true;
  acidPuddle.timeLeft = 2000;
  acidPuddle.setMass(1);
  acidPuddle.setDisplaySize(25, 25)
  acidPuddle.enableBody(true, acidBall.x, acidBall.y, true, true);
  acidBall.active = false;
  acidBall.disableBody(true, true);
});


  // controls
  controls.call(this);

  this.text = this.add.text(this.box.x + 20, this.box.y, "use", {
    font: "18px Arial",
    fill: "#ff0000",
    align: "center",
    backgroundColor: "#00ffff"
  });
  this.text.setOrigin(0.5, 0.5);
  this.text.setVisible(false);


}