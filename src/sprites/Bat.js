export default class Bat extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.add.existing(this);
        this.wasHurt = -1;
        this.alive = true;
        this.step=0;
        this.setFrame(2);
        this.frameOffset=0;
    }

    setPlayer(player) {
        this.player=player;
    }

    update(keys, time, delta) {
        this.step++;

        if (this.x>this.player.x-16 && this.x<this.player.x+16 &&
            this.y>this.player.y-16 && this.y<this.player.y+16 && this.player.attack) {
            this.destroy();
            this.player.kills+=1;
        }

        if (this.x>this.player.x-8 && this.x<this.player.x+8 &&
            this.y>this.player.y-8 && this.y<this.player.y+8) {
            this.player.hurt();
        }

        if (this.step%2==1) {
            return
        }
        if (this.step%4==0) {
            this.frameOffset = (this.frameOffset+1)%2;
            this.setFrame(2+this.frameOffset);
        }
        
        let input = {
            left: false,
            right: false,
            down: false,
            up: false
        }

        if (this.player.x<this.x) {
            input.left = true;
        }
        if (this.player.x>this.x) {
            input.right = true;
        }
        if (this.player.y<this.y) {
            input.up = true;
        }
        if (this.player.y>this.y) {
            input.down = true;
        }
//        this.setFrame(2+this.frame%2);

        let move = 1
        if ((input.left || input.right) && (input.down || input.up)) {
            move = 0.7
        }

        if (input.left) {
            this.x-=move
            this.flipX = false
        } else if (input.right) {
            this.x+=move
            this.flipX = true
        } 
        if (input.down) {
            this.y+=move
        } else if (input.up) {
            this.y-=move
        }
        


    }
}
