class Turret {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.game.turret = this;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/turret.png"); //add sprite
        this.animation = new Animator(this.spritesheet, 0, 0, 8, 15, 4, .3, 1, false, true);
        this.velocity = {x:0,y:.001}; //a nudge to get it to settle
        this.BB = new BoundingBox(this.x, this.y, 16, 30);
    };

    updateBB(){
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, 16, 30);
    }

    updateVelocities(entryPortal, exitPortal){
        if (entryPortal.orientation === "top"){
            switch(exitPortal.orientation){
                case ("top"):
                    this.velocity.y = -this.velocity.y;
                    break;
                case ("left"):
                    this.velocity.x = this.velocity.y;
                    break;
                case ("right"):
                    this.velocity.x = this.velocity.y;
                    break;
            }

        } else if (entryPortal.orientation === "bottom"){
            switch(exitPortal.orientation){
                case ("bottom"):
                    this.velocity.y = -this.velocity.y;
                    break;
                case ("left"):
                    this.velocity.x = -this.velocity.y;
                    break;
                case ("right"):
                    this.velocity.x = this.velocity.y;
                    break;
            }

        } else if (entryPortal.orientation === "left") {
            switch(exitPortal.orientation){
                case ("bottom"):
                    this.velocity.y = this.velocity.x;
                    break;
                case ("top"):
                    this.velocity.y = -this.velocity.x;
                    break;
                case ("left"):
                    this.velocity.x = -this.velocity.x;
                    break;
            }

        } else if (entryPortal.orientation === "right") {
            switch(exitPortal.orientation){
                case ("bottom"):
                    this.velocity.y = this.velocity.x;
                    break;
                case ("top"):
                    this.velocity.y = -this.velocity.x;
                    break;
                case ("right"):
                    this.velocity.x = -this.velocity.x;
                    break;
            }

        }
        if (this.velocity.y === 0) this.velocity.y = 0.001;

    }

    update() {
        const MAX_FALL = 15;
        const ACC_FALLING = .4;

        let that = this;
        this.game.entities.slice().reverse().forEach(function(entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (entity instanceof Portal && entity.linkedPortal) {
                    switch (entity.linkedPortal.orientation) {
                        case("top"):
                            that.x = entity.linkedPortal.x;
                            that.y = entity.linkedPortal.y - 32;
                            if (that.velocity.y == 0) that.velocity.y = .001; //bandaid to make gravity work
                            break;
                        case("bottom"):
                            that.x = entity.linkedPortal.x;
                            that.y = entity.linkedPortal.y + 32;
                            if (that.velocity.y == 0) that.velocity.y = .001;
                            break;
                        case("left"):
                            that.x = entity.linkedPortal.x - 22;
                            that.y = entity.linkedPortal.y;
                            if (that.velocity.y == 0) that.velocity.y = .001;
                            break;
                        case("right"):
                            that.x = entity.linkedPortal.x + 22;
                            that.y = entity.linkedPortal.y;
                            if (that.velocity.y == 0) that.velocity.y = .001;
                            break;

                    }
                    that.updateBB();
                    that.updateVelocities(entity, entity.linkedPortal);
                }
                if (that.velocity.y > 0){ //falling
                    if((entity instanceof Brick) && that.lastBB.bottom <= entity.BB.top){ //landing
                        that.y = entity.BB.top - 30;
                        that.velocity.y = 0;
                        that.updateBB();
                    }

                }
            }
        });

        //Gravity!
        if (this.velocity.y != 0 && this.velocity.y < MAX_FALL) this.velocity.y += ACC_FALLING;
        this.y += this.velocity.y;
        this.updateBB();
    };

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 2);
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    };
};