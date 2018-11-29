class Play
{
  constructor() {

  }

  init() {

      this.collisionManager = new CollisionManager();

      this.level1 = new TileMap(1, "../assets/levels/grassSheet.png");
      this.level1.init();

      this.player = new Player();
<<<<<<< HEAD
<<<<<<< HEAD
      this.interactableTest = new Interactable(400, 50, 50, 50, "test",'magenta', {});

      for(var i = 0; i < this.level1.height; i++)
=======
      this.interactableTest = new Interactable(400, 50, 50, 50, "test",'magenta', {minX: 400, minY: 50, maxX: 500, maxY: 50});
=======
      this.interactableTest = new Interactable(400, 300, 100, 50, "test",'magenta', {minX: 400, minY: 300, maxX: 500, maxY: 300});

>>>>>>> testing interactable collision
      this.squares = [];
      for(var i = 1; i < 5; i ++)
>>>>>>> implementing new drag and drop implementation
      {
        this.level1.tileArray[i].forEach(function(element)
        {
            if(element.collider) {
              gameNs.game.playScreen.collisionManager.addBoxCollider(element.collider);
            }
        });
      }
<<<<<<< HEAD

      this.player.init();
=======
        
      this.squares.push(new BoxCollider(new Vector2(200, 100), 200, 100, ['ground']));
      this.squares.push(new BoxCollider(new Vector2(0, 300), 200, 100, ['ground']));
      this.squares.push(new BoxCollider(new Vector2(1000, 300), 200, 100, ['ground']));
      this.player.init();
      this.collisionManager.addBoxCollider(this.interactableTest.getCollider());
>>>>>>> testing interactable collision
      this.collisionManager.addCircleCollider(this.player.circle);

  }

  update() {
      //  Update game objects here.
     this.collisionResults = this.collisionManager.checkCircleAndBoxColliderArray();
<<<<<<< HEAD
<<<<<<< HEAD
        for(var i = 0; i < this.collisionResults['BoxResults'].length; i++){
            if(this.collisionResults['BoxResults'][i][CollisionManager.IndexOfElement(this.collisionManager.circleColliderArray, this.player.circle)] == true){
=======
        for(var i = 0; i < this.collisionResults['Array1'].length; i++){
            if(this.collisionResults['Array1'][i][CollisionManager.IndexOfElement(this.collisionManager.circleColliderArray, this.player.circle)] == true){
>>>>>>> created interactable object and implemented drag component
                this.player.handleCollision(this.collisionManager.boxColliderArray[i]);
            }
=======
     for(var i = 0; i < this.collisionResults['Array1'].length; i++){
        if(this.collisionResults['Array1'][i][CollisionManager.IndexOfElement(this.collisionManager.circleColliderArray, this.player.circle)] == true){
            this.player.handleCollision(this.collisionManager.boxColliderArray[i]);
            
            if(this.collisionResults['Array1'][i][CollisionManager.CollidedWithTag());
>>>>>>> testing interactable collision
        }
     }

      this.player.update();
  }


  render(ctx) {
<<<<<<< HEAD
<<<<<<< HEAD
    this.collisionManager.render(ctx);
    this.level1.render();
=======
      this.interactableTest.draw(ctx);
=======
>>>>>>> testing interactable collision
      this.collisionManager.render(ctx);
>>>>>>> created interactable object and implemented drag component
  }
}
