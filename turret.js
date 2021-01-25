class Turret {
    constructor(game, x, y){
        Object.assign(this, {game, x, y});
        this.game.turret = this;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/turret.png"); //add sprite

        this.animation = new Animator(this.spritesheet, 0, 0, 8, 15, 4, .3, 1, false, true);
    };

    update() {
        
    };

    draw(ctx) {
        //ctx.drawImage(this.spritesheet, 0, 0);
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 2);

    };
};