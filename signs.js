class Checkpoint {
    constructor(game, x, y){
        Object.assign(this, {game, x, y});
        this.game.checkpoint = this;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/checkpoint.png"); //add sprite
        this.animation = new Animator(this.spritesheet, 0, 0, 12, 19, 9, .1, 0, false, true);
        this.BB = new BoundingBox(this.x,this.y,36,60);
    };

    update() {
        
    };

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 3);
        if (PARAMS.DEBUG){
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    };
};


class InfoSign {
    static scale = 2;
    constructor(game, x, y, text){
        Object.assign(this, {game, x, y, text});
        //this.game.infoSign = this; RB: commenting out. this would make this.game.infoSign only equal to the most recently added sign. likely not helpful
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/info.png"); //add sprite
        this.BB = new BoundingBox(this.x,this.y,15*InfoSign.scale, 15*InfoSign.scale);
    };

    update() {

    };

    draw(ctx) {
        //only draw when porta is touching this.BB
        if (this.BB.collide(this.game.porta.BB)) ctx.fillText(this.text, this.x-this.game.camera.x - this.text.length*1.5, this.y-PARAMS.BLOCKWIDTH);

        ctx.drawImage(this.spritesheet, this.x - this.game.camera.x, this.y, 15*InfoSign.scale, 15*InfoSign.scale);
        if (PARAMS.DEBUG){
            ctx.strokeStyle = 'Green';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    };
};