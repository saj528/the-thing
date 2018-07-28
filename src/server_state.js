const { socket } = require('./socket');

const state = {
  playerId: null,
  serverState: null,
  winner: null,
  starting: false
};

socket.on('id', (id) => {
  console.log('id');
  state.playerId = id;
});

socket.on('state', (serverState) => {
  state.serverState = serverState;
});

socket.on('gameOver', (event) => {
  console.log('gameOver', event);
  state.winner = event.winner;
});

socket.on('starting', (event) => {
  console.log('starting');
  state.winner = null;
  state.waiting = false;
  state.starting = true;
});

socket.on('playing', (event) => {
  console.log('playing');
  state.waiting = false;
  state.starting = false;
});

socket.on('waiting', () => {
  state.waiting = true;
})

socket.emit('getId');

module.exports = state;