class Projectile {
    constructor(game, x, y, xDestination,yDestination, color){
        Object.assign(this, {game, x, y, xDestination,yDestination, color});
        this.updateBB();
        this.game.projectile = this;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/projectiles.png"); //add sprite
        if(this.color === "green"){
            this.animation = new Animator(this.spritesheet,0,11,21,10,2,.2,0,false,true); //135x 120y

        } else if (this.color === "purple") {
            this.animation = new Animator(this.spritesheet,0,0,21,10,2,.2,0,false,true); //135x 120y
        } else {
            console.log("invalid color entered for portal");
        }

        this.deltax = (xDestination-x);
        this.deltay= (yDestination-y);
        this.slope = this.deltay/this.deltax;


    };

    updateBB(){
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x,this.y,32,16)
    }

    update() {
        const PROJECTILE_SPEED = 15;
        let degree = Math.atan(this.slope);
        if(this.deltax>0){
            this.x += PROJECTILE_SPEED*Math.cos(degree);
            this.y += PROJECTILE_SPEED*Math.sin(degree);
        } else {
            this.x -= PROJECTILE_SPEED*Math.cos(degree);
            this.y -= PROJECTILE_SPEED*Math.sin(degree);
        }

        let that = this;
        this.game.entities.forEach(function(entity){
            if(entity.BB && that.BB.collide(entity.BB)){
                if((that.lastBB && entity instanceof Brick) && (that.lastBB.bottom <= entity.BB.top) && entity.top){ //landing
                    //that.game.entities.unshift(new Portal(that.game,that.lastBB.x,that.lastBB.y,that.color, "top"))
                    that.game.addEntity(new Portal(that.game,that.lastBB.x,that.lastBB.y,that.color, "top"));
                    that.removeFromWorld = true;
                }
                else if (that.lastBB && entity instanceof Brick && (that.lastBB.top >= entity.BB.bottom && entity.bottom)){
                    //that.game.entities.unshift(new Portal(that.game,that.lastBB.x,that.lastBB.y,that.color,"bottom"));
                    that.game.addEntity(new Portal(that.game,that.lastBB.x,that.lastBB.y,that.color,"bottom"));
                    that.removeFromWorld = true;
                }
                else if (that.lastBB && entity instanceof Brick && (that.lastBB.left >= entity.BB.right && entity.right)){
                    //that.game.entities.unshift(new Portal(that.game,that.lastBB.x,that.lastBB.y,that.color,"right"));
                    that.game.addEntity(new Portal(that.game,that.lastBB.x,that.lastBB.y,that.color,"right")); //MAGIC NUMBER
                    that.removeFromWorld = true;
                }
                else if (that.lastBB && entity instanceof Brick && (that.lastBB.right <= entity.BB.left && entity.left)){
                    //that.game.entities.unshift(new Portal(that.game,that.lastBB.x,that.lastBB.y,that.color,"left"));
                    that.game.addEntity(new Portal(that.game,that.lastBB.x,that.lastBB.y,that.color,"left")); //MAGIC NUMBER
                    that.removeFromWorld = true;
                }

            }
        });
        this.updateBB()
    };

    draw(ctx) {
        //this.animation.drawFrame(this.game.clockTick,ctx,0,0,4);
        this.animation.drawFrame(this.game.clockTick,ctx,this.x- this.game.camera.x,this.y,PARAMS.SCALE);
        if (PARAMS.DEBUG){
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    };
};