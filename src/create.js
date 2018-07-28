const Phaser = require('phaser');
const { createPlayer, setupCollisionsForPlayer } = require('./objects');
const { controls } = require('./controls');

module.exports.create = function create () {

  this.map = this.add.tilemap('snow2');
  const tileset = this.map.addTilesetImage('tile_16x16');
  this.baseLayer = this.map.createStaticLayer('base', tileset);
  this.lightLayer = this.map.createStaticLayer('lights', tileset);

  this.players = this.add.systems.arcadePhysics.add.group();
  this.players.createMultiple({
    key: 'player_handgun',
    active: false,
    visible: false,
    repeat: 49,
    max: 50,
  });

  this.acidPuddles = this.add.systems.arcadePhysics.add.group();
  const createdAcidPuddles = this.acidPuddles.createMultiple({
    key: 'acid_puddle',
    active: false,
    visible: false,
    repeat: 49,
    max: 50,
  });

  this.acidBalls = this.add.systems.arcadePhysics.add.group();
  const createdAcidBalls = this.acidBalls.createMultiple({
    key: 'acid_ball',
    active: false,
    visible: false,
    repeat: 49,
    max: 50,
  });

  this.reticle = this.physics.add.sprite(400, 600, 'target');
  this.reticle.setOrigin(0.5, 0.5).setDisplaySize(15, 15);

  this.lights = this.textures.createCanvas('lights', 1600, 1600);
  const context = this.lights.context;
  context.globalCompositeOperation = 'lighter';
  this.lights.refresh();
  this.lightsImage = this.add.image(0, 0, 'lights');
  this.lightsImage.blendMode = Phaser.BlendModes.MULTIPLY;

  this.flashlight = this.add.image(0, 0, 'flashlight');
  this.flashlight.setVisible(false);
  this.flashlight.blendMode = Phaser.BlendModes.MULTIPLY;

  this.overlay = this.add.image(0, 0, 'overlay');
  this.overlay.setVisible(false);
  this.overlay.blendMode = Phaser.BlendModes.MULTIPLY;

  this.thingView = this.add.image(400, 300, 'thing_view');
  this.thingView.setScrollFactor(0);
  this.thingView.setVisible(false);

  this.cameras.main.zoom = 1;

  this.moveKeys = this.input.keyboard.addKeys({
    'up': Phaser.Input.Keyboard.KeyCodes.W,
    'down': Phaser.Input.Keyboard.KeyCodes.S,
    'left': Phaser.Input.Keyboard.KeyCodes.A,
    'right': Phaser.Input.Keyboard.KeyCodes.D,
    'use': Phaser.Input.Keyboard.KeyCodes.E,
    'transform': Phaser.Input.Keyboard.KeyCodes.F,
    'attack': Phaser.Input.Keyboard.KeyCodes.SPACE,
    'flashlight': Phaser.Input.Keyboard.KeyCodes.T,
  });

  controls.call(this);
}