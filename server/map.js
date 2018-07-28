const tileMapJson = require('../assets/maps/snow2.json');

const collidableTileIds = [
  128, 129, 130, 131, 146, 147, 148, 149, 164, 165, 166, 167,
  182, 183, 184, 185, 115, 116, 117, 118, 119, 120, 133, 150,
  169, 187, 138, 156, 174, 192, 205, 206, 207, 208, 209, 210,
  7, 8, 9, 10, 11, 12, 25, 30, 43, 48, 61, 66, 79, 84, 97, 98, 99, 100, 101, 102,
  20, 21, 22, 23, 38, 39, 40, 41, 56, 57, 58, 59, 74, 75, 76, 77,
  31, 36, 49, 54, 86, 87, 176, 177, 221, 222, 239, 240
];

const wallTiles = [
  221, 222, 239, 240
];

const floorTiles = [
  217, 218, 235, 236,
];

const spawnTiles = [
  253,
];

module.exports = class Map {
  constructor() {
    this.collidableTiles = null;
    this.wallTiles = null;
    this.floorTiles = null;
    this.spawnTiles = null;
  }

  getTile(layer, r, c) {
    return {
      id: layer.data[r * layer.width + c],
      x: c * 16 + 12, // TODO: Why do I need + 12 here to fix this
      y: r * 16 + 12, // TODO: Why do I need + 12 here to fix this
      width: 16,
      height: 16
    }
  }

  getTiles(layer, ids) {
    const tiles = [];
    for (let r = 0; r < layer.height; r++) {
      for (let c = 0; c < layer.width; c++) {
        const tile = this.getTile(layer, r, c)
        if (ids.indexOf(tile.id) !== -1) {
          tiles.push(tile);
        }
      }
    }
    return tiles;
  }

  getTilesFromLayer(key, ids, layerName) {
    if (this[key]) {
      return this[key];
    }
    const baseLayer = tileMapJson.layers.find((layer) => layer.name === layerName);
    this[key] = this.getTiles(baseLayer, ids);
    return this[key];
  }

  getWallTiles() {
    return this.getTilesFromLayer('wallTiles', wallTiles, 'base');
  }

  getFloorTiles() {
    return this.getTilesFromLayer('floorTiles', floorTiles, 'base');
  }

  getCollidableTiles() {
    return this.getTilesFromLayer('collidableTiles', collidableTileIds, 'base');
  }

  getSpawnTiles() {
    return this.getTilesFromLayer('spawnTiles', spawnTiles, 'lights');
  }
}