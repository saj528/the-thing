const { isOverlap, applyPhysics, revertPhysics } = require('./physics');

module.exports = class Player {
  constructor(data) {
    this.id = data.id;
    this.health = 100;
    this.temperature = 98.1;
    this.x = data.x || 300;
    this.y = data.y || 300;
    this.isAlien = false;
    this.canApplyTemperature = true;
    this.canHurtFromCold = true;
    this.canToggleFlashlight = true;
    this.vx = 0;
    this.vy = 0;
    this.state = 'player';
    this.width = 24;
    this.height = 24;
    this.isFlashlightOn = true;
    this.SPEED = 5.0
    this.COLD_HURT_TIMEOUT = 1000;
    this.COLD_TIMEOUT = 1000;
    this.ATTACK_TIMEOUT = 1000;
    this.TRANSFORM_TIMEOUT = 2000;
    this.COLD_THRESHOLD = 95.0;
    this.MAX_TEMP = 99.1;
    this.FREEZE_AMOUNT = 0.1;
    this.WARM_AMOUNT = 0.2;
    this.COLD_DAMAGE = 1;
    this.keys = {
      up: false,
      down: false,
      left: false,
      right: false,
    };
    this.canMove = true;
    this.canAttack = true;
    this.rotation = data.rotation || 0;
  }

  hurt(amount) {
    this.health -= amount;
  }

  attack(entityManager) {
    if (!this.canAttack) return;
    if (!this.isAlien) return;
    if (this.state !== 'alien') return;

    entityManager.addAcid({
      x: this.x,
      y: this.y,
      owner: this.id,
      rotation: this.rotation,
    });

    setTimeout(() => this.canAttack = true, this.ATTACK_TIMEOUT);
    this.canAttack = false;
  }

  transform() {
    if (!this.isAlien) return;
    if (this.state === 'egg') return;
    const toState = this.state === 'alien' ? 'player' : 'alien';
    this.state = 'egg';
    this.canMove = false;
    setTimeout(() => {
      this.state = toState;
      this.canMove = true;
    }, this.TRANSFORM_TIMEOUT);
  }

  move(entityManager, gameRulesManager) {
    if (!this.canMove) return;
    if (gameRulesManager.isStarting()) return;

    this.vx = 0;
    this.vy = 0;

    if (this.keys.left) {
      this.vx = -this.SPEED;
    } else if (this.keys.right) {
      this.vx = this.SPEED;
    }

    if (this.keys.up) {
      this.vy = -this.SPEED;
    } else if (this.keys.down) {
      this.vy = this.SPEED;
    }

    this.x += this.vx;
    for (let tile of entityManager.map.getCollidableTiles()) {
      if (isOverlap(this, tile)) {
        this.x -=  this.vx;
        break;
      }
    }

    this.y += this.vy;
    for (let tile of entityManager.map.getCollidableTiles()) {
      if (isOverlap(this, tile)) {
        this.y -=  this.vy;
        break;
      }
    }
  }

  isInside(entityManager) {
    for (let tile of entityManager.map.getFloorTiles()) {
      if (isOverlap(this, tile)) {
        return true;
      }
    }
    return false;
  }

  updateTemperature(entityManager) {
    if (!this.canApplyTemperature) return;
    this.canApplyTemperature = false;
    setTimeout(() => this.canApplyTemperature = true, this.COLD_TIMEOUT);
    if (this.isInside(entityManager)) {
      this.temperature += this.WARM_AMOUNT;
    } else {
      this.temperature -= this.FREEZE_AMOUNT;
    }
    this.temperature = Math.min(this.temperature, this.MAX_TEMP);
  }

  hurtIfCold() {
    if (!this.canHurtFromCold) return;
    this.canHurtFromCold = false;
    if (this.temperature < this.COLD_THRESHOLD) {
      this.health -= this.COLD_DAMAGE;
    }
    setTimeout(() => this.canHurtFromCold = true, this.COLD_HURT_TIMEOUT);
  }

  reset() {
    this.health = 100;
    this.temperature = 98.1
  }

  update(entityManager, gameRulesManager) {
    if (this.keys.attack) {
      this.attack(entityManager);
    }

    if (this.keys.transform) {
      this.transform();
    }

    if (this.canToggleFlashlight && this.keys.flashlight) {
      this.canToggleFlashlight = false;
      setTimeout(() => {
        this.canToggleFlashlight = true;
      }, 200);
      this.isFlashlightOn = !this.isFlashlightOn;
    }

    if (this.state !== 'player') {
      this.isFlashlightOn = false;
    }

    this.move(entityManager, gameRulesManager);

    this.updateTemperature(entityManager);

    this.hurtIfCold();
  }
}