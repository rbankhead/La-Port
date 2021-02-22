class TitleScreen {
    constructor(game){
        Object.assign(this, {game});
        this.counter = 0;
        this.switch = true;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/TitleScreenWhite.png"); //add sprite
        this.altSpritesheet = ASSET_MANAGER.getAsset("./sprites/TitleScreenBlue.png"); //add sprite
        //392, 206
    }
    update(){
        if(this.game.enter){
            this.game.camera.title = false;
            this.game.camera.loadLevelOne();
        }
        this.counter += this.game.clockTick;
        if (this.counter > 0.25) {
            this.counter = 0;
            this.switch = !this.switch;
        }

    }
    draw(ctx){
        this.switch ? ctx.drawImage(this.spritesheet,0, 0,392,206,600-392/2, 768/2-206/2,392,206) : ctx.drawImage(this.altSpritesheet,0, 0,392,206,600-392/2, 768/2-206/2,392,206);
    }
}