class Play
{
  constructor() {

  }

  init() {

      this.collisionManager = new CollisionManager();

      this.level1 = new TileMap(1, "../assets/levels/grassSheet.png");
      this.level1.init();

      this.player = new Player();
      for(var i = 0; i < this.level1.height; i++)
      {
        this.level1.tileArray[i].forEach(function(element)
        {
            if(element.collider) {
              gameNs.game.playScreen.collisionManager.addBoxCollider(element.collider);
            }
        });
      }

      this.player.init();
      this.collisionManager.addCircleCollider(this.player.circle);

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
