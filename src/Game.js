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


        gameNs.game.collisionManager = new CollisionManager();
        gameNs.game.player = new Player();
        gameNs.game.player.init();
        this.input.addKeyHandler(gameNs.game.player.playerKeys);
        gameNs.game.collisionManager.addCircleCollider(gameNs.game.player.circle);

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
