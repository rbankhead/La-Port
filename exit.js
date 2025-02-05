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
        this.game.greenPortal = false;
        this.game.purplePortal = false;
        this.game.camera.transition = true;
        this.game.camera.portaSpawn.x = 0*3 * PARAMS.BLOCKWIDTH;
        this.game.camera.portaSpawn.y = 28 * PARAMS.BLOCKWIDTH;
        this.removeFromWorld = true;
    }

    update() {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x - this.game.camera.x, this.y, 20*this.scale, 20*this.scale);
    };
};