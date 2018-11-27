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

        gameNs.game.collisionManager = new CollisionManager();
        gameNs.game.player = new Player();
        gameNs.game.square = new BoxCollider(new Vector2(0, 400), 200, 100);
        gameNs.game.player.init();

        this.tileMap.init();

        this.input.addKeyHandler(gameNs.game.player.playerKeys);
        gameNs.game.collisionManager.addCircleCollider(gameNs.game.player.circle);
        gameNs.game.collisionManager.addBoxCollider(gameNs.game.square);
    }

    update() {
        //  Update game objects here.
        if(CollisionManager.CircleRectangleCollision(gameNs.game.square, gameNs.game.player.circle)){
            gameNs.game.player.stopGravity = true;
        } else {
            gameNs.game.player.stopGravity = false;
        }

        //  Draw new frame.
        gameNs.game.render();
        gameNs.game.player.update();
        // Recursive call to Update method.
        window.requestAnimationFrame(gameNs.game.update);
    }


    render() {
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);

        //  Render game objects here.
        this.collisionManager.render(this.ctx);

    }
}
