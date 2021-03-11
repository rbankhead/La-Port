class Background {
    constructor(game, x = 0, y = 0, level, scale = 4){
        Object.assign(this, {game, x, y, level, scale});
        this.game.background = this;
        this.background = ASSET_MANAGER.getAsset("./backgrounds/lvl"+this.level+"/background.png"); //farthest layer
        this.farMidground = ASSET_MANAGER.getAsset("./backgrounds/lvl"+this.level+"/midground_far.png"); //second farthest layer
        this.midground = ASSET_MANAGER.getAsset("./backgrounds/lvl"+this.level+"/midground.png"); // middle layer
        this.farForground = ASSET_MANAGER.getAsset("./backgrounds/lvl"+this.level+"/forground_far.png"); //second closest layer
        this.forground = ASSET_MANAGER.getAsset("./backgrounds/lvl"+this.level+"/forground.png"); //closest layer

        this.width;
        this.height;
        this.verticalOffset;

        switch(this.level){
            case 1:
                this.height = {for:this.scale*104, farFor:this.scale*150, mid:this.scale*150, farMid:this.scale*142, far:this.scale*160};
                this.width = {for:this.scale*272, farFor:this.scale*272, mid:this.scale*272, farMid:this.scale*213, far:this.scale*272};
                this.verticalOffset = {for:this.scale*76, farFor:this.scale*20, mid:this.scale*20, farMid:this.scale*18, far:this.scale*0};
                break;
            case 2:
                this.height = {for:this.scale*160, farFor:this.scale*160, mid:this.scale*160, farMid:this.scale*160, far:this.scale*160};
                this.width = {for:this.scale*544, farFor:this.scale*544, mid:this.scale*544, farMid:this.scale*272, far:this.scale*272};
                this.verticalOffset = {for:this.scale*20, farFor:this.scale*20, mid:this.scale*20, farMid:this.scale*0, far:this.scale*0};
                break;
            case 3:
                this.scale+=.5;
                this.height = {for:this.scale*160, farFor:this.scale*160, mid:this.scale*160, farMid:this.scale*160, far:this.scale*160};
                this.width = {for:this.scale*272, farFor:this.scale*272, mid:this.scale*272, farMid:this.scale*272, far:this.scale*272};
                this.verticalOffset = {for:this.scale*0, farFor:this.scale*0, mid:this.scale*0, farMid:this.scale*0, far:this.scale*0};
                break;
        }

        this.backgroundPos = {center:{x: this.x, y: this.y}, right:{x: this.x + this.width.far, y: this.y}};
        this.farMidgroundPos = {center:{x: this.x, y: this.y}, right:{x: this.x + this.width.farMid, y: this.y}};
        this.midgroundPos = {center:{x: this.x, y: this.y}, right:{x: this.x + this.width.mid, y: this.y}};
        this.farForgroundPos = {center:{x: this.x, y: this.y}, right:{x: this.x + this.width.farFor, y: this.y}};
        this.forgroundPos = {center:{x: this.x, y: this.y}, right:{x: this.x + this.width.for, y: this.y}};
        this.lastCamX = this.game.camera.x;
        this.scrollSpeedCoeff = {for: 1, farFor:.87, mid:.75, farMid:.5, far:.1};

        


    };
a
    update() {
        let camDelta = this.lastCamX - this.game.camera.x;
        this.lastCamX = this.game.camera.x;
        //console.log(camDelta);

        this.forgroundPos.center.x += camDelta*this.scrollSpeedCoeff.for;
        this.forgroundPos.right.x += camDelta*this.scrollSpeedCoeff.for;

        this.farForgroundPos.center.x += camDelta*this.scrollSpeedCoeff.farFor;
        this.farForgroundPos.right.x += camDelta*this.scrollSpeedCoeff.farFor;

        this.midgroundPos.center.x += camDelta * this.scrollSpeedCoeff.mid;
        this.midgroundPos.right.x += camDelta * this.scrollSpeedCoeff.mid;

        this.farMidgroundPos.center.x += camDelta * this.scrollSpeedCoeff.farMid;
        this.farMidgroundPos.right.x += camDelta * this.scrollSpeedCoeff.farMid;

        this.backgroundPos.center.x += camDelta * this.scrollSpeedCoeff.far;
        this.backgroundPos.right.x += camDelta * this.scrollSpeedCoeff.far;

        //this could be done more efficiently with an iterator

        if(this.forgroundPos.center.x > this.width.for) this.forgroundPos.center.x -= 2*this.width.for;
        else if (this.forgroundPos.center.x < -1*this.width.for) this.forgroundPos.center.x += 2*this.width.for;
        if(this.forgroundPos.right.x > this.width.for) this.forgroundPos.right.x -= 2*this.width.for;
        else if (this.forgroundPos.right.x < -1*this.width.for) this.forgroundPos.right.x += 2*this.width.for;
        
        if(this.farForgroundPos.center.x > this.width.farFor) this.farForgroundPos.center.x -= 2*this.width.farFor;
        else if (this.farForgroundPos.center.x < -1*this.width.farFor) this.farForgroundPos.center.x += 2*this.width.farFor;
        if(this.farForgroundPos.right.x > this.width.farFor) this.farForgroundPos.right.x -= 2*this.width.farFor;
        else if (this.farForgroundPos.right.x < -1*this.width.farFor) this.farForgroundPos.right.x += 2*this.width.farFor;

        if(this.midgroundPos.center.x > this.width.mid) this.midgroundPos.center.x -= 2*this.width.mid;
        else if (this.midgroundPos.center.x < -1*this.width.mid) this.midgroundPos.center.x += 2*this.width.mid;
        if(this.midgroundPos.right.x > this.width.mid) this.midgroundPos.right.x -= 2*this.width.mid;
        else if (this.midgroundPos.right.x < -1*this.width.mid) this.midgroundPos.right.x += 2*this.width.mid;

        if(this.farMidgroundPos.center.x > this.width.farMid) this.farMidgroundPos.center.x -= 2*this.width.farMid;
        else if (this.farMidgroundPos.center.x < -1*this.width.farMid) this.farMidgroundPos.center.x += 2*this.width.farMid;
        if(this.farMidgroundPos.right.x > this.width.farMid) this.farMidgroundPos.right.x -= 2*this.width.farMid;
        else if (this.farMidgroundPos.right.x < -1*this.width.farMid) this.farMidgroundPos.right.x += 2*this.width.farMid;

        if(this.backgroundPos.center.x > this.width.far) this.backgroundPos.center.x -= 2*this.width.far;
        else if (this.backgroundPos.center.x < -1*this.width.far) this.backgroundPos.center.x += 2*this.width.far;
        if(this.backgroundPos.right.x > this.width.far) this.backgroundPos.right.x -= 2*this.width.far;
        else if (this.backgroundPos.right.x < -1*this.width.far) this.backgroundPos.right.x += 2*this.width.far;
   
    };

    draw(ctx) {
        //background
        ctx.drawImage(this.background,0, 0, this.width.far/this.scale, this.height.far/this.scale,this.backgroundPos.center.x, this.backgroundPos.center.y+this.verticalOffset.far, this.width.far, this.height.far);
        ctx.drawImage(this.background,0, 0, this.width.far/this.scale, this.height.far/this.scale,this.backgroundPos.right.x, this.backgroundPos.right.y+this.verticalOffset.far, this.width.far, this.height.far);

        //farMidground
        ctx.drawImage(this.farMidground,0, 0, this.width.farMid/this.scale, this.height.farMid/this.scale,this.farMidgroundPos.right.x, this.farMidgroundPos.right.y+this.verticalOffset.farMid, this.width.farMid, this.height.farMid);
        ctx.drawImage(this.farMidground,0, 0, this.width.farMid/this.scale, this.height.farMid/this.scale,this.farMidgroundPos.center.x, this.farMidgroundPos.center.y+this.verticalOffset.farMid, this.width.farMid, this.height.farMid);

        //midground
        ctx.drawImage(this.midground,0, 0, this.width.mid/this.scale, this.height.mid/this.scale,this.midgroundPos.center.x, this.midgroundPos.center.y+this.verticalOffset.mid, this.width.mid, this.height.mid);
        ctx.drawImage(this.midground,0, 0, this.width.mid/this.scale, this.height.mid/this.scale,this.midgroundPos.right.x, this.midgroundPos.right.y+this.verticalOffset.mid, this.width.mid, this.height.mid);

        //farForground
        ctx.drawImage(this.farForground,0, 0, this.width.farFor/this.scale, this.height.farFor/this.scale,this.farForgroundPos.center.x, this.farForgroundPos.center.y+this.verticalOffset.farFor, this.width.farFor, this.height.farFor);
        ctx.drawImage(this.farForground,0, 0, this.width.farFor/this.scale, this.height.farFor/this.scale,this.farForgroundPos.right.x, this.farForgroundPos.right.y+this.verticalOffset.farFor, this.width.farFor, this.height.farFor);

        //forground
        ctx.drawImage(this.forground,0, 0, this.width.for/this.scale, this.height.for/this.scale,this.forgroundPos.right.x, this.forgroundPos.right.y+this.verticalOffset.for, this.width.for, this.height.for);
        ctx.drawImage(this.forground,0, 0, this.width.for/this.scale, this.height.for/this.scale,this.forgroundPos.center.x, this.forgroundPos.center.y+this.verticalOffset.for, this.width.for, this.height.for);
    };
};