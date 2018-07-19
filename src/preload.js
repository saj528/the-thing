
module.exports.preload = function preload () {
  // Load in images and sprites
  this.load.spritesheet('player_handgun', 'assets/sprites/player_handgun.png',
      { frameWidth: 66, frameHeight: 60 }
  ); // Made by tokkatrain: https://tokkatrain.itch.io/top-down-basic-set
  this.load.image('target', 'assets/demoscene/ball.png');
  this.load.image('overlay', 'assets/overlay.png');
  this.load.image('background', 'assets/skies/underwater1.png');
  this.load.image('snow', 'assets/tileset/snow.png');
  this.load.tilemapTiledJSON('test', 'assets/maps/test.json');
  this.load.image('box', 'assets/box.png');
  this.load.image('thing', 'assets/thing.png');
}