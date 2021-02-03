class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;

        this.porta = new Porta(this.game, 0 * PARAMS.BLOCKWIDTH, 28.5 * PARAMS.BLOCKWIDTH);

        this.loadLevelOne();
    };

    loadLevelOne() {
        this.game.entities = [];
        this.game.addEntity(new Brick(this.game,31*PARAMS.BLOCKWIDTH, 30 * PARAMS.BLOCKWIDTH,true)); //weird extra bricks to prevent porta from slipping between BBs
        this.game.addEntity(new Brick(this.game,-1*PARAMS.BLOCKWIDTH, 30 * PARAMS.BLOCKWIDTH,true)); //weird extra bricks to prevent porta from slipping between BBs

        //ceiling bricks
        this.game.addEntity(new Brick(this.game,0*PARAMS.BLOCKWIDTH, 0 * PARAMS.BLOCKWIDTH,false,false,false, true));
        this.game.addEntity(new Brick(this.game,3*PARAMS.BLOCKWIDTH, 0 * PARAMS.BLOCKWIDTH,false,false,false, true));
        this.game.addEntity(new Brick(this.game,6*PARAMS.BLOCKWIDTH, 0 * PARAMS.BLOCKWIDTH,false,false,false, true));
        this.game.addEntity(new Brick(this.game,9*PARAMS.BLOCKWIDTH, 0 * PARAMS.BLOCKWIDTH,false,false,false, true));
        this.game.addEntity(new Brick(this.game,12*PARAMS.BLOCKWIDTH, 0 * PARAMS.BLOCKWIDTH,false,false,false, true));
        this.game.addEntity(new Brick(this.game,15*PARAMS.BLOCKWIDTH, 0 * PARAMS.BLOCKWIDTH,false,false,false, true));
        this.game.addEntity(new Brick(this.game,18*PARAMS.BLOCKWIDTH, 0 * PARAMS.BLOCKWIDTH,false,false,false, true));
        this.game.addEntity(new Brick(this.game,21*PARAMS.BLOCKWIDTH, 0 * PARAMS.BLOCKWIDTH,false,false,false, true));
        this.game.addEntity(new Brick(this.game,24*PARAMS.BLOCKWIDTH, 0 * PARAMS.BLOCKWIDTH,false,false,false, true));
        this.game.addEntity(new Brick(this.game,27*PARAMS.BLOCKWIDTH, 0 * PARAMS.BLOCKWIDTH,false,false,false, true));
        this.game.addEntity(new Brick(this.game,30*PARAMS.BLOCKWIDTH, 0 * PARAMS.BLOCKWIDTH,false,false,false, true));
        //floor bricks
        this.game.addEntity(new Brick(this.game,0*PARAMS.BLOCKWIDTH, 30 * PARAMS.BLOCKWIDTH,false,false,true));
        this.game.addEntity(new Brick(this.game,3*PARAMS.BLOCKWIDTH, 30 * PARAMS.BLOCKWIDTH,false,false,true));
        this.game.addEntity(new Brick(this.game,6*PARAMS.BLOCKWIDTH, 30 * PARAMS.BLOCKWIDTH,false,false,true));
        this.game.addEntity(new Brick(this.game,9*PARAMS.BLOCKWIDTH, 30 * PARAMS.BLOCKWIDTH,false,false,true));
        this.game.addEntity(new Brick(this.game,12*PARAMS.BLOCKWIDTH, 30 * PARAMS.BLOCKWIDTH,false,false,true));
        this.game.addEntity(new Brick(this.game,15*PARAMS.BLOCKWIDTH, 30 * PARAMS.BLOCKWIDTH,false,false,true));
        this.game.addEntity(new Brick(this.game,18*PARAMS.BLOCKWIDTH, 30 * PARAMS.BLOCKWIDTH,false,false,true));
        this.game.addEntity(new Brick(this.game,21*PARAMS.BLOCKWIDTH, 30 * PARAMS.BLOCKWIDTH,false,false,true));
        this.game.addEntity(new Brick(this.game,24*PARAMS.BLOCKWIDTH, 30 * PARAMS.BLOCKWIDTH,false,false,true));
        this.game.addEntity(new Brick(this.game,27*PARAMS.BLOCKWIDTH, 30 * PARAMS.BLOCKWIDTH,false,false,true));
        this.game.addEntity(new Brick(this.game,30*PARAMS.BLOCKWIDTH, 30 * PARAMS.BLOCKWIDTH,false,false,true));
        //left wall bricks
        this.game.addEntity(new Brick(this.game,-3*PARAMS.BLOCKWIDTH, 0 * PARAMS.BLOCKWIDTH,false,true));
        this.game.addEntity(new Brick(this.game,-3*PARAMS.BLOCKWIDTH, 3 * PARAMS.BLOCKWIDTH,false,true));
        this.game.addEntity(new Brick(this.game,-3*PARAMS.BLOCKWIDTH, 6 * PARAMS.BLOCKWIDTH,false,true));
        this.game.addEntity(new Brick(this.game,-3*PARAMS.BLOCKWIDTH, 9 * PARAMS.BLOCKWIDTH,false,true));
        this.game.addEntity(new Brick(this.game,-3*PARAMS.BLOCKWIDTH, 12 * PARAMS.BLOCKWIDTH,false,true));
        this.game.addEntity(new Brick(this.game,-3*PARAMS.BLOCKWIDTH, 15 * PARAMS.BLOCKWIDTH,false,true));
        this.game.addEntity(new Brick(this.game,-3*PARAMS.BLOCKWIDTH, 18 * PARAMS.BLOCKWIDTH,false,true));
        this.game.addEntity(new Brick(this.game,-3*PARAMS.BLOCKWIDTH, 21 * PARAMS.BLOCKWIDTH,false,true));
        this.game.addEntity(new Brick(this.game,-3*PARAMS.BLOCKWIDTH, 24 * PARAMS.BLOCKWIDTH,false,true));
        this.game.addEntity(new Brick(this.game,-3*PARAMS.BLOCKWIDTH, 27 * PARAMS.BLOCKWIDTH,false,true));
        this.game.addEntity(new Brick(this.game,-3*PARAMS.BLOCKWIDTH, 30 * PARAMS.BLOCKWIDTH,false,true));
        //right wall bricks
        this.game.addEntity(new Brick(this.game,33*PARAMS.BLOCKWIDTH, 0 * PARAMS.BLOCKWIDTH,true));
        this.game.addEntity(new Brick(this.game,33*PARAMS.BLOCKWIDTH, 3 * PARAMS.BLOCKWIDTH,true));
        this.game.addEntity(new Brick(this.game,33*PARAMS.BLOCKWIDTH, 6 * PARAMS.BLOCKWIDTH,true));
        this.game.addEntity(new Brick(this.game,33*PARAMS.BLOCKWIDTH, 9 * PARAMS.BLOCKWIDTH,true));
        this.game.addEntity(new Brick(this.game,33*PARAMS.BLOCKWIDTH, 12 * PARAMS.BLOCKWIDTH,true));
        this.game.addEntity(new Brick(this.game,33*PARAMS.BLOCKWIDTH, 15 * PARAMS.BLOCKWIDTH,true));
        this.game.addEntity(new Brick(this.game,33*PARAMS.BLOCKWIDTH, 18 * PARAMS.BLOCKWIDTH,true));
        this.game.addEntity(new Brick(this.game,33*PARAMS.BLOCKWIDTH, 21 * PARAMS.BLOCKWIDTH,true));
        this.game.addEntity(new Brick(this.game,33*PARAMS.BLOCKWIDTH, 24 * PARAMS.BLOCKWIDTH,true));
        this.game.addEntity(new Brick(this.game,33*PARAMS.BLOCKWIDTH, 27 * PARAMS.BLOCKWIDTH,true));
        this.game.addEntity(new Brick(this.game,33*PARAMS.BLOCKWIDTH, 30 * PARAMS.BLOCKWIDTH,true));

        this.game.addEntity(new InfoSign(this.game,0*PARAMS.BLOCKWIDTH,28.7*PARAMS.BLOCKWIDTH,"Press A or D to move right or left"));
        this.game.addEntity(new InfoSign(this.game,9*PARAMS.BLOCKWIDTH,28.7*PARAMS.BLOCKWIDTH,"Press spacebar to jump"));
        this.game.addEntity(new InfoSign(this.game,18*PARAMS.BLOCKWIDTH,28.7*PARAMS.BLOCKWIDTH,"Use left and right click to make portals"));
        this.game.addEntity(new InfoSign(this.game,27*PARAMS.BLOCKWIDTH,28.7*PARAMS.BLOCKWIDTH,"You can teleport between the green and purple portals!"));

        this.game.addEntity(new Checkpoint(this.game, 100, 100));
        this.game.addEntity(new Coin(this.game, 150, 100));
        this.game.addEntity(new CompanionCube(this.game, 60, 175));
        this.game.addEntity(new Turret(this.game, 100, 175));
        this.game.addEntity(new Button(this.game, 24*PARAMS.BLOCKWIDTH, 30 * PARAMS.BLOCKWIDTH - 20, function(){
            console.log("Button Event Successful!");
        }));

        this.game.addEntity(this.porta);
    };

    update() {
        PARAMS.DEBUG = document.getElementById("debug").checked;

        let midpoint = PARAMS.CANVAS_WIDTH/2 - PARAMS.BLOCKWIDTH / 2;

        this.x = this.porta.x - midpoint;

        /**
         * If Porta dies, she teleports up and out of the level
         * Once off screen (reaching -9*PARAMS.BLOCKWIDTH on the Y axis) we reload the level
         * TODO: add logic to check for an activated checkpoint
         */
        if (this.porta.dead && this.porta.y < -9 * PARAMS.BLOCKWIDTH) {
            this.porta = new Porta(this.game, 0 * PARAMS.BLOCKWIDTH, 28.5 * PARAMS.BLOCKWIDTH);
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