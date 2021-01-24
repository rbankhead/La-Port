class Projectile {
    constructor(game, x, y, xDestination,yDestination, color){
        Object.assign(this, {game, x, y, xDestination,yDestination, color});
        this.game.projectile = this;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/orb_anim_strip_6.png"); //add sprite
        this.animation = new Animator(this.spritesheet,0,0,8,8,6,.1,0,false,true); //135x 120y
        this.deltax = (xDestination-x);
        this.deltay= (yDestination-y);
        this.slope = this.deltay/this.deltax;
        this.BB = new BoundingBox(this.x+2,this.y+2,8,8);
    };

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
        this.BB.x = this.x+2;
        this.BB.y = this.y+2;
    };

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick,ctx,this.x- this.game.camera.x,this.y,PARAMS.SCALE);
        if (PARAMS.DEBUG){
            ctx.strokeStyle = 'Red';
            //ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    };
};