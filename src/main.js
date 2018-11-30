var gameNs = {}

function main() {
  const game = new Game();
  var assetManager = new AssetManager();

  gameNs.game = game;

  gameNs.game.assetManager = assetManager;

  //Sprite sheet for the marbles
  gameNs.game.assetManager.queueDownload("assets/sprites/marble.png");
  gameNs.game.assetManager.queueDownload("assets/levels/grassSheet.png");
  gameNs.game.assetManager.queueDownload("assets/sprites/endGoal.png");
  gameNs.game.assetManager.queueDownload("assets/sprites/saw.png");

  gameNs.game.assetManager.downloadAll(function () {
    gameNs.game.init();
    gameNs.game.update();
  });
}