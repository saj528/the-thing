const AcidBall = require('./acid_ball');
const Player = require('./player');

module.exports = class EntityManager {
  constructor(map) {
    this.players = [];
    this.acidBalls = [];
    this.map = map;
  }

  update(map, gameRulesManager) {
    this.updateAcidBalls();
    this.updatePlayers(gameRulesManager);
  }

  updateAcidBalls() {
    for (let acidBall of this.acidBalls) {
      acidBall.update(this);
      if (acidBall.remove) {
        this.acidBalls.splice(this.acidBalls.indexOf(acidBall), 1);
      }
    }
  }

  updatePlayers(gameRulesManager) {
    for (let player of this.players) {
      player.update(this, gameRulesManager);
    }
  }

  addPlayer(data) {
    const player = new Player(data);
    this.players.push(player);
    return player;
  }

  addAcid(data) {
    const ball = new AcidBall(data);
    this.acidBalls.push(ball);
    return ball;
  }

  removePlayer(player) {
    this.players.splice(this.players.indexOf(player), 1);
  }

  getState() {
    return {
      acidBalls: this.acidBalls,
      players: this.players,
    };
  }

  getPlayers() {
    return this.players;
  }

  getEscapeZone() {
    return {
      x: 0,
      y: 0,
      width: 200,
      height: 200,
    }
  }
}