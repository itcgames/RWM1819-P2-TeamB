var gameNs = {}

function main()
{
    const game = new Game();
    var assetManager = new AssetManager();
    
    gameNs.game = game;

    gameNs.game.assetManager = assetManager;

    //Sprite sheet for the marbles
    gameNs.game.assetManager.queueDownload("assets/sprites/marbles2.png");
    gameNs.game.assetManager.queueDownload("assets/levels/grassSheet.png");
    
	gameNs.game.assetManager.downloadAll(function() 
	{
        console.log("Assets downloaded successfully");
        gameNs.game.init();
        gameNs.game.update();
	});

}