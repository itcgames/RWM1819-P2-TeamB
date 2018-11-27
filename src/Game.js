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

        //  Initialise game objects here
        gameNs.game.input = new Input();
        gameNs.game.input.addKeyHandler(gameNs.game.playerKeys);

        gameNs.game.collisionManager = new CollisionManager();
        gameNs.game.player = new CircleCollider(new Vector2(100,100), 50);
        gameNs.game.collisionManager.addCircleCollider(gameNs.game.player);

    }

    playerKeys(keys) {
      keys.forEach(function(element) {
        if(element == "a") {
          gameNs.game.player.shape.position.x -= 6;
        }
        if(element == "d") {
          gameNs.game.player.shape.position.x += 6;
        }
      });
    }

    update() {
        //  Update game objects here.

        //  Draw new frame.
        gameNs.game.render();
        // Recursive call to Update method.
        window.requestAnimationFrame(gameNs.game.update);
    }


    render() {
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);

        //  Render game objects here.
        this.collisionManager.render(this.ctx);

    }
}
