const io = require('socket.io')();
const clients = [];
const players = [];
let state = 'waiting';
const Map = require('./map');
const Player = require('./player');
const EntityManager = require('./entity_manager');
const GameRulesManager = require('./game_rules_manager');

const map = new Map();
const entityManager = new EntityManager(map);
const gameRulesManager = new GameRulesManager();

io.on('connection', function(client) {
  const p = entityManager.addPlayer({
    id: client.id,
    x: 300,
    y: 400,
  });
  clients.push(client);

  console.log('connected', client.id);

  client.on('getId', () => {
    client.emit('id', client.id);
  })

  client.on('update', (data) => {
    p.rotation = data.rotation;
    p.keys = data.keys;
  });

  client.on('acid', (data) => {
    entityManager.addAcid({
      owner: client.id,
      ...data
    });
  });

  client.on('disconnect', () => {
    console.log('disconneced', client.id);
    const playerToDelete = entityManager.getPlayers().find((player) => player.id === client.id)
    entityManager.removePlayer(playerToDelete);
    clients.splice(clients.indexOf(client), 1);
  });
});
io.listen(3000);

setInterval(() => {
  entityManager.update(map, gameRulesManager);
  gameRulesManager.update(entityManager, io);
  io.emit('state', entityManager.getState());
}, 30);