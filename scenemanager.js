class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;

        //new Porta(gameEngine,0,712)
        this.porta = new Porta(this.game, 0 * PARAMS.BLOCKWIDTH, 28.5 * PARAMS.BLOCKWIDTH);

        this.loadLevelOne();
    };

    loadLevelOne() {
        this.game.entities = [];
        this.game.addEntity(new Brick(this.game,0*PARAMS.BLOCKWIDTH, 30 * PARAMS.BLOCKWIDTH));
        this.game.addEntity(new Brick(this.game,3*PARAMS.BLOCKWIDTH, 30 * PARAMS.BLOCKWIDTH));
        this.game.addEntity(new Brick(this.game,6*PARAMS.BLOCKWIDTH, 30 * PARAMS.BLOCKWIDTH));
        this.game.addEntity(new Brick(this.game,9*PARAMS.BLOCKWIDTH, 30 * PARAMS.BLOCKWIDTH));
        this.game.addEntity(new Brick(this.game,12*PARAMS.BLOCKWIDTH, 30 * PARAMS.BLOCKWIDTH));
        this.game.addEntity(new Brick(this.game,15*PARAMS.BLOCKWIDTH, 30 * PARAMS.BLOCKWIDTH));
        this.game.addEntity(new Brick(this.game,18*PARAMS.BLOCKWIDTH, 30 * PARAMS.BLOCKWIDTH));
        this.game.addEntity(new Brick(this.game,21*PARAMS.BLOCKWIDTH, 30 * PARAMS.BLOCKWIDTH));
        this.game.addEntity(new Brick(this.game,24*PARAMS.BLOCKWIDTH, 30 * PARAMS.BLOCKWIDTH));
        this.game.addEntity(new Brick(this.game,27*PARAMS.BLOCKWIDTH, 30 * PARAMS.BLOCKWIDTH));
        this.game.addEntity(new Brick(this.game,30*PARAMS.BLOCKWIDTH, 30 * PARAMS.BLOCKWIDTH));
        this.game.addEntity(this.porta);
    };

    update() {
        PARAMS.DEBUG = document.getElementById("debug").checked;

        let midpoint = PARAMS.CANVAS_WIDTH/2 - PARAMS.BLOCKWIDTH / 2;

        this.x = this.porta.x - midpoint;

    };

    draw(ctx) {
        //HUD stuff goes here

        if (PARAMS.DEBUG) {

        }
    };
};

class Minimap {
    constructor(game, x, y, w) {
        Object.assign(this, { game, x, y, w });
    };

    update() {

    };

    draw(ctx) {
        ctx.strokeStyle = "Black";
        ctx.strokeRect(this.x, this.y, this.w, PARAMS.BLOCKWIDTH);
        for (var i = 0; i < this.game.entities.length; i++) {
            this.game.entities[i].drawMinimap(ctx, this.x, this.y);
        }
    };
};