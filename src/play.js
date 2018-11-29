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
      this.offSetY = 0;

      this.actualCentre = 0;
      this.actual0 = 0;
  }

  update() {
      //  Update game objects here.
     this.collisionResults = this.collisionManager.checkCircleAndBoxColliderArray();
        for(var i = 0; i < this.collisionResults['BoxResults'].length; i++){
            if(this.collisionResults['BoxResults'][i][CollisionManager.IndexOfElement(this.collisionManager.circleColliderArray, this.player.circle)] == true){
                this.player.handleCollision(this.collisionManager.boxColliderArray[i]);
            }
        }

      this.player.update();

      this.actualCentre = this.player.circle.shape.position.y + this.actual0 - 500;

      if(this.actualCentre < -10) {
        this.offSetY = 3;
      }
      else if(this.actualCentre > 10) {
        this.offSetY = -3;
      }
      else {
        this.offSetY = 0;
      }

      this.actual0 += this.offSetY;
  }


  render(ctx) {
    ctx.translate(-2, this.offSetY);
    this.collisionManager.render(ctx);
    this.level1.render();
    ctx.restore();
  }
}
