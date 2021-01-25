class Coin {
    constructor(game, x, y){
        Object.assign(this, {game, x, y});
        this.game.laser = this;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/coin.png"); //add sprite
        this.animation = new Animator(this.spritesheet, 0, 0, 8, 7, 6, .1, 0, false, true);
    };

    update() {
        
    };

    draw(ctx) {
        //ctx.drawImage(this.spritesheet, this.x, this.y);
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 2);
    };
};