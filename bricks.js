class Brick {
    constructor(game, x, y){
        Object.assign(this, {game, x, y});
        this.game.brick = this;
        this.spritesheet = ASSET_MANAGER.getAsset("ADD SPRITE"); //add sprite
    };

    update() {
        
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0);

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

