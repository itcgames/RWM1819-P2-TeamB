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

        div.appendChild(gameNs.game.canvas);
        document.body.appendChild(div);

        this.input = new Input();

        this.menuHandler = new MenuHandler();

        this.tileMap.init();

        var s = new Scene("Menu", div, {'x': 0, 'y': 0, 'width': 100, 'height': 100 });
        var s1 = new Scene("Play", div, {'x': 0, 'y': 0, 'width': 100, 'height': 100});
        var s2 = new Scene("Pause", div, {'x': 0, 'y': 0, 'width': 100, 'height': 100});
        s.colour = "#7cff81";
        s1.colour = "#7cff81";
        s1.alpha = "00";
        s2.colour = "#808080";
        s2.alpha = "96";

        this.menuHandler.addScene("Menu", s);
        this.menuHandler.addScene("Play", s1);
        this.menuHandler.addScene("Pause", s2);

        this.playScreen = new Play();
        this.playScreen.init();

        this.menu = new MainMenu();
        this.menu.init();

        this.pause = new Pause();
        this.pause.init();

        this.input.addKeyHandler(gameNs.game.playScreen.player.playerKeys);
        this.input.addKeyHandler(gameNs.game.menu.menuKeys);
        this.input.addKeyHandler(gameNs.game.pause.menuKeys);


        this.menuHandler.showOnlyCurrentScene();

        this.menuHandler.getCurrentSceneObject().containerDiv.appendChild(this.menu.title);
        this.menuHandler.getCurrentSceneObject().containerDiv.appendChild(this.menu.instruction);
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
        else if(this.menuHandler._currentScene == "Menu") {
          this.menuHandler.render(gameNs.game.ctx);
          gameNs.game.menu.render(gameNs.game.ctx);
        }
        else {
          gameNs.game.playScreen.render(gameNs.game.ctx);
          this.menuHandler.render(gameNs.game.ctx);
          gameNs.game.pause.render(gameNs.game.ctx);
        }

    }
}
