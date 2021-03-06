import makeAnimations from '../helpers/animations';

class BootScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'BootScene'
        });
    }
    preload() {
        const progress = this.add.graphics();
       
        // Register a load progress event to show a load bar
        this.load.on('progress', (value) => {
            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(0, this.sys.game.config.height / 2, this.sys.game.config.width * value, 60);
        });

        // Register a load complete event to launch the title screen when all files are loaded
        this.load.on('complete', () => {
            
            progress.destroy();
            this.scene.start('TitleScene');
        });

        this.load.spritesheet('zelda', 'assets/images/zelda.png', {
            frameWidth: 32,
            frameHeight: 32,
            spacing: 0
        });

//        this.load.audio('overworld', [
  //          'assets/music/overworld.ogg',
    //        'assets/music/overworld.mp3'
      //  ]);

    }
}

export default BootScene;
