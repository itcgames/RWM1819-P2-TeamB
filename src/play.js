class Play
{
  constructor() {

  }

  init() {

      this.collisionManager = new CollisionManager();

      this.level1 = new TileMap(1, "../assets/levels/grassSheet.png");
      this.level1.init();

      this.player = new Player();
      this.squares = [];
      for(var i = 1; i < 5; i ++)
      {
         this.squares.push(new BoxCollider(new Vector2(i*200, 400), 200, 100, ['ground']));
      }
        
      this.squares.push(new BoxCollider(new Vector2(200, 100), 200, 100, ['ground']));
      this.squares.push(new BoxCollider(new Vector2(0, 300), 200, 100, ['ground']));
      this.squares.push(new BoxCollider(new Vector2(1000, 300), 200, 100, ['ground']));
      this.player.init();

      this.collisionManager.addCircleCollider(this.player.circle);
      for(var i = 0; i < this.squares.length; i ++)
        {
            this.collisionManager.addBoxCollider(this.squares[i]);
        }
  }

  update() {
      //  Update game objects here.
     this.collisionResults = this.collisionManager.checkCircleAndBoxColliderArray();
        //console.log(this.collisionResults['Array2']);
        for(var i = 0; i < this.collisionResults['BoxResults'].length; i++){
            if(this.collisionResults['BoxResults'][i][CollisionManager.IndexOfElement(this.collisionManager.circleColliderArray, this.player.circle)] == true){
                this.player.handleCollision(this.collisionManager.boxColliderArray[i]);
            }
        }

      this.player.update();
  }


  render(ctx) {
      this.collisionManager.render(ctx);
      this.level1.render();
  }
}
