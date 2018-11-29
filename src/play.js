class Play
{
  constructor() {

  }

  init() {

	  this.collisionManager = new CollisionManager();

      this.levelArray = [];
			this.levelArray.push(new Level("level2"));

      this.player = new Player();
      for(var i = 0; i < this.levelArray[0].tileMap.height; i++)
      {
        console.log(this.levelArray[0]);
        this.levelArray[0].tileMap.tileArray[i].forEach(function(element)
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
      this.actual0 = -1000;
  }

  update() {
      //  Update game objects here.
     this.collisionResults = this.collisionManager.checkCircleAndBoxColliderArray();
        for(var i = 0; i < this.collisionResults['BoxResults'].length; i++){
            if(this.collisionResults['BoxResults'][i][CollisionManager.IndexOfElement(this.collisionManager.circleColliderArray, this.player.circle)] == true){
								this.player.handleCollision(this.collisionManager.boxColliderArray[i]);
								if(this.collisionManager.boxColliderArray[i].containsObjectTag('platform')){
									this.interactableTest.updatePlayerPos(this.player);
								}	
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
    ctx.translate(-1, this.offSetY);
    this.collisionManager.render(ctx);
    //this.level1.render();
    this.levelArray[0].render();
    ctx.restore();
  }
}
