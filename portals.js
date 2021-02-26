class Portal {
    constructor(game, x, y, color, orientation){
        Object.assign(this, {game, x, y, color, orientation});
        this.active = false;
        this.openingCounter = 0;

        if (this.color === "green"){
            if (this.game.greenPortal) {
                if (this.game.purplePortal) this.game.purplePortal.linkedPortal = false;
                this.game.greenPortal.removeFromWorld = true;
            }

            this.game.greenPortal = this;
            this.spritesheet = (this.orientation === "top" || this.orientation === "bottom") ?
                ASSET_MANAGER.getAsset("./sprites/greenportalrotate.png") : ASSET_MANAGER.getAsset("./sprites/greenportal.png");

        } else if (this.color === "purple"){
            if (this.game.purplePortal) {
                if (this.game.greenPortal) this.game.greenPortal.linkedPortal = false;
                this.game.purplePortal.removeFromWorld = true;
            }

            this.game.purplePortal = this;
            this.spritesheet = (this.orientation === "top" || this.orientation === "bottom") ?
                ASSET_MANAGER.getAsset("./sprites/purpleportalrotate.png") : ASSET_MANAGER.getAsset("./sprites/purpleportal.png");

        } else {
            console.log("invalid color entered for portal");
            return;
        }
        switch(this.orientation){
            case("top"):
                this.BB = new BoundingBox(this.x+6,this.y+PARAMS.PORTAL_ANIM_OFFSET-2,30,1);
                break;
            case("bottom"):
                this.BB = new BoundingBox(this.x+3,this.y+PARAMS.PORTAL_ANIM_OFFSET+2,30,1);
                break;
            case("left"):
                this.BB = new BoundingBox(this.x+PARAMS.PORTAL_ANIM_OFFSET,this.y+10,1,26);
                break;
            case("right"):
                this.BB = new BoundingBox(this.x+PARAMS.PORTAL_ANIM_OFFSET,this.y+10,1,26);
                break;
        }


        if (this.orientation === "top" || this.orientation === "bottom") {
            this.animation = new Animator(this.spritesheet, 135, 12, 60, 39, 8, .1,25, false, true,true);
            this.openAnimation = new Animator(this.spritesheet, 70, 12, 60, 39, 8, .075,25, false, false,true);
            //this.closeAnimation = new Animator(this.spritesheet, 0, 12, 60, 39, 8, .075,25, false, false,true);
        } else {
            this.animation = new Animator(this.spritesheet, 12, 14, 36, 60, 8, .1,28, false, true);
            this.openAnimation = new Animator(this.spritesheet, 12, 74, 36, 60, 8, .075,28, false, false);
            //this.closeAnimation = new Animator(this.spritesheet, 12, 134, 36, 60, 8, .075,28, false, false);
        }
    }

    update(){
        if (this.openingCounter < .25) {
            this.openingCounter+=this.game.clockTick;
        } else this.active = true;

        if (this.color === "green") {
            if (this.game.purplePortal){
                this.linkedPortal = this.game.purplePortal;
            } else {

            }
        } else if (this.color === "purple"){
            if (this.game.greenPortal){
                this.linkedPortal = this.game.greenPortal;
            } else {

            }

        }
    }

    draw(ctx){
        if (this.openingCounter<15 && !this.active){
            this.openAnimation.drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y, 1);
        } else this.animation.drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y, 1);

        if (PARAMS.DEBUG){
            ctx.strokeStyle = 'Blue';
            ctx.strokeRect(this.BB.x-this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }
}

class DyingPortal {
    constructor(game, x, y, color, orientation) {
        Object.assign(this, {game, x, y, color, orientation});
        this.duration = 0;

        if (this.color === "green") {
            this.spritesheet = (this.orientation === "top" || this.orientation === "bottom") ?
                ASSET_MANAGER.getAsset("./sprites/greenportalrotate.png") : ASSET_MANAGER.getAsset("./sprites/greenportal.png");

        } else if (this.color === "purple") {
            this.spritesheet = (this.orientation === "top" || this.orientation === "bottom") ?
                ASSET_MANAGER.getAsset("./sprites/purpleportalrotate.png") : ASSET_MANAGER.getAsset("./sprites/purpleportal.png");

        } else {
            console.log("invalid color entered for portal");
            return;
        }

        if (this.orientation === "top" || this.orientation === "bottom") {
            this.animation = new Animator(this.spritesheet, 0, 12, 60, 39, 8, .075, 25, false, false, true);
        } else {
            this.animation = new Animator(this.spritesheet, 12, 134, 36, 60, 8, .075, 28, false, false);
        }
    }
    update(){
        this.duration += this.game.clockTick;
        if (this.duration >= 1) this.removeFromWorld = true;
    }
    draw(ctx){
        this.animation.drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y, 1);
    }
}