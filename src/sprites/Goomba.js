import Enemy from './Enemy';

export default class Goomba extends Enemy {
  constructor (config) {
    super(config)
    //this.scene = config.scene
    //this.scene.add.existing(this)
//    this.anims.play('goomba')
    this.frame = 64
    this.killAt = 0
  }

  update (time, delta) {
    // If it's not activated, then just skip the update method (see Enemy.js)
    if (!this.activated) {
      return
    }
    
    if(this.killAt !== 0) {
      // The killtimer is set, keep the flat Goomba then kill it for good.
      this.killAt -= delta;
      if(this.killAt < 0) {
        this.kill()
      }
      return
    }
    this.x--
    console.log("Update "  +this.x)
  }

  marioHit(enemy, mario) {
      enemy.hurtMario(enemy, mario)
  }

  getFlat(enemy,mario) {
    enemy.play("goombaFlat")
    // Keep goomba flat for 500ms, then remove it.
    enemy.killAt = 500
  }

}
