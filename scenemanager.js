class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;

        this.portaSpawn = {x: 0 * PARAMS.BLOCKWIDTH, y: 28.5 * PARAMS.BLOCKWIDTH}
        this.porta = new Porta(this.game, this.portaSpawn.x, this.portaSpawn.y);

        this.loadLevelOne();
    };

    loadLevelOne() {
        this.game.entities = [];

        //first room bricks
        for (let i=0;i<=30;i+=3){
            this.game.addEntity(new Brick(this.game,i*PARAMS.BLOCKWIDTH,0, false,false,false,true)); //ceiling bricks
            this.game.addEntity(new Brick(this.game,i*PARAMS.BLOCKWIDTH,30 * PARAMS.BLOCKWIDTH, false,false,true)); //floor bricks
            this.game.addEntity(new Brick(this.game,(i+30)*PARAMS.BLOCKWIDTH,30 * PARAMS.BLOCKWIDTH, false,false,true)); //further floor bricks
            this.game.addEntity(new Brick(this.game,-3*PARAMS.BLOCKWIDTH, i * PARAMS.BLOCKWIDTH,false,true)); //left wall bricks
            if (i!==27) this.game.addEntity(new Brick(this.game,33*PARAMS.BLOCKWIDTH, i * PARAMS.BLOCKWIDTH,true,true)); //right wall bricks
        }

        this.game.addEntity(new InfoSign(this.game,0*PARAMS.BLOCKWIDTH,28.7*PARAMS.BLOCKWIDTH,"Press A or D to move right or left"));
        this.game.addEntity(new InfoSign(this.game,9*PARAMS.BLOCKWIDTH,28.7*PARAMS.BLOCKWIDTH,"Press spacebar to jump"));
        this.game.addEntity(new InfoSign(this.game,18*PARAMS.BLOCKWIDTH,28.7*PARAMS.BLOCKWIDTH,"Use left and right click to make portals"));
        this.game.addEntity(new InfoSign(this.game,27*PARAMS.BLOCKWIDTH,28.7*PARAMS.BLOCKWIDTH,"You can teleport between the green and purple portals!"));
        this.game.addEntity(new InfoSign(this.game,42*PARAMS.BLOCKWIDTH,28.7*PARAMS.BLOCKWIDTH,"Touching a checkpoint will save your progress"));

        this.game.addEntity(new Brick(this.game,4*PARAMS.BLOCKWIDTH, 20 * PARAMS.BLOCKWIDTH,true,true,true,true));
        this.game.addEntity(new Checkpoint(this.game, 45 * PARAMS.BLOCKWIDTH, 27.5 * PARAMS.BLOCKWIDTH));

        this.game.addEntity(new Coin(this.game, 150, 100));
        this.game.addEntity(new CompanionCube(this.game, 60, 175));
        this.game.addEntity(new Turret(this.game, 100, 175));
        let door1 = new Door(this.game, 795, 645);
        this.game.addEntity(new Button(this.game, 20*PARAMS.BLOCKWIDTH, 30 * PARAMS.BLOCKWIDTH - 20, door1));
        this.game.addEntity(door1);
        //this.game.addEntity(new Laser(this.game, 50, 250));

        this.game.addEntity(this.porta);
    };

    update() {
        PARAMS.DEBUG = document.getElementById("debug").checked;

        let midpoint = PARAMS.CANVAS_WIDTH/2 - PARAMS.BLOCKWIDTH / 2;

        this.x = this.porta.x - midpoint;

        /**
         * If Porta dies, she teleports up and out of the level
         * Once off screen (reaching -9*PARAMS.BLOCKWIDTH on the Y axis) we reload the level
         */
        if (this.porta.dead && this.porta.y < -9 * PARAMS.BLOCKWIDTH) {
            this.porta = new Porta(this.game, this.portaSpawn.x, this.portaSpawn.y);
            this.loadLevelOne();
        };
    };

    draw(ctx) {
        //HUD stuff goes here

        if (PARAMS.DEBUG) {
            let xV = "xV=" + Math.floor(this.game.porta.velocity.x);
            let yV = "yV=" + Math.floor(this.game.porta.velocity.y);
            ctx.fillText(xV, 3 * PARAMS.BLOCKWIDTH, 2.5 * PARAMS.BLOCKWIDTH);
            ctx.fillText(yV, 3 * PARAMS.BLOCKWIDTH, 3 * PARAMS.BLOCKWIDTH);

            ctx.translate(0, -10); // hack to move elements up by 10 pixels instead of adding -10 to all y coordinates below
            ctx.strokeStyle = "White";
            ctx.lineWidth = 2;
            ctx.strokeStyle = this.game.left ? "White" : "Grey";
            ctx.fillStyle = ctx.strokeStyle;
            ctx.strokeRect(6 * PARAMS.BLOCKWIDTH - 2, 2.5 * PARAMS.BLOCKWIDTH - 2, 0.5 * PARAMS.BLOCKWIDTH + 2, 0.5 * PARAMS.BLOCKWIDTH + 2);
            ctx.fillText("L", 6 * PARAMS.BLOCKWIDTH, 3 * PARAMS.BLOCKWIDTH);
            ctx.strokeStyle = this.game.right ? "White" : "Grey";
            ctx.fillStyle = ctx.strokeStyle;
            ctx.strokeRect(7 * PARAMS.BLOCKWIDTH + 2, 2.5 * PARAMS.BLOCKWIDTH - 2, 0.5 * PARAMS.BLOCKWIDTH + 2, 0.5 * PARAMS.BLOCKWIDTH + 2);
            ctx.fillText("R", 7 * PARAMS.BLOCKWIDTH + 4, 3 * PARAMS.BLOCKWIDTH);

            ctx.translate(0, 10);
            ctx.strokeStyle = "White";
            ctx.fillStyle = ctx.strokeStyle;

        }
    };
};

// class Minimap {
//     constructor(game, x, y, w) {
//         Object.assign(this, { game, x, y, w });
//     };
//
//     update() {
//
//     };
//
//     draw(ctx) {
//         ctx.strokeStyle = "Black";
//         ctx.strokeRect(this.x, this.y, this.w, PARAMS.BLOCKWIDTH);
//         for (var i = 0; i < this.game.entities.length; i++) {
//             this.game.entities[i].drawMinimap(ctx, this.x, this.y);
//         }
//     };
// };