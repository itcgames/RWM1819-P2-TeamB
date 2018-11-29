class Play
{
  constructor() {

  }

  init() {

	  this.collisionManager = new CollisionManager();

	  this.level1 = new TileMap(1, "../assets/levels/grassSheet.png");
	  this.level1.init();

	  this.player = new Player();

	  this.interactableTest = new Interactable(400, 300, 200, 50, 'platform','vertical', {minX: 400, minY: 300, maxX: 400, maxY: 800});

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
	  this.collisionManager.addBoxCollider(this.interactableTest.getCollider());
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
  }


  render(ctx) {
	this.interactableTest.render();
	this.collisionManager.render(ctx);
	this.level1.render();
  }
}
