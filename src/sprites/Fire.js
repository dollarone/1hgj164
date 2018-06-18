export default class Fire extends Phaser.GameObjects.Sprite {
  constructor (scene) {
      super(scene);


    this.on('animationcomplete', () => {
        if (this.anims.currentAnim.key === 'fireExplode') {
            this.setActive(false);
            this.setVisible(false);
        }
    }, this);
    
  }

  fire(x,y,left){
      
    this.setActive(true);
    this.setVisible(true);

      this.setPosition(x,y);
      
      this.play("fireFly");
      this.scene.sound.playAudioSprite('sfx', 'smb_fireball');

//      console.log(this.scene.physics.world.collide);

  }

  update (time, delta) {
    if(!this.active){
        return;
    }
    this.scene.physics.world.collide(this, this.scene.groundLayer, ()=> this.collided());
    this.scene.physics.world.overlap(this, this.scene.enemyGroup, (me,enemy)=>{me.explode(); enemy.starKilled()});
    this.x+=2

    //  console.log(this.scene.physics.world.collide);
   
  }

  collided(){
      if(this.body.velocity.y === 0){
        this.body.velocity.y=-150;
      }
      if(this.body.velocity.x === 0){
        this.scene.sound.playAudioSprite('sfx', 'smb_bump');

        this.explode();
      }
  }

  explode(){
    this.play("fireExplode");
  }
}