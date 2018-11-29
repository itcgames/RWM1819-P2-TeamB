class Play
{
  constructor() {

  }

  init() {

      this.collisionManager = new CollisionManager();
      this.player = new Player();
      this.interactableTest = new Interactable(400, 300, 100, 50, "test",'magenta', {minX: 400, minY: 300, maxX: 500, maxY: 300});

      this.squares = [];
      for(var i = 1; i < 5; i ++)
      {
         this.squares.push(new BoxCollider(new Vector2(i*200, 400), 200, 100, ['ground']));
      }
        
      this.squares.push(new BoxCollider(new Vector2(200, 100), 200, 100, ['ground']));
      this.squares.push(new BoxCollider(new Vector2(0, 300), 200, 100, ['ground']));
      this.squares.push(new BoxCollider(new Vector2(1000, 300), 200, 100, ['ground']));
      this.player.init();
      this.collisionManager.addBoxCollider(this.interactableTest.getCollider());
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
            
            if(this.collisionResults['Array1'][i][CollisionManager.CollidedWithTag());
        }
     }

      this.player.update();
  }


  render(ctx) {
      this.collisionManager.render(ctx);
  }
}
