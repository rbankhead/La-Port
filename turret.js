class Turret {
    constructor(game, x, y){
        Object.assign(this, {game, x, y});
        this.game.turret = this;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/turret.png"); //add sprite
        this.animation = new Animator(this.spritesheet, 0, 0, 8, 15, 4, .3, 1, false, true);
        this.BB = new BoundingBox(this.x,this.y, 16,30);
    };

    update() {
        
    };

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 2);
        if (PARAMS.DEBUG){
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    };
};