//R: I think similar to the professor's Mario game these can be handled as fields, part of the 'camera' aka scenemanager and don't need to be their own classes

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