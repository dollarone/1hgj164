class TitleScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'TitleScene'
        });
    }
    preload() {
    }
    create() {
        this.scene.bringToTop();


        let sh = window.screen.availHeight;
        let sw = window.screen.availWidth;
        let ch = 0;
        let cw = 0;
        let multiplier = 1;
        if (sh / sw > 0.6) {
            // Portrait, fit width
            multiplier = sw / 400;
        } else {
            multiplier = sh / 240;
        }
        multiplier = Math.floor(multiplier);
        let el = document.getElementsByTagName('canvas')[0];
        el.style.width = 400 * multiplier + 'px';
        el.style.height = 240 * multiplier + 'px';
 

      //  this.pressX = this.add.bitmapText(16 * 8 + 4, 8 * 16, 'font', 'PRESS ENTER TO START', 8);
        this.scoreText = this.add.text(16, 16, 'THE LEGEND OF ZELDA:\nKILLING BATS GETS THE GIRL\n\nPRESS ENTER TO START', { fontSize: '16px', fill: '#555' });
        

        this.startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update(time, delta) {
        
        if (this.startKey.isDown) {
            this.startGame();
        }
    }

    startGame() {
        this.scene.stop('GameScene');
        this.scene.start('GameScene');
    }

    restartScene() {
        this.scene.stop('GameScene');
        this.scene.launch('GameScene');
        this.scene.bringToTop();
    }
}

export default TitleScene;
