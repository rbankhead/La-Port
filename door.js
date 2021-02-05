class Door {
    constructor(game, x, y, scale = 1.25) {
        Object.assign(this, { game, x, y, scale});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/door.png"); //add sprite
        this.animations = [];
        this.animations[0] = new Animator(this.spritesheet, 0, 0, 31, 59, 1, .2, 1, false, true); //closed
        this.animations[1] = new Animator(this.spritesheet, 0, 0, 31, 59, 9, .2, 1, false, true); //opening
        this.animations[2] = new Animator(this.spritesheet, 0, 0, 31, 59, 9, .2, 1, true, true); //closing
        this.animations[3] = new Animator(this.spritesheet, 8*32, 0, 31, 59, 1, .2, 1, false, true); //open
        this.BB = new BoundingBox(this.x, this.y, 16, 30);
        this.state = 0;
    };

    update(){

    }

    draw(ctx) {
        this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.scale);
        if((this.state == 1 || this.state == 2) && this.animations[this.state].currentFrame() >= 8){
            this.animations[this.state].elapsedTime = 0;
            this.state = (this.state + 2)%4;
        }
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    };
}