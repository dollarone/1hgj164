import Player from '../sprites/Player';
import Bat from '../sprites/Bat';

class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
    }

    preload() {
    }

    create() {

        // This group contains all enemies for collision and calling update-methods
        this.enemyGroup = this.add.group();

        this.keys = {
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
            enter: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
        };

        this.physics.world.resume();

        // CREATE Player!
        this.player = new Player({
            scene: this,
            key: 'zelda',
            x: 16 * 6,
            y: this.sys.game.config.height - 48 - 48
        });
        for (let i=0; i<10; i++) { 
            let bat = new Bat({
                scene: this,
                key: 'zelda',
                x: Phaser.Math.FloatBetween(-20,this.sys.game.config.width+20),
                y: Phaser.Math.FloatBetween(-20,this.sys.game.config.height+20)
            });
            bat.setPlayer(this.player);
            this.enemyGroup.add(bat);
        }

        this.step=0

        this.rKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }

    update(time, delta) {
        this.step++;
        if (this.player.kills>9 && !this.player.win) {
            this.player.win=true;
            let dame = this.add.sprite(this.player.x+32, this.player.y, 'zelda');
            dame.setFrame(4);
            this.player.flip=false;
            this.scoreText = this.add.text(16, 16, 'THE LEGEND OF ZELDA:\nKILLING BATS GETS THE GIRL\n\nGAME OVER', { fontSize: '16px', fill: '#555' });
        }


        if (this.physics.world.isPaused) {
            return;
        }

        // Run the update method of Mario
        this.player.update(this.keys, time, delta);

        // Run the update method of all enemies
        this.enemyGroup.children.entries.forEach(
            (sprite) => {
                sprite.update(time, delta);
            }
        )
        if (this.rKey.isDown) {
            this.restartScene();
        }
    }
    restartScene() {
        this.scene.restart()
    }
}

export default GameScene;
