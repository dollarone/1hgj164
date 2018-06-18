export default class Mario extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        //config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        this.small();

        //this.animSuffix = 'Super';
        //this.large();

        this.bending =false;
        this.wasHurt = -1;
        this.flashToggle = false;
        this.star = {
            active: false,
            timer: -1,
            step: 0
        }
        this.enteringPipe = false;
        this.anims.play('stand');
        this.alive = true;
        this.type = 'mario';
        this.jumpTimer = 0;
        this.jumping = false;
        this.fireCoolDown = 0;

        this.on('animationcomplete', () => {
            if (this.anims.currentAnim.key === 'grow' || this.anims.currentAnim.key === 'shrink') {
                this.scene.physics.world.resume();
            }
        }, this);
    }

    update(keys, time, delta) {
        
        
        this.fireCoolDown -= delta;

        
        if (this.wasHurt > 0) {
            this.wasHurt -= delta;
            this.flashToggle = !this.flashToggle;
            this.alpha = this.flashToggle ? 0.2 : 1;
            if (this.wasHurt <= 0) {
                this.alpha = 1;
            }
        }

        if (this.star.active) {
            if (this.star.timer < 0) {
                this.star.active = false;
                this.tint = 0xFFFFFF;
            } else {
                this.star.timer -= delta;
                this.star.step = (this.star.step === 5) ? 0 : this.star.step + 1;
                this.tint = [0xFFFFFF, 0xFF0000, 0xFFFFFF, 0x00FF00, 0xFFFFFF, 0x0000FF][this.star.step];
            }
        }


        let input = {
            left: keys.left.isDown || this.scene.touchControls.left,
            right: keys.right.isDown || this.scene.touchControls.right,
            down: keys.down.isDown || this.scene.touchControls.down,
            up: keys.up.isDown || this.scene.touchControls.up,
            enter: keys.enter.isDown 
        }


        if (input.enter && this.fireCoolDown < 0) {
            let fireball = this.scene.fireballs.get(this);
            if (fireball) {
                fireball.fire(this.x+10, this.y, this.flipX);
                this.fireCoolDown = 300;
            }
        }

        this.bending = false;

        this.jumpTimer -= delta;

        let move = 1
        if ((input.left || input.right) && (input.down || input.up)) {
            move = 0.7
        }

        if (input.left) {
            this.x-=move
            this.flipX = true
        } else if (input.right) {
            this.x+=move
            this.flipX = false
        } 
        if (input.down) {
            this.y+=move
        } else if (input.up) {
            this.y-=move
        }

    }
    resize(large) {
        this.scene.physics.world.pause();
        if (large) {
            this.large();
            this.animSuffix = 'Super';
            this.play('grow');
        } else {
            this.small();
            this.animSuffix = '';
            this.play('shrink');
        }
    }

    small() {
        this.setSize(10, 10);
    }
    large() {
        this.setSize(10, 22);
    }

    die() {
        this.scene.music.pause();
        this.play('death');
        this.scene.sound.playAudioSprite('sfx', 'smb_mariodie');
        this.alive = false;
    }

    enterPipe(id, dir, init = true) {

        if (init) {
            if (this.animSuffix === '') {
                this.play('stand');
            } else {
                this.play('bend' + this.animSuffix);
            }
            this.scene.sound.playAudioSprite('sfx', 'smb_pipe');

            this.enteringPipe = true;
            this.body.setVelocity(0);
            this.body.setAcceleration(0);
            this.setDepth(-100);
            this.scene.tweens.add({
                targets: this,
                y: this.y + 40,
                duration: 800,
                onComplete: function () {
                    console.log(this.targets, id, dir);
                    console.log(id);
                    console.log(dir);
                    this.targets[0].enterPipe(id, dir, false);
                },
            });

        } else {
            this.setDepth(1);
            this.enteringPipe = false;
            this.x = this.scene.destinations[id].x;
            this.y = this.scene.destinations[id].top ? -100 : 100;
            this.setRoomBounds(this.scene.rooms);
        }
    }

    setRoomBounds(rooms) {
        rooms.forEach(
            (room) => {
                if (this.x >= room.x && this.x <= (room.x + room.width)) {
                    let cam = this.scene.cameras.main;
                    let layer = this.scene.groundLayer;
                    cam.setBounds(room.x, 0, room.width * layer.scaleX, layer.height * layer.scaleY);
                    this.scene.finishLine.active = (room.x === 0);
                    this.scene.cameras.main.setBackgroundColor(room.sky);
                    return;
                }
            }
        );
    }



}
