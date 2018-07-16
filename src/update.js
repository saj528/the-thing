const {
  WIDTH,
  HEIGHT,
  BALL_SPEED,
} = require('./constants');

function resetBall() {
  this.ball.x = WIDTH / 2;
  this.ball.y = HEIGHT / 2;
  this.ball.setVelocity(-BALL_SPEED, BALL_SPEED);
}

function checkForEndGame() {
  if (this.ball.y >= 580) {
    alert('Game Over: You Lost!');
    resetBall.call(this);
  }
}

module.exports.update = function update() {
  checkForEndGame.call(this);
}

