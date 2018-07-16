const { ballHitBrick } = require('./actions');

const {
  WIDTH,
  HEIGHT,
  BALL_SPEED,
  BRICK_HEIGHT,
  BRICK_WIDTH,
} = require('./constants');

module.exports.createBall = function createBall() {
  this.ball = this.physics.add
    .sprite(WIDTH / 2, HEIGHT / 2, 'ball')
    .setOrigin(0.5, 0.5)
    .setDisplaySize(25, 25)
    .setCollideWorldBounds(true)
    .setBounce(1);
  this.ball.body.setVelocityX(-BALL_SPEED);
  this.ball.body.setVelocityY(BALL_SPEED);

  this.physics.add.collider(this.paddle, this.ball);
}

module.exports.createPaddle = function createPaddle() {
  this.paddle = this.physics.add
    .sprite(400, 570, 'paddle')
    .setOrigin(0.5, 0.5)
    .setDisplaySize(104, 24)
    .setCollideWorldBounds(true)
    .setImmovable(true);
}

module.exports.createBrick = function createBrick(x, y,bric='brick') {
  const brick = this.physics.add
    .sprite(x, y, bric)
    .setOrigin(0.5, 0.5)
    .setDisplaySize(BRICK_WIDTH, BRICK_HEIGHT)
    .setCollideWorldBounds(true)
    .setImmovable(true);
  this.bricks.push(brick);
  this.physics.add.collider(this.ball, brick, ballHitBrick);
}
