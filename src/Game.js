class Game
{
    constructor() {

    }

    init() {
        //  Initialise the canvas
        gameNs.game.canvas = document.createElement("canvas");
        gameNs.game.canvas.id = 'mycanvas';
        gameNs.game.canvas.width = window.innerWidth;
        gameNs.game.canvas.height = window.innerHeight;
        gameNs.game.ctx = gameNs.game.canvas.getContext("2d");
        document.body.appendChild(gameNs.game.canvas);
        
        this.input = new Input();
        
        gameNs.game.tileMap = new TileMap(1, "../assets/levels/grassSheet.png");

        var div =  document.createElement('div');
        div.style.position = "relative";
        //div.style.display = "inline-block";

        div.style.width = gameNs.game.canvas.width + "px";
        div.style.height = gameNs.game.canvas.height + "px";
        div.appendChild(gameNs.game.canvas);
        document.body.appendChild(div);

        this.input = new Input();
        this.playScreen = new Play();
        this.playScreen.init();


        this.input.addKeyHandler(gameNs.game.playScreen.player.playerKeys);
        this.input.addKeyHandler(gameNs.game.menuKeys);

        this.menuHandler = new MenuHandler();

        this.tileMap.init();

        var s = new Scene("Menu", div, {'x': 0, 'y': 0, 'width': window.innerWidth, 'height': window.innerHeight});
        var s2 = new Scene("Play", div, {'x': 0, 'y': 0, 'width': window.innerWidth, 'height': window.innerHeight});
        s.colour = "#7cff81";
        s2.colour = "#7cff81";
        s2.alpha = "00";

        this.menuHandler.addScene("Menu", s);
        this.menuHandler.addScene("Play", s2);
        this.menuHandler.showOnlyCurrentScene();

        var title = document.createElement("h1");
        var myText = document.createTextNode("Press Enter to start the game");
        title.appendChild(myText);
        title.style.cssText = 'font-size : 124px; padding-top: 200px; padding-left: 100px;';
        this.menuHandler.getCurrentSceneObject().containerDiv.appendChild(title);
    }

    menuKeys(keys) {
      keys.forEach(function(element) {
        if(element == "Enter") {
          gameNs.game.menuHandler.goToScene("Play");
        }
      });
    }

    update() {

        //  Draw new frame.
        gameNs.game.render();
        if(gameNs.game.menuHandler._currentScene == "Play") {
          gameNs.game.playScreen.update();
        }
        // Recursive call to Update method.
        window.requestAnimationFrame(gameNs.game.update);
    }


    render() {
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);

        //  Render game objects here.

        if(this.menuHandler._currentScene == "Play") {
          gameNs.game.playScreen.render(gameNs.game.ctx);
        }
        else {
          this.menuHandler.render(gameNs.game.ctx);

        }

    }
}
