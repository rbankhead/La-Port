// noinspection JSSuspiciousNameCombination
class Porta {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.game.porta = this;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/porta.png");
        this.spritesheetReflected = ASSET_MANAGER.getAsset("./sprites/portareflected.png");
        this.width = 14;
        this.height = 25;

        this.velocity = { x: 0, y: .001 };
        this.facing = "right"; //left, right
        this.state = "walking"; //idle, walking, running, interacting, dying
        this.dead=false;
        this.suicideCounter=0;
        this.updateBB();

        this.animations = [];
        this.loadAnimations();
        this.nudgeCounter = 0;
        this.shotCounter = 0;

        this.jumpSound = new Audio("./audio/jump.wav");
        this.shootSound = new Audio("./audio/laser.wav");
        this.dieSound = new Audio("./audio/die.wav");
        this.suicideSound = new Audio("./audio/suicide.wav");
    }

    updateVelocities(entryPortal, exitPortal){
        console.log(exitPortal.orientation);
        let tempx = this.velocity.x;
        let tempy = this.velocity.y;
        if (entryPortal.orientation === "top") {
            switch (exitPortal.orientation) {
                case ("top"):
                    this.velocity.y = -this.velocity.y;
                    break;
                case ("left"):
                    this.velocity.x = -this.velocity.y;
                    this.velocity.y = tempx;
                    break;
                case ("right"):
                    this.velocity.x = this.velocity.y;
                    this.velocity.y = -tempx;
                    break;
            }

        } else if (entryPortal.orientation === "bottom") {
            switch (exitPortal.orientation) {
                case ("bottom"):
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

        } else if (entryPortal.orientation === "left") {
            switch (exitPortal.orientation) {
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
            switch (exitPortal.orientation) {
                case ("bottom"):
                    this.velocity.y = -this.velocity.x;
                    this.velocity.x = tempy;
                    break;
                case ("top"):
                    this.velocity.y = this.velocity.x;
                    this.velocity.x = tempy;
                    break;
                case ("right"):
                    this.velocity.x = -this.velocity.x;
                    break;
            }

        }
        if (this.velocity.y === 0) this.velocity.y = .01; //makes sure there's no floating
    }

    loadAnimations() {
        //initializing arrays
        this.animations["right"] = [];
        this.animations["left"] = [];

        //initializing the animation objects for each state

        //idle states
        this.animations["right"]["idle"] = new Animator(this.spritesheet, 8, 8, this.width, this.height, 4, .2, 18, false, true);
        this.animations["left"]["idle"] = new Animator(this.spritesheetReflected, 137, 8, this.width, this.height, 4, .2, 18, false, true);

        //walking states
        this.animations["right"]["walking"] = new Animator(this.spritesheet, 8, 37, this.width, this.height, 8, .2, 18, false, true);
        this.animations["left"]["walking"] = new Animator(this.spritesheetReflected, 8, 37, this.width, this.height, 8, .2, 18, false, true);

        //running states
        this.animations["right"]["running"] = new Animator(this.spritesheet, 8, 37, this.width, this.height, 8, .1, 18, false, true);
        this.animations["left"]["running"] = new Animator(this.spritesheetReflected, 8, 37, this.width, this.height, 8, .1, 18, false, true);

        //shooting states
        this.animations["right"]["shooting"] = new Animator(this.spritesheet, 8, 72, 23, 21, 5, .075, 8,false, false);
        this.animations["left"]["shooting"] = new Animator(this.spritesheetReflected, 101, 72, 23, 21, 5, .075,8,true, false);

        //dying states
        this.animations["right"]["dying"] = new Animator(this.spritesheet, 8, 136, this.width, this.height, 8, .2, 18,false, true);
        this.animations["left"]["dying"] = new Animator(this.spritesheetReflected, 8, 136, this.width, this.height, 8, .2, 18,true, true);
        this.deathAnimation = new Animator(this.spritesheet, 232, 136, this.width, this.height, 1, .1, 18,false, true);
    }

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, 22, 32);
    }

    die(){
        /**
         * Death can only be triggered via suicide currently (by holding R)
         * TODO: Add BB under the level which kills Porta if she falls far enough to collide with it
         * TODO: Add the ability for lasers to kill Porta if she collides with their beam for too long
         */
        this.dead=true;
        this.velocity.y = -25; //arbitrary speed to teleport out of level
        this.dieSound.play();
    }

    update() {
        //nudge(this);

        //const TICK = this.game.clockTick;
        const WALK_SPEED = 3;
        const RUN_SPEED = 4;
        const MAX_FALL = 15;
        const ACC_FALLING = .4; //each 'tick' will make Porta velocity.y *= ACC_FALLING until MAX_FALL is reached

        /**
         * if left and right click are both pressed, set both flags to false and dont shoot any projectiles
         * on left click shoots purple portal at cursor
         * on right click shoots green portal at cursor
         */
        if (this.game.leftclick && this.game.rightclick) {
            this.game.rightclick = false;
            this.game.leftclick = false;
        } else if (this.game.leftclick) {
            this.shootSound.play();
            this.state="shooting";
            this.shotCounter = 1;
            if (this.game.purplePortal) this.game.purplePortal.removeFromWorld = true; //if there is already a purple portal then destroy the old one
            this.game.addEntity(new Projectile(this.game, this.x+this.width/2, this.y+this.height/2, this.game.leftclick.x + this.game.camera.x, this.game.leftclick.y, "purple"));
            this.facing = this.game.leftclick.x + this.game.camera.x  >= this.x ? "right" : "left";
            this.game.leftclick = false; //resetting mouse click input flags NOT handled in gameEngine as with keyboard. must be done here after action performed
            this.animations["right"]["shooting"] = new Animator(this.spritesheet, 8, 72, 23, 21, 5, .075, 8,false, false);
            this.animations["left"]["shooting"] = new Animator(this.spritesheetReflected, 101, 72, 23, 21, 5, .075,8,true, false);
        } else if (this.game.rightclick) {
            this.shootSound.play();
            this.state="shooting";
            this.shotCounter = 1;
            if (this.game.greenPortal) this.game.greenPortal.removeFromWorld = true; //if there is already a green portal then destroy the old one
            this.game.addEntity(new Projectile(this.game, this.x, this.y, this.game.rightclick.x + this.game.camera.x, this.game.rightclick.y, "green"));
            console.log(this.game.rightclick.x + " " + this.x);
            this.facing = this.game.rightclick.x + this.game.camera.x >= this.x ? "right" : "left";
            this.game.rightclick = false; //resetting mouse click input flags NOT handled in gameEngine as with keyboard. must be done here after action performed
            this.animations["right"]["shooting"] = new Animator(this.spritesheet, 8, 72, 23, 21, 5, .075, 8,false, false);
            this.animations["left"]["shooting"] = new Animator(this.spritesheetReflected, 101, 72, 23, 21, 5, .075,8,true, false);
        }


        else if ((!this.game.right && !this.game.left) || (this.game.right && this.game.left)) {
            if (this.shotCounter === 0) this.state = "idle"; //Check if not moving or if both movement keys are pressed
        }
        //left and right movement
        else if (this.game.right && this.velocity.y === 0) {
            this.facing = "right";
            if (this.shotCounter === 0) this.state = this.game.shift ? "running" : "walking";
            if (this.game.shift && this.velocity.x < RUN_SPEED) this.velocity.x += 1;
            else if (this.velocity.x < WALK_SPEED) this.velocity.x += .5;
        } else if (this.game.left && this.velocity.y === 0) {
            this.facing = "left";
            if (this.shotCounter === 0) this.state = this.game.shift ? "running" : "walking";
            if (this.game.shift && this.velocity.x > -1 * RUN_SPEED) this.velocity.x -= 1;
            else if (this.velocity.x > -1 * WALK_SPEED) this.velocity.x -= .5;
        }

        if (this.holding && this.game.E) {
            if (this.holding.held) {
                this.holding.drop();
            }
        }
        //Jump
        /* The jumping is functional without stuttering because the y impulse
            is not congruent to the y acceleration constant.  This means that
            at the peak of the arc, the player does not become suspended, but instead
            transitions from moving up very slowly to down very slowly, only becoming
            zero upon collision with a surface.
        */
        if (this.game.space && this.velocity.y === 0){
            this.velocity.y = -10;
            this.jumpSound.play();
        }
        //Gravity and Drag
        if (!this.dead){ //if the player is dead and teleporting out, we don't need to worry about gravity

            if (this.velocity.y !== 0 && this.velocity.y < MAX_FALL) this.velocity.y += ACC_FALLING;
            if(this.velocity.y!==0){ //airborne
                if((this.game.right && this.game.left)||(!this.game.right && !this.game.left))
                    this.velocity.x = this.velocity.x/1.02;
                else if(this.game.left && this.velocity.x > -1* WALK_SPEED) this.velocity.x -= .25;
                else if(this.game.right && this.velocity.x < WALK_SPEED) this.velocity.x += .25;
            } else { //on the ground
                if(this.velocity.x > 0 && !this.game.right) this.velocity.x -= .5;
                else if(this.velocity.x < 0 && !this.game.left) this.velocity.x += .5;
            }

        }

        //position update
        if (Math.abs(this.velocity.x) < .25) this.velocity.x = 0; //prevents inching on weird small number
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.updateBB();

        //collision
        /**
         * This forEach loop iterates over all objects in the game.entities[] list & checks for collisions with Porta
         *
         * We call forEach here on a slice().reverse() of the entities array (a shallow copy of the list which gets reversed)
         * Because forEach iterates over the list in order and
         * Portals are added to the end of the entities[] list when they are created and
         * We need to check for portal collisions before we check for Brick collisions because
         * It prevents a bug that would reduce velocity.y to zero inappropriately
         *
         * ***Beware of possible bugs as a result of iterating over this list in reverse***
         */
        if(!this.dead){ //if the player is dead and teleporting out, do not check for collision
            let that = this;
            this.game.entities.slice().reverse().forEach(function(entity){
                if(entity.BB && that.BB.collide(entity.BB)){
                    if (entity instanceof Portal && entity.linkedPortal && entity.active){
                        switch (entity.linkedPortal.orientation){
                            case("top"):
                                that.x = entity.linkedPortal.x;
                                that.y = entity.linkedPortal.y-32;
                                if(that.velocity.y === 0) that.velocity.y = .001; //band aid to make gravity work
                                break;
                            case("bottom"):
                                that.x = entity.linkedPortal.x;
                                that.y = entity.linkedPortal.y+32;
                                if(that.velocity.y === 0) that.velocity.y = .001;
                                break;
                            case("left"):
                                that.x = entity.linkedPortal.x-22;
                                that.y = entity.linkedPortal.y;
                                if(that.velocity.y === 0) that.velocity.y = .001;
                                break;
                            case("right"):
                                that.x = entity.linkedPortal.x+22;
                                that.y = entity.linkedPortal.y;
                                if(that.velocity.y === 0) that.velocity.y = .001;
                                break;

                        }
                        that.updateBB();
                        that.updateVelocities(entity, entity.linkedPortal);

                    }
                    if (entity instanceof Brick){
                        if (that.velocity.y > 0 && entity.top){ //falling
                            if(that.lastBB.bottom <= entity.BB.top ){ //landing
                                if (that.velocity.x > RUN_SPEED) that.velocity.x = that.game.shift ? RUN_SPEED : WALK_SPEED;
                                if (that.velocity.x < -RUN_SPEED) that.velocity.x = that.game.shift ? -RUN_SPEED : -WALK_SPEED;
                                that.y = entity.BB.top - 32;
                                that.velocity.y = 0;
                            }
                        }
                        if (that.velocity.y < 0 && entity.bottom){ //jumping
                            if(that.lastBB.top >= entity.BB.bottom ) { //landing
                                that.y = entity.BB.bottom;
                                that.velocity.y = 0.001;
                            }
                        }
                        if (that.velocity.x > 0) { //walking into brick on the right
                            if (that.lastBB.right <= entity.BB.left){
                                that.x = entity.BB.left - 22.5;
                                that.velocity.x = 0;
                            }
                        }
                        if (that.velocity.x < 0 && entity.right) { //walking into brick on the left
                            if (that.lastBB.left >= entity.BB.right){
                                that.x = entity.BB.right;
                                that.velocity.x = 0;
                            }
                        }
                        that.updateBB();
                    }

                    if (entity instanceof CompanionCube) {
                        if (that.game.E){
                            if (!entity.held) {
                                that.game.E = false;
                                entity.held = true;
                                entity.BB = new BoundingBox(-10,-10,0,0);
                                that.holding = entity;
                            }
                        }
                    }
                    if (entity instanceof Checkpoint){
                        entity.active = true;
                        that.game.camera.portaSpawn.x = entity.x;
                        that.game.camera.portaSpawn.y = entity.y;
                    }

                    if ((entity instanceof Door) && that.lastBB.right <= entity.BB.left) {
                        if (entity.state != 3) {
                            that.x = entity.BB.left - 22.5;
                            that.velocity.x = 0;
                            that.updateBB();
                        }
                    }
                    if ((entity instanceof Door) && that.lastBB.left >= entity.BB.right) {
                        if (entity.state != 3) {
                            that.x = entity.BB.right;
                            that.velocity.x = 0;
                            that.updateBB();
                        }
                    }

                    if (entity instanceof Coin){
                        Coin.coinCount += 1;
                        entity.removeFromWorld = true;
                        entity.playSound();
                    }

                }
            });

            nudge(this);
            

            /**
             * Suicide feature
             * Giving the player the option to reset the level if they are stuck or just want to restart
             * If R is being pressed the suicide counter increments by 1
             * each tick this update() method is called so this increments approx 60x per second while R is held
             * if the player releases R at any point, the else statement will trigger and reset the counter
             *
             * The code to reload the level after Porta teleports out is in the update() method of Scenemanager
             *
             **/
            if (this.suicideCounter >= 90 || this.y > 42 * PARAMS.BLOCKWIDTH) this.die();
            if (this.game.R && this.state!="dying"){
                this.suicideSound.play();
                this.state="dying"; //do this last so it takes priority over idle, walking etc
                this.suicideCounter++;
            } else {
                this.suicideCounter = 0;

                //reinitialize the animation so they restart if R is depressed
                //without these lines tapping R will cause the animation to play all the way through even though you never die
                //this is potentially expensive so look here if we have any performance issues later on
                this.animations["right"]["dying"] = new Animator(this.spritesheet, 8, 136, this.width, this.height, 8, .2, 18,false, true);
                this.animations["left"]["dying"] = new Animator(this.spritesheetReflected, 8, 136, this.width, this.height, 8, .2, 18,true, true);
            }
            if(this.state === "shooting"){
                this.shotCounter++;
                if(this.shotCounter > 15) {
                    this.state = "idle";
                    this.shotCounter = 0;
                    this.animations["right"]["shooting"] = new Animator(this.spritesheet, 8, 72, 23, 21, 5, .075, 8,false, false);
                    this.animations["left"]["shooting"] = new Animator(this.spritesheetReflected, 101, 72, 23, 21, 5, .075,8,true, false);
                }
            }
        }
    }

    draw(ctx){
        if (this.dead){ //once dead, only display the teleporting out 'beam' frame
            this.deathAnimation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, PARAMS.SCALE);
        } else if (this.shotCounter!==0 && this.facing==="left"){
            this.animations[this.facing][this.state].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x-10, this.y, PARAMS.SCALE);
        } else {
            this.animations[this.facing][this.state].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, PARAMS.SCALE);
        }
        if (PARAMS.DEBUG){
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }
}
