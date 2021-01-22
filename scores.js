class Timer {
    constructor(game, x, y){
        Object.assign(this, {game, x, y});
        this.game.timer = this;
    };

    update() {
        
    };

    draw(ctx) {

    };
};

class Deaths {
    constructor(game, x, y){
        Object.assign(this, {game, x, y});
        this.game.deaths = this;
    };

    update() {
        
    };

    draw(ctx) {

    };
};