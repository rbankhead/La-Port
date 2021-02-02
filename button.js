class Button {
    constructor(game, x, y, event, scale = 2) {
        Object.assign(this, { game, x, y, scale, event});
        this.game.switch = this;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/button.png"); //add sprite
        this.animations = [];
        this.animations["depress"] = new Animator(this.spritesheet, 0, 0, 14, 9, 3, .4, 0, false, true);
        this.animations["release"] = new Animator(this.spritesheet, 0, 10, 14, 9, 3, .4, 0, false, true);
        this.animations["down"] = new Animator(this.spritesheet, 0, 10, 14, 9, 1, 1, 0, false, true);
        this.animations["up"] = new Animator(this.spritesheet, 0, 0, 14, 9, 1, 1, 0, false, true);
        this.state = "up";
        this.BB = new BoundingBox(this.x, this.y, this.scale * 14, this.scale * 10);
        this.transitionTimer = 0;
    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y + (this.scale * 3), this.scale * 14, this.scale * 7);
    }



    update() {
        if (this.state == "depress" || this.state == "release") {
            this.transitionTimer--;
        }

        if (this.state == "depress" && this.transitionTimer <= 0) {
            this.state = "down"
            this.event(); //activates button event
        }
        let that = this;
        var collisionFlag = false;
        this.game.entities.slice().reverse().forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if ((entity instanceof Porta || entity instanceof CompanionCube)) {
                    collisionFlag = true;
                    //entity.velocity.y = -20; //code to make button into launch pad
                    if (that.state != "down" && that.transitionTimer == 0) {
                        that.transitionTimer = 100;
                        that.state = "depress";
                    }
                }
            }
        });
        if (!collisionFlag && that.state == "down" && that.transitionTimer == 0) {
            that.state = "release";
            that.transitionTimer = 100;
        }
        if (this.state == "release" && this.transitionTimer == 0) {
            this.state = "up";
        }
        this.updateBB();
    };

    draw(ctx) {
        this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.scale);
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    };
};