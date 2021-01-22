class CompCube {
    constructor(game, x, y){
        Object.assign(this, {game, x, y});
        this.game.companionCube = this;
        this.spritesheet = ASSET_MANAGER.getAsset("ADD SPRITE"); //add sprite
    };

    update() {
        
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0);

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