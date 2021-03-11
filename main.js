var gameEngine = new GameEngine();

var ASSET_MANAGER = new AssetManager();
var AUDIO_MANAGER = new AudioManager();

AUDIO_MANAGER.queueDownload("./audio/jump.wav");
AUDIO_MANAGER.queueDownload("./audio/laser.wav");
AUDIO_MANAGER.queueDownload("./audio/die.wav");
AUDIO_MANAGER.queueDownload("./audio/suicide.wav");
AUDIO_MANAGER.queueDownload("./audio/coin.wav");
AUDIO_MANAGER.queueDownload("./audio/bonk.wav");
AUDIO_MANAGER.queueDownload("./audio/button.wav");
AUDIO_MANAGER.queueDownload("./audio/door.wav");
AUDIO_MANAGER.queueDownload("./audio/reflect.wav");
AUDIO_MANAGER.queueDownload("./audio/checkpoint.wav");
AUDIO_MANAGER.queueDownload("./audio/lvlOne.wav");
AUDIO_MANAGER.queueDownload("./audio/lvlTwo.wav");
AUDIO_MANAGER.queueDownload("./audio/lvlThree.wav");
AUDIO_MANAGER.queueDownload("./audio/Still Alive.mp3");


ASSET_MANAGER.queueDownload("./sprites/greenportal.png");
ASSET_MANAGER.queueDownload("./sprites/purpleportal.png");
ASSET_MANAGER.queueDownload("./sprites/purpleportalrotate.png");
ASSET_MANAGER.queueDownload("./sprites/greenportalrotate.png");
ASSET_MANAGER.queueDownload("./sprites/porta.png");
ASSET_MANAGER.queueDownload("./sprites/portareflected.png");
ASSET_MANAGER.queueDownload("./sprites/projectiles.png");
ASSET_MANAGER.queueDownload("./sprites/brick.png");
ASSET_MANAGER.queueDownload("./sprites/checkpoint.png");
ASSET_MANAGER.queueDownload("./sprites/info.png");
ASSET_MANAGER.queueDownload("./sprites/coin.png");
ASSET_MANAGER.queueDownload("./sprites/compCube.png");
ASSET_MANAGER.queueDownload("./sprites/turret.png");
ASSET_MANAGER.queueDownload("./sprites/button.png");
ASSET_MANAGER.queueDownload("./sprites/door.png");
ASSET_MANAGER.queueDownload("./sprites/laser.png");
ASSET_MANAGER.queueDownload("./sprites/mirror.png");
ASSET_MANAGER.queueDownload("./sprites/glass.png");
ASSET_MANAGER.queueDownload("./sprites/crackedBrick.png");
ASSET_MANAGER.queueDownload("./sprites/TitleScreenWhite.png");
ASSET_MANAGER.queueDownload("./sprites/TitleScreenBlue.png");
ASSET_MANAGER.queueDownload("./sprites/jumpPad.png");
ASSET_MANAGER.queueDownload("./sprites/exit.png");

ASSET_MANAGER.queueDownload("./backgrounds/lvl1/background.png");
ASSET_MANAGER.queueDownload("./backgrounds/lvl1/forground.png");
ASSET_MANAGER.queueDownload("./backgrounds/lvl1/forground_far.png");
ASSET_MANAGER.queueDownload("./backgrounds/lvl1/midground_far.png");
ASSET_MANAGER.queueDownload("./backgrounds/lvl1/midground.png");

ASSET_MANAGER.queueDownload("./backgrounds/lvl2/background.png");
ASSET_MANAGER.queueDownload("./backgrounds/lvl2/forground.png");
ASSET_MANAGER.queueDownload("./backgrounds/lvl2/forground_far.png");
ASSET_MANAGER.queueDownload("./backgrounds/lvl2/midground_far.png");
ASSET_MANAGER.queueDownload("./backgrounds/lvl2/midground.png");

ASSET_MANAGER.queueDownload("./backgrounds/lvl3/background.png");
ASSET_MANAGER.queueDownload("./backgrounds/lvl3/forground.png");
ASSET_MANAGER.queueDownload("./backgrounds/lvl3/forground_far.png");
ASSET_MANAGER.queueDownload("./backgrounds/lvl3/midground_far.png");
ASSET_MANAGER.queueDownload("./backgrounds/lvl3/midground.png");


AUDIO_MANAGER.downloadAll();
ASSET_MANAGER.downloadAll(function () {
	let canvas = document.getElementById('gameWorld');
	let ctx = canvas.getContext('2d');
	ctx.font="20px Arial";
	PARAMS.CANVAS_WIDTH = canvas.width;
	PARAMS.BLOCKWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;

	gameEngine.init(ctx);
	ctx.imageSmoothingEnabled = false;

	new SceneManager(gameEngine);

	gameEngine.start();
});
