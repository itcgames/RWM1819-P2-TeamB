var gameNs = {}

function main()
{
    const game = new Game();
    var assetManager = new AssetManager();

    //Sprite sheet for the marbles
    assetManager.queueDownload("assets/sprites/marbles2.png");
    
    gameNs.game = game;

    var tileMap = new TileMap("../assets/levels/level1.tmx");

	assetManager.downloadAll(function() 
	{
        console.log("Assets downloaded successfully");
        gameNs.game.init();
        gameNs.game.update();
	});

}