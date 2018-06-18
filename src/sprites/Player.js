export default class Player extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.add.existing(this);
        this.wasHurt = -1;
        this.alive = true;
        //this.createAnims();
        this.step=0;
        this.attack=false;
        this.kills=0;
        this.win=false;
    }

    update(keys, time, delta) {
        this.step++;
        if (!this.alive || this.win) { 
            return
        }

        if (this.wasHurt > 0) {
            this.wasHurt -= delta;
            this.flashToggle = !this.flashToggle;
            this.alpha = this.flashToggle ? 0.2 : 1;
            if (this.wasHurt <= 0) {
                this.alpha = 1;
            }
        }

        let input = {
            left: keys.left.isDown,
            right: keys.right.isDown,
            down: keys.down.isDown,
            up: keys.up.isDown,
            enter: keys.enter.isDown 
        }
        if (this.step%5==0) {
            this.setFrame(0);
            this.attack=false;
        }
        if (input.enter) {
            this.setFrame(1);
            this.attack=true;
        }

        let move = 1
        if ((input.left || input.right) && (input.down || input.up)) {
            move = 0.7
        }

        if (input.left && this.x>16) {
            this.x-=move
            this.flipX = false
        } else if (input.right && this.x<384) {
            this.x+=move
            this.flipX = true
        } 
        if (input.down && this.y<224) {
            this.y+=move
        } else if (input.up && this.y>16) {
            this.y-=move
        }

    }

    hurt() {
        this.alive=false;
        this.setFrame(5);
    }
}
