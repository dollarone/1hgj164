import Enemy from './Enemy';

export default class Turtle extends Enemy {
    constructor(config) {
        super(config);
        this.flipX = true;
        this.anims.play('turtle');
        this.sliding = false;
        this.type = 'turtle';
    }

    update() {
        if (!this.activated()) {
            return;
        }
    }

    slidekill(turtle, victim) {
        if (typeof victim.starKilled !== 'undefined') {
            victim.starKilled();
        }
    }

    marioHit(enemy, mario) {
        // direction
        // den av overlap x or overlap y som är störst
        // let verticalHit = Math.abs(enemy.x-mario.x)<Math.abs(enemy.y-mario.y);

        // console.log('vertical',verticalHit);
        if (mario.star.active) {
            enemy.hurtMario(enemy, mario);
            return;
        }


        if (enemy.verticalHit(enemy, mario)) {
            // get points
            enemy.scene.updateScore(100);
            if (!enemy.sliding || (enemy.sliding && enemy.body.velocity.x === 0)) {
                enemy.scene.sound.playAudioSprite('sfx', 'smb_kick');
                //enemy.body.height = 16;
                enemy.direction = 150 * (mario.x < enemy.x ? 1 : -1);

                enemy.sliding = true;
                enemy.play('turtleShell');
            } else {
                enemy.scene.sound.playAudioSprite('sfx', 'smb_stomp');

                enemy.direction = 0;
                enemy.body.velocity.x = 0;
                enemy.sliding = true;
                enemy.play('turtleShell');
            }
            mario.enemyBounce(enemy);
        } else {
            if (enemy.sliding && enemy.body.velocity.x === 0) {
                enemy.scene.sound.playAudioSprite('sfx', 'smb_kick');

                enemy.direction = 150;
            } else {
                enemy.hurtMario(enemy, mario);
            }
        }


    }
}
