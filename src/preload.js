const game = require('./index');

module.exports.preload = function preload() {
  this.load.image('ball', 'assets/ball.png');
  this.load.image('paddle', 'assets/paddle.png');
  this.load.image('brick', 'assets/brick.png');
  this.load.image('brick_strong', 'assets/brick_strong.png');
  this.load.image('brick_weak', 'assets/brick_weak.png');
};