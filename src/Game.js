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
        gameNs.game.squares = [];
        for(var i = 1; i < 5; i ++)
        {
            gameNs.game.squares.push(new BoxCollider(new Vector2(i*200, 400), 200, 100, ['ground']));
        }
        
        gameNs.game.squares.push(new BoxCollider(new Vector2(200, 100), 200, 100, ['ground']));
        gameNs.game.squares.push(new BoxCollider(new Vector2(0, 300), 200, 100, ['ground']));
        gameNs.game.squares.push(new BoxCollider(new Vector2(1000, 300), 200, 100, ['ground']));
        
        gameNs.game.player.init();

        this.input.addKeyHandler(gameNs.game.player.playerKeys);
        gameNs.game.collisionManager.addCircleCollider(gameNs.game.player.circle);

        for(var i = 0; i < gameNs.game.squares.length; i ++)
        {
            gameNs.game.collisionManager.addBoxCollider(gameNs.game.squares[i]);
        }
        
    }

    update() {
        //  Update game objects here.
        
        gameNs.game.player.update();
        gameNs.game.collisionResults = gameNs.game.collisionManager.checkCircleAndBoxColliderArray();
        console.log(gameNs.game.collisionResults['Array2']);
        for(var i = 0; i < gameNs.game.collisionResults['Array1'].length; i++){
            if(gameNs.game.collisionResults['Array1'][i][CollisionManager.IndexOfElement(gameNs.game.collisionManager.circleColliderArray, gameNs.game.player.circle)] == true){
                gameNs.game.player.handleCollision(gameNs.game.collisionManager.boxColliderArray[i]);
            }
        }
        /* 
        CollisionManager.ArrayContainsElement(gameNs.game.collisionManager.circleColliderArray, gameNs.game.player.circle)
        if(CollisionManager.CollidedWithTag(0, gameNs.game.collisionResults['Array2'],gameNs.game.collisionManager.boxColliderArray, 'ground')){
            gameNs.game.player.collision = true;
        } else {
            gameNs.game.player.collision = false;
        } */


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
