class Play
{
  constructor() {

  }

  init() {

      this.collisionManager = new CollisionManager();
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
        for(var i = 0; i < this.collisionResults['Array1'].length; i++){
            if(this.collisionResults['Array1'][i][CollisionManager.IndexOfElement(this.collisionManager.circleColliderArray, this.player.circle)] == true){
                this.player.handleCollision(this.collisionManager.boxColliderArray[i]);
            }
        }

      this.player.update();
  }


  render(ctx) {
      this.collisionManager.render(ctx);
  }
}
