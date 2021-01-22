class Gun {
    constructor(game, x, y){
        Object.assign(this, {game, x, y});
        this.game.gun = this;
        this.spritesheet = ASSET_MANAGER.getAsset("ADD SPRITE"); //add sprite
    };

    update() {
        
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0);

    };
};