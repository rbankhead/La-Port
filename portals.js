class Portal {
    constructor(game, x, y, color){
        Object.assign(this, {game, x, y, color});
        if (this.color === "green"){
            this.game.greenPortal = this;
            this.spritesheet = ASSET_MANAGER.getAsset("./sprites/greenportal.png");
        } else if (this.color === "purple"){
            this.game.purplePortal = this;
            this.spritesheet = ASSET_MANAGER.getAsset("./sprites/purpleportal.png");
        } else {
            console.log("invalid color entered for portal");
            return;
        }
        this.state = "active";//opening, active, unlinked, closing
        this.BB = new BoundingBox(this.x+16,this.y+10,7,26);
        this.animation = new Animator(this.spritesheet, 12, 14, 36, 60, 8, .1,28, false, true);
    }
    update(){

    }
    draw(ctx){
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
        if (PARAMS.DEBUG){
            ctx.strokeStyle = 'Blue';
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }
}