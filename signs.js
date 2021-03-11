class Checkpoint {
    constructor(game, x, y){
        Object.assign(this, {game, x, y});
        this.game.checkpoint = this;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/checkpoint.png");
        this.inactiveAnimation = new Animator(this.spritesheet, 0, 0, 12, 19, 1, .1, 0, false, true);
        this.activeAnimation = new Animator(this.spritesheet, 0, 0, 12, 19, 9, .1, 0, false, true);
        this.BB = new BoundingBox(this.x,this.y,36,60);
        this.sound = AUDIO_MANAGER.getAsset("./audio/checkpoint.wav");
    };

    update() {
        if(this.sound.currentTime>1){
            this.sound.pause();
            this.sound.currentTime = 0;
        }
    };

    // method to take checkpoint from inactive to active state
    // if checkpoint is active but not the current spawn, becomes spawn point
    activate(){
        if(!this.active) this.sound.play();
        this.active = true;
        this.game.camera.portaSpawn.x = this.x;
        this.game.camera.portaSpawn.y = this.y;
    };

    draw(ctx) {
        if (this.active) {
            this.activeAnimation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 3);
        } else {
            this.inactiveAnimation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 3);
        }
        if (PARAMS.DEBUG){
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    };
};


class InfoSign {
    static scale = 2;
    constructor(game, x, y, text){
        Object.assign(this, {game, x, y, text});
        //this.game.infoSign = this; RB: commenting out. this would make this.game.infoSign only equal to the most recently added sign. likely not helpful
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/info.png"); //add sprite
        this.BB = new BoundingBox(this.x,this.y,15*InfoSign.scale, 15*InfoSign.scale);
        this.textWidth = this.game.ctx.measureText(this.text).width; /// width in pixels
    };

    update() {

    };

    draw(ctx) {
        //only draw when porta is touching this.BB

        if (this.BB.collide(this.game.porta.BB)) {
            ctx.fillStyle = "LightGrey";
            ctx.fillRect(15+this.x - this.game.camera.x - (this.textWidth/2)-3, this.y-44, this.textWidth+6,26);
            ctx.fillStyle = "Green";
            ctx.strokeStyle = "Green";
            ctx.strokeRect(15+this.x - this.game.camera.x - (this.textWidth/2)-3, this.y-44, this.textWidth+6,26);
            ctx.fillText(this.text, 15+this.x - this.game.camera.x - this.textWidth/2, this.y-PARAMS.BLOCKWIDTH);
        }

        ctx.drawImage(this.spritesheet, this.x - this.game.camera.x, this.y, 15*InfoSign.scale, 15*InfoSign.scale);
        if (PARAMS.DEBUG){
            ctx.strokeStyle = 'Green';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    };
};

class CreditBlurb {
    constructor(game, lineNum, text){
        Object.assign(this, {game, lineNum, text});
        this.scroller = 0;
    };

    update() {
        if (this.scroller < 750) this.scroller += 50*this.game.clockTick;

    };

    draw(ctx) {
        ctx.font = "30px Arial";
        this.textWidth = this.game.ctx.measureText(this.text).width; /// width in pixels
        ctx.fillStyle = "LightGrey";
        ctx.fillRect(595-this.textWidth/2, 768+(this.lineNum*(PARAMS.BLOCKWIDTH*2))-this.scroller-10, this.textWidth+10,41);
        ctx.fillStyle = "Green";
        ctx.strokeStyle = "Green";
        ctx.strokeRect(595-this.textWidth/2, 768+(this.lineNum*(PARAMS.BLOCKWIDTH*2))-this.scroller-10, this.textWidth+10,41);
        ctx.fillText(this.text, 600 - this.textWidth/2, 768+(this.lineNum*(PARAMS.BLOCKWIDTH*2)+PARAMS.BLOCKWIDTH)-4-this.scroller);
    };
};