class Background {
    constructor(game, x = 0, y = 0, scale = 4.3){
        Object.assign(this, {game, x, y, scale});
        this.game.background = this;
        this.background = ASSET_MANAGER.getAsset("./sprites/background.png"); //farthest layer
        this.farMidground = ASSET_MANAGER.getAsset("./sprites/midground_far.png"); //second farthest layer
        this.midground = ASSET_MANAGER.getAsset("./sprites/midground.png"); // second closest layer
        this.forground = ASSET_MANAGER.getAsset("./sprites/forground.png"); //closest layer

        this.backgroundPos = {center:{x: this.x, y: this.y}, right:{x: this.x + 272*this.scale, y: this.y}, left:{x: this.x - 272*this.scale, y: this.y}};
        this.farMidgroundPos = {center:{x: this.x, y: this.y}, right:{x: this.x + 272*this.scale, y: this.y}, left:{x: this.x - 272*this.scale, y: this.y}};
        this.midgroundPos = {center:{x: this.x, y: this.y}, right:{x: this.x + 272*this.scale, y: this.y}, left:{x: this.x - 272*this.scale, y: this.y}};
        this.forgroundPos = {center:{x: this.x, y: this.y}, right:{x: this.x + 272*this.scale, y: this.y}, left:{x: this.x - 272*this.scale, y: this.y}};
        this.lastCamX = this.game.camera.x;
        this.scrollSpeedCoeff = {for: 1, mid:.75, farMid:.5, far:.1};
    };

    update() {
        let camDelta = this.lastCamX - this.game.camera.x;
        this.lastCamX = this.game.camera.x;
        //console.log(camDelta);

        this.forgroundPos.center.x += camDelta*this.scrollSpeedCoeff.for;
        this.forgroundPos.right.x += camDelta*this.scrollSpeedCoeff.for;
        this.forgroundPos.left.x += camDelta*this.scrollSpeedCoeff.for;

        this.midgroundPos.center.x += camDelta * this.scrollSpeedCoeff.mid;
        this.midgroundPos.right.x += camDelta * this.scrollSpeedCoeff.mid;
        this.midgroundPos.left.x += camDelta * this.scrollSpeedCoeff.mid;

        this.farMidgroundPos.center.x += camDelta * this.scrollSpeedCoeff.farMid;
        this.farMidgroundPos.right.x += camDelta * this.scrollSpeedCoeff.farMid;
        this.farMidgroundPos.left.x += camDelta * this.scrollSpeedCoeff.farMid;

        this.backgroundPos.center.x += camDelta * this.scrollSpeedCoeff.far;
        this.backgroundPos.right.x += camDelta * this.scrollSpeedCoeff.far;
        this.backgroundPos.left.x += camDelta * this.scrollSpeedCoeff.far;

    };

    draw(ctx) {
        //background
        ctx.drawImage(this.background,0, 0, 272, 160,this.backgroundPos.center.x, this.backgroundPos.center.y, 272*this.scale, 160*this.scale);
        ctx.drawImage(this.background,0, 0, 272, 160,this.backgroundPos.left.x, this.backgroundPos.left.y, 272*this.scale, 160*this.scale);
        ctx.drawImage(this.background,0, 0, 272, 160,this.backgroundPos.right.x, this.backgroundPos.right.y, 272*this.scale, 160*this.scale);

        //farMidground
        ctx.drawImage(this.farMidground,0, 0, 213, 142,this.farMidgroundPos.right.x, this.farMidgroundPos.right.y+(this.scale*18), 213*this.scale, 142*this.scale);
        ctx.drawImage(this.farMidground,0, 0, 213, 142,this.farMidgroundPos.left.x, this.farMidgroundPos.left.y+(this.scale*18), 213*this.scale, 142*this.scale);
        ctx.drawImage(this.farMidground,0, 0, 213, 142,this.farMidgroundPos.center.x, this.farMidgroundPos.center.y+(this.scale*18), 213*this.scale, 142*this.scale);

        //midground
        ctx.drawImage(this.midground,0, 0, 272, 150,this.midgroundPos.left.x, this.midgroundPos.left.y+(this.scale*20), 272*this.scale, 150*this.scale);
        ctx.drawImage(this.midground,0, 0, 272, 150,this.midgroundPos.center.x, this.midgroundPos.center.y+(this.scale*20), 272*this.scale, 150*this.scale);
        ctx.drawImage(this.midground,0, 0, 272, 150,this.midgroundPos.right.x, this.midgroundPos.right.y+(this.scale*20), 272*this.scale, 150*this.scale);

        //forground
        ctx.drawImage(this.forground,0, 0, 272, 104,this.forgroundPos.left.x, this.forgroundPos.left.y+(this.scale*76), 272*this.scale, 104*this.scale);
        ctx.drawImage(this.forground,0, 0, 272, 104,this.forgroundPos.right.x, this.forgroundPos.right.y+(this.scale*76), 272*this.scale, 104*this.scale);
        ctx.drawImage(this.forground,0, 0, 272, 104,this.forgroundPos.center.x, this.forgroundPos.center.y+(this.scale*76), 272*this.scale, 104*this.scale);
    };
};