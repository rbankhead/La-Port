class Portal {
    constructor(game, x, y, color, orientation){
        Object.assign(this, {game, x, y, color, orientation});

        if (this.color === "green"){
            if (this.game.greenPortal) this.game.greenPortal.removeFromWorld = true;
            this.game.greenPortal = this;
            this.spritesheet = (this.orientation === "top" || this.orientation === "bottom") ?
                ASSET_MANAGER.getAsset("./sprites/greenportalrotate.png") : ASSET_MANAGER.getAsset("./sprites/greenportal.png");
        } else if (this.color === "purple"){
            if (this.game.purplePortal) this.game.purplePortal.removeFromWorld = true;
            this.game.purplePortal = this;
            this.spritesheet = (this.orientation === "top" || this.orientation === "bottom") ?
                ASSET_MANAGER.getAsset("./sprites/purpleportalrotate.png") : ASSET_MANAGER.getAsset("./sprites/purpleportal.png");
        } else {
            console.log("invalid color entered for portal");
            return;
        }
        switch(this.orientation){
            case("top"):
                this.BB = new BoundingBox(this.x+9,this.y+PARAMS.PORTAL_ANIM_OFFSET-2,26,1);
                break;
            case("bottom"):
                this.BB = new BoundingBox(this.x+9,this.y+PARAMS.PORTAL_ANIM_OFFSET+2,26,1);
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
        } else {
            this.animation = new Animator(this.spritesheet, 12, 14, 36, 60, 8, .1,28, false, true);
        }
    }
    update(){
        if (this.color === "green" && this.game.purplePortal){
            this.linkedPortal = this.game.purplePortal;
        } else if (this.color === "purple" && this.game.greenPortal) {
            this.linkedPortal = this.game.greenPortal;
        }

    }
    draw(ctx){
        if (this.orientation === "top" || this.orientation === "bottom"){
            this.animation.drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y, 1);
        } else {
            this.animation.drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y, 1);
        }

        if (PARAMS.DEBUG){
            ctx.strokeStyle = 'Blue';
            ctx.strokeRect(this.BB.x-this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }
}