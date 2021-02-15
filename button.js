class Button {
    constructor(game, x, y, door, scale = 2) {
        Object.assign(this, { game, x, y, scale, door});
        this.game.switch = this;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/button.png"); //add sprite
        this.animations = [];
        this.animations[0] = new Animator(this.spritesheet, 0, 0, 14, 9, 1, 1, 0, false, true); //up
        this.animations[1] = new Animator(this.spritesheet, 0, 0, 14, 9, 3, .1, 0, false, true); //depressing
        this.animations[2] = new Animator(this.spritesheet, 0, 10, 14, 9, 3, .1, 0, false, true); //releasing
        this.animations[3] = new Animator(this.spritesheet, 0, 10, 14, 9, 1, 1, 0, false, true); //down
        this.state = 0;
        this.BB = new BoundingBox(this.x, this.y, this.scale * 14, this.scale * 10);
        this.sound = AUDIO_MANAGER.getAsset("./audio/button.wav");
    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y + (this.scale * 3), this.scale * 14, this.scale * 7);
    }



    update() {


        let that = this;
        var collisionFlag = false;
        this.game.entities.slice().reverse().forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (entity instanceof Porta || entity instanceof CompanionCube) {
                    //entity.velocity.y = -20; //code to make button into launch pad
                    collisionFlag = true;
                    if(that.state == 0) that.state = 1;
                }
            }
        });
        if(!collisionFlag && this.state != 0){
            this.state = 2;
        }
        
        if(this.state == 0 && (this.door.state == 3 ||this.door.state == 1)){
            this.door.state = 2;
        }
        else if(this.state == 3 && (this.door.state == 0 ||this.door.state == 2)){
            this.door.state = 1;
        }
        this.updateBB();
    };

    draw(ctx) {
        this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.scale);
        if((this.state == 1 || this.state == 2) && this.animations[this.state].currentFrame() >= 2){
            this.animations[this.state].elapsedTime = 0;
            this.state = (this.state + 2)%4;
            this.sound.play();
        }
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    };
};