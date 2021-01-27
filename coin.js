class Coin {
    constructor(game, x, y){
        Object.assign(this, {game, x, y});
        this.game.laser = this;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/coin.png"); //add sprite
        this.animation = new Animator(this.spritesheet, 0, 0, 8, 7, 6, .1, 0, false, true);
        this.BB = new BoundingBox(this.x,this.y,16,16);
    };

    update() {
        
        
    };

    draw(ctx) {
        //ctx.drawImage(this.spritesheet, this.x, this.y);
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 2);
        if (PARAMS.DEBUG){
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    };
};