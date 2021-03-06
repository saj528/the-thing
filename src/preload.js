
module.exports.preload = function preload () {
  this.load.spritesheet('player_handgun', 'assets/sprites/player_handgun.png',
      { frameWidth: 66, frameHeight: 60 }
  );
  this.load.image('target', 'assets/demoscene/ball.png');
  this.load.image('overlay', 'assets/overlay.png');
  this.load.image('thing_view', 'assets/thing_view.png');
  this.load.image('egg', 'assets/thing/phase1.png');
  this.load.image('flashlight', 'assets/flashlight.png');
  this.load.image('background', 'assets/skies/underwater1.png');
  this.load.image('tile_16x16', 'assets/tileset/tile_16x16.png');
  this.load.tilemapTiledJSON('snow2', 'assets/maps/snow2.json');
  this.load.image('box', 'assets/box.png');
  this.load.image('thing', 'assets/thing/thing.png');
  this.load.image('acid_ball', 'assets/thing/acid_ball.png');
  this.load.image('acid_puddle', 'assets/thing/acid.png');
  this.load.image('menuBG', 'assets/menuBackground.jpeg');
  //this.load.spritesheet('egg', 'assets/thing/egg_animation.png',128,192);
}