
module.exports.preload = function preload () {
  // Load in images and sprites
  this.load.spritesheet('player_handgun', 'assets/sprites/player_handgun.png',
      { frameWidth: 66, frameHeight: 60 }
  ); // Made by tokkatrain: https://tokkatrain.itch.io/top-down-basic-set
  this.load.image('target', 'assets/demoscene/ball.png');
  this.load.image('overlay', 'assets/overlay.png');
  this.load.image('thing_view', 'assets/thing_view.png');
  this.load.image('flashlight', 'assets/flashlight.png');
  this.load.image('background', 'assets/skies/underwater1.png');
  this.load.image('snow_16x16', 'assets/tileset/snow_16x16.png');
  this.load.tilemapTiledJSON('snow', 'assets/maps/snow.json');
  this.load.image('box', 'assets/box.png');
  this.load.image('thing', 'assets/thing/thing.png');
  this.load.image('acid_ball', 'assets/thing/acid_ball.png');
  this.load.image('acid_puddle', 'assets/thing/acid.png');
  this.load.image('menuBG', 'assets/menuBackground.jpeg');
  //this.load.spritesheet('egg', 'assets/thing/egg_animation.png',128,192);

}