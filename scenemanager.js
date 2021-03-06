class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;
        this.title = true;
        this.portaSpawn = { x: 0 * PARAMS.BLOCKWIDTH, y: 28.5 * PARAMS.BLOCKWIDTH }
        this.porta = new Porta(this.game, this.portaSpawn.x, this.portaSpawn.y);
        PARAMS.BRICKBLOCKWIDTH = PARAMS.BLOCKWIDTH * 3;
        this.startTime = 0;

        this.coinRetentionPolicy = 0;
        this.game.addEntity(new TitleScreen(this.game));
        this.lvlMusic = new Audio();
        this.bgMusic("./audio/lvlOne.wav");
        this.game.level = 1;
        this.transition = false;
    };

    bgMusic(path) {
        this.lvlMusic.pause();
        this.lvlMusic = new Audio(path);
        let that = this;
        this.lvlMusic.addEventListener("ended", function () {
            that.lvlMusic.currentTime = 0;
            that.lvlMusic.play();
        });
    }

    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    };

    loadLevelOne() {
        this.timerOn = true;
        this.startTime = this.game.timer.gameTime;
        this.update(); // initialize screen positions
        //AUDIO_MANAGER.autoRepeat("./audio/lvlOne.wav");
        this.lvlMusic.play();


        this.clearEntities();

        //parallax background
        this.game.addEntity(new Background(this.game, -50));
        //this.game.addEntity(new Exit(this.game, 2 * PARAMS.BLOCKWIDTH, 28.5 * PARAMS.BLOCKWIDTH));

        //ground bricks to the left of room 1 to hide the blank part of the background image
        for (let i = -10; i < 0; i++) this.game.addEntity(new Brick(this.game, i * PARAMS.BRICKBLOCKWIDTH, 10 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));

        //room walls
        for (let i = 0; i <= 10; i++) {
            this.game.addEntity(new Brick(this.game, -1 * PARAMS.BRICKBLOCKWIDTH, i * PARAMS.BRICKBLOCKWIDTH, false, true, i === 10)); //leftmost walls
            if (i !== 1) this.game.addEntity(new Brick(this.game, 14 * PARAMS.BRICKBLOCKWIDTH, i * PARAMS.BRICKBLOCKWIDTH, true, true, i === 2)); //end of room 1 walls
            if (i !== 9) this.game.addEntity(new Brick(this.game, 17 * PARAMS.BRICKBLOCKWIDTH, i * PARAMS.BRICKBLOCKWIDTH, true, true, i === 10, i === 8)); //start of room 2 walls
            if (i !== 9) this.game.addEntity(new Brick(this.game, 33 * PARAMS.BRICKBLOCKWIDTH, i * PARAMS.BRICKBLOCKWIDTH, true, true, i === 10, i === 8)); //end of room 2 walls
            if (i !== 9) this.game.addEntity(new Brick(this.game, 36 * PARAMS.BRICKBLOCKWIDTH, i * PARAMS.BRICKBLOCKWIDTH, true, true, i === 10, i === 8)); //start of room 3 walls
            if (i !== 9) this.game.addEntity(new Brick(this.game, 52 * PARAMS.BRICKBLOCKWIDTH, i * PARAMS.BRICKBLOCKWIDTH, i !== 4, true, i === 10, i === 8)); //end of room 3 walls
            if (i !== 9) this.game.addEntity(new Brick(this.game, 55 * PARAMS.BRICKBLOCKWIDTH, i * PARAMS.BRICKBLOCKWIDTH, i !== 2 && i !== 6, i !== 2 && i !== 6, i === 10, i === 8)); //start of room 4 walls
            if (i !== 9) this.game.addEntity(new Brick(this.game, 71 * PARAMS.BRICKBLOCKWIDTH, i * PARAMS.BRICKBLOCKWIDTH, true, true, i === 10, i === 8)); //end of room 4 walls
            if (i > 1) this.game.addEntity(new Brick(this.game, 74 * PARAMS.BRICKBLOCKWIDTH, i * PARAMS.BRICKBLOCKWIDTH, true, true, i === 2, false)); //start of room 5 walls
            //this.game.addEntity(new Brick(this.game,253*PARAMS.BLOCKWIDTH, i * PARAMS.BLOCKWIDTH,true,true,false,false)); //end of level walls
        }
        //end room walls
        //floor and ceiling bricks
        for (let i = 0; i <= 78; i++) {
            if (i <= 75) this.game.addEntity(new Brick(this.game, i * PARAMS.BRICKBLOCKWIDTH, 0, false, false, true, i !== 48)); //ceiling
            this.game.addEntity(new Brick(this.game, i * PARAMS.BRICKBLOCKWIDTH, 10 * PARAMS.BRICKBLOCKWIDTH, false, false, (i < 5 || i > 8))); //floor
        }
        //end floor and ceiling

        //room 1 bricks
        this.game.addEntity(new Coin(this.game, 0 * PARAMS.BRICKBLOCKWIDTH, 1 * PARAMS.BRICKBLOCKWIDTH));
        this.game.addEntity(new InfoSign(this.game, 0.3 * PARAMS.BRICKBLOCKWIDTH, 2.13 * PARAMS.BRICKBLOCKWIDTH, "Coins are just fake internet points, but they go 'ding'!"));

        this.game.addEntity(new Brick(this.game, 0 * PARAMS.BRICKBLOCKWIDTH, 2.5 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new Brick(this.game, 0 * PARAMS.BRICKBLOCKWIDTH, 7 * PARAMS.BRICKBLOCKWIDTH, true, true, true, false));
        this.game.addEntity(new Brick(this.game, 0 * PARAMS.BRICKBLOCKWIDTH, 8 * PARAMS.BRICKBLOCKWIDTH, false, false, false, true));
        this.game.addEntity(new Brick(this.game, 1 * PARAMS.BRICKBLOCKWIDTH, 3.5 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new Brick(this.game, 0 * PARAMS.BRICKBLOCKWIDTH, 3.5 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new Brick(this.game, 1 * PARAMS.BRICKBLOCKWIDTH, 8 * PARAMS.BRICKBLOCKWIDTH, false, false, true, true));
        this.game.addEntity(new Brick(this.game, 2 * PARAMS.BRICKBLOCKWIDTH, 6 * PARAMS.BRICKBLOCKWIDTH, true, false, true, true));
        this.game.addEntity(new Brick(this.game, 2 * PARAMS.BRICKBLOCKWIDTH, 8 * PARAMS.BRICKBLOCKWIDTH, false, false, true, true));
        this.game.addEntity(new Brick(this.game, 3 * PARAMS.BRICKBLOCKWIDTH, 5 * PARAMS.BRICKBLOCKWIDTH, true, true, true, false));
        this.game.addEntity(new Brick(this.game, 3 * PARAMS.BRICKBLOCKWIDTH, 6 * PARAMS.BRICKBLOCKWIDTH, true, true, false, true));
        this.game.addEntity(new Brick(this.game, 3 * PARAMS.BRICKBLOCKWIDTH, 8 * PARAMS.BRICKBLOCKWIDTH, false, true, true, true));
        this.game.addEntity(new Brick(this.game, 3 * PARAMS.BRICKBLOCKWIDTH, 2 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new Brick(this.game, 4 * PARAMS.BRICKBLOCKWIDTH, 3 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new Brick(this.game, 5 * PARAMS.BRICKBLOCKWIDTH, 4 * PARAMS.BRICKBLOCKWIDTH, true, true, true, false));
        this.game.addEntity(new Brick(this.game, 5 * PARAMS.BRICKBLOCKWIDTH, 5 * PARAMS.BRICKBLOCKWIDTH, true, true, false, false));
        this.game.addEntity(new Brick(this.game, 5 * PARAMS.BRICKBLOCKWIDTH, 6 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new Brick(this.game, 5 * PARAMS.BRICKBLOCKWIDTH, 9 * PARAMS.BRICKBLOCKWIDTH, true, true, true, false));
        this.game.addEntity(new Brick(this.game, 6 * PARAMS.BRICKBLOCKWIDTH, 6 * PARAMS.BRICKBLOCKWIDTH, true, true, true, false));
        this.game.addEntity(new Brick(this.game, 6 * PARAMS.BRICKBLOCKWIDTH, 7 * PARAMS.BRICKBLOCKWIDTH, true, true, false, false));
        this.game.addEntity(new Brick(this.game, 6 * PARAMS.BRICKBLOCKWIDTH, 8 * PARAMS.BRICKBLOCKWIDTH, true, true, false, false));
        this.game.addEntity(new Brick(this.game, 6 * PARAMS.BRICKBLOCKWIDTH, 9 * PARAMS.BRICKBLOCKWIDTH, true, true, false, false));
        this.game.addEntity(new Brick(this.game, 7 * PARAMS.BRICKBLOCKWIDTH, 6 * PARAMS.BRICKBLOCKWIDTH, true, true, true, false));
        this.game.addEntity(new Brick(this.game, 7 * PARAMS.BRICKBLOCKWIDTH, 7 * PARAMS.BRICKBLOCKWIDTH, true, true, false, false));
        this.game.addEntity(new Brick(this.game, 7 * PARAMS.BRICKBLOCKWIDTH, 8 * PARAMS.BRICKBLOCKWIDTH, true, true, false, false));
        this.game.addEntity(new Brick(this.game, 7 * PARAMS.BRICKBLOCKWIDTH, 9 * PARAMS.BRICKBLOCKWIDTH, true, true, true, false));
        this.game.addEntity(new Brick(this.game, 8 * PARAMS.BRICKBLOCKWIDTH, 4 * PARAMS.BRICKBLOCKWIDTH, true, true, true, false));
        this.game.addEntity(new Brick(this.game, 8 * PARAMS.BRICKBLOCKWIDTH, 5 * PARAMS.BRICKBLOCKWIDTH, true, true, false, false));
        this.game.addEntity(new Brick(this.game, 8 * PARAMS.BRICKBLOCKWIDTH, 6 * PARAMS.BRICKBLOCKWIDTH, true, true, false, true));
        this.game.addEntity(new Brick(this.game, 8 * PARAMS.BRICKBLOCKWIDTH, 9 * PARAMS.BRICKBLOCKWIDTH, false, true, true, false));

        for (let i = 1; i <= 8; i++) this.game.addEntity(new Brick(this.game, 10 * PARAMS.BRICKBLOCKWIDTH, i * PARAMS.BRICKBLOCKWIDTH, true, true, false, i === 7));
        this.game.addEntity(new Brick(this.game, 11 * PARAMS.BRICKBLOCKWIDTH, 8 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true))
        this.game.addEntity(new Brick(this.game, 11 * PARAMS.BRICKBLOCKWIDTH, 6 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true))
        this.game.addEntity(new Brick(this.game, 11 * PARAMS.BRICKBLOCKWIDTH, 4 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true))
        this.game.addEntity(new Brick(this.game, 12 * PARAMS.BRICKBLOCKWIDTH, 1 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true))
        this.game.addEntity(new Coin(this.game, 11.37 * PARAMS.BRICKBLOCKWIDTH, 1.33 * PARAMS.BRICKBLOCKWIDTH))
        this.game.addEntity(new Brick(this.game, 13 * PARAMS.BRICKBLOCKWIDTH, 9 * PARAMS.BRICKBLOCKWIDTH, true, false, true, true))
        this.game.addEntity(new Brick(this.game, 13 * PARAMS.BRICKBLOCKWIDTH, 7 * PARAMS.BRICKBLOCKWIDTH, true, false, true, true))
        this.game.addEntity(new Brick(this.game, 13 * PARAMS.BRICKBLOCKWIDTH, 5 * PARAMS.BRICKBLOCKWIDTH, true, false, true, true))
        this.game.addEntity(new Brick(this.game, 13 * PARAMS.BRICKBLOCKWIDTH, 3 * PARAMS.BRICKBLOCKWIDTH, true, false, true, true))

        this.game.addEntity(new InfoSign(this.game, 0.25 * PARAMS.BRICKBLOCKWIDTH, 9.56 * PARAMS.BRICKBLOCKWIDTH, "Welcome! Press A or D to move right or left"));
        this.game.addEntity(new InfoSign(this.game, 4 * PARAMS.BRICKBLOCKWIDTH, 9.56 * PARAMS.BRICKBLOCKWIDTH, "Press spacebar to jump"));
        this.game.addEntity(new InfoSign(this.game, 5.25 * PARAMS.BRICKBLOCKWIDTH, 3.583 * PARAMS.BRICKBLOCKWIDTH, "Hold shift to run faster"));
        this.game.addEntity(new InfoSign(this.game, 6.75 * PARAMS.BRICKBLOCKWIDTH, 5.583 * PARAMS.BRICKBLOCKWIDTH, "If you get stuck, press and hold R to restart"));
        //end room 1

        //room 2
        //57,27 to 96,0
        this.game.addEntity(new Checkpoint(this.game, 17.25 * PARAMS.BRICKBLOCKWIDTH, 9.166 * PARAMS.BRICKBLOCKWIDTH));

        //left ramp
        for (let i = 19; i < 25; i++) {
            for (let j = 9 - (i - 19); j < 10; j++) {
                if (i === 24 && j === 4) this.game.addEntity(new Brick(this.game, i * PARAMS.BRICKBLOCKWIDTH, j * PARAMS.BRICKBLOCKWIDTH, true, true, true, i !== 24));
                else this.game.addEntity(new Brick(this.game, i * PARAMS.BRICKBLOCKWIDTH, j * PARAMS.BRICKBLOCKWIDTH, true, true, !(i === 24), i !== 24));
            }
        }

        //right ramp
        for (let i = 28; i < 32; i++) {
            for (let j = 4 + (i - 28); j < 10; j++) {
                if (i === 31 && j === 7) this.game.addEntity(new Brick(this.game, i * PARAMS.BRICKBLOCKWIDTH, j * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
                else this.game.addEntity(new Brick(this.game, i * PARAMS.BRICKBLOCKWIDTH, j * PARAMS.BRICKBLOCKWIDTH, true, true, !(i === 31), true));
            }
        }

        //center column
        for (let j = 0; j < 8; j++) this.game.addEntity(new Brick(this.game, 26 * PARAMS.BRICKBLOCKWIDTH, j * PARAMS.BRICKBLOCKWIDTH, true, true, false, j === 7));

        this.game.addEntity(new InfoSign(this.game, 16.33 * PARAMS.BRICKBLOCKWIDTH, 9.56 * PARAMS.BRICKBLOCKWIDTH, "Touching a checkpoint will save your progress"));
        this.game.addEntity(new InfoSign(this.game, 25.33 * PARAMS.BRICKBLOCKWIDTH, 9.56 * PARAMS.BRICKBLOCKWIDTH, "Use left and right click to make portals"));
        this.game.addEntity(new InfoSign(this.game, 27.33 * PARAMS.BRICKBLOCKWIDTH, 9.56 * PARAMS.BRICKBLOCKWIDTH, "You can teleport between the green and purple portals!"));

        //end room 2


        //start room 3
        this.game.addEntity(new Brick(this.game, 37 * PARAMS.BRICKBLOCKWIDTH, 4 * PARAMS.BRICKBLOCKWIDTH, true, false, true, true));
        this.game.addEntity(new Brick(this.game, 38 * PARAMS.BRICKBLOCKWIDTH, 4 * PARAMS.BRICKBLOCKWIDTH, false, true, true, true));
        this.game.addEntity(new Brick(this.game, 39 * PARAMS.BRICKBLOCKWIDTH, 4 * PARAMS.BRICKBLOCKWIDTH, true, false, true, true));
        this.game.addEntity(new Brick(this.game, 40 * PARAMS.BRICKBLOCKWIDTH, 4 * PARAMS.BRICKBLOCKWIDTH, false, true, true, true));
        let door = new Door(this.game, 52 * PARAMS.BRICKBLOCKWIDTH, 9 * PARAMS.BRICKBLOCKWIDTH);
        this.game.addEntity(new Button(this.game, 37 * PARAMS.BRICKBLOCKWIDTH, 4 * PARAMS.BRICKBLOCKWIDTH - 20, door));
        this.game.addEntity(door);

        this.game.addEntity(new GlassBrick(this.game, 48 * PARAMS.BRICKBLOCKWIDTH, 1 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new GlassBrick(this.game, 48 * PARAMS.BRICKBLOCKWIDTH, 2 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new GlassBrick(this.game, 48 * PARAMS.BRICKBLOCKWIDTH, 3 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new GlassBrick(this.game, 48 * PARAMS.BRICKBLOCKWIDTH, 4 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new GlassBrick(this.game, 49 * PARAMS.BRICKBLOCKWIDTH, 4 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new GlassBrick(this.game, 50 * PARAMS.BRICKBLOCKWIDTH, 4 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new GlassBrick(this.game, 51 * PARAMS.BRICKBLOCKWIDTH, 4 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new CompanionCube(this.game, 50 * PARAMS.BRICKBLOCKWIDTH, 2 * PARAMS.BRICKBLOCKWIDTH));
        this.game.addEntity(new InfoSign(this.game, 44 * PARAMS.BRICKBLOCKWIDTH, 9.56 * PARAMS.BRICKBLOCKWIDTH, "Place the companion cube on the red switch to open the door"));
        this.game.addEntity(new InfoSign(this.game, 51 * PARAMS.BRICKBLOCKWIDTH, 3.56 * PARAMS.BRICKBLOCKWIDTH, "Press E to pick up or put down the companion cube"));
        //end room 3

        //start room 4
        this.game.addEntity(new Checkpoint(this.game, 54 * PARAMS.BRICKBLOCKWIDTH, 9.216 * PARAMS.BRICKBLOCKWIDTH));
        this.game.addEntity(new InfoSign(this.game, 55.33 * PARAMS.BRICKBLOCKWIDTH, 9.583 * PARAMS.BRICKBLOCKWIDTH, "Portal gun bullets pass through glass!"));
        this.game.addEntity(new InfoSign(this.game, 60 * PARAMS.BRICKBLOCKWIDTH, 9.583 * PARAMS.BRICKBLOCKWIDTH, "Blue bricks are made out the mysterious portal neutralizing mineral Portalite."));

        this.game.addEntity(new Brick(this.game, 56 * PARAMS.BRICKBLOCKWIDTH, 8 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        for (let i = 1; i < 12; i++) {
            this.game.addEntity(new PortProofBrick(this.game, (56 + i) * PARAMS.BRICKBLOCKWIDTH, 8 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
            this.game.addEntity(new GlassBrick(this.game, (56 + i) * PARAMS.BRICKBLOCKWIDTH, 7 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
            this.game.addEntity(new PortProofBrick(this.game, (56 + i) * PARAMS.BRICKBLOCKWIDTH, 6 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        }
        this.game.addEntity(new Brick(this.game, (68) * PARAMS.BRICKBLOCKWIDTH, 2 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));


        this.game.addEntity(new Brick(this.game, 56 * PARAMS.BRICKBLOCKWIDTH, 4 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        for (let i = 1; i < 7; i++) this.game.addEntity(new PortProofBrick(this.game, (56 + i) * PARAMS.BRICKBLOCKWIDTH, 4 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        for (let i = 8; i < 12; i++) this.game.addEntity(new PortProofBrick(this.game, (56 + i) * PARAMS.BRICKBLOCKWIDTH, 4 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        for (let i = 1; i < 6; i++) this.game.addEntity(new GlassBrick(this.game, (56 + i) * PARAMS.BRICKBLOCKWIDTH, 5 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new Coin(this.game, (62.5) * PARAMS.BRICKBLOCKWIDTH, 5.33 * PARAMS.BRICKBLOCKWIDTH));
        this.game.addEntity(new Brick(this.game, (63) * PARAMS.BRICKBLOCKWIDTH, 6 * PARAMS.BRICKBLOCKWIDTH, true, true, true, false));


        for (let i = 8; i < 11; i++) this.game.addEntity(new GlassBrick(this.game, (56 + i) * PARAMS.BRICKBLOCKWIDTH, 5 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        for (let i = 1; i < 7; i++) this.game.addEntity(new GlassBrick(this.game, (56 + i) * PARAMS.BRICKBLOCKWIDTH, 3 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        for (let i = 8; i < 12; i++) this.game.addEntity(new GlassBrick(this.game, (56 + i) * PARAMS.BRICKBLOCKWIDTH, 3 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));

        for (let i = 1; i < 7; i++) this.game.addEntity(new PortProofBrick(this.game, (56 + i) * PARAMS.BRICKBLOCKWIDTH, 2 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        for (let i = 8; i < 12; i++) this.game.addEntity(new PortProofBrick(this.game, (56 + i) * PARAMS.BRICKBLOCKWIDTH, 2 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new Brick(this.game, (68) * PARAMS.BRICKBLOCKWIDTH, 6 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));

        for (let i = 2; i < 10; i++) this.game.addEntity(new Brick(this.game, 69 * PARAMS.BRICKBLOCKWIDTH, i * PARAMS.BRICKBLOCKWIDTH, !(i===8 || i===4), true, i === 2, false));

        this.game.addEntity(new GlassBrick(this.game, (68) * PARAMS.BRICKBLOCKWIDTH, 4 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new GlassBrick(this.game, (63) * PARAMS.BRICKBLOCKWIDTH, 4 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new GlassBrick(this.game, (68) * PARAMS.BRICKBLOCKWIDTH, 8 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new GlassBrick(this.game, (56) * PARAMS.BRICKBLOCKWIDTH, 6 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new GlassBrick(this.game, (56) * PARAMS.BRICKBLOCKWIDTH, 2 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new GlassBrick(this.game, (63) * PARAMS.BRICKBLOCKWIDTH, 2 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));

        //end room 4


        //start room 5
        this.game.addEntity(new Coin(this.game, 79.5 * PARAMS.BRICKBLOCKWIDTH - 8, 3 * PARAMS.BRICKBLOCKWIDTH));
        for (let i = 5; i <= 10; i++) this.game.addEntity(new PortProofBrick(this.game, 79 * PARAMS.BRICKBLOCKWIDTH, i * PARAMS.BRICKBLOCKWIDTH, true, true, i === 5, false));
        this.game.addEntity(new GlassBrick(this.game, 73 * PARAMS.BRICKBLOCKWIDTH, 2 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new PortProofBrick(this.game, 76 * PARAMS.BRICKBLOCKWIDTH, 0, true, true, true, true));
        this.game.addEntity(new PortProofBrick(this.game, 77 * PARAMS.BRICKBLOCKWIDTH, 0, true, true, true, true));
        this.game.addEntity(new PortProofBrick(this.game, 78 * PARAMS.BRICKBLOCKWIDTH, 0, true, true, true, true));
        this.game.addEntity(new PortProofBrick(this.game, 79 * PARAMS.BRICKBLOCKWIDTH, 0, true, true, true, true));
        //end room 5

        //these are just placeholders to 'end' the level
        this.game.addEntity(new PortProofBrick(this.game, 80 * PARAMS.BRICKBLOCKWIDTH, 0, true, true, true, true));
        this.game.addEntity(new PortProofBrick(this.game, 81 * PARAMS.BRICKBLOCKWIDTH, 0, true, true, true, true));
        this.game.addEntity(new PortProofBrick(this.game, 82 * PARAMS.BRICKBLOCKWIDTH, 0, true, true, true, true));
        this.game.addEntity(new PortProofBrick(this.game, 83 * PARAMS.BRICKBLOCKWIDTH, 0, true, true, true, true));
        this.game.addEntity(new PortProofBrick(this.game, 84 * PARAMS.BRICKBLOCKWIDTH, 0, true, true, true, true));
        this.game.addEntity(new PortProofBrick(this.game, 80 * PARAMS.BRICKBLOCKWIDTH, 10 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new PortProofBrick(this.game, 81 * PARAMS.BRICKBLOCKWIDTH, 10 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new PortProofBrick(this.game, 82 * PARAMS.BRICKBLOCKWIDTH, 10 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new PortProofBrick(this.game, 83 * PARAMS.BRICKBLOCKWIDTH, 10 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new PortProofBrick(this.game, 84 * PARAMS.BRICKBLOCKWIDTH, 10 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        for (let i = 0; i < 10; i++) this.game.addEntity(new PortProofBrick(this.game, 84 * PARAMS.BRICKBLOCKWIDTH, i * PARAMS.BRICKBLOCKWIDTH, true, true, true, true))
        //placeholder for end of level
        this.game.addEntity(new InfoSign(this.game, 77.166 * PARAMS.BRICKBLOCKWIDTH, 9.566 * PARAMS.BRICKBLOCKWIDTH, "Try making linked portals on the ceiling and floor, then fall through them to gain momentum"));
        this.game.addEntity(new InfoSign(this.game, 75 * PARAMS.BRICKBLOCKWIDTH, 9.566 * PARAMS.BRICKBLOCKWIDTH, "Once you're going fast, shoot a portal into the upper left wall to launch!"));
        this.game.addEntity(new InfoSign(this.game, 82.166 * PARAMS.BRICKBLOCKWIDTH, 9.566 * PARAMS.BRICKBLOCKWIDTH, "Press E when standing on the teleporter to go to the next level!"));

        this.game.addEntity(new Exit(this.game, 83.33 * PARAMS.BRICKBLOCKWIDTH, 9.45 * PARAMS.BRICKBLOCKWIDTH));
        for(let i=85;i<=95;i++) this.game.addEntity(new Brick(this.game, i*PARAMS.BRICKBLOCKWIDTH,10*PARAMS.BRICKBLOCKWIDTH,true,true,true,true))



        this.game.addEntity(new Hud(this.game));
        this.game.addEntity(this.porta);
        //uncomment for bug fix mode
        //this.game.addEntity(new Turret(this.game, 1*PARAMS.BRICKBLOCKWIDTH, 9* PARAMS.BRICKBLOCKWIDTH))
        //this.game.addEntity(new Exit(this.game, 0 * PARAMS.BRICKBLOCKWIDTH, 9 * PARAMS.BRICKBLOCKWIDTH));

    };

    loadLevelTwo() {
        this.porta = new Porta(this.game, this.portaSpawn.x, this.portaSpawn.y);
        this.clearEntities();
        this.game.addEntity(new Background(this.game, -50));


        for (let i = -10; i <= 75; i++) {
            if (i<41 || (i>47 && i<57) || i>69) this.game.addEntity(new Brick(this.game, i * PARAMS.BRICKBLOCKWIDTH, 0, false, false, false, i!==1)); //ceiling
            if (i<30 || i>33) this.game.addEntity(new Brick(this.game, i * PARAMS.BRICKBLOCKWIDTH, 10 * PARAMS.BRICKBLOCKWIDTH, false, false, true)); //floor
        }
        //room walls
        for (let i = 0; i <= 10; i++) {
            this.game.addEntity(new Brick(this.game, -1 * PARAMS.BRICKBLOCKWIDTH, i * PARAMS.BRICKBLOCKWIDTH, false, true, i === 10)); //leftmost walls
            if (i !== 9) this.game.addEntity(new Brick(this.game, 14 * PARAMS.BRICKBLOCKWIDTH, i * PARAMS.BRICKBLOCKWIDTH, i!==10, i!==10, i === 10, i===8)); //end of room 1 walls
            if (i < 8) this.game.addEntity(new Brick(this.game, 30 * PARAMS.BRICKBLOCKWIDTH, i * PARAMS.BRICKBLOCKWIDTH, i!==10, i!==10, i === 10, i === 8)); //end of room 2 walls
            if (i !== 9) this.game.addEntity(new Brick(this.game, 36 * PARAMS.BRICKBLOCKWIDTH, i * PARAMS.BRICKBLOCKWIDTH, i!==10, i!==10, i === 10, i === 8)); //start of room 3 walls
            if (i !== 9) this.game.addEntity(new Brick(this.game, 52 * PARAMS.BRICKBLOCKWIDTH, i * PARAMS.BRICKBLOCKWIDTH, i!==10, i!==10, i === 10, i === 8)); //end of room 3 walls
            if (i !== 9) this.game.addEntity(new Brick(this.game, 55 * PARAMS.BRICKBLOCKWIDTH, i * PARAMS.BRICKBLOCKWIDTH, i!==10, i!==10, i === 10, i === 8)); //start of room 4 walls
            if (i !== 1) this.game.addEntity(new Brick(this.game, 71 * PARAMS.BRICKBLOCKWIDTH, i * PARAMS.BRICKBLOCKWIDTH, i!==2 && i!==3 && i!==7, true, i === 2, i===0)); //end of room 4 walls
            if (i !== 9) this.game.addEntity(new PortProofBrick(this.game, 74 * PARAMS.BRICKBLOCKWIDTH, i * PARAMS.BRICKBLOCKWIDTH, i!==10, i!==10, i === 10, i === 8)); //start of room 5 walls
            if (i > 1) this.game.addEntity(new PortProofBrick(this.game, 90 * PARAMS.BRICKBLOCKWIDTH, i * PARAMS.BRICKBLOCKWIDTH, true, true, i === 2, i === 0)); //start of room 5 walls
        }

        //room 1
        for(let i=0;i<9;i++){
            this.game.addEntity(new Brick(this.game, 3*PARAMS.BRICKBLOCKWIDTH, i*PARAMS.BRICKBLOCKWIDTH, true,i!==2 && i!==4 && i!==8,false,i===8));
            this.game.addEntity(new Brick(this.game, 7*PARAMS.BRICKBLOCKWIDTH, i*PARAMS.BRICKBLOCKWIDTH, i!==2 && i!==4 && i!==8,true,false,i===8));
            this.game.addEntity(new Brick(this.game, 11*PARAMS.BRICKBLOCKWIDTH, i*PARAMS.BRICKBLOCKWIDTH, true,true,false,i===8));
        }
        let firstDoor = new Door(this.game, 3 * PARAMS.BRICKBLOCKWIDTH, 9 * PARAMS.BRICKBLOCKWIDTH);
        let secondDoor = new Door(this.game, 6 * PARAMS.BRICKBLOCKWIDTH, 9 * PARAMS.BRICKBLOCKWIDTH);
        let thirdDoor = new Door(this.game, 9 * PARAMS.BRICKBLOCKWIDTH, 9 * PARAMS.BRICKBLOCKWIDTH);
        this.game.addEntity(new Button(this.game, 0 * PARAMS.BRICKBLOCKWIDTH, 3 * PARAMS.BRICKBLOCKWIDTH - 20, firstDoor));
        this.game.addEntity(new Button(this.game, 5.3 * PARAMS.BRICKBLOCKWIDTH, 2 * PARAMS.BRICKBLOCKWIDTH - 20, secondDoor));
        this.game.addEntity(new Button(this.game, 10.5 * PARAMS.BRICKBLOCKWIDTH, 3 * PARAMS.BRICKBLOCKWIDTH - 20, thirdDoor));
        this.game.addEntity(firstDoor);
        this.game.addEntity(secondDoor);
        this.game.addEntity(thirdDoor);

        this.game.addEntity(new Brick(this.game, 0*PARAMS.BRICKBLOCKWIDTH, 8*PARAMS.BRICKBLOCKWIDTH, false,false,true,true));
        this.game.addEntity(new Brick(this.game, 1*PARAMS.BRICKBLOCKWIDTH, 8*PARAMS.BRICKBLOCKWIDTH, false,true,true,true));
        this.game.addEntity(new Brick(this.game, 2*PARAMS.BRICKBLOCKWIDTH, 6*PARAMS.BRICKBLOCKWIDTH, true,false,true,true));
        this.game.addEntity(new Brick(this.game, 1*PARAMS.BRICKBLOCKWIDTH, 6*PARAMS.BRICKBLOCKWIDTH, true,true,false,true));
        this.game.addEntity(new Brick(this.game, 1*PARAMS.BRICKBLOCKWIDTH, 5*PARAMS.BRICKBLOCKWIDTH, true,true,true,false));
        this.game.addEntity(new GlassBrick(this.game, 4*PARAMS.BRICKBLOCKWIDTH, 2*PARAMS.BRICKBLOCKWIDTH, false,false,true,true));
        this.game.addEntity(new GlassBrick(this.game, 5*PARAMS.BRICKBLOCKWIDTH, 2*PARAMS.BRICKBLOCKWIDTH, false,false,true,true));
        this.game.addEntity(new GlassBrick(this.game, 6*PARAMS.BRICKBLOCKWIDTH, 2*PARAMS.BRICKBLOCKWIDTH, false,false,true,true));
        this.game.addEntity(new Brick(this.game, 0*PARAMS.BRICKBLOCKWIDTH, 3*PARAMS.BRICKBLOCKWIDTH, false,false,true,true));
        this.game.addEntity(new Brick(this.game, 1*PARAMS.BRICKBLOCKWIDTH, 3*PARAMS.BRICKBLOCKWIDTH, false,true,false,true));
        this.game.addEntity(new GlassBrick(this.game, 1*PARAMS.BRICKBLOCKWIDTH, 1*PARAMS.BRICKBLOCKWIDTH, true,true,false,false));
        this.game.addEntity(new GlassBrick(this.game, 1*PARAMS.BRICKBLOCKWIDTH, 2*PARAMS.BRICKBLOCKWIDTH, true,true,false,false));
        this.game.addEntity(new CompanionCube(this.game, 1.3*PARAMS.BRICKBLOCKWIDTH, 9*PARAMS.BRICKBLOCKWIDTH));
        this.game.addEntity(new CompanionCube(this.game, 4.3*PARAMS.BRICKBLOCKWIDTH, 3*PARAMS.BRICKBLOCKWIDTH));

        this.game.addEntity(new MirrorBrick(this.game, 5*PARAMS.BRICKBLOCKWIDTH, 6*PARAMS.BRICKBLOCKWIDTH, true,true,true,true));
        this.game.addEntity(new Brick(this.game, 4*PARAMS.BRICKBLOCKWIDTH, 8*PARAMS.BRICKBLOCKWIDTH, false,true,true,true));
        this.game.addEntity(new Brick(this.game, 6*PARAMS.BRICKBLOCKWIDTH, 8*PARAMS.BRICKBLOCKWIDTH, true,false,true,true));
        this.game.addEntity(new Brick(this.game, 4*PARAMS.BRICKBLOCKWIDTH, 4*PARAMS.BRICKBLOCKWIDTH, false,true,true,true));
        this.game.addEntity(new Brick(this.game, 6*PARAMS.BRICKBLOCKWIDTH, 4*PARAMS.BRICKBLOCKWIDTH, true,false,true,true));

        this.game.addEntity(new GlassBrick(this.game, 9*PARAMS.BRICKBLOCKWIDTH, 1*PARAMS.BRICKBLOCKWIDTH, true,true,false,false));
        this.game.addEntity(new GlassBrick(this.game, 9*PARAMS.BRICKBLOCKWIDTH, 2*PARAMS.BRICKBLOCKWIDTH, true,true,false,false));

        this.game.addEntity(new Brick(this.game, 9*PARAMS.BRICKBLOCKWIDTH, 3*PARAMS.BRICKBLOCKWIDTH, true,false,false,true));
        this.game.addEntity(new Brick(this.game, 10*PARAMS.BRICKBLOCKWIDTH, 3*PARAMS.BRICKBLOCKWIDTH, false,false,true,true));

        this.game.addEntity(new Brick(this.game, 9*PARAMS.BRICKBLOCKWIDTH, 8*PARAMS.BRICKBLOCKWIDTH, true,false,true,true));
        this.game.addEntity(new Brick(this.game, 10*PARAMS.BRICKBLOCKWIDTH, 8*PARAMS.BRICKBLOCKWIDTH, false,false,true,true));

        this.game.addEntity(new Brick(this.game, 8*PARAMS.BRICKBLOCKWIDTH, 6*PARAMS.BRICKBLOCKWIDTH, false,false,true,true));
        this.game.addEntity(new Brick(this.game, 9*PARAMS.BRICKBLOCKWIDTH, 6*PARAMS.BRICKBLOCKWIDTH, false,true,true,true));
        this.game.addEntity(new Brick(this.game, 9*PARAMS.BRICKBLOCKWIDTH, 5*PARAMS.BRICKBLOCKWIDTH, true,true,true,false));
        //end room 1

        this.game.addEntity(new PortProofBrick(this.game,30*PARAMS.BRICKBLOCKWIDTH, 8*PARAMS.BRICKBLOCKWIDTH,true,true,false,false));
        this.game.addEntity(new PortProofBrick(this.game,30*PARAMS.BRICKBLOCKWIDTH, 8.5*PARAMS.BRICKBLOCKWIDTH,true,true,false,true));
        this.game.addEntity(new PortProofBrick(this.game,30*PARAMS.BRICKBLOCKWIDTH, 10*PARAMS.BRICKBLOCKWIDTH,false,false,true,false));
        this.game.addEntity(new PortProofBrick(this.game,31*PARAMS.BRICKBLOCKWIDTH, 10*PARAMS.BRICKBLOCKWIDTH,false,false,true,false));
        this.game.addEntity(new PortProofBrick(this.game,32*PARAMS.BRICKBLOCKWIDTH, 10*PARAMS.BRICKBLOCKWIDTH,false,false,true,false));
        this.game.addEntity(new PortProofBrick(this.game,33*PARAMS.BRICKBLOCKWIDTH, 10*PARAMS.BRICKBLOCKWIDTH,false,false,true,false));
        this.game.addEntity(new PortProofBrick(this.game,33*PARAMS.BRICKBLOCKWIDTH, 9*PARAMS.BRICKBLOCKWIDTH,true,true,true,false));
        //this.game.addEntity(new PortProofBrick(this.game,33*PARAMS.BRICKBLOCKWIDTH, 8*PARAMS.BRICKBLOCKWIDTH,true,true,false,false));
        this.game.addEntity(new Turret(this.game, (28.3) * PARAMS.BRICKBLOCKWIDTH, 9 * PARAMS.BRICKBLOCKWIDTH));

        this.game.addEntity(new GlassBrick(this.game,20*PARAMS.BRICKBLOCKWIDTH, 2*PARAMS.BRICKBLOCKWIDTH,true,true,true,true))
        this.game.addEntity(new GlassBrick(this.game,21*PARAMS.BRICKBLOCKWIDTH, 2*PARAMS.BRICKBLOCKWIDTH,true,true,true,true))
        this.game.addEntity(new Coin(this.game,21.3*PARAMS.BRICKBLOCKWIDTH, 3.3*PARAMS.BRICKBLOCKWIDTH))
        this.game.addEntity(new GlassBrick(this.game,22*PARAMS.BRICKBLOCKWIDTH, 2*PARAMS.BRICKBLOCKWIDTH,true,true,true,true))
        this.game.addEntity(new GlassBrick(this.game,20*PARAMS.BRICKBLOCKWIDTH, 3*PARAMS.BRICKBLOCKWIDTH,true,true,true,true))
        this.game.addEntity(new GlassBrick(this.game,20*PARAMS.BRICKBLOCKWIDTH, 4*PARAMS.BRICKBLOCKWIDTH,true,true,true,true))
        this.game.addEntity(new GlassBrick(this.game,21*PARAMS.BRICKBLOCKWIDTH, 4*PARAMS.BRICKBLOCKWIDTH,true,true,true,true))
        //this.game.addEntity(new GlassBrick(this.game,18*PARAMS.BRICKBLOCKWIDTH, 4*PARAMS.BRICKBLOCKWIDTH,true,true,true,true))

        this.game.addEntity(new Brick(this.game,24.3*PARAMS.BRICKBLOCKWIDTH, 3*PARAMS.BRICKBLOCKWIDTH,true,true,true,true))
        this.game.addEntity(new Brick(this.game,28*PARAMS.BRICKBLOCKWIDTH, 7*PARAMS.BRICKBLOCKWIDTH,true,true,true,true))
        this.game.addEntity(new Brick(this.game,18*PARAMS.BRICKBLOCKWIDTH, 7*PARAMS.BRICKBLOCKWIDTH,true,true,true,true))

        //room 3 starting at x=37*Brickblockwid
        this.game.addEntity(new Brick(this.game,37*PARAMS.BRICKBLOCKWIDTH, 8*PARAMS.BRICKBLOCKWIDTH,false,true,true,true))
        this.game.addEntity(new CompanionCube(this.game,37.3*PARAMS.BRICKBLOCKWIDTH, 7*PARAMS.BRICKBLOCKWIDTH))
        this.game.addEntity(new Brick(this.game,51*PARAMS.BRICKBLOCKWIDTH, 8*PARAMS.BRICKBLOCKWIDTH,true,false,true,true))
        this.game.addEntity(new CompanionCube(this.game,51.3*PARAMS.BRICKBLOCKWIDTH, 7*PARAMS.BRICKBLOCKWIDTH))
        for (let i=2;i<=8;i++) {
            if (i%2===1) this.game.addEntity(new MirrorBrick(this.game,44*PARAMS.BRICKBLOCKWIDTH, i*PARAMS.BRICKBLOCKWIDTH,true,true,i===2,i===8));
            else this.game.addEntity(new GlassBrick(this.game,44*PARAMS.BRICKBLOCKWIDTH, i*PARAMS.BRICKBLOCKWIDTH,true,true,i===2,i===8))

        }
        for (let i=0;i<=14;i++) if (i<6 || i>8) this.game.addEntity(new Brick(this.game,(37+i)*PARAMS.BRICKBLOCKWIDTH, 5*PARAMS.BRICKBLOCKWIDTH,i===9,i===5,true,true))
        for(let i=41;i<=47;i++) this.game.addEntity(new PortProofBrick(this.game,i*PARAMS.BRICKBLOCKWIDTH, 0*PARAMS.BRICKBLOCKWIDTH,false,false,false,true))
        this.game.addEntity(new Coin(this.game,44.4*PARAMS.BRICKBLOCKWIDTH,1.3*PARAMS.BRICKBLOCKWIDTH));
        let fourthDoor = new Door(this.game, 51 * PARAMS.BRICKBLOCKWIDTH, 9 * PARAMS.BRICKBLOCKWIDTH);
        let fifthDoor = new Door(this.game, 52 * PARAMS.BRICKBLOCKWIDTH, 9 * PARAMS.BRICKBLOCKWIDTH);
        this.game.addEntity(fourthDoor);
        this.game.addEntity(fifthDoor);
        this.game.addEntity(new Button(this.game, 37.3 * PARAMS.BRICKBLOCKWIDTH, 5 * PARAMS.BRICKBLOCKWIDTH - 20, fourthDoor));
        this.game.addEntity(new Button(this.game, 51.3 * PARAMS.BRICKBLOCKWIDTH, 5 * PARAMS.BRICKBLOCKWIDTH - 20, fifthDoor));
        //end room 3

        for(let i=56;i<70;i++) {
            if (i>56) this.game.addEntity(new PortProofBrick(this.game, i*PARAMS.BRICKBLOCKWIDTH,0*PARAMS.BRICKBLOCKWIDTH,false,false,false,true))
            this.game.addEntity(new Brick(this.game, i*PARAMS.BRICKBLOCKWIDTH,5*PARAMS.BRICKBLOCKWIDTH,false,i===69,true,true))
        }
        this.game.addEntity(new GlassBrick(this.game,56*PARAMS.BRICKBLOCKWIDTH, 2*PARAMS.BRICKBLOCKWIDTH,true,true,true,false))
        this.game.addEntity(new MirrorBrick(this.game,56*PARAMS.BRICKBLOCKWIDTH, 3*PARAMS.BRICKBLOCKWIDTH,true,true,false,true))
        this.game.addEntity(new PortProofBrick(this.game,63*PARAMS.BRICKBLOCKWIDTH, 1*PARAMS.BRICKBLOCKWIDTH,true,true,false,false))
        this.game.addEntity(new GlassBrick(this.game,63*PARAMS.BRICKBLOCKWIDTH, 2*PARAMS.BRICKBLOCKWIDTH,true,true,false,false))
        this.game.addEntity(new MirrorBrick(this.game,63*PARAMS.BRICKBLOCKWIDTH, 3*PARAMS.BRICKBLOCKWIDTH,true,true,false,true))
        this.game.addEntity(new GlassBrick(this.game,70*PARAMS.BRICKBLOCKWIDTH, 2*PARAMS.BRICKBLOCKWIDTH,true,true,true,false))
        this.game.addEntity(new MirrorBrick(this.game,70*PARAMS.BRICKBLOCKWIDTH, 3*PARAMS.BRICKBLOCKWIDTH,true,true,false,true))
        for(let i=57;i<63;i++) {
            this.game.addEntity(new GlassBrick(this.game,i*PARAMS.BRICKBLOCKWIDTH,2*PARAMS.BRICKBLOCKWIDTH,false,false,true,false));
            this.game.addEntity(new GlassBrick(this.game,i*PARAMS.BRICKBLOCKWIDTH,3*PARAMS.BRICKBLOCKWIDTH,false,false,false,true));
        }
        for(let i=64;i<70;i++) {
            this.game.addEntity(new GlassBrick(this.game,i*PARAMS.BRICKBLOCKWIDTH,2*PARAMS.BRICKBLOCKWIDTH,false,false,true,false));
            this.game.addEntity(new GlassBrick(this.game,i*PARAMS.BRICKBLOCKWIDTH,3*PARAMS.BRICKBLOCKWIDTH,false,false,false,true));
        }
        this.game.addEntity(new Brick(this.game, 57*PARAMS.BRICKBLOCKWIDTH,9*PARAMS.BRICKBLOCKWIDTH,true,true,true,false));
        this.game.addEntity(new Brick(this.game, 59*PARAMS.BRICKBLOCKWIDTH,8*PARAMS.BRICKBLOCKWIDTH,true,true,true,false));
        this.game.addEntity(new Brick(this.game, 59*PARAMS.BRICKBLOCKWIDTH,9*PARAMS.BRICKBLOCKWIDTH,true,true,false,false));

        this.game.addEntity(new GlassBrick(this.game, 61*PARAMS.BRICKBLOCKWIDTH,8*PARAMS.BRICKBLOCKWIDTH,true,false,true,true));
        this.game.addEntity(new GlassBrick(this.game, 62*PARAMS.BRICKBLOCKWIDTH,8*PARAMS.BRICKBLOCKWIDTH,false,false,true,true));
        this.game.addEntity(new GlassBrick(this.game, 63*PARAMS.BRICKBLOCKWIDTH,8*PARAMS.BRICKBLOCKWIDTH,false,false,true,true));
        this.game.addEntity(new GlassBrick(this.game, 64*PARAMS.BRICKBLOCKWIDTH,8*PARAMS.BRICKBLOCKWIDTH,false,true,true,true));

        this.game.addEntity(new Brick(this.game, 66*PARAMS.BRICKBLOCKWIDTH,6*PARAMS.BRICKBLOCKWIDTH,true,true,true,false));
        this.game.addEntity(new Brick(this.game, 66*PARAMS.BRICKBLOCKWIDTH,7*PARAMS.BRICKBLOCKWIDTH,true,true,true,false));
        this.game.addEntity(new Brick(this.game, 66*PARAMS.BRICKBLOCKWIDTH,8*PARAMS.BRICKBLOCKWIDTH,true,true,true,true));
        this.game.addEntity(new Brick(this.game, 68*PARAMS.BRICKBLOCKWIDTH,7*PARAMS.BRICKBLOCKWIDTH,true,true,true,true));
        this.game.addEntity(new Brick(this.game, 69*PARAMS.BRICKBLOCKWIDTH,8.6*PARAMS.BRICKBLOCKWIDTH,true,true,true,true));
        this.game.addEntity(new Brick(this.game, 70*PARAMS.BRICKBLOCKWIDTH,7*PARAMS.BRICKBLOCKWIDTH,true,false,true,true));
        this.game.addEntity(new Coin(this.game,56.3*PARAMS.BRICKBLOCKWIDTH,1.3*PARAMS.BRICKBLOCKWIDTH));


        //room 5
        for (let i=76;i<=89;i++){
            if (i<87) this.game.addEntity(new PortProofBrick(this.game,i*PARAMS.BRICKBLOCKWIDTH, 0*PARAMS.BRICKBLOCKWIDTH,false,false,false,true));
            else if (i===87) this.game.addEntity(new PortProofBrick(this.game,i*PARAMS.BRICKBLOCKWIDTH, -0.3*PARAMS.BRICKBLOCKWIDTH,false,false,false,true));
            else this.game.addEntity(new PortProofBrick(this.game,i*PARAMS.BRICKBLOCKWIDTH, -0.6*PARAMS.BRICKBLOCKWIDTH,false,false,false,true))
            this.game.addEntity(new PortProofBrick(this.game,i*PARAMS.BRICKBLOCKWIDTH, 10*PARAMS.BRICKBLOCKWIDTH,false,false,true,false))
        }
        this.game.addEntity(new GlassBrick(this.game, 75*PARAMS.BRICKBLOCKWIDTH,6*PARAMS.BRICKBLOCKWIDTH,false,true,true,true));
        this.game.addEntity(new InfoSign(this.game, 75.25 * PARAMS.BRICKBLOCKWIDTH, 9.56 * PARAMS.BRICKBLOCKWIDTH, "'Failing up'"));
        this.game.addEntity(new InfoSign(this.game, 89.25 * PARAMS.BRICKBLOCKWIDTH, 5.56 * PARAMS.BRICKBLOCKWIDTH, "I meant 'falling up'"));
        this.game.addEntity(new Brick(this.game, 77*PARAMS.BRICKBLOCKWIDTH,6*PARAMS.BRICKBLOCKWIDTH,true,true,true,true));
        this.game.addEntity(new Brick(this.game, 81*PARAMS.BRICKBLOCKWIDTH,6*PARAMS.BRICKBLOCKWIDTH,true,true,true,true));
        this.game.addEntity(new Coin(this.game, 81.3*PARAMS.BRICKBLOCKWIDTH,1.3*PARAMS.BRICKBLOCKWIDTH));
        this.game.addEntity(new Brick(this.game, 85*PARAMS.BRICKBLOCKWIDTH,6*PARAMS.BRICKBLOCKWIDTH,true,true,true,true));
        this.game.addEntity(new Brick(this.game, 88*PARAMS.BRICKBLOCKWIDTH,6*PARAMS.BRICKBLOCKWIDTH,true,false,true,true));
        this.game.addEntity(new Brick(this.game, 89*PARAMS.BRICKBLOCKWIDTH,6*PARAMS.BRICKBLOCKWIDTH,false,false,true,true));
        this.game.addEntity(new Brick(this.game, 89*PARAMS.BRICKBLOCKWIDTH,2*PARAMS.BRICKBLOCKWIDTH,true,false,true,true));
        this.game.addEntity(new PortProofBrick(this.game,90*PARAMS.BRICKBLOCKWIDTH, -0.6*PARAMS.BRICKBLOCKWIDTH,false,false,false,true))
        this.game.addEntity(new PortProofBrick(this.game,91*PARAMS.BRICKBLOCKWIDTH, -0.3*PARAMS.BRICKBLOCKWIDTH,false,false,false,true))
        this.game.addEntity(new PortProofBrick(this.game,92*PARAMS.BRICKBLOCKWIDTH, 0*PARAMS.BRICKBLOCKWIDTH,false,false,false,true))
        this.game.addEntity(new PortProofBrick(this.game,93*PARAMS.BRICKBLOCKWIDTH, 0*PARAMS.BRICKBLOCKWIDTH,false,false,false,true))

        //secret room
        this.game.addEntity(new PortProofBrick(this.game,93*PARAMS.BRICKBLOCKWIDTH, -1*PARAMS.BRICKBLOCKWIDTH,false,true,false,false))
        this.game.addEntity(new PortProofBrick(this.game,93*PARAMS.BRICKBLOCKWIDTH, -2*PARAMS.BRICKBLOCKWIDTH,false,false,false,false))
        this.game.addEntity(new PortProofBrick(this.game,95*PARAMS.BRICKBLOCKWIDTH, -1*PARAMS.BRICKBLOCKWIDTH,true,false,false,false))
        this.game.addEntity(new PortProofBrick(this.game,95*PARAMS.BRICKBLOCKWIDTH, -2*PARAMS.BRICKBLOCKWIDTH,false,false,false,false))
        this.game.addEntity(new Brick(this.game,94*PARAMS.BRICKBLOCKWIDTH, -2*PARAMS.BRICKBLOCKWIDTH,false,false,false,true))
        this.game.addEntity(new Coin(this.game,94.3*PARAMS.BRICKBLOCKWIDTH, -1*PARAMS.BRICKBLOCKWIDTH))
        //end secret room

        this.game.addEntity(new GlassBrick(this.game,94*PARAMS.BRICKBLOCKWIDTH, 0*PARAMS.BRICKBLOCKWIDTH,false,false,false,true))
        this.game.addEntity(new Brick(this.game,95*PARAMS.BRICKBLOCKWIDTH, 0*PARAMS.BRICKBLOCKWIDTH,false,false,false,true))
        this.game.addEntity(new PortProofBrick(this.game,90*PARAMS.BRICKBLOCKWIDTH, 2*PARAMS.BRICKBLOCKWIDTH,false,false,true,false))
        this.game.addEntity(new PortProofBrick(this.game,91*PARAMS.BRICKBLOCKWIDTH, 2*PARAMS.BRICKBLOCKWIDTH,false,false,true,false))
        this.game.addEntity(new PortProofBrick(this.game,92*PARAMS.BRICKBLOCKWIDTH, 2*PARAMS.BRICKBLOCKWIDTH,false,false,true,false))
        this.game.addEntity(new PortProofBrick(this.game,93*PARAMS.BRICKBLOCKWIDTH, 2*PARAMS.BRICKBLOCKWIDTH,false,false,true,false))
        this.game.addEntity(new PortProofBrick(this.game,94*PARAMS.BRICKBLOCKWIDTH, 2*PARAMS.BRICKBLOCKWIDTH,false,false,true,false))
        this.game.addEntity(new PortProofBrick(this.game,95*PARAMS.BRICKBLOCKWIDTH, 2*PARAMS.BRICKBLOCKWIDTH,false,false,true,false))
        this.game.addEntity(new PortProofBrick(this.game,96*PARAMS.BRICKBLOCKWIDTH, 2*PARAMS.BRICKBLOCKWIDTH,false,false,true,false))
        this.game.addEntity(new PortProofBrick(this.game,96*PARAMS.BRICKBLOCKWIDTH, 0*PARAMS.BRICKBLOCKWIDTH,false,false,false,true))
        this.game.addEntity(new PortProofBrick(this.game,97*PARAMS.BRICKBLOCKWIDTH, 0*PARAMS.BRICKBLOCKWIDTH,false,false,false,false))
        this.game.addEntity(new PortProofBrick(this.game,97*PARAMS.BRICKBLOCKWIDTH, 1*PARAMS.BRICKBLOCKWIDTH,true,false,false,false))
        this.game.addEntity(new PortProofBrick(this.game,97*PARAMS.BRICKBLOCKWIDTH, 2*PARAMS.BRICKBLOCKWIDTH,false,false,false,false))

        this.game.addEntity(new Checkpoint(this.game, 13.25 * PARAMS.BRICKBLOCKWIDTH, 9.22 * PARAMS.BRICKBLOCKWIDTH));
        this.game.addEntity(new Checkpoint(this.game, 34.25 * PARAMS.BRICKBLOCKWIDTH, 9.22 * PARAMS.BRICKBLOCKWIDTH));
        this.game.addEntity(new Checkpoint(this.game, 54.25 * PARAMS.BRICKBLOCKWIDTH, 9.22 * PARAMS.BRICKBLOCKWIDTH));
        this.game.addEntity(new Checkpoint(this.game, 73.25 * PARAMS.BRICKBLOCKWIDTH, 9.22 * PARAMS.BRICKBLOCKWIDTH));
        this.game.addEntity(new Exit(this.game, 96.3 * PARAMS.BRICKBLOCKWIDTH, 1.4 * PARAMS.BRICKBLOCKWIDTH));
        //this.game.addEntity(new Exit(this.game, 2 * PARAMS.BLOCKWIDTH, 28.5 * PARAMS.BLOCKWIDTH));  //debug exit
        this.game.addEntity(new Hud(this.game));
        this.game.addEntity(this.porta);
        this.coinRetentionPolicy = Coin.coinCount;
    }

    loadLevelThree() {
        this.porta = new Porta(this.game, this.portaSpawn.x, this.portaSpawn.y);
        //this.porta = new Porta(this.game, 75*PARAMS.BRICKBLOCKWIDTH, this.portaSpawn.y);  //debug spawn
        this.clearEntities();
        this.game.addEntity(new Background(this.game, -50));
        console.log("Level 3");

        //Room 1
        //floor
        for (let i = 0; i < 4; i++) this.game.addEntity(new GlassBrick(this.game, i * PARAMS.BRICKBLOCKWIDTH, 10 * PARAMS.BRICKBLOCKWIDTH, false, false, true, true));
        for (let i = 4; i < 15; i++) this.game.addEntity(new Brick(this.game, i * PARAMS.BRICKBLOCKWIDTH, 10 * PARAMS.BRICKBLOCKWIDTH, false, false, true, true));
        //ceiling
        for (let i = 0; i < 4; i++) this.game.addEntity(new GlassBrick(this.game, i * PARAMS.BRICKBLOCKWIDTH, 0 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        for (let i = 4; i < 15; i++) this.game.addEntity(new Brick(this.game, i * PARAMS.BRICKBLOCKWIDTH, 0 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        //walls
        for (let i = 0; i <= 10; i++) {
            this.game.addEntity(new GlassBrick(this.game, -1 * PARAMS.BRICKBLOCKWIDTH, i * PARAMS.BRICKBLOCKWIDTH, false, true, i === 10)); //leftmost walls
            if (i !== 9) this.game.addEntity(new PortProofBrick(this.game, 14 * PARAMS.BRICKBLOCKWIDTH, i * PARAMS.BRICKBLOCKWIDTH, i!==10, i!==10, i === 10, i===8)); //end of room 1 walls
            if (i < 8) this.game.addEntity(new PortProofBrick(this.game, 30 * PARAMS.BRICKBLOCKWIDTH, i * PARAMS.BRICKBLOCKWIDTH, i!==10, i!==10, i === 10, i === 8)); //end of room 2 walls
            //if (i !== 9) this.game.addEntity(new Brick(this.game, 36 * PARAMS.BRICKBLOCKWIDTH, i * PARAMS.BRICKBLOCKWIDTH, i!==10, i!==10, i === 10, i === 8)); //start of room 3 walls
            if (i !== 9) this.game.addEntity(new PortProofBrick(this.game, 52 * PARAMS.BRICKBLOCKWIDTH, i * PARAMS.BRICKBLOCKWIDTH, i!==10, i!==10, i === 10, i === 8)); //end of room 3 walls
            if (i !== 9) this.game.addEntity(new Brick(this.game, 55 * PARAMS.BRICKBLOCKWIDTH, i * PARAMS.BRICKBLOCKWIDTH, i!==10, i!==10, i === 10, i === 8)); //start of room 4 walls
            if (i !== 9) this.game.addEntity(new Brick(this.game, 71 * PARAMS.BRICKBLOCKWIDTH, i * PARAMS.BRICKBLOCKWIDTH, i!==2 && i!==3 && i!==7, true, i === 2, i===0)); //end of room 4 walls
            if (i !== 9) this.game.addEntity(new PortProofBrick(this.game, 74 * PARAMS.BRICKBLOCKWIDTH, i * PARAMS.BRICKBLOCKWIDTH, i!==10, i!==10, i === 10, i === 8)); //start of room 5 walls
            this.game.addEntity(new PortProofBrick(this.game, 90 * PARAMS.BRICKBLOCKWIDTH, i * PARAMS.BRICKBLOCKWIDTH, true, true, i === 2, i === 0)); //start of room 5 walls
        }
        //right glass barrier
        for (let i = 1; i < 9; i++) this.game.addEntity(new GlassBrick(this.game, 3 * PARAMS.BRICKBLOCKWIDTH, i * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));

        //glass steps
        for (let i = 3.5; i < 11; i+=2.5) this.game.addEntity(new GlassBrick(this.game, 2 * PARAMS.BRICKBLOCKWIDTH, i * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        for (let i = 2; i < 9; i+=2.5) this.game.addEntity(new GlassBrick(this.game, 0 * PARAMS.BRICKBLOCKWIDTH, i * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));

        this.game.addEntity(new Brick(this.game, 7 * PARAMS.BRICKBLOCKWIDTH, 8 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new Brick(this.game, 7 * PARAMS.BRICKBLOCKWIDTH, 4 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new CompanionCube(this.game, 7.3*PARAMS.BRICKBLOCKWIDTH, 3 * PARAMS.BRICKBLOCKWIDTH));
        var cageDoor = new Door(this.game, 3*PARAMS.BRICKBLOCKWIDTH, 9*PARAMS.BRICKBLOCKWIDTH);
        var buttonDoor = new Door(this.game, 8*PARAMS.BRICKBLOCKWIDTH, 6*PARAMS.BRICKBLOCKWIDTH);
        this.game.addEntity(new Button(this.game, 7.3*PARAMS.BRICKBLOCKWIDTH, 7.75 * PARAMS.BRICKBLOCKWIDTH, buttonDoor));
        this.game.addEntity(new Button(this.game, 9.3*PARAMS.BRICKBLOCKWIDTH, 6.75 * PARAMS.BRICKBLOCKWIDTH, cageDoor));
        this.game.addEntity(cageDoor);
        this.game.addEntity(buttonDoor);

        this.game.addEntity(new Brick(this.game, 8 * PARAMS.BRICKBLOCKWIDTH, 7 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new Brick(this.game, 8 * PARAMS.BRICKBLOCKWIDTH, 5 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new Brick(this.game, 9 * PARAMS.BRICKBLOCKWIDTH, 7 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new Brick(this.game, 10 * PARAMS.BRICKBLOCKWIDTH, 7 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new Brick(this.game, 10 * PARAMS.BRICKBLOCKWIDTH, 6 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new Brick(this.game, 10 * PARAMS.BRICKBLOCKWIDTH, 5 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new Brick(this.game, 9 * PARAMS.BRICKBLOCKWIDTH, 5 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));

        this.game.addEntity(new InfoSign(this.game, 1 * PARAMS.BRICKBLOCKWIDTH, 9.6 * PARAMS.BRICKBLOCKWIDTH, "The Glass Ceiling"));

        //Room 2
        //floor
        for (let i = 14; i < 31; i++) this.game.addEntity(new PortProofBrick(this.game, i * PARAMS.BRICKBLOCKWIDTH, 10 * PARAMS.BRICKBLOCKWIDTH, false, false, true, true));
        //ceiling
        for (let i = 14; i < 30; i++){
            if(i == 24 || i == 27 || i == 28) continue;
            this.game.addEntity(new PortProofBrick(this.game, i * PARAMS.BRICKBLOCKWIDTH, 0 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        }

        //puzzle blocks
        this.game.addEntity(new Brick(this.game, 24 * PARAMS.BRICKBLOCKWIDTH, 0 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new Brick(this.game, 27 * PARAMS.BRICKBLOCKWIDTH, 0 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new Brick(this.game, 28 * PARAMS.BRICKBLOCKWIDTH, 0 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));

        this.game.addEntity(new Checkpoint(this.game, 14*PARAMS.BRICKBLOCKWIDTH, 9.2*PARAMS.BRICKBLOCKWIDTH));

        this.game.addEntity(new MirrorBrick(this.game, 17*PARAMS.BRICKBLOCKWIDTH, 10*PARAMS.BRICKBLOCKWIDTH, false, false, true, true));
        this.game.addEntity(new MirrorBrick(this.game, 20*PARAMS.BRICKBLOCKWIDTH, 7*PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new MirrorBrick(this.game, 16*PARAMS.BRICKBLOCKWIDTH, 4*PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new MirrorBrick(this.game, 19*PARAMS.BRICKBLOCKWIDTH, 1*PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new MirrorBrick(this.game, 23*PARAMS.BRICKBLOCKWIDTH, 5*PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new MirrorBrick(this.game, 21*PARAMS.BRICKBLOCKWIDTH, 8*PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new MirrorBrick(this.game, 25*PARAMS.BRICKBLOCKWIDTH, 8*PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new MirrorBrick(this.game, 26*PARAMS.BRICKBLOCKWIDTH, 7*PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new MirrorBrick(this.game, 26*PARAMS.BRICKBLOCKWIDTH, 3*PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new MirrorBrick(this.game, 24*PARAMS.BRICKBLOCKWIDTH, 2*PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new MirrorBrick(this.game, 25*PARAMS.BRICKBLOCKWIDTH, 1*PARAMS.BRICKBLOCKWIDTH, true, true, true, true));

        //red herring and obstruction blocks
        for(let i = 10; i>1; i-- ) this.game.addEntity(new PortProofBrick(this.game, 28 * PARAMS.BRICKBLOCKWIDTH, i * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new MirrorBrick(this.game, 27*PARAMS.BRICKBLOCKWIDTH, 2*PARAMS.BRICKBLOCKWIDTH, true, true, true, true));

        this.game.addEntity(new PortProofBrick(this.game, 22*PARAMS.BRICKBLOCKWIDTH, 8.5*PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new MirrorBrick(this.game, 23*PARAMS.BRICKBLOCKWIDTH, 8*PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new PortProofBrick(this.game, 24*PARAMS.BRICKBLOCKWIDTH, 8.5*PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new MirrorBrick(this.game, 20*PARAMS.BRICKBLOCKWIDTH, 8.2*PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new MirrorBrick(this.game, 26*PARAMS.BRICKBLOCKWIDTH, 8.2*PARAMS.BRICKBLOCKWIDTH, true, true, true, true));

        this.game.addEntity(new MirrorBrick(this.game, 22*PARAMS.BRICKBLOCKWIDTH, 3*PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new MirrorBrick(this.game, 21*PARAMS.BRICKBLOCKWIDTH, 2*PARAMS.BRICKBLOCKWIDTH, true, true, true, true));

        this.game.addEntity(new MirrorBrick(this.game, 17*PARAMS.BRICKBLOCKWIDTH, 7*PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new MirrorBrick(this.game, 16*PARAMS.BRICKBLOCKWIDTH, 6*PARAMS.BRICKBLOCKWIDTH, true, true, true, true));

        this.game.addEntity(new InfoSign(this.game, 15 * PARAMS.BRICKBLOCKWIDTH, 9.6 * PARAMS.BRICKBLOCKWIDTH, "Reflective Slide"));
        this.game.addEntity(new InfoSign(this.game, 19 * PARAMS.BRICKBLOCKWIDTH, 9.6 * PARAMS.BRICKBLOCKWIDTH, "It would be cool if there was a super obvious place to stand."));
        this.game.addEntity(new InfoSign(this.game, 23 * PARAMS.BRICKBLOCKWIDTH, 9.6 * PARAMS.BRICKBLOCKWIDTH, "And maybe a couple of friendly hint signs on where to shoot."));
        this.game.addEntity(new InfoSign(this.game, 26 * PARAMS.BRICKBLOCKWIDTH, 9.6 * PARAMS.BRICKBLOCKWIDTH, "When in doubt, rapid fire!"));

        this.game.addEntity(new InfoSign(this.game, 20.3 * PARAMS.BRICKBLOCKWIDTH, 6.6 * PARAMS.BRICKBLOCKWIDTH, "Portal gun go brrrr."));
        this.game.addEntity(new InfoSign(this.game, 16.3 * PARAMS.BRICKBLOCKWIDTH, 3.6 * PARAMS.BRICKBLOCKWIDTH, "Juan."));
        this.game.addEntity(new Coin(this.game, 24.4 * PARAMS.BRICKBLOCKWIDTH, 1.5 * PARAMS.BRICKBLOCKWIDTH));

        //Room 3

        this.game.addEntity(new Checkpoint(this.game, 30*PARAMS.BRICKBLOCKWIDTH, 9.2*PARAMS.BRICKBLOCKWIDTH));
        this.game.addEntity(new InfoSign(this.game, 31 * PARAMS.BRICKBLOCKWIDTH, 9.6 * PARAMS.BRICKBLOCKWIDTH, "Quickdraw and Whiplash"));

        this.game.addEntity(new InfoSign(this.game, 34 * PARAMS.BRICKBLOCKWIDTH, 9.6 * PARAMS.BRICKBLOCKWIDTH, "Jump on the red pistons to launch!"));

        //floor
        for (let i = 31; i < 52; i++) this.game.addEntity(new PortProofBrick(this.game, i * PARAMS.BRICKBLOCKWIDTH, 10 * PARAMS.BRICKBLOCKWIDTH, false, false, true, true));
        //ceiling
        for (let i = 31; i < 52; i++){
            this.game.addEntity(new PortProofBrick(this.game, i * PARAMS.BRICKBLOCKWIDTH, 0 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        }

        this.game.addEntity(new JumpPad(this.game, 33.3 * PARAMS.BRICKBLOCKWIDTH, 8.9 * PARAMS.BRICKBLOCKWIDTH))
        this.game.addEntity(new Brick(this.game, 33*PARAMS.BRICKBLOCKWIDTH, 4*PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new CompanionCube(this.game, 33*PARAMS.BRICKBLOCKWIDTH, 3*PARAMS.BRICKBLOCKWIDTH));
        this.game.addEntity(new PortProofBrick(this.game, 31*PARAMS.BRICKBLOCKWIDTH, 6*PARAMS.BRICKBLOCKWIDTH, false, false, true, true));
        this.game.addEntity(new PortProofBrick(this.game, 32*PARAMS.BRICKBLOCKWIDTH, 6*PARAMS.BRICKBLOCKWIDTH, false, true, false, true));
        this.game.addEntity(new GlassBrick(this.game, 32*PARAMS.BRICKBLOCKWIDTH, 5*PARAMS.BRICKBLOCKWIDTH, true, true, true, false));

        this.game.addEntity(new PortProofBrick(this.game, 34*PARAMS.BRICKBLOCKWIDTH, 6*PARAMS.BRICKBLOCKWIDTH, true, false, false, true));
        this.game.addEntity(new GlassBrick(this.game, 34*PARAMS.BRICKBLOCKWIDTH, 5*PARAMS.BRICKBLOCKWIDTH, true, true, true, false));
        this.game.addEntity(new GlassBrick(this.game, 34*PARAMS.BRICKBLOCKWIDTH, 3*PARAMS.BRICKBLOCKWIDTH, true, true, true, true));

        this.game.addEntity(new PortProofBrick(this.game, 35*PARAMS.BRICKBLOCKWIDTH, 6*PARAMS.BRICKBLOCKWIDTH, false, false, true, true));
        this.game.addEntity(new PortProofBrick(this.game, 36*PARAMS.BRICKBLOCKWIDTH, 6*PARAMS.BRICKBLOCKWIDTH, false, false, true, true));
        this.game.addEntity(new PortProofBrick(this.game, 37*PARAMS.BRICKBLOCKWIDTH, 6*PARAMS.BRICKBLOCKWIDTH, false, false, true, true));
        this.game.addEntity(new PortProofBrick(this.game, 38*PARAMS.BRICKBLOCKWIDTH, 6*PARAMS.BRICKBLOCKWIDTH, false, true, true, true));
        this.game.addEntity(new JumpPad(this.game, 38.3 * PARAMS.BRICKBLOCKWIDTH, 4.9 * PARAMS.BRICKBLOCKWIDTH))
        this.game.addEntity(new Brick(this.game, 38*PARAMS.BRICKBLOCKWIDTH, 1*PARAMS.BRICKBLOCKWIDTH, true, true, true, true));

        this.game.addEntity(new JumpPad(this.game, 40.3 * PARAMS.BRICKBLOCKWIDTH, 8.9 * PARAMS.BRICKBLOCKWIDTH))
        this.game.addEntity(new GlassBrick(this.game, 39*PARAMS.BRICKBLOCKWIDTH, 6*PARAMS.BRICKBLOCKWIDTH, true, true, false, true));
        this.game.addEntity(new GlassBrick(this.game, 39*PARAMS.BRICKBLOCKWIDTH, 5*PARAMS.BRICKBLOCKWIDTH, true, true, false, false));
        this.game.addEntity(new GlassBrick(this.game, 39*PARAMS.BRICKBLOCKWIDTH, 4*PARAMS.BRICKBLOCKWIDTH, true, true, false, false));
        this.game.addEntity(new GlassBrick(this.game, 39*PARAMS.BRICKBLOCKWIDTH, 3*PARAMS.BRICKBLOCKWIDTH, true, true, true, false));
        this.game.addEntity(new GlassBrick(this.game, 39*PARAMS.BRICKBLOCKWIDTH, 2*PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new MirrorBrick(this.game, 40*PARAMS.BRICKBLOCKWIDTH, 2*PARAMS.BRICKBLOCKWIDTH, true, true, true, true));

        this.game.addEntity(new GlassBrick(this.game, 41*PARAMS.BRICKBLOCKWIDTH, 6*PARAMS.BRICKBLOCKWIDTH, true, true, false, true));
        this.game.addEntity(new GlassBrick(this.game, 41*PARAMS.BRICKBLOCKWIDTH, 5*PARAMS.BRICKBLOCKWIDTH, true, true, false, false));
        this.game.addEntity(new GlassBrick(this.game, 41*PARAMS.BRICKBLOCKWIDTH, 4*PARAMS.BRICKBLOCKWIDTH, true, true, false, false));
        this.game.addEntity(new GlassBrick(this.game, 41*PARAMS.BRICKBLOCKWIDTH, 3*PARAMS.BRICKBLOCKWIDTH, true, true, true, true));

        this.game.addEntity(new PortProofBrick(this.game, 45*PARAMS.BRICKBLOCKWIDTH, 6*PARAMS.BRICKBLOCKWIDTH, true, true, true, true));

        this.game.addEntity(new PortProofBrick(this.game, 48*PARAMS.BRICKBLOCKWIDTH, 6*PARAMS.BRICKBLOCKWIDTH, true, false, true, true));
        this.game.addEntity(new PortProofBrick(this.game, 49*PARAMS.BRICKBLOCKWIDTH, 6*PARAMS.BRICKBLOCKWIDTH, false, false, true, true));
        this.game.addEntity(new PortProofBrick(this.game, 50*PARAMS.BRICKBLOCKWIDTH, 6*PARAMS.BRICKBLOCKWIDTH, false, true, true, true));
        this.game.addEntity(new PortProofBrick(this.game, 51*PARAMS.BRICKBLOCKWIDTH, 6*PARAMS.BRICKBLOCKWIDTH, false, true, true, true));
        this.game.addEntity(new Brick(this.game, 52*PARAMS.BRICKBLOCKWIDTH, 5*PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new Brick(this.game, 52*PARAMS.BRICKBLOCKWIDTH, 4*PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new PortProofBrick(this.game, 48*PARAMS.BRICKBLOCKWIDTH, 4*PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new PortProofBrick(this.game, 48*PARAMS.BRICKBLOCKWIDTH, 3*PARAMS.BRICKBLOCKWIDTH, true, false, true, true));
        this.game.addEntity(new PortProofBrick(this.game, 49*PARAMS.BRICKBLOCKWIDTH, 3*PARAMS.BRICKBLOCKWIDTH, false, false, true, true));
        this.game.addEntity(new PortProofBrick(this.game, 50*PARAMS.BRICKBLOCKWIDTH, 3*PARAMS.BRICKBLOCKWIDTH, false, true, true, true));
        this.game.addEntity(new PortProofBrick(this.game, 51*PARAMS.BRICKBLOCKWIDTH, 3*PARAMS.BRICKBLOCKWIDTH, false, true, true, true));

        let room3TurretDoor = new Door(this.game, 48*PARAMS.BRICKBLOCKWIDTH, 5*PARAMS.BRICKBLOCKWIDTH);
        let room3Exit = new Door(this.game, 52*PARAMS.BRICKBLOCKWIDTH, 9*PARAMS.BRICKBLOCKWIDTH);
        this.game.addEntity(new Button(this.game, 50.3*PARAMS.BRICKBLOCKWIDTH, 5.75*PARAMS.BRICKBLOCKWIDTH, room3Exit));
        this.game.addEntity(new Button(this.game, 45.3*PARAMS.BRICKBLOCKWIDTH, 5.75*PARAMS.BRICKBLOCKWIDTH, room3TurretDoor));
        this.game.addEntity(new Turret(this.game, 49*PARAMS.BRICKBLOCKWIDTH, 5*PARAMS.BRICKBLOCKWIDTH, 'l'))
        this.game.addEntity(room3TurretDoor);
        this.game.addEntity(room3Exit);

        this.game.addEntity(new Coin(this.game, 41*PARAMS.BRICKBLOCKWIDTH, 2.7*PARAMS.BRICKBLOCKWIDTH));

        //room 4
        //floor
        for (let i = 52; i < 74; i++) this.game.addEntity(new Brick(this.game, i * PARAMS.BRICKBLOCKWIDTH, 10 * PARAMS.BRICKBLOCKWIDTH, false, false, true, true));
        //ceiling
        for (let i = 52; i < 74; i++){
            this.game.addEntity(new Brick(this.game, i * PARAMS.BRICKBLOCKWIDTH, 0 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        }
        let D41 = new Door(this.game, 65*PARAMS.BRICKBLOCKWIDTH, 6*PARAMS.BRICKBLOCKWIDTH);
        let D42 = new Door(this.game, 62.4*PARAMS.BRICKBLOCKWIDTH, 6*PARAMS.BRICKBLOCKWIDTH);
        let D43 = new Door(this.game, 65*PARAMS.BRICKBLOCKWIDTH, 9*PARAMS.BRICKBLOCKWIDTH);
        let D44 = new Door(this.game, 66*PARAMS.BRICKBLOCKWIDTH, 9*PARAMS.BRICKBLOCKWIDTH);
        let D45 = new Door(this.game, 60.4*PARAMS.BRICKBLOCKWIDTH, 4*PARAMS.BRICKBLOCKWIDTH);
        this.game.addEntity(D41);
        this.game.addEntity(D42);
        this.game.addEntity(D43);
        this.game.addEntity(D44);
        this.game.addEntity(D45);
        this.game.addEntity(new Button(this.game, 58.3*PARAMS.BRICKBLOCKWIDTH, 9.75*PARAMS.BRICKBLOCKWIDTH, D41));
        this.game.addEntity(new Button(this.game, 66.3*PARAMS.BRICKBLOCKWIDTH, 6.75*PARAMS.BRICKBLOCKWIDTH, D42));
        this.game.addEntity(new Button(this.game, 59.3*PARAMS.BRICKBLOCKWIDTH, 7.75*PARAMS.BRICKBLOCKWIDTH, D43));
        this.game.addEntity(new Button(this.game, 59.7*PARAMS.BRICKBLOCKWIDTH, 7.75*PARAMS.BRICKBLOCKWIDTH, D44));
        this.game.addEntity(new Button(this.game, 56.3*PARAMS.BRICKBLOCKWIDTH, 4.75*PARAMS.BRICKBLOCKWIDTH, D45));

        for (let i = 56; i <= 62; i++){
            if(i == 59){ 
                this.game.addEntity(new GlassBrick(this.game, i * PARAMS.BRICKBLOCKWIDTH, 5 * PARAMS.BRICKBLOCKWIDTH, false, false, true, true));
                continue;
            }
            if(i == 62){
                this.game.addEntity(new Brick(this.game, i * PARAMS.BRICKBLOCKWIDTH, 5 * PARAMS.BRICKBLOCKWIDTH, false, true, true, false));
                continue;
            }
             this.game.addEntity(new Brick(this.game, i * PARAMS.BRICKBLOCKWIDTH, 5 * PARAMS.BRICKBLOCKWIDTH, false, false, true, true));
        }
        for (let i = 58; i <= 62; i++){
            this.game.addEntity(new Brick(this.game, i * PARAMS.BRICKBLOCKWIDTH, 8 * PARAMS.BRICKBLOCKWIDTH, false, false, true, true));
        }
        this.game.addEntity(new Brick(this.game, 62 * PARAMS.BRICKBLOCKWIDTH, 7 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new Brick(this.game, 58 * PARAMS.BRICKBLOCKWIDTH, 7 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new Brick(this.game, 58 * PARAMS.BRICKBLOCKWIDTH, 6 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new Brick(this.game, 60 * PARAMS.BRICKBLOCKWIDTH, 3 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new Brick(this.game, 60 * PARAMS.BRICKBLOCKWIDTH, 2 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new Brick(this.game, 60 * PARAMS.BRICKBLOCKWIDTH, 1 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new Brick(this.game, 58 * PARAMS.BRICKBLOCKWIDTH, 1 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));

        this.game.addEntity(new Brick(this.game, 65 * PARAMS.BRICKBLOCKWIDTH, 4 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new Brick(this.game, 65 * PARAMS.BRICKBLOCKWIDTH, 5 * PARAMS.BRICKBLOCKWIDTH, true, true, false, true));
        this.game.addEntity(new Brick(this.game, 65 * PARAMS.BRICKBLOCKWIDTH, 7 * PARAMS.BRICKBLOCKWIDTH, true, true, true, false));
        this.game.addEntity(new Brick(this.game, 65 * PARAMS.BRICKBLOCKWIDTH, 8 * PARAMS.BRICKBLOCKWIDTH, true, true, false, false));

        this.game.addEntity(new Brick(this.game, 66 * PARAMS.BRICKBLOCKWIDTH, 4 * PARAMS.BRICKBLOCKWIDTH, false, false, true, true));
        this.game.addEntity(new Brick(this.game, 66 * PARAMS.BRICKBLOCKWIDTH, 7 * PARAMS.BRICKBLOCKWIDTH, false, false, true, true));
        this.game.addEntity(new Brick(this.game, 66 * PARAMS.BRICKBLOCKWIDTH, 8 * PARAMS.BRICKBLOCKWIDTH, false, true, true, true));

        this.game.addEntity(new Brick(this.game, 67 * PARAMS.BRICKBLOCKWIDTH, 4 * PARAMS.BRICKBLOCKWIDTH, false, false, true, true));
        this.game.addEntity(new Brick(this.game, 67 * PARAMS.BRICKBLOCKWIDTH, 7 * PARAMS.BRICKBLOCKWIDTH, false, false, true, true));
        this.game.addEntity(new Brick(this.game, 68 * PARAMS.BRICKBLOCKWIDTH, 4 * PARAMS.BRICKBLOCKWIDTH, false, false, true, true));
        this.game.addEntity(new Brick(this.game, 68 * PARAMS.BRICKBLOCKWIDTH, 7 * PARAMS.BRICKBLOCKWIDTH, false, false, true, true));
        this.game.addEntity(new Brick(this.game, 69 * PARAMS.BRICKBLOCKWIDTH, 4 * PARAMS.BRICKBLOCKWIDTH, false, false, true, true));
        this.game.addEntity(new Brick(this.game, 69 * PARAMS.BRICKBLOCKWIDTH, 7 * PARAMS.BRICKBLOCKWIDTH, false, false, true, true));
        this.game.addEntity(new Brick(this.game, 70 * PARAMS.BRICKBLOCKWIDTH, 4 * PARAMS.BRICKBLOCKWIDTH, false, false, true, true));
        this.game.addEntity(new Brick(this.game, 70 * PARAMS.BRICKBLOCKWIDTH, 7 * PARAMS.BRICKBLOCKWIDTH, false, false, true, true));

        this.game.addEntity(new CompanionCube(this.game, 69 * PARAMS.BRICKBLOCKWIDTH, 1 * PARAMS.BRICKBLOCKWIDTH));

        this.game.addEntity(new Checkpoint(this.game, 55*PARAMS.BRICKBLOCKWIDTH, 9.2*PARAMS.BRICKBLOCKWIDTH));
        this.game.addEntity(new InfoSign(this.game, 57 * PARAMS.BRICKBLOCKWIDTH, 9.6 * PARAMS.BRICKBLOCKWIDTH, "Two Doors, One Cube"));
        this.game.addEntity(new Coin(this.game, 57*PARAMS.BRICKBLOCKWIDTH, 2*PARAMS.BRICKBLOCKWIDTH));



        //room 5
        //floor
        for (let i = 74; i < 90; i++) this.game.addEntity(new PortProofBrick(this.game, i * PARAMS.BRICKBLOCKWIDTH, 10 * PARAMS.BRICKBLOCKWIDTH, false, false, true, true));
        //ceiling
        for (let i = 74; i < 90; i++){
            this.game.addEntity(new PortProofBrick(this.game, i * PARAMS.BRICKBLOCKWIDTH, 0 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        }
        this.game.addEntity(new Checkpoint(this.game, 73*PARAMS.BRICKBLOCKWIDTH, 9.2*PARAMS.BRICKBLOCKWIDTH));

        for (let i = 5; i < 10; i++){
            this.game.addEntity(new PortProofBrick(this.game, 88 * PARAMS.BRICKBLOCKWIDTH, i * PARAMS.BRICKBLOCKWIDTH, true, true, false, false));
        }
        this.game.addEntity(new PortProofBrick(this.game, 88 * PARAMS.BRICKBLOCKWIDTH, 2 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new PortProofBrick(this.game, 88 * PARAMS.BRICKBLOCKWIDTH, 4 * PARAMS.BRICKBLOCKWIDTH, true, true, true, false));

        for (let i = 2; i < 10; i+=2){
            for(let j = 74; j<78; j++){
                if(j==77) this.game.addEntity(new PortProofBrick(this.game, j * PARAMS.BRICKBLOCKWIDTH, i * PARAMS.BRICKBLOCKWIDTH, false, true, true, true));
                else this.game.addEntity(new PortProofBrick(this.game, j * PARAMS.BRICKBLOCKWIDTH, i * PARAMS.BRICKBLOCKWIDTH, false, false, true, true));
            }
            for(let j = 80; j<88; j++){
                if(j==80) this.game.addEntity(new PortProofBrick(this.game, j * PARAMS.BRICKBLOCKWIDTH, i * PARAMS.BRICKBLOCKWIDTH, true, false, true, true));
                else this.game.addEntity(new PortProofBrick(this.game, j * PARAMS.BRICKBLOCKWIDTH, i * PARAMS.BRICKBLOCKWIDTH, false, false, true, true));
            }
            if(i==2) this.game.addEntity(new PortProofBrick(this.game, 89 * PARAMS.BRICKBLOCKWIDTH, i * PARAMS.BRICKBLOCKWIDTH, false, false, true, true));
        }

        this.game.addEntity(new JumpPad(this.game, 79*PARAMS.BRICKBLOCKWIDTH, 8.9*PARAMS.BRICKBLOCKWIDTH))

        this.game.addEntity(new InfoSign(this.game, 76 * PARAMS.BRICKBLOCKWIDTH, 9.6 * PARAMS.BRICKBLOCKWIDTH, "Buttons (all the way) Down"));
        this.game.addEntity(new Exit(this.game, 89.2 * PARAMS.BRICKBLOCKWIDTH, 9.45 * PARAMS.BRICKBLOCKWIDTH));

        let dt1 = new Door(this.game, 77.4 * PARAMS.BRICKBLOCKWIDTH, 7 * PARAMS.BRICKBLOCKWIDTH);
        let dt2 = new Door(this.game, 77.4 * PARAMS.BRICKBLOCKWIDTH, 5 * PARAMS.BRICKBLOCKWIDTH);
        let dt3 = new Door(this.game, 77.4 * PARAMS.BRICKBLOCKWIDTH, 3 * PARAMS.BRICKBLOCKWIDTH);
        let dt4 = new Door(this.game, 77.4 * PARAMS.BRICKBLOCKWIDTH, 1 * PARAMS.BRICKBLOCKWIDTH);

        let d11 = new Door(this.game, 82 * PARAMS.BRICKBLOCKWIDTH, 7 * PARAMS.BRICKBLOCKWIDTH);
        let d12 = new Door(this.game, 85 * PARAMS.BRICKBLOCKWIDTH, 7 * PARAMS.BRICKBLOCKWIDTH);
        let d21 = new Door(this.game, 82 * PARAMS.BRICKBLOCKWIDTH, 5 * PARAMS.BRICKBLOCKWIDTH);
        let d22 = new Door(this.game, 85 * PARAMS.BRICKBLOCKWIDTH, 5 * PARAMS.BRICKBLOCKWIDTH);
        let d31 = new Door(this.game, 82 * PARAMS.BRICKBLOCKWIDTH, 3 * PARAMS.BRICKBLOCKWIDTH);
        let d32 = new Door(this.game, 85 * PARAMS.BRICKBLOCKWIDTH, 3 * PARAMS.BRICKBLOCKWIDTH);
        let d41 = new Door(this.game, 82 * PARAMS.BRICKBLOCKWIDTH, 1 * PARAMS.BRICKBLOCKWIDTH);
        let d42 = new Door(this.game, 85 * PARAMS.BRICKBLOCKWIDTH, 1 * PARAMS.BRICKBLOCKWIDTH);
        let dummyDoor = new Door(this.game, 90 * PARAMS.BRICKBLOCKWIDTH, 0 * PARAMS.BRICKBLOCKWIDTH);

        this.game.addEntity(dt1);
        this.game.addEntity(dt2);
        this.game.addEntity(dt3);
        this.game.addEntity(dt4);

        this.game.addEntity(d11);
        this.game.addEntity(d12);
        this.game.addEntity(d21);
        this.game.addEntity(d22);
        this.game.addEntity(d31);
        this.game.addEntity(d32);
        this.game.addEntity(d41);
        this.game.addEntity(d42);

        //top row
        this.game.addEntity(new Button(this.game, 80 * PARAMS.BRICKBLOCKWIDTH, 1.75 * PARAMS.BRICKBLOCKWIDTH, dt4));
        this.game.addEntity(new Button(this.game, 80 * PARAMS.BRICKBLOCKWIDTH, 1.75 * PARAMS.BRICKBLOCKWIDTH, dt3));
        this.game.addEntity(new Button(this.game, 80 * PARAMS.BRICKBLOCKWIDTH, 1.75 * PARAMS.BRICKBLOCKWIDTH, dt2));
        this.game.addEntity(new Button(this.game, 80 * PARAMS.BRICKBLOCKWIDTH, 1.75 * PARAMS.BRICKBLOCKWIDTH, dt1));
        this.game.addEntity(new Button(this.game, 80 * PARAMS.BRICKBLOCKWIDTH, 1.75 * PARAMS.BRICKBLOCKWIDTH, d22));
        this.game.addEntity(new Button(this.game, 83 * PARAMS.BRICKBLOCKWIDTH, 1.75 * PARAMS.BRICKBLOCKWIDTH, dummyDoor));
        this.game.addEntity(new Button(this.game, 86 * PARAMS.BRICKBLOCKWIDTH, 1.75 * PARAMS.BRICKBLOCKWIDTH, dummyDoor));


        //second row
        this.game.addEntity(new Button(this.game, 80 * PARAMS.BRICKBLOCKWIDTH, 3.75 * PARAMS.BRICKBLOCKWIDTH, d41));
        this.game.addEntity(new Button(this.game, 80 * PARAMS.BRICKBLOCKWIDTH, 3.75 * PARAMS.BRICKBLOCKWIDTH, d21));
        this.game.addEntity(new Button(this.game, 83 * PARAMS.BRICKBLOCKWIDTH, 3.75 * PARAMS.BRICKBLOCKWIDTH, dummyDoor));
        this.game.addEntity(new Button(this.game, 86 * PARAMS.BRICKBLOCKWIDTH, 3.75 * PARAMS.BRICKBLOCKWIDTH, dummyDoor));

        //third row
        this.game.addEntity(new Button(this.game, 86 * PARAMS.BRICKBLOCKWIDTH, 5.75 * PARAMS.BRICKBLOCKWIDTH, d42));
        this.game.addEntity(new Button(this.game, 83 * PARAMS.BRICKBLOCKWIDTH, 5.75 * PARAMS.BRICKBLOCKWIDTH, d11));
        this.game.addEntity(new Button(this.game, 80 * PARAMS.BRICKBLOCKWIDTH, 5.75 * PARAMS.BRICKBLOCKWIDTH, dummyDoor));

        //bottom row
        this.game.addEntity(new Button(this.game, 83 * PARAMS.BRICKBLOCKWIDTH, 7.75 * PARAMS.BRICKBLOCKWIDTH, d12));
        this.game.addEntity(new Button(this.game, 86 * PARAMS.BRICKBLOCKWIDTH, 7.75 * PARAMS.BRICKBLOCKWIDTH, d31));
        this.game.addEntity(new Button(this.game, 86 * PARAMS.BRICKBLOCKWIDTH, 7.75 * PARAMS.BRICKBLOCKWIDTH, d32));
        this.game.addEntity(new Button(this.game, 80 * PARAMS.BRICKBLOCKWIDTH, 7.75 * PARAMS.BRICKBLOCKWIDTH, dummyDoor));

        for(let i = 83; i<86; i++){
            this.game.addEntity(new CompanionCube(this.game, i * PARAMS.BRICKBLOCKWIDTH, 9.5 * PARAMS.BRICKBLOCKWIDTH))
        }

        this.game.addEntity(new Turret(this.game, 76 * PARAMS.BRICKBLOCKWIDTH, 1 * PARAMS.BRICKBLOCKWIDTH))
        this.game.addEntity(new Turret(this.game, 76 * PARAMS.BRICKBLOCKWIDTH, 3 * PARAMS.BRICKBLOCKWIDTH))
        this.game.addEntity(new Turret(this.game, 76 * PARAMS.BRICKBLOCKWIDTH, 5 * PARAMS.BRICKBLOCKWIDTH))
        this.game.addEntity(new Turret(this.game, 76 * PARAMS.BRICKBLOCKWIDTH, 7 * PARAMS.BRICKBLOCKWIDTH))

        this.game.addEntity(new Coin(this.game, 89.5 * PARAMS.BRICKBLOCKWIDTH, 1.5 * PARAMS.BRICKBLOCKWIDTH));


        this.game.addEntity(new Hud(this.game));
        this.game.addEntity(this.porta);
        this.coinRetentionPolicy = Coin.coinCount;
    }

    rollCredits(){
        this.clearEntities();
        this.bgMusic("./audio/Still Alive.mp3");
        this.lvlMusic.play();
    }

    updateAudio() {
        var mute = document.getElementById("mute").checked;
        var volume = document.getElementById("volume").value;

        AUDIO_MANAGER.muteAudio(mute);
        AUDIO_MANAGER.adjustVolume(volume);
        this.lvlMusic.volume = volume;
        this.lvlMusic.muted = mute;
    };

    update() {
        if(this.transition == true){
            this.transition = !this.transition;
            this.game.level++;
            switch(this.game.level){
                case 1: this.loadLevelOne(); break;
                case 2: this.loadLevelTwo(); break;
                case 3: this.loadLevelThree(); break;
                case 4: this.rollCredits(); break;
                default: this.loadLevelOne();
            }
        }

        this.updateAudio();
        PARAMS.DEBUG = document.getElementById("debug").checked;

        let midpoint = PARAMS.CANVAS_WIDTH / 2 - PARAMS.BLOCKWIDTH / 2;

        this.x = this.porta.x - midpoint;

        /**
         * If Porta dies, she teleports up and out of the level
         * Once off screen (reaching -9*PARAMS.BLOCKWIDTH on the Y axis) we reload the level
         */
        if (this.porta.dead && this.porta.y < -9 * PARAMS.BRICKBLOCKWIDTH) {
            this.porta = new Porta(this.game, this.portaSpawn.x, this.portaSpawn.y);
            this.game.purplePortal = false;
            this.game.greenPortal = false;
            Coin.coinCount = this.coinRetentionPolicy;
            switch(this.game.level){
                case 1: this.loadLevelOne(); break;
                case 2: this.loadLevelTwo(); break;
                case 3: this.loadLevelThree(); break;
                case 4: this.rollCredits(); break;
                default: this.loadLevelOne();
            }
        }
    };

    draw(ctx) {
        //HUD stuff goes here
        if (this.timerOn) {
            let start = this.game.timer.gameTime-this.startTime;
            let hours = 0;
            let mins = 0;
            let seconds = Math.round(start)
            while (seconds >= 60){
                mins++;
                seconds -= 60;
            }
            ctx.fillStyle = "White";
            if (mins < 10) {
                if (seconds < 10) ctx.fillText("0" + mins + ":" + "0" + seconds, 0 * PARAMS.BRICKBLOCKWIDTH + 4, 10.6 * PARAMS.BRICKBLOCKWIDTH);
                else ctx.fillText("0" + mins + ":" + seconds, 0 * PARAMS.BRICKBLOCKWIDTH + 4, 10.6 * PARAMS.BRICKBLOCKWIDTH);
            } else {
                if (seconds < 10) ctx.fillText(mins + ":" + "0" + seconds, 0 * PARAMS.BRICKBLOCKWIDTH + 4, 10.6 * PARAMS.BRICKBLOCKWIDTH);
                else ctx.fillText(mins + ":" + seconds, 0 * PARAMS.BRICKBLOCKWIDTH + 4, 10.6 * PARAMS.BRICKBLOCKWIDTH);
            }
        }

        if (PARAMS.DEBUG) {
            let xV = "xV=" + Math.floor(this.game.porta.velocity.x);
            let yV = "yV=" + Math.floor(this.game.porta.velocity.y);
            ctx.fillStyle = "White";
            ctx.fillText(xV, 3 * PARAMS.BLOCKWIDTH, 2.5 * PARAMS.BLOCKWIDTH);
            ctx.fillText(yV, 3 * PARAMS.BLOCKWIDTH, 3 * PARAMS.BLOCKWIDTH);

            ctx.translate(0, -10); // hack to move elements up by 10 pixels instead of adding -10 to all y coordinates below
            ctx.strokeStyle = "White";
            ctx.lineWidth = 2;
            ctx.strokeStyle = this.game.left ? "White" : "Grey";
            ctx.fillStyle = ctx.strokeStyle;
            ctx.strokeRect(6 * PARAMS.BRICKBLOCKWIDTH - 2, 2.5 * PARAMS.BRICKBLOCKWIDTH - 2, 0.5 * PARAMS.BRICKBLOCKWIDTH + 2, 0.5 * PARAMS.BRICKBLOCKWIDTH + 2);
            ctx.fillText("L", 6 * PARAMS.BRICKBLOCKWIDTH, 3 * PARAMS.BRICKBLOCKWIDTH);
            ctx.strokeStyle = this.game.right ? "White" : "Grey";
            ctx.fillStyle = ctx.strokeStyle;
            ctx.strokeRect(7 * PARAMS.BRICKBLOCKWIDTH + 2, 2.5 * PARAMS.BRICKBLOCKWIDTH - 2, 0.5 * PARAMS.BRICKBLOCKWIDTH + 2, 0.5 * PARAMS.BRICKBLOCKWIDTH + 2);
            ctx.fillText("R", 7 * PARAMS.BRICKBLOCKWIDTH + 4, 3 * PARAMS.BRICKBLOCKWIDTH);

            ctx.translate(0, 10);
            ctx.strokeStyle = "White";
            ctx.fillStyle = ctx.strokeStyle;

        }
    };
}

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