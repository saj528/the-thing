const Phaser = require('phaser');
const state = require('./server_state');

function constrainReticle(reticle, player, radius) {
  var distX = reticle.x-player.x;
  var distY = reticle.y-player.y;

  if (distX > 800)
    reticle.x = player.x+800;
  else if (distX < -800)
    reticle.x = player.x-800;

  if (distY > 600)
    reticle.y = player.y+600;
  else if (distY < -600)
    reticle.y = player.y-600;

  var distBetween = Phaser.Math.Distance.Between(player.x, player.y, reticle.x, reticle.y);
  if (distBetween > radius) {
    var scale = distBetween/radius;

    reticle.x = player.x + (reticle.x-player.x)/scale;
    reticle.y = player.y + (reticle.y-player.y)/scale;
  }
}

function syncAcidBalls() {
  state.serverState.acidBalls.forEach((acid) => {
    let acidBall = this.acidBallMap[acid.id];
    if (!acidBall) {
      acidBall = this.acidBalls.getFirstDead();
      acidBall.setOrigin(0.5, 0.5);
      acidBall.setActive(true);
      acidBall.setVisible(true);
      this.acidBallMap[acid.id] = acidBall;
    }
    Object.assign(acidBall, acid);
  });

  removeDead(this.acidBallMap, state.serverState.acidBalls);
}

function removeDead(idMap, list) {
  Object.keys(idMap).forEach((id) => {
    if (!list.find((p) => p.id === id)) {
      idMap[id].disableBody(true, true);
      idMap[id].setActive(false);
      idMap[id].setVisible(false);
      delete idMap[id];
    }
  });
}

function syncPlayers() {
  if (!state.playerId) return;
  state.serverState.players.forEach((player) => {
    let p = this.playerMap[player.id];
    if (!p) {
      p = this.players.getFirstDead();
      p
        .setOrigin(0.5, 0.5)
        .setSize(24, 24)
        .setActive(true)
        .setVisible(true);
      this.playerMap[player.id] = p;
    }

    if (p.id === state.playerId) {
      this.player = p;
      if (p.health > player.health) {
        const hud = this.scene.manager.getScene('hud');
        hud.events.emit('flash');
      }
    }

    Object.assign(p, player);

    if (p.state === 'egg') {
      p.setTexture('egg');
    } else if (p.state === 'player') {
      p.setTexture('player_handgun');
    } else {
      p.setTexture('thing');
    }
  });

  removeDead(this.playerMap, state.serverState.players);
}

module.exports.update = function update (time, delta) {
  if (!state.serverState) return;

  syncAcidBalls.call(this);
  syncPlayers.call(this);

  if (!this.player) return;

  if (this.player.state === 'egg') {
    this.player.rotation = 0;
  } else {
    this.player.rotation = Phaser.Math.Angle.Between(this.player.x, this.player.y, this.reticle.x, this.reticle.y);
  }

  const avgX = ((this.player.x + this.reticle.x) / 2) - 400;
  const avgY = ((this.player.y + this.reticle.y) / 2) - 300;
  this.cameras.main.scrollX = avgX;
  this.cameras.main.scrollY = avgY;

  this.reticle.body.velocity.x = this.player.body.velocity.x;
  this.reticle.body.velocity.y = this.player.body.velocity.y;

  constrainReticle(this.reticle, this.player, 450);

  this.overlay.x = this.player.x;
  this.overlay.y = this.player.y;

  this.flashlight.x = this.player.x;
  this.flashlight.y = this.player.y;
  this.flashlight.rotation = this.player.rotation;

  this.lightsImage.x = this.player.x;
  this.lightsImage.y = this.player.y;

  const context = this.lights.context;
  context.fillStyle = '#000000';
  context.clearRect(0, 0, 1600, 1600);
  context.fillRect(0, 0, 1600, 1600);
  for (const player of state.serverState.players) {
    let image = window.flashlight;
    let rotation = player.rotation;
    if (player.id === state.playerId && player.state !== 'player') {
      image = window.overlay;
      rotation = 0;
    } else if (!player.isFlashlightOn) {
      continue;
    }
    const positionX = player.x - this.player.x + 800;
    const positionY = player.y - this.player.y + 800;
    context.save();
    context.translate(
      positionX,
      positionY,
    );
    context.rotate(rotation);
    context.drawImage(image, -800, -800);
    context.restore();
  }

  const lights = this.lightLayer.filterTiles((tile) => {
    return tile.index === 253
  })
  for (const light of lights) {
    const positionX = light.pixelX - this.player.x + 800;
    const positionY = light.pixelY - this.player.y + 800;
    context.save();
    context.translate(
      positionX,
      positionY,
    );
    context.drawImage(window.light, -128, -128);
    context.restore();
  }
  this.lights.refresh();

  if (this.player.isAlien) {
    this.overlay.setVisible(true);
    this.thingView.setVisible(true);
    this.flashlight.setVisible(false);
  } else {
    this.overlay.setVisible(false);
    this.thingView.setVisible(false);
    this.flashlight.setVisible(false);
  }
}

