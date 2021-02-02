class CompanionCube {
    
    constructor(game, x, y){
        Object.assign(this, {game, x, y});
        this.game.companionCube = this;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/compCube.png"); //add sprite
        this.velocity = {x:0,y:.001}; //a nudge to get it to settle
        this.updateBB();
        this.held = false;

    };

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

    updateBB(){
        if(!this.held){
            this.lastBB = this.BB;
            this.BB = new BoundingBox(this.x, this.y, 25, 25);
        }
    }

    drop(){
        this.held = false;
        this.updateBB();
        let that = this;
        let validLocation = true;
        this.game.entities.forEach(function(entity){
            if (entity.BB && that.BB.collide(entity.BB)) {
                console.log("maybe");
                if((entity instanceof Brick)){
                    console.log("ug");
                    validLocation = false;
                }
            }
        });
        if (validLocation) {
            that.game.E = false;
            this.velocity = {x:0,y:.001}
        } else {
            this.held = true;
            this.BB = new BoundingBox(-10,-10,0,0);
        }

    }

    update() {
        const MAX_FALL = 15;
        const ACC_FALLING = .4;

        if (this.held) {
            this.x = this.game.porta.facing === "right" ? this.game.porta.x + this.game.porta.width : this.game.porta.x - this.game.porta.width;
            this.y = this.game.porta.y+5;
        }
        // this.held = false;
        // this.velocity.x = this.game.porta.velocity.x;
        // this.velocity.y = this.game.porta.velocity.y;

        let that = this;
        /**
         * This forEach loop iterates over all objects in the game.entities[] list & checks for collisions with companion cube
         *
         * We call forEach here on a slice().reverse() of the entities array (a shallow copy of the list which gets reversed)
         * Because forEach iterates over the list in order and
         * Portals are added to the end of the entities[] list when they are created and
         * We need to check for portal collisions before we check for Brick collisions because
         * It prevents a bug that would reduce velocity.y to zero inappropriately
         *
         * ***Beware of possible bugs as a result of iterating over this list in reverse***
         */
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
                        that.y = entity.BB.top - 27;
                        that.velocity.y = 0;
                        that.updateBB();
                    }

                }
            }
        });

        //Gravity!
        if(this.velocity.y != 0 && this.velocity.y < MAX_FALL) this.velocity.y += ACC_FALLING;
        this.y += this.velocity.y;
        that.updateBB();
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x - this.game.camera.x, this.y);
        if (PARAMS.DEBUG){
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    };
};

class Switch {
    constructor(game, x, y){
        Object.assign(this, {game, x, y});
        this.game.switch = this;
        this.spritesheet = ASSET_MANAGER.getAsset("ADD SPRITE"); //add sprite
    };

    update() {
        
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0);

    };
};