class Laser {
    constructor(game, x, y, facing = 0, scale = .5) {
        Object.assign(this, { game, x, y, facing, scale });
        this.game.laser = this;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/laser.png"); //add sprite
        this.length = 1;
        this.killCounter = 0;
        this.touchingPorta = false;
        this.BB = new BoundingBox(this.x, this.y, this.length, 10 * this.scale);
        this.growing = true;
    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, this.length, 10 * this.scale);
    }

    update() {
        this.touchingPorta = false;
        let that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                //if (entity instanceof Portal && entity.linkedPortal) {
                //TODO: Portal Collision?
                //}
                if (entity instanceof Porta) {
                    this.touchingPorta = true;
                    //this.killCounter += this.game.clockTick;
                    if (this.killCounter>1) {
                        //entity.die();
                    }
                }
                else if (entity instanceof Brick || entity instanceof CompanionCube){ 
                    that.growing = false;
                    that.length = 0;
                }
            } else that.growing = true;
            if (!this.touchingPorta) this.killCounter = 0;
        });
        if(this.length == 0){
            this.removeFromWorld = true;
        }
        if (this.growing) {
            if(this.facing == 0){
                //TODO: Collision not working going to the left on walls
                that.length += 5;
            } else{
                that.length -= 5;
            }
        }
        this.updateBB();
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x - this.game.camera.x, this.y, this.length, 10 * this.scale);
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Green';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    };
};