const {
  HEIGHT,
  WIDTH,
  BRICK_HEIGHT,
  BRICK_WIDTH,
  ROWS,
} = require('./constants');

const {
  createBall,
  createPaddle,
  createBrick,
} = require('./objects');

const {
  setupPaddleControls,
} = require('./controls');

module.exports.create = function create() {
  this.cameras.main.zoom = 1.0;

  this.physics.world.setBounds(0, 0, 800, 600);

  createPaddle.call(this);;
  createBall.call(this);

  for (let y = 1; y < ROWS; y++){
    for (let x = 1; x < WIDTH/(BRICK_WIDTH+5); x++){
      if (y <= 5){
        createBrick.call(this,(x*BRICK_WIDTH)+(x*5),(y*BRICK_HEIGHT)+(y*5),('brick_strong'));
      } else if (y <= 15){
        createBrick.call(this,(x*BRICK_WIDTH)+(x*5),(y*BRICK_HEIGHT)+(y*5),('brick'));
      } else {
        createBrick.call(this,(x*BRICK_WIDTH)+(x*5),(y*BRICK_HEIGHT)+(y*5),('brick_weak'));
      }
    }
  }
  setupPaddleControls.call(this);
}