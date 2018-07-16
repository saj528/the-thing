module.exports.ballHitBrick = function ballHitBrick(ball, brick) {
  if (brick.texture.key === 'brick_strong'){
    brick.setTexture('brick');
  } else if (brick.texture.key === 'brick'){
    brick.setTexture('brick_weak');
  }  
  else{
    brick.destroy();
  }
}