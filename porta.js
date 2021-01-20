class Porta{
    constructor(game, x, y){
        Object.assign(this, {game, x, y});
        this.game.porta = this;
        this.velocity = {x:0,y:0};

        //this.spritesheet = ASSET_MANAGER.getAsset("./sprites/TBD");
        this.animations = [];
        this.item = "none"; //none, portal gun
        this.facing = "right"; //left, right
        //consideration: including a "head swivel" animation if player is pressing up or down. should this be a 'state' for facing?
        this.state = "idle"; //idle, walking, running, jumping, interacting(throw/drop), dying
        //consideration: will "shooting" be a state? will it really require any change in animation?

        this.loadAnimations();
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
        //this.animations["none"]["right"]["idle"] = new Animator(this.spritesheet, TBD, TBD, TBD, TBD, TBD, TBD, false, true);
        //this.animations["none"]["left"]["idle"] = new Animator(this.spritesheet, TBD, TBD, TBD, TBD, TBD, TBD, false, true);
        //this.animations["portal gun"]["right"]["idle"] = new Animator(this.spritesheet, TBD, TBD, TBD, TBD, TBD, TBD, false, true);
        //this.animations["portal gun"]["left"]["idle"] = new Animator(this.spritesheet, TBD, TBD, TBD, TBD, TBD, TBD, false, true);

        //walking states
        //this.animations["none"]["right"]["walking"] = new Animator(this.spritesheet, TBD, TBD, TBD, TBD, TBD, TBD, false, true);
        //this.animations["none"]["left"]["walking"] = new Animator(this.spritesheet, TBD, TBD, TBD, TBD, TBD, TBD, false, true);
        //this.animations["portal gun"]["right"]["walking"] = new Animator(this.spritesheet, TBD, TBD, TBD, TBD, TBD, TBD, false, true);
        //this.animations["portal gun"]["left"]["walking"] = new Animator(this.spritesheet, TBD, TBD, TBD, TBD, TBD, TBD, false, true);

        //running states
        //this.animations["none"]["right"]["running"] = new Animator(this.spritesheet, TBD, TBD, TBD, TBD, TBD, TBD, false, true);
        //this.animations["none"]["left"]["running"] = new Animator(this.spritesheet, TBD, TBD, TBD, TBD, TBD, TBD, false, true);
        //this.animations["portal gun"]["right"]["running"] = new Animator(this.spritesheet, TBD, TBD, TBD, TBD, TBD, TBD, false, true);
        //this.animations["portal gun"]["left"]["running"] = new Animator(this.spritesheet, TBD, TBD, TBD, TBD, TBD, TBD, false, true);

        //jumping states
        //this.animations["none"]["right"]["jumping"] = new Animator(this.spritesheet, TBD, TBD, TBD, TBD, TBD, TBD, false, true);
        //this.animations["none"]["left"]["jumping"] = new Animator(this.spritesheet, TBD, TBD, TBD, TBD, TBD, TBD, false, true);
        //this.animations["portal gun"]["right"]["jumping"] = new Animator(this.spritesheet, TBD, TBD, TBD, TBD, TBD, TBD, false, true);
        //this.animations["portal gun"]["left"]["jumping"] = new Animator(this.spritesheet, TBD, TBD, TBD, TBD, TBD, TBD, false, true);

        //dying states. may adjust how this is done later
        //this.animations["none"]["right"]["dying"] = new Animator(this.spritesheet, TBD, TBD, TBD, TBD, TBD, TBD, false, true);
        //this.animations["none"]["left"]["dying"] = new Animator(this.spritesheet, TBD, TBD, TBD, TBD, TBD, TBD, false, true);
        //this.animations["portal gun"]["right"]["dying"] = new Animator(this.spritesheet, TBD, TBD, TBD, TBD, TBD, TBD, false, true);
        //this.animations["portal gun"]["left"]["dying"] = new Animator(this.spritesheet, TBD, TBD, TBD, TBD, TBD, TBD, false, true);

    }

    update(){
        const TICK = this.game.clockTick;

        //all const values are placeholders until we can test it
        const WALK_SPEED = 4;
        const RUN_SPEED = 6;
        const MIN_FALL = 4;
        const MAX_FALL = 10;
        const ACC_FALLING = 1.25; //each 'tick' will make Porta's velocity.y *= ACC_FALLING until MAX_FALL is reached


        if (this.item === "portal gun") {
            if (this.game.leftClick){
                //left click portal
                //get x and y for click and for player
                //calculate a straight line from player(or gun) position to the x and y from the click
                //create new projectile object to travel along this straight line (with appropriate xy velocities)
                //(the projectile should own this collision) when the projectile collides with anything, check if thing is portal eligible
                //if yes, create new Portal
                //if no, projectile dies
            } else if (this.game.rightClick){
                //right click portal
                //get x and y for click and for player
                //calculate a straight line from player(or gun) position to the x and y from the click
                //create new projectile object to travel along this straight line (with appropriate xy velocities)
                //(the projectile should own this collision) when the projectile collides with anything, check if thing is portal eligible
                //if yes, create new Portal
                //if no, projectile dies
            }
        } else {
            if (this.item !== "none") {
                if (this.game.e){
                    this.state = "interacting";
                }
            }
        }

        //left and right movement
        if ((!this.game.right && !this.game.left) || (this.game.right && this.game.left)){
            this.state = "idle";
        } else if (this.game.right) {
            this.facing = "right";
            this.state = this.game.shift ? "running" : "walking";
            this.velocity.x = this.game.shift ? RUN_SPEED : WALK_SPEED;
            this.x += this.velocity.x;
        } else if (this.game.left) {
            this.facing = "left";
            this.state = this.game.shift ? "running" : "walking";
            this.velocity.x = this.game.shift ? RUN_SPEED : WALK_SPEED;
            this.x -= this.velocity.x;
        }
        //TODO jumping
        //TODO falling
        //TODO portal interactions

    }

    draw(ctx){
        this.animations[this.item][this.facing][this.state].drawFrame(this.game.clockTick, ctx, this.x, this.y, PARAMS.SCALE);
    }
}