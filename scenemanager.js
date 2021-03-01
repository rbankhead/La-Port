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

        this.game.addEntity(new TitleScreen(this.game));
        this.lvlMusic = new Audio();
        this.bgMusic("./audio/lvlOne.wav");
        //this.loadLevelOne();
    };

    titleScreen() {

    }

    bgMusic(path) {
        this.lvlMusic.pause();
        this.lvlMusic = new Audio(path);
        let that = this;
        this.lvlMusic.addEventListener("ended", function () {
            that.lvlMusic.currentTime = 0;
            that.lvlMusic.play();
        });
    }

    loadLevelOne() {
        this.update(); // initialize screen positions
        //AUDIO_MANAGER.autoRepeat("./audio/lvlOne.wav");
        this.lvlMusic.play();

        this.game.entities = [];

        //parallax background
        this.game.addEntity(new Background(this.game, -50));

        //ground bricks to the left of room 1 to hide the blank part of the background image
        for (let i = -10; i < 0; i++) this.game.addEntity(new Brick(this.game, i * PARAMS.BRICKBLOCKWIDTH, 10 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));

        //room walls
        for (let i = 0; i <= 10; i++) {
            this.game.addEntity(new Brick(this.game, -1 * PARAMS.BRICKBLOCKWIDTH, i * PARAMS.BRICKBLOCKWIDTH, false, true, i === 10)); //leftmost walls
            if (i !== 1) this.game.addEntity(new Brick(this.game, 14 * PARAMS.BRICKBLOCKWIDTH, i * PARAMS.BRICKBLOCKWIDTH, true, true, i === 2)); //end of room 1 walls
            if (i !== 9) this.game.addEntity(new Brick(this.game, 17 * PARAMS.BRICKBLOCKWIDTH, i * PARAMS.BRICKBLOCKWIDTH, true, true, i === 10, i === 8)); //start of room 2 walls
            if (i !== 9) this.game.addEntity(new Brick(this.game, 33 * PARAMS.BRICKBLOCKWIDTH, i * PARAMS.BRICKBLOCKWIDTH, true, true, i === 10, i === 8)); //end of room 2 walls
            if (i !== 9) this.game.addEntity(new Brick(this.game, 36 * PARAMS.BRICKBLOCKWIDTH, i * PARAMS.BRICKBLOCKWIDTH, true, true, i === 10, i === 8)); //start of room 3 walls
            if (i !== 9) this.game.addEntity(new Brick(this.game, 52 * PARAMS.BRICKBLOCKWIDTH, i * PARAMS.BRICKBLOCKWIDTH, true, true, i === 10, i === 8)); //end of room 3 walls
            if (i !== 9) this.game.addEntity(new Brick(this.game, 55 * PARAMS.BRICKBLOCKWIDTH, i * PARAMS.BRICKBLOCKWIDTH, true, true, i === 10, i === 8)); //start of room 4 walls
            if (i !== 9) this.game.addEntity(new Brick(this.game, 71 * PARAMS.BRICKBLOCKWIDTH, i * PARAMS.BRICKBLOCKWIDTH, true, true, i === 10, i === 8)); //end of room 4 walls
            if (i > 1) this.game.addEntity(new Brick(this.game, 74 * PARAMS.BRICKBLOCKWIDTH, i * PARAMS.BRICKBLOCKWIDTH, true, true, i === 2, false)); //start of room 5 walls
            //this.game.addEntity(new Brick(this.game,253*PARAMS.BLOCKWIDTH, i * PARAMS.BLOCKWIDTH,true,true,false,false)); //end of level walls
        }
        //end room walls
        //floor and ceiling bricks
        // bad tile for top
        // 5 6 7 8 14 19 20 21 22 23 24 28 29 30 31 69
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
        this.game.addEntity(new Brick(this.game, 0 * PARAMS.BRICKBLOCKWIDTH, 8 * PARAMS.BRICKBLOCKWIDTH, true, true, false, true));
        this.game.addEntity(new Brick(this.game, 1 * PARAMS.BRICKBLOCKWIDTH, 3.5 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new Brick(this.game, 0 * PARAMS.BRICKBLOCKWIDTH, 3.5 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new Brick(this.game, 1 * PARAMS.BRICKBLOCKWIDTH, 8 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new Brick(this.game, 2 * PARAMS.BRICKBLOCKWIDTH, 6 * PARAMS.BRICKBLOCKWIDTH, true, false, true, true));
        this.game.addEntity(new Brick(this.game, 2 * PARAMS.BRICKBLOCKWIDTH, 8 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new Brick(this.game, 3 * PARAMS.BRICKBLOCKWIDTH, 5 * PARAMS.BRICKBLOCKWIDTH, true, true, true, false));
        this.game.addEntity(new Brick(this.game, 3 * PARAMS.BRICKBLOCKWIDTH, 6 * PARAMS.BRICKBLOCKWIDTH, true, true, false, true));
        this.game.addEntity(new Brick(this.game, 3 * PARAMS.BRICKBLOCKWIDTH, 8 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
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
        this.game.addEntity(new Brick(this.game, (63) * PARAMS.BRICKBLOCKWIDTH, 6 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));


        for (let i = 8; i < 11; i++) this.game.addEntity(new GlassBrick(this.game, (56 + i) * PARAMS.BRICKBLOCKWIDTH, 5 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        for (let i = 1; i < 7; i++) this.game.addEntity(new GlassBrick(this.game, (56 + i) * PARAMS.BRICKBLOCKWIDTH, 3 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        for (let i = 8; i < 12; i++) this.game.addEntity(new GlassBrick(this.game, (56 + i) * PARAMS.BRICKBLOCKWIDTH, 3 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));

        for (let i = 1; i < 7; i++) this.game.addEntity(new PortProofBrick(this.game, (56 + i) * PARAMS.BRICKBLOCKWIDTH, 2 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        for (let i = 8; i < 12; i++) this.game.addEntity(new PortProofBrick(this.game, (56 + i) * PARAMS.BRICKBLOCKWIDTH, 2 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));
        this.game.addEntity(new Brick(this.game, (68) * PARAMS.BRICKBLOCKWIDTH, 6 * PARAMS.BRICKBLOCKWIDTH, true, true, true, true));

        for (let i = 2; i < 10; i++) this.game.addEntity(new Brick(this.game, 69 * PARAMS.BRICKBLOCKWIDTH, i * PARAMS.BRICKBLOCKWIDTH, true, true, i === 2, false));

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
        this.game.addEntity(new InfoSign(this.game, 83.33 * PARAMS.BRICKBLOCKWIDTH, 9.566 * PARAMS.BRICKBLOCKWIDTH, "Fin."));



        this.game.addEntity(new Hud(this.game));
        this.game.addEntity(this.porta);

    };

    updateAudio() {
        var mute = document.getElementById("mute").checked;
        var volume = document.getElementById("volume").value;

        AUDIO_MANAGER.muteAudio(mute);
        AUDIO_MANAGER.adjustVolume(volume);
        this.lvlMusic.volume = volume;
        this.lvlMusic.mute = mute;
    };

    update() {

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
            this.loadLevelOne();
        };
    };

    draw(ctx) {
        //HUD stuff goes here

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