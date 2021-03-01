class JumpPad {
    constructor(game, x, y, scale = 4) {
        Object.assign(this, { game, x, y, scale});
        this.game.switch = this;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/jumpPad.png"); //add sprite
        this.animations = [];
        this.animations[0] = new Animator(this.spritesheet, 0, 0, 11, 20, 1, 1, 0, false, true); //idle
        this.animations[1] = new Animator(this.spritesheet, 0, 0, 11, 20, 5, .05, 0, false, true); //firing
        this.animations[2] = new Animator(this.spritesheet, 0, 0, 11, 20, 5, .05, 0, true, true); //returning
        this.state = 0;
        this.BB = new BoundingBox(this.x, this.y, this.scale * 14, this.scale * 10);
        this.sound = AUDIO_MANAGER.getAsset("./audio/jump.wav");
    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y + (this.scale * 3), this.scale * 14, this.scale * 7);
    }



    update() {


        let that = this;
        this.game.entities.slice().reverse().forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (entity instanceof Porta || entity instanceof CompanionCube) {
                    entity.velocity.y = -20;
                    that.sound.play();
                    if(that.state == 0) that.state = 1;
                }
            }
        });
        this.updateBB();
    };

    draw(ctx) {
        this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.scale);
        if((this.state == 1 || this.state == 2) && this.animations[this.state].currentFrame() >= 4){
            this.state = this.state==1 ? 2:0;
            this.animations[this.state].elapsedTime = 0;
        }
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    };
};