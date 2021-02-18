class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;

        this.portaSpawn = {x: 0 * PARAMS.BLOCKWIDTH, y: 28.5 * PARAMS.BLOCKWIDTH}
        //this.portaSpawn = {x: 168 * PARAMS.BLOCKWIDTH, y: 28.5 * PARAMS.BLOCKWIDTH}
        this.porta = new Porta(this.game, this.portaSpawn.x, this.portaSpawn.y);
        
        this.loadLevelOne();
    };

    loadLevelOne() {
        this.update(); // initialize screen positions
        this.game.entities = [];

        //parallax background
        this.game.addEntity(new Background(this.game, -50));

        //ground bricks to the left of room 1 to hide the blank part of the background image
        for (let i=-30;i<0;i+=3) this.game.addEntity(new Brick(this.game, i*PARAMS.BLOCKWIDTH,30 * PARAMS.BLOCKWIDTH, true,true,true,true));

        //room walls
        for(let i=0;i<=30;i+=3){
            this.game.addEntity(new Brick(this.game,-3*PARAMS.BLOCKWIDTH, i * PARAMS.BLOCKWIDTH,false,true, i===30)); //leftmost walls
            if (i!==3) this.game.addEntity(new Brick(this.game,42*PARAMS.BLOCKWIDTH, i * PARAMS.BLOCKWIDTH,i!==6,true, i===6)); //end of room 1 walls
            if (i!==27) this.game.addEntity(new Brick(this.game,51*PARAMS.BLOCKWIDTH, i * PARAMS.BLOCKWIDTH,true,true,i===30, i===24)); //start of room 2 walls
            if (i!==27) this.game.addEntity(new Brick(this.game,99*PARAMS.BLOCKWIDTH, i * PARAMS.BLOCKWIDTH,true,true,i===30, i===24)); //end of room 2 walls
            if (i!==27) this.game.addEntity(new Brick(this.game,108*PARAMS.BLOCKWIDTH, i * PARAMS.BLOCKWIDTH,true,true,i===30,i===24)); //start of room 3 walls
            if (i!==27) this.game.addEntity(new Brick(this.game,156*PARAMS.BLOCKWIDTH, i * PARAMS.BLOCKWIDTH,true,true,i===30,i===24)); //end of room 3 walls
            if (i!==27) this.game.addEntity(new Brick(this.game,165*PARAMS.BLOCKWIDTH, i * PARAMS.BLOCKWIDTH,true,true,i===30,i===24)); //start of room 4 walls
            if (i!==27) this.game.addEntity(new Brick(this.game,213*PARAMS.BLOCKWIDTH, i * PARAMS.BLOCKWIDTH,true,true,i===30,i===24)); //end of room 4 walls
            if (i>3) this.game.addEntity(new Brick(this.game,222*PARAMS.BLOCKWIDTH, i * PARAMS.BLOCKWIDTH,true,true,i===6,false)); //start of room 5 walls
            //this.game.addEntity(new Brick(this.game,253*PARAMS.BLOCKWIDTH, i * PARAMS.BLOCKWIDTH,true,true,false,false)); //end of level walls
        }
        //end room walls

        //floor and ceiling bricks
        for (let i=0;i<=234;i+=3){
            if (i<=225) this.game.addEntity(new Brick(this.game,i*PARAMS.BLOCKWIDTH,0, false,false,true,i!==144)); //ceiling
            this.game.addEntity(new Brick(this.game,i*PARAMS.BLOCKWIDTH,30 * PARAMS.BLOCKWIDTH, false,false,true)); //floor
        }
        //end floor and ceiling

        //room 1 bricks
        this.game.addEntity(new Coin(this.game, 0*PARAMS.BLOCKWIDTH, 3 *PARAMS.BLOCKWIDTH));
        this.game.addEntity(new InfoSign(this.game, 0*PARAMS.BLOCKWIDTH, 4.75*PARAMS.BLOCKWIDTH, "Coins are just fake internet points, but they go 'ding'!"));


        this.game.addEntity(new Brick(this.game, -1.5*PARAMS.BLOCKWIDTH,6*PARAMS.BLOCKWIDTH,true,true,true,true));
        this.game.addEntity(new Brick(this.game, 0*PARAMS.BLOCKWIDTH,7.5*PARAMS.BLOCKWIDTH,true,true,true,true));
        this.game.addEntity(new Brick(this.game, 0*PARAMS.BLOCKWIDTH,21*PARAMS.BLOCKWIDTH,true,true,true,false));
        this.game.addEntity(new Brick(this.game, 0*PARAMS.BLOCKWIDTH,24*PARAMS.BLOCKWIDTH,true,true,false,true));
        this.game.addEntity(new Brick(this.game, 1.5*PARAMS.BLOCKWIDTH,9*PARAMS.BLOCKWIDTH,true,true,true,true));
        this.game.addEntity(new Brick(this.game, 3*PARAMS.BLOCKWIDTH,10.5*PARAMS.BLOCKWIDTH,true,true,true,true));
        this.game.addEntity(new Brick(this.game, 3*PARAMS.BLOCKWIDTH,24*PARAMS.BLOCKWIDTH,true,true,true,true));
        this.game.addEntity(new Brick(this.game, 6*PARAMS.BLOCKWIDTH,18*PARAMS.BLOCKWIDTH,true,false,true,true));
        this.game.addEntity(new Brick(this.game, 6*PARAMS.BLOCKWIDTH,24*PARAMS.BLOCKWIDTH,true,true,true,true));
        this.game.addEntity(new Brick(this.game, 9*PARAMS.BLOCKWIDTH,15*PARAMS.BLOCKWIDTH,true,true,true,false));
        this.game.addEntity(new Brick(this.game, 9*PARAMS.BLOCKWIDTH,18*PARAMS.BLOCKWIDTH,true,true,false,true));
        this.game.addEntity(new Brick(this.game, 9*PARAMS.BLOCKWIDTH,24*PARAMS.BLOCKWIDTH,true,true,true,true));
        this.game.addEntity(new Brick(this.game, 9*PARAMS.BLOCKWIDTH,6*PARAMS.BLOCKWIDTH,true,true,true,true));
        this.game.addEntity(new Brick(this.game, 10.5*PARAMS.BLOCKWIDTH,7.5*PARAMS.BLOCKWIDTH,true,true,true,true));
        this.game.addEntity(new Brick(this.game, 12*PARAMS.BLOCKWIDTH,9*PARAMS.BLOCKWIDTH,true,true,true,true));
        this.game.addEntity(new Brick(this.game, 15*PARAMS.BLOCKWIDTH,12*PARAMS.BLOCKWIDTH,true,true,true,false));
        this.game.addEntity(new Brick(this.game, 15*PARAMS.BLOCKWIDTH,15*PARAMS.BLOCKWIDTH,true,true,false,true));
        this.game.addEntity(new Brick(this.game, 15*PARAMS.BLOCKWIDTH,18*PARAMS.BLOCKWIDTH,true,true,true,true));
        this.game.addEntity(new Brick(this.game, 15*PARAMS.BLOCKWIDTH,27*PARAMS.BLOCKWIDTH,true,true,true,false));
        this.game.addEntity(new Brick(this.game, 18*PARAMS.BLOCKWIDTH,18*PARAMS.BLOCKWIDTH,true,true,true,false));
        this.game.addEntity(new Brick(this.game, 18*PARAMS.BLOCKWIDTH,21*PARAMS.BLOCKWIDTH,true,true,false,false));
        this.game.addEntity(new Brick(this.game, 18*PARAMS.BLOCKWIDTH,24*PARAMS.BLOCKWIDTH,true,true,false,false));
        this.game.addEntity(new Brick(this.game, 18*PARAMS.BLOCKWIDTH,27*PARAMS.BLOCKWIDTH,true,true,true,false));
        this.game.addEntity(new Brick(this.game, 21*PARAMS.BLOCKWIDTH,18*PARAMS.BLOCKWIDTH,true,true,true,false));
        this.game.addEntity(new Brick(this.game, 21*PARAMS.BLOCKWIDTH,21*PARAMS.BLOCKWIDTH,true,true,false,false));
        this.game.addEntity(new Brick(this.game, 21*PARAMS.BLOCKWIDTH,24*PARAMS.BLOCKWIDTH,true,true,false,false));
        this.game.addEntity(new Brick(this.game, 21*PARAMS.BLOCKWIDTH,27*PARAMS.BLOCKWIDTH,true,true,true,false));
        this.game.addEntity(new Brick(this.game, 24*PARAMS.BLOCKWIDTH,12*PARAMS.BLOCKWIDTH,true,true,true,false));
        this.game.addEntity(new Brick(this.game, 24*PARAMS.BLOCKWIDTH,15*PARAMS.BLOCKWIDTH,true,true,false,true));
        this.game.addEntity(new Brick(this.game, 24*PARAMS.BLOCKWIDTH,18*PARAMS.BLOCKWIDTH,true,true,true,true));
        this.game.addEntity(new Brick(this.game, 24*PARAMS.BLOCKWIDTH,27*PARAMS.BLOCKWIDTH,true,true,true,false));

        for (let i=3;i<=24;i+=3) this.game.addEntity(new Brick(this.game, 30*PARAMS.BLOCKWIDTH,i*PARAMS.BLOCKWIDTH,true,true,false,false));
        this.game.addEntity(new Brick(this.game, 30*PARAMS.BLOCKWIDTH,25.5*PARAMS.BLOCKWIDTH,true,true,false,true));
        this.game.addEntity(new Brick(this.game, 33*PARAMS.BLOCKWIDTH, 25.5*PARAMS.BLOCKWIDTH,true,true,true,true))
        this.game.addEntity(new Brick(this.game, 33*PARAMS.BLOCKWIDTH, 19.5*PARAMS.BLOCKWIDTH,true,true,true,true))
        this.game.addEntity(new Brick(this.game, 33*PARAMS.BLOCKWIDTH, 13.5*PARAMS.BLOCKWIDTH,true,true,true,true))
        this.game.addEntity(new Brick(this.game, 33*PARAMS.BLOCKWIDTH, 7.5*PARAMS.BLOCKWIDTH,true,true,true,true))
        this.game.addEntity(new Brick(this.game, 39*PARAMS.BLOCKWIDTH, 24*PARAMS.BLOCKWIDTH,true,false,true,true))
        this.game.addEntity(new Brick(this.game, 39*PARAMS.BLOCKWIDTH, 18*PARAMS.BLOCKWIDTH,true,false,true,true))
        this.game.addEntity(new Brick(this.game, 39*PARAMS.BLOCKWIDTH, 12*PARAMS.BLOCKWIDTH,true,false,true,true))
        this.game.addEntity(new Brick(this.game, 39*PARAMS.BLOCKWIDTH, 6*PARAMS.BLOCKWIDTH,true,false,true,true))

        this.game.addEntity(new InfoSign(this.game,0.75*PARAMS.BLOCKWIDTH,28.7*PARAMS.BLOCKWIDTH,"Welcome! Press A or D to move right or left"));
        this.game.addEntity(new InfoSign(this.game,12*PARAMS.BLOCKWIDTH,28.7*PARAMS.BLOCKWIDTH,"Press spacebar to jump"));
        this.game.addEntity(new InfoSign(this.game,15.75*PARAMS.BLOCKWIDTH,10.75*PARAMS.BLOCKWIDTH,"Hold shift to run faster"));
        this.game.addEntity(new InfoSign(this.game,20.25*PARAMS.BLOCKWIDTH,16.75*PARAMS.BLOCKWIDTH,"If you get stuck, press and hold R to restart"));
        //end room 1

        //room 2
        //57,27 to 96,0
        this.game.addEntity(new Checkpoint(this.game, 51.75 * PARAMS.BLOCKWIDTH, 27.5 * PARAMS.BLOCKWIDTH));
        
        //left ramp
        for(let i = 57; i<75; i+=3){
            for(let j = 27-(i-57); j<30; j+=3){
                this.game.addEntity(new Brick(this.game, i*PARAMS.BLOCKWIDTH,j*PARAMS.BLOCKWIDTH,true,true,true,true));
            }
        }

        //right ramp
        for(let i = 84; i<96; i+=3){
            for(let j = 12+(i-84); j<30; j+=3){
                this.game.addEntity(new Brick(this.game, i*PARAMS.BLOCKWIDTH,j*PARAMS.BLOCKWIDTH,true,true,true,true));
            }
        }
        
        //center collumn
        for(let j = 0; j<24; j++)
        this.game.addEntity(new Brick(this.game, 78*PARAMS.BLOCKWIDTH,j*PARAMS.BLOCKWIDTH,true,true,true,true));

        this.game.addEntity(new InfoSign(this.game,49*PARAMS.BLOCKWIDTH,28.7*PARAMS.BLOCKWIDTH,"Touching a checkpoint will save your progress"));

        this.game.addEntity(new InfoSign(this.game,76*PARAMS.BLOCKWIDTH,28.7*PARAMS.BLOCKWIDTH,"Use left and right click to make portals"));
        this.game.addEntity(new InfoSign(this.game,82*PARAMS.BLOCKWIDTH,28.7*PARAMS.BLOCKWIDTH,"You can teleport between the green and purple portals!"));

        //end room 2


        //start room 3
        this.game.addEntity(new Brick(this.game, 111*PARAMS.BLOCKWIDTH,12*PARAMS.BLOCKWIDTH,true,false,true,true));
        this.game.addEntity(new Brick(this.game, 114*PARAMS.BLOCKWIDTH,12*PARAMS.BLOCKWIDTH,false,true,true,true));
        this.game.addEntity(new Brick(this.game, 117*PARAMS.BLOCKWIDTH,12*PARAMS.BLOCKWIDTH,true,false,true,true));
        this.game.addEntity(new Brick(this.game, 120*PARAMS.BLOCKWIDTH,12*PARAMS.BLOCKWIDTH,false,true,true,true));
        let door = new Door(this.game, 156*PARAMS.BLOCKWIDTH, 27*PARAMS.BLOCKWIDTH);
        this.game.addEntity(new Button(this.game, 111*PARAMS.BLOCKWIDTH, 12 * PARAMS.BLOCKWIDTH - 20, door));
        this.game.addEntity(door);

        this.game.addEntity(new GlassBrick(this.game, 144*PARAMS.BLOCKWIDTH,3*PARAMS.BLOCKWIDTH,true,true,true,true));
        this.game.addEntity(new GlassBrick(this.game, 144*PARAMS.BLOCKWIDTH,6*PARAMS.BLOCKWIDTH,true,true,true,true));
        this.game.addEntity(new GlassBrick(this.game, 144*PARAMS.BLOCKWIDTH,9*PARAMS.BLOCKWIDTH,true,true,true,true));
        this.game.addEntity(new GlassBrick(this.game, 144*PARAMS.BLOCKWIDTH,12*PARAMS.BLOCKWIDTH,true,true,true,true));
        this.game.addEntity(new GlassBrick(this.game, 147*PARAMS.BLOCKWIDTH,12*PARAMS.BLOCKWIDTH,true,true,true,true));
        this.game.addEntity(new GlassBrick(this.game, 150*PARAMS.BLOCKWIDTH,12*PARAMS.BLOCKWIDTH,true,true,true,true));
        this.game.addEntity(new GlassBrick(this.game, 153*PARAMS.BLOCKWIDTH,12*PARAMS.BLOCKWIDTH,true,true,true,true));
        this.game.addEntity(new CompanionCube(this.game, 150*PARAMS.BLOCKWIDTH, 6*PARAMS.BLOCKWIDTH));
        this.game.addEntity(new InfoSign(this.game,135.75*PARAMS.BLOCKWIDTH,28.7*PARAMS.BLOCKWIDTH,"Place the companion cube on the red switch to open the door"));
        this.game.addEntity(new InfoSign(this.game,153*PARAMS.BLOCKWIDTH,10.7*PARAMS.BLOCKWIDTH,"Press E to pick up or put down the companion cube"));
        //end room 3

        //start room 4
        this.game.addEntity(new Checkpoint(this.game, 162 * PARAMS.BLOCKWIDTH, 27.65 * PARAMS.BLOCKWIDTH));
        this.game.addEntity(new InfoSign(this.game,166*PARAMS.BLOCKWIDTH, 28.75*PARAMS.BLOCKWIDTH,"Portal gun bullets pass through glass!"));
        this.game.addEntity(new InfoSign(this.game, 180*PARAMS.BLOCKWIDTH, 28.7*PARAMS.BLOCKWIDTH, "Blue bricks are made out the mysterious portal neutralizing mineral Portalite."));

        this.game.addEntity(new Brick(this.game, (168+0*3)*PARAMS.BLOCKWIDTH, 24*PARAMS.BLOCKWIDTH,true,true,true,true));
        for(let i = 3; i<12*3; i+=3) this.game.addEntity(new PortProofBrick(this.game, (168+i)*PARAMS.BLOCKWIDTH,24*PARAMS.BLOCKWIDTH,true,true,true,true));
        for(let i = 3; i<12*3; i+=3) this.game.addEntity(new GlassBrick(this.game, (168+i)*PARAMS.BLOCKWIDTH,21*PARAMS.BLOCKWIDTH,true,true,true,true));
        for(let i = 3; i<12*3; i+=3) this.game.addEntity(new PortProofBrick(this.game, (168+i)*PARAMS.BLOCKWIDTH,18*PARAMS.BLOCKWIDTH,true,true,true,true));
        this.game.addEntity(new Brick(this.game, (168+12*3)*PARAMS.BLOCKWIDTH, 18*PARAMS.BLOCKWIDTH,true,true,true,true));


        this.game.addEntity(new Brick(this.game, (168+0*3)*PARAMS.BLOCKWIDTH, 12*PARAMS.BLOCKWIDTH,true,true,true,true));
        for(let i = 3; i<7*3; i+=3) this.game.addEntity(new PortProofBrick(this.game, (168+i)*PARAMS.BLOCKWIDTH,12*PARAMS.BLOCKWIDTH,true,true,true,true));
        for(let i = 8*3; i<12*3; i+=3) this.game.addEntity(new PortProofBrick(this.game, (168+i)*PARAMS.BLOCKWIDTH,12*PARAMS.BLOCKWIDTH,true,true,true,true));
        for(let i = 3; i<6*3; i+=3) this.game.addEntity(new GlassBrick(this.game, (168+i)*PARAMS.BLOCKWIDTH,15*PARAMS.BLOCKWIDTH,true,true,true,true));
        this.game.addEntity(new Coin(this.game, (168+6.5*3)*PARAMS.BLOCKWIDTH, 16 *PARAMS.BLOCKWIDTH));
        this.game.addEntity(new Brick(this.game, (168+7*3)*PARAMS.BLOCKWIDTH, 18*PARAMS.BLOCKWIDTH,true,true,true,true));


        for(let i = 8*3; i<11*3; i+=3) this.game.addEntity(new GlassBrick(this.game, (168+i)*PARAMS.BLOCKWIDTH,15*PARAMS.BLOCKWIDTH,true,true,true,true));
        for(let i = 3; i<7*3; i+=3) this.game.addEntity(new GlassBrick(this.game, (168+i)*PARAMS.BLOCKWIDTH,9*PARAMS.BLOCKWIDTH,true,true,true,true));
        for(let i = 8*3; i<12*3; i+=3) this.game.addEntity(new GlassBrick(this.game, (168+i)*PARAMS.BLOCKWIDTH,9*PARAMS.BLOCKWIDTH,true,true,true,true));

        for(let i = 3; i<7*3; i+=3) this.game.addEntity(new PortProofBrick(this.game, (168+i)*PARAMS.BLOCKWIDTH,6*PARAMS.BLOCKWIDTH,true,true,true,true));
        for(let i = 3*8; i<12*3; i+=3) this.game.addEntity(new PortProofBrick(this.game, (168+i)*PARAMS.BLOCKWIDTH,6*PARAMS.BLOCKWIDTH,true,true,true,true));
        this.game.addEntity(new Brick(this.game, (168+12*3)*PARAMS.BLOCKWIDTH, 6*PARAMS.BLOCKWIDTH,true,true,true,true));

        for(let i = 6; i<10*3; i+=3) this.game.addEntity(new Brick(this.game, (168+39)*PARAMS.BLOCKWIDTH,i*PARAMS.BLOCKWIDTH,true,true,true,true));

        this.game.addEntity(new GlassBrick(this.game, (168+12*3)*PARAMS.BLOCKWIDTH, 4*3*PARAMS.BLOCKWIDTH,true,true,true,true));
        this.game.addEntity(new GlassBrick(this.game, (168+7*3)*PARAMS.BLOCKWIDTH, 4*3*PARAMS.BLOCKWIDTH,true,true,true,true));
        this.game.addEntity(new GlassBrick(this.game, (168+12*3)*PARAMS.BLOCKWIDTH, 8*3*PARAMS.BLOCKWIDTH,true,true,true,true));
        this.game.addEntity(new GlassBrick(this.game, (168+0*3)*PARAMS.BLOCKWIDTH, 6*3*PARAMS.BLOCKWIDTH,true,true,true,true));
        this.game.addEntity(new GlassBrick(this.game, (168+0*3)*PARAMS.BLOCKWIDTH, 2*3*PARAMS.BLOCKWIDTH,true,true,true,true));
        this.game.addEntity(new GlassBrick(this.game, (168+7*3)*PARAMS.BLOCKWIDTH, 2*3*PARAMS.BLOCKWIDTH,true,true,true,true));



        //end room 4


        //start room 5
        this.game.addEntity(new Coin(this.game, 238.5*PARAMS.BLOCKWIDTH-8, 9*PARAMS.BLOCKWIDTH));
        for(let i=15;i<=30;i+=3) this.game.addEntity(new PortProofBrick(this.game,237*PARAMS.BLOCKWIDTH, i * PARAMS.BLOCKWIDTH,true,true,true,true));
        this.game.addEntity(new GlassBrick(this.game,219*PARAMS.BLOCKWIDTH, 6 * PARAMS.BLOCKWIDTH,true,true,true,true));
        this.game.addEntity(new PortProofBrick(this.game,228*PARAMS.BLOCKWIDTH, 0 * PARAMS.BLOCKWIDTH,true,true,true,true));
        this.game.addEntity(new PortProofBrick(this.game,231*PARAMS.BLOCKWIDTH, 0 * PARAMS.BLOCKWIDTH,true,true,true,true));
        this.game.addEntity(new PortProofBrick(this.game,234*PARAMS.BLOCKWIDTH, 0 * PARAMS.BLOCKWIDTH,true,true,true,true));
        this.game.addEntity(new PortProofBrick(this.game,237*PARAMS.BLOCKWIDTH, 0 * PARAMS.BLOCKWIDTH,true,true,true,true));
        //end room 5

        //these are just placeholders to 'end' the level
        this.game.addEntity(new PortProofBrick(this.game,240*PARAMS.BLOCKWIDTH, 0 * PARAMS.BLOCKWIDTH,true,true,true,true));
        this.game.addEntity(new PortProofBrick(this.game,243*PARAMS.BLOCKWIDTH, 0 * PARAMS.BLOCKWIDTH,true,true,true,true));
        this.game.addEntity(new PortProofBrick(this.game,246*PARAMS.BLOCKWIDTH, 0 * PARAMS.BLOCKWIDTH,true,true,true,true));
        this.game.addEntity(new PortProofBrick(this.game,249*PARAMS.BLOCKWIDTH, 0 * PARAMS.BLOCKWIDTH,true,true,true,true));
        this.game.addEntity(new PortProofBrick(this.game,252*PARAMS.BLOCKWIDTH, 0 * PARAMS.BLOCKWIDTH,true,true,true,true));
        this.game.addEntity(new PortProofBrick(this.game,240*PARAMS.BLOCKWIDTH, 30 * PARAMS.BLOCKWIDTH,true,true,true,true));
        this.game.addEntity(new PortProofBrick(this.game,243*PARAMS.BLOCKWIDTH, 30 * PARAMS.BLOCKWIDTH,true,true,true,true));
        this.game.addEntity(new PortProofBrick(this.game,246*PARAMS.BLOCKWIDTH, 30 * PARAMS.BLOCKWIDTH,true,true,true,true));
        this.game.addEntity(new PortProofBrick(this.game,249*PARAMS.BLOCKWIDTH, 30 * PARAMS.BLOCKWIDTH,true,true,true,true));
        this.game.addEntity(new PortProofBrick(this.game,252*PARAMS.BLOCKWIDTH, 30 * PARAMS.BLOCKWIDTH,true,true,true,true));
        for (let i=0;i<30;i+=3) this.game.addEntity(new PortProofBrick(this.game,252 * PARAMS.BLOCKWIDTH, i * PARAMS.BLOCKWIDTH, true,true,true,true))
        //placeholder for end of level
        this.game.addEntity(new InfoSign(this.game,231.5*PARAMS.BLOCKWIDTH,28.7*PARAMS.BLOCKWIDTH,"Try making linked portals on the ceiling and floor, then fall through them to gain momentum"));
        this.game.addEntity(new InfoSign(this.game,234*PARAMS.BLOCKWIDTH,28.7*PARAMS.BLOCKWIDTH,"Once you're going fast, shoot a portal into the upper left wall to launch!"));
        this.game.addEntity(new InfoSign(this.game,250*PARAMS.BLOCKWIDTH,28.7*PARAMS.BLOCKWIDTH,"Fin."));



        this.game.addEntity(new Hud(this.game));
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
            this.game.purplePortal = false;
            this.game.greenPortal = false;
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