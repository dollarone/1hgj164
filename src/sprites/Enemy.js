/*
Generic enemy class that extends Phaser sprites.
Classes for enemy types extend this class.
*/

export default class Enemy extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y-16, config.key)
    this.frame = 64
    this.scene = config.scene
    this.scene.add.existing(this)
    this.anims.play('stand');


    this.alive = true

    this.mario = this.scene.mario
    this.direction = -1   
    this.beenSeen = false
    
  }

  activated(){
    // Method to check if an enemy is activated, the enemy will stay put
    // until activated so that starting positions is correct

    this.beenSeen = true
    return true
  }

  hurtMario(enemy, mario){
    // send the enemy to mario hurt method (if mario got a star this will not end well for the enemy)
    this.scene.mario.hurtBy(enemy)
  }

  starKilled(){
    // Killed by a star or hit from below with a block, later on also fire
    if(!this.alive){
      return
    }
    this.alive = false
    this.flipY = true
    this.scene.sound.playAudioSprite('sfx', 'smb_stomp')
    this.scene.updateScore(100)
  }

  kill(){
    // Forget about this enemy
    this.scene.enemyGroup.remove(this)
    this.destroy()
  }
}
