class CompCube {
    constructor(game, x, y){
        Object.assign(this, {game, x, y});
        this.game.companionCube = this;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/compCube.png"); //add sprite
        this.BB = new BoundingBox(this.x,this.y, 25, 25);

    };

    update() {
        
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x - this.game.camera.x, this.y);
        if (PARAMS.DEBUG){
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    };
};

class Switch {
    constructor(game, x, y){
        Object.assign(this, {game, x, y});
        this.game.switch = this;
        this.spritesheet = ASSET_MANAGER.getAsset("ADD SPRITE"); //add sprite
    };

    update() {
        
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0);

    };
};