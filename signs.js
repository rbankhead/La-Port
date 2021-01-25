class Checkpoint {
    constructor(game, x, y){
        Object.assign(this, {game, x, y});
        this.game.checkpoint = this;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/checkpoint.png"); //add sprite
        this.animation = new Animator(this.spritesheet, 0, 0, 12, 19, 9, .1, 0, false, true);
    };

    update() {
        
    };

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 3);
    };
};


class InfoSign {
    static scale = 2;
    constructor(game, x, y){
        Object.assign(this, {game, x, y});
        this.game.infoSign = this;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/info.png"); //add sprite
    };

    update() {
        
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 60, 130, 15*InfoSign.scale, 15*InfoSign.scale);

    };
};