class MainMenu
{
  constructor() {

  }

  init() {
    this.title = document.createElement("h1");
    var myText = document.createTextNode("Marble Rush");
    this.title.appendChild(myText);
    this.title.style.cssText = 'font-size : 124px; padding-top: 100px; padding-left: 550px;';

    this.instruction = document.createElement("h1");
    myText = document.createTextNode("Press Enter to start the game");
    this.instruction.appendChild(myText);
    this.instruction.style.cssText = 'font-size : 64px; position: absolute; top: 50%; left: 27%;';
  }

  menuKeys(keys) {
    keys.forEach(function(element) {
      if(element == "Enter") {
        gameNs.game.menuHandler.goToScene("Play");
        gameNs.game.ctx.translate(0, -1000);
      }
    });
  }
}
