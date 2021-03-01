class Exit {
    static coinCount = 0;
    constructor(game, x, y, scale = 2) {
        Object.assign(this, { game, x, y, scale});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/exit.png"); //add sprite

        this.BB = new BoundingBox(this.x, this.y, 20*this.scale, 20*this.scale);
        this.sound = AUDIO_MANAGER.getAsset("./audio/checkpoint.wav");
    };

    transition(){
        this.sound.play();
        this.game.camera.transition = true;
        this.removeFromWorld = true;
    }

    update() {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x - this.game.camera.x, this.y, 20*this.scale, 20*this.scale);
    };
};