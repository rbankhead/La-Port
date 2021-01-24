class Brick {
    constructor(game, x, y){
        Object.assign(this, {game, x, y});
        //this.game.brick = this;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/tileset.png"); //add sprite

    };

    update() {
        
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet,96, 0,48,48,this.x- this.game.camera.x, this.y,48*PARAMS.SCALE,48*PARAMS.SCALE);

    };
};

class Door {
    constructor(game, x, y){
        Object.assign(this, {game, x, y});
        this.game.door = this;
        this.spritesheet = ASSET_MANAGER.getAsset("ADD SPRITE"); //add sprite
    };

    update() {
        
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0);

    };
};

