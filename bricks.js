class Brick {
    constructor(game, x, y, left, right, top, bottom){
        Object.assign(this, {game, x, y, left, right, top, bottom}); //l r t b correlate to parts of the brick which could have a portal
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/brick.png"); //add sprite
        this.BB = new BoundingBox(this.x,this.y,72,72); //i thought this would be w:48 and h:48 but those were too small. not sure why. 72 works.
    };

    update() {
        
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet,0, 0,48,47,this.x - this.game.camera.x, this.y,48*PARAMS.SCALE,48*PARAMS.SCALE);
        if (PARAMS.DEBUG){
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    };
};

class MirrorBrick  extends Brick{
    constructor(game, x, y, left, right, top, bottom){
        super(game, x, y, left, right, top, bottom);
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/mirror.png"); //add sprite
    };

    update() {
        
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet,0, 0,48,48,this.x - this.game.camera.x, this.y,48*PARAMS.SCALE,48*PARAMS.SCALE);
        if (PARAMS.DEBUG){
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    };
};

class GlassBrick extends Brick{
    constructor(game, x, y, left, right, top, bottom){
        super(game, x, y, left, right, top, bottom);
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/glass.png"); //add sprite

    };

    update() {
        
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, 48, 48,this.x - this.game.camera.x, this.y,48*PARAMS.SCALE,48*PARAMS.SCALE);
        if (PARAMS.DEBUG){
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    };
};