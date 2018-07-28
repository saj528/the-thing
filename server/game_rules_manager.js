const { isOverlap } = require('./physics');

module.exports = class GameRulesManager {
  constructor() {
    this.WAITING = 'waiting';
    this.STARTING = 'starting';
    this.PLAYING = 'playing';
    this.GAME_OVER = 'gameOver';
    this.WAIT_TIME_GAME_OVER = 5000;
    this.WAIT_TIME_PLAYING = 5000;
    this.objectiveItemsCollected = [];
    this.objectiveItemsRemaining = [];
    this.state = 'waiting';
    this.spawned = false;
  }

  isStarting() {
    return this.state === this.STARTING;
  }

  handleWaitingState(entityManager, io) {
    const players = entityManager.getPlayers();
    if (players.length >= 2) {
      this.state = this.STARTING;
      console.log('going to starting state');
      io.emit('starting');
      setTimeout(() => {
        console.log('going to playing state');
        io.emit('playing');
        this.state = this.PLAYING;
      }, this.WAIT_TIME_PLAYING)
    }
  }

  handleStartingState(entityManager) {
    if (this.spawned) return;
    this.spawned = true;
    const spawnTiles = entityManager.map.getSpawnTiles();
    const players = entityManager.getPlayers();
    players.forEach((player) => {
      const r = parseInt(Math.random() * spawnTiles.length);
      const randomTile = spawnTiles[r];
      player.reset();
      player.x = randomTile.x;
      player.y = randomTile.y;
    });
    const randomPlayerI = parseInt(Math.random() * players.length);
    const randomPlayer = players[randomPlayerI];
    randomPlayer.isAlien = true;
  }

  handlePlayingState(entityManager, io) {
    const players = entityManager.getPlayers();
    const humans = players
      .filter((player) => !player.isAlien);
    const areAllHumansDead = humans
      .every((player) => {
        player.health <= 0;
      });
    const areAllPlayersInEscapeZone = humans.every((human) => {
      return isOverlap(human, entityManager.getEscapeZone());
    });
    const didHumansWin = this.objectiveItemsRemaining.length === 0 &&
      areAllPlayersInEscapeZone;
    if (players.length < 2) {
      this.gameOver('alien', io);
    } else if (areAllHumansDead) {
      this.gameOver('alien', io);
    } else if (didHumansWin) {
      this.gameOver('humans', io);
    }
  }

  gameOver(winner, io) {
    this.spawned = false;
    console.log('game over', winner);
    io.emit('gameOver', {
      winner,
    });
    this.state = this.GAME_OVER;
    setTimeout(() => {
      console.log('going to waiting state');
      io.emit('waiting');
      this.state = 'waiting';
    }, this.WAIT_TIME_GAME_OVER);
  }

  update(entityManager, io) {
    if (this.state === this.WAITING) {
      this.handleWaitingState(entityManager, io);
    } else if (this.state === this.STARTING) {
      this.handleStartingState(entityManager, io);
    } else if (this.state === this.PLAYING) {
      this.handlePlayingState(entityManager, io);
    } else if (this.state === this.GAME_OVER) {

    }
  }
}