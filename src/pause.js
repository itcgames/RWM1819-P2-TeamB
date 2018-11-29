class Pause
{
  constructor() {

  }

  init() {
    this.title = document.createElement("h1");
    var myText = document.createTextNode("Press Enter to continue");
    this.title.appendChild(myText);
    this.title.style.cssText = 'font-size : 124px; padding-top: 300px; padding-left: 300px;';

    gameNs.game.menuHandler.goToScene("Pause");
    gameNs.game.menuHandler.getCurrentSceneObject().containerDiv.appendChild(this.title);
    gameNs.game.menuHandler.goToScene("Menu");
  }

  pauseKeys(keys) {
    keys.forEach(function(element) {
      if(element == "Enter") {
        gameNs.game.menuHandler.goToScene("Play");
      }
    });
  }
}
