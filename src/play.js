class Play
{
  constructor() {

  }

  init() {

<<<<<<< HEAD
	  this.collisionManager = new CollisionManager();

      this.levelArray = [];
			this.levelArray.push(new Level("level2"));

      this.player = new Player();
      for(var i = 0; i < this.levelArray[0].tileMap.height; i++)
      {
        console.log(this.levelArray[0]);
        this.levelArray[0].tileMap.tileArray[i].forEach(function(element)
        {
=======
    this.collisionManager = new CollisionManager();

    this.level1 = new TileMap(1, "../assets/levels/grassSheet.png");
    this.level1.init();

    for (var i = 0; i < this.level1.height; i++) {
        this.level1.tileArray[i].forEach(function(element) {
>>>>>>> 0976291a3a5125489226d4a75fbb6edce5ecdbfb
            if(element.collider) {
                gameNs.game.playScreen.collisionManager.addBoxCollider(element.collider);
            }
        });
    }

<<<<<<< HEAD
      this.player.init();
			this.collisionManager.addCircleCollider(this.player.circle);
      this.offSetY = 0;
=======
    this.player = new Player();
    this.player.init();
    this.collisionManager.addCircleCollider(this.player.circle);
    this.offSetY = 0;
>>>>>>> 0976291a3a5125489226d4a75fbb6edce5ecdbfb

    this.actualCentre = 0;
    this.actual0 = -1000;

    this.enemies = [];
    for (var i = 0; i < 1; i++) {
        this.enemies.push(new Enemy(new Vector2(i * 100, 100), new Vector2(i * 100 + 100, 100), 3));
        this.collisionManager.addCircleCollider(this.enemies[i].collider);
    }

    this.sawBlades = [];
    for (var i = 0; i < 3; i++) {
        this.sawBlades.push(new Sawblade(new Vector2(i * 200, 100), 50));
        this.collisionManager.addCircleCollider(this.sawBlades[i].collider);
    } 
    
    this.wallOfDeath = new WallOfDeath(0, 1);
    this.collisionManager.addBoxCollider(this.wallOfDeath.collider);
  }

  update() {
<<<<<<< HEAD
      //  Update game objects here.
     this.collisionResults = this.collisionManager.checkCircleAndBoxColliderArray();
        for(var i = 0; i < this.collisionResults['BoxResults'].length; i++){
            if(this.collisionResults['BoxResults'][i][CollisionManager.IndexOfElement(this.collisionManager.circleColliderArray, this.player.circle)] == true){
								this.player.handleCollision(this.collisionManager.boxColliderArray[i]);
								if(this.collisionManager.boxColliderArray[i].containsObjectTag('platform')){
									this.interactableTest.updatePlayerPos(this.player);
								}	
            }
=======
    //  Update game objects here.
    this.collisionResults = this.collisionManager.checkCircleAndBoxColliderArray();
    for (var i = 0; i < this.collisionResults['BoxResults'].length; i++) {
        if (this.collisionResults['BoxResults'][i][CollisionManager.IndexOfElement(this.collisionManager.circleColliderArray, this.player.circle)] == true){
            this.player.handleCollision(this.collisionManager.boxColliderArray[i]);
        }
    }

    var circleCollisionResults = this.collisionManager.checkCircleColliderArray();
    for (var j = 0; j < circleCollisionResults.length; j++) {
        if (circleCollisionResults[CollisionManager.IndexOfElement(this.collisionManager.circleColliderArray, this.player.circle)][j] == true) {
            this.player.handleCollision(this.collisionManager.circleColliderArray[j]);
>>>>>>> 0976291a3a5125489226d4a75fbb6edce5ecdbfb
        }
    }

<<<<<<< HEAD
      this.player.update();
      this.actualCentre = this.player.circle.shape.position.y + this.actual0 - 500;
=======
    if (this.player.alive === false) {
        this.resetLevel();
    }

    this.actualCentre = this.player.circle.shape.position.y + this.actual0 - 500;
>>>>>>> 0976291a3a5125489226d4a75fbb6edce5ecdbfb

    if (this.actualCentre < -10) {
        this.offSetY = 3;
    } else if (this.actualCentre > 10) {
        this.offSetY = -3;
    } else {
        this.offSetY = 0;
    }

    this.actual0 += this.offSetY;

    this.player.update();
    this.enemies.forEach(enemy => {
        enemy.update();
    });    
    this.wallOfDeath.update();    
  }


  render(ctx) {
    ctx.translate(-1, this.offSetY);
    this.collisionManager.render(ctx);
    //this.level1.render();
    this.levelArray[0].render();
    ctx.restore();
  }

  resetLevel() {
    this.wallOfDeath.collider.position.x = 0;    
  }
}
