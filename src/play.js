class Play
{
  constructor() {

  }

  init() {

    this.collisionManager = new CollisionManager();

    this.level1 = new TileMap(1, "../assets/levels/grassSheet.png");
    this.level1.init();

    this.player = new Player();
    this.player.init();
    this.collisionManager.addCircleCollider(this.player.circle);

    this.squares = [];
    for(var i = 1; i < 5; i ++)
    {
        this.squares.push(new BoxCollider(new Vector2(i*200, 400), 200, 100, ['ground']));
    }
      
    this.squares.push(new BoxCollider(new Vector2(200, 100), 200, 100, ['ground']));
    this.squares.push(new BoxCollider(new Vector2(0, 300), 200, 100, ['ground']));
    this.squares.push(new BoxCollider(new Vector2(1000, 300), 200, 100, ['ground']));

    for(var i = 0; i < this.squares.length; i ++)
    {
      this.collisionManager.addBoxCollider(this.squares[i]);
    }

    this.enemies = [];
    for (var i = 0; i < 1; i++) {
      this.enemies.push(new Enemy(new Vector2(i * 100, 100), new Vector2(i * 100 + 100, 100)));
      this.collisionManager.addCircleCollider(this.enemies[i].collider);
    }
  }

  update() {
    //  Update game objects here.
    this.collisionResults = this.collisionManager.checkCircleAndBoxColliderArray();
    for(var i = 0; i < this.collisionResults['BoxResults'].length; i++){
        if(this.collisionResults['BoxResults'][i][CollisionManager.IndexOfElement(this.collisionManager.circleColliderArray, this.player.circle)] == true){
            this.player.handleCollision(this.collisionManager.boxColliderArray[i]);
        }
    }

    var circleCollisionResults = this.collisionManager.checkCircleColliderArray();
    for (var j = 0; j < circleCollisionResults.length; j++) {
        if (circleCollisionResults[CollisionManager.IndexOfElement(this.collisionManager.circleColliderArray, this.player.circle)][j] == true) {
            this.player.handleCollision(this.collisionManager.circleColliderArray[j]);
        }
    }

    this.player.update();
    this.enemies.forEach(enemy => {
      enemy.update();
    });

  }


  render(ctx) {
    this.collisionManager.render(ctx);
    this.level1.render();
  }
}
