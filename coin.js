class Coin {
    static coinCount = 0;
    constructor(game, x, y, scale = 2, hud = false) {
        Object.assign(this, { game, x, y, scale, hud});
        this.game.laser = this;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/coin.png"); //add sprite
        this.animation = new Animator(this.spritesheet, 0, 0, 8, 7, 6, .1, 0, false, true);
        this.BB = new BoundingBox(this.x, this.y, 16, 16);
        this.sound = new Audio("./audio/coin.wav")
    };

    update() {


    };

    playSound() {
        this.sound.play();
    }

    draw(ctx) {
        //ctx.drawImage(this.spritesheet, this.x, this.y);
        if (!this.hud) {
            this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.scale);
            if (PARAMS.DEBUG) {
                ctx.strokeStyle = 'Red';
                ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
            }
        } else {
            this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);
            ctx.fillText("X " + Coin.coinCount, 36, 24);
        }
    };
};