class Hud {
    constructor(game) {
        Object.assign(this, {game});
        this.hud = [];
        this.hud[0] = new Coin(this.game, 0, 0, 4, true);
    };

    update() {
        this.hud.forEach(function(entity){
            entity.update;
        })
    };

    draw(ctx) {
        this.hud.forEach(function(entity){
            entity.draw(ctx);
        })
    };
};