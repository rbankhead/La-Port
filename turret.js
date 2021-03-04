class Turret {
    constructor(game, x, y, facing='r') {
        Object.assign(this, { game, x, y, facing });
        this.game.turret = this;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/turret.png"); //add sprite
        this.animation = new Animator(this.spritesheet, 0, 15, 8, 15, 4, .3, 1, false, true);
        if(this.facing =='l') this.animation = new Animator(this.spritesheet, 0, 0, 8, 15, 4, .3, 1, false, true);
        this.velocity = {x:0,y:.001}; //a nudge to get it to settle
        this.BB = new BoundingBox(this.x, this.y, 16, 30);

        this.laser = new Laser(this.game,this.x+4,this.y+15, this.facing);
        this.game.addEntity(this.laser)
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
        this.laser.x = this.x+8;
        this.laser.y = this.y+15;
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

class Laser {
    constructor(game, x, y, facing = 'r') {
        Object.assign(this, { game, x, y, facing });
        this.colliding = false;
        this.BBwidth = 1;
        this.BB = new BoundingBox(this.x, this.y, this.BBwidth, 2);
    }
    update(){
        this.colliding = false;
        if(this.facing == 'l') this.BB = new BoundingBox(this.x - this.BBwidth, this.y, this.BBwidth, 2);
        else this.BB = new BoundingBox(this.x, this.y, this.BBwidth, 2);

        let that = this;
        this.game.entities.slice().reverse().forEach(function(entity){
            if(entity.BB && that.BB.collide(entity.BB)){

                if (entity instanceof Brick || (entity instanceof Door && entity.state != 3) || entity instanceof CompanionCube) {
                    that.colliding=true;
                    if(that.facing == 'l') that.BBwidth = that.x - entity.BB.x - entity.BB.width;
                    else that.BBwidth = entity.BB.x - that.BB.x;
                }
                if (entity instanceof Porta) {
                    entity.die();
                }
            }
        });
        if (!this.colliding){ 
            this.BBwidth += 200*this.game.clockTick;
        }
    }
    draw(ctx){
        ctx.strokeStyle = "Red";
        if(this.facing == 'l') ctx.strokeRect(this.x - this.BBwidth - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        else ctx.strokeRect(this.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        ctx.strokeStyle = "White";
    }
}