class Porta{
    constructor(game, x, y){
        Object.assign(this, {game, x, y});
        this.game.porta = this;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/porta.png");
        this.spritesheetReflected = ASSET_MANAGER.getAsset("./sprites/portareflected.png");

        this.velocity = {x:0,y:0};
        this.item = "portal gun"; //none, portal gun
        this.facing = "right"; //left, right
        //consideration: including a "head swivel" animation if player is pressing up or down. should this be a 'state' for facing?
        this.state = "walking"; //idle, walking, running, jumping, interacting(throw/drop), dying
        //consideration: will "shooting" be a state? will it really require any change in animation?
        this.updateBB();

        this.animations = [];
        this.loadAnimations();
    }
    updateVelocities(entryPortal, exitPortal){
        console.log(exitPortal.orientation);
        let tempx = this.velocity.x;
        let tempy = this.velocity.y;
        if (entryPortal.orientation === "top"){
            switch(exitPortal.orientation){
                case ("top"):
                    this.velocity.y = -this.velocity.y;
                    break;
                case ("left"):
                    this.velocity.x = this.velocity.y;
                    this.velocity.y = tempx;
                    break;
                case ("right"):
                    this.velocity.x = this.velocity.y;
                    this.velocity.y = tempx;
                    break;
            }

        } else if (entryPortal.orientation === "bottom"){
            switch(exitPortal.orientation){
                case ("bottom"):
                    this.velocity.y = -this.velocity.y;
                    break;
                case ("left"):
                    this.velocity.x = -this.velocity.y;
                    this.velocity.y = tempx;
                    break;
                case ("right"):
                    this.velocity.x = this.velocity.y;
                    this.velocity.y = tempx;
                    break;
            }

        } else if (entryPortal.orientation === "left") {
            switch(exitPortal.orientation){
                case ("bottom"):
                    this.velocity.y = this.velocity.x;
                    this.velocity.x = tempy;
                    break;
                case ("top"):
                    this.velocity.y = -this.velocity.x;
                    this.velocity.x = tempy;
                    break;
                case ("left"):
                    this.velocity.x = -this.velocity.x;
                    break;
            }

        } else if (entryPortal.orientation === "right") {
            switch(exitPortal.orientation){
                case ("bottom"):
                    this.velocity.y = this.velocity.x;
                    this.velocity.x = tempy;
                    break;
                case ("top"):
                    this.velocity.y = -this.velocity.x;
                    this.velocity.x = tempy;
                    break;
                case ("right"):
                    this.velocity.x = -this.velocity.x;
                    break;
            }

        }

    }

    loadAnimations(){
        //initializing arrays
        this.animations["none"] = [];
        this.animations["none"]["right"] = [];
        this.animations["none"]["left"] = [];

        this.animations["portal gun"] = [];
        this.animations["portal gun"]["right"] = [];
        this.animations["portal gun"]["left"] = [];

        //initializing the animation objects for each state

        //idle states
        this.animations["portal gun"]["right"]["idle"] = new Animator(this.spritesheet, 8, 8, 14, 25, 4, .2, 18, false,true);
        this.animations["portal gun"]["left"]["idle"] = new Animator(this.spritesheetReflected, 137, 8, 14, 25, 4, .2, 18, false,true);

        //walking states
        this.animations["portal gun"]["right"]["walking"] = new Animator(this.spritesheet, 8, 37, 14, 25, 8, .2, 18,false, true);
        this.animations["portal gun"]["left"]["walking"] = new Animator(this.spritesheetReflected, 8, 37, 14, 25, 8, .2, 18, false,true);

        //running states
        this.animations["portal gun"]["right"]["running"] = new Animator(this.spritesheet, 8, 37, 14, 25, 8, .1, 18,false, true);
        this.animations["portal gun"]["left"]["running"] = new Animator(this.spritesheetReflected, 8, 37, 14, 25, 8, .1, 18, false,true);

        //jumping states
        //this.animations["portal gun"]["right"]["jumping"] = new Animator(this.spritesheet, TBD, TBD, TBD, TBD, TBD, TBD, false, true);
        //this.animations["portal gun"]["left"]["jumping"] = new Animator(this.spritesheet, TBD, TBD, TBD, TBD, TBD, TBD, false, true);

        //dying states. may adjust how this is done later
        //this.animations["none"]["right"]["dying"] = new Animator(this.spritesheet, TBD, TBD, TBD, TBD, TBD, TBD, false, true);
        //this.animations["none"]["left"]["dying"] = new Animator(this.spritesheet, TBD, TBD, TBD, TBD, TBD, TBD, false, true);
        //this.animations["portal gun"]["right"]["dying"] = new Animator(this.spritesheet, TBD, TBD, TBD, TBD, TBD, TBD, false, true);
        //this.animations["portal gun"]["left"]["dying"] = new Animator(this.spritesheet, TBD, TBD, TBD, TBD, TBD, TBD, false, true);

    }

    updateBB(){
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x,this.y,22,32);
    }
    update(){
        const TICK = this.game.clockTick;

        //all const values are placeholders until we can test it
        const WALK_SPEED = 3;
        const RUN_SPEED = 4;
        const MIN_FALL = 4;
        const MAX_FALL = 15;
        const ACC_FALLING = .4; //each 'tick' will make Porta's velocity.y *= ACC_FALLING until MAX_FALL is reached

        //if we are wielding the gun. Q: are we ever not? maybe if holding companion cube? unsure
        if (this.item === "portal gun") {
            if(this.game.leftclick && this.game.rightclick){
                this.game.rightclick = false;
                this.game.leftclick = false;
            }

            else if (this.game.leftclick){
                if (this.game.purplePortal) this.game.purplePortal.removeFromWorld = true; //if there is already a purple portal then destroy the old one
                this.game.addEntity(new Projectile(this.game, this.x, this.y, this.game.leftclick.x+this.game.camera.x, this.game.leftclick.y, "purple"));
                this.game.leftclick = false; //resetting mouse click input flags NOT handled in gameEngine as with keyboard. must be done here after action performed

            }

            else if (this.game.rightclick){
                if (this.game.greenPortal) this.game.greenPortal.removeFromWorld = true; //if there is already a green portal then destroy the old one
                this.game.addEntity(new Projectile(this.game, this.x, this.y, this.game.rightclick.x+this.game.camera.x, this.game.rightclick.y, "green"));
                this.game.rightclick = false; //resetting mouse click input flags NOT handled in gameEngine as with keyboard. must be done here after action performed
            }
        } else {
            if (this.item !== "none") {
                if (this.game.e){
                    this.state = "interacting";
                }
            }
        }

        //check if not moving or if both movement keys are pressed
        if ((!this.game.right && !this.game.left) || (this.game.right && this.game.left)){
            this.state = "idle";
        }
        //left and right movement
        else if (this.game.right) {
            this.facing = "right";
            this.state = this.game.shift ? "running" : "walking";
            this.velocity.x = this.game.shift ? RUN_SPEED : WALK_SPEED;
            this.x += this.velocity.x;
        } else if (this.game.left) {
            this.facing = "left";
            this.state = this.game.shift ? "running" : "walking";
            this.velocity.x = this.game.shift ? -1*RUN_SPEED : -1*WALK_SPEED;
            if (this.x>0) this.x += this.velocity.x;

        }

        this.updateBB();
        //TODO jumping
        /* The jumping is functional without stuttering because the y impulse
            is not congruent to the y acceleration constant.  This means that
            at the peak of the arc, the player does not become suspended, but instead
            transitions from moving up very slowly to down very slowly, only becoming
            zero upon collision with a surface.
        */
        if(this.game.space && this.velocity.y == 0) this.velocity.y = -10;
        //TODO falling
        //TODO portal interactions

        if(this.velocity.y != 0 && this.velocity.y < MAX_FALL) this.velocity.y += ACC_FALLING;
        this.y += this.velocity.y;

        //collision
        var that = this;
        this.game.entities.forEach(function(entity){
            if(entity.BB && that.BB.collide(entity.BB)){
                if (entity instanceof Portal && entity.linkedPortal){
                    switch (entity.linkedPortal.orientation){
                        case("top"):
                            that.x = entity.linkedPortal.x;
                            that.y = entity.linkedPortal.y-32;
                            if(that.velocity.y == 0) that.velocity.y = .001; //bandaid to make gravity work
                            break;
                        case("bottom"):
                            that.x = entity.linkedPortal.x;
                            that.y = entity.linkedPortal.y+32;
                            if(that.velocity.y == 0) that.velocity.y = .001;
                            break;
                        case("left"):
                            that.x = entity.linkedPortal.x-22;
                            that.y = entity.linkedPortal.y;
                            if(that.velocity.y == 0) that.velocity.y = .001;
                            break;
                        case("right"):
                            that.x = entity.linkedPortal.x+22;
                            that.y = entity.linkedPortal.y;
                            if(that.velocity.y == 0) that.velocity.y = .001;
                            break;

                    }
                    that.updateBB();
                    that.updateVelocities(entity, entity.linkedPortal);


                }
                else if (that.velocity.y > 0){ //falling
                    if((entity instanceof Brick) && that.lastBB.bottom <= entity.BB.top){ //landing
                        that.y = entity.BB.top - 32;
                        that.velocity.y = 0;
                    }

                }
                if (that.velocity.y < 0){ //jumping

                }
                //if we got here we have a collision
                //different types of collisions:
                //porta lands on the ground
                //porta hits a platform from below
                //porta hits a wall
                //porta collides with a portal
                //porta moves into a laser beam's path


            }
        });
    }

    draw(ctx){
        //this.animations[this.item][this.facing][this.state].drawFrame(this.game.clockTick, ctx, this.x, this.y, PARAMS.SCALE);
        this.animations[this.item][this.facing][this.state].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, PARAMS.SCALE);
        if (PARAMS.DEBUG){
            ctx.strokeStyle = 'Red';
            //ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }
}
