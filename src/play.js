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

    this.player = new Player();
    this.player.init();
    this.collisionManager.addCircleCollider(this.player.circle);

    this.offSet = new Vector2(0, 0);
    this.actualCentre = new Vector2(0, 0);
    this.actual0 = new Vector2(0, -1000);

    this.levelArray[0].enemies.forEach(enemy => {
        this.collisionManager.addCircleCollider(enemy.collider);
    });

    this.levelArray[0].sawBlades.forEach(sawBlade => {
        this.collisionManager.addCircleCollider(sawBlade.collider);
    })
    
    this.wallOfDeath = new WallOfDeath(0, 1);
    this.collisionManager.addBoxCollider(this.wallOfDeath.collider);
  }

  update() {
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
            if (!this.collisionManager.circleColliderArray[j].containsObjectTag('goal')) {
                this.player.handleCollision(this.collisionManager.circleColliderArray[j]);
            } else {

            }        
        }
    }

    if (this.player.alive === false) {
        this.resetLevel();
    }

    this.actualCentre.y = this.player.circle.position.y + this.actual0.y - 500;

    if (this.actualCentre.y < -10) {
        this.offSet.y = 3;
    } else if (this.actualCentre.y > 10) {
        this.offSet.y = -3;
    } else {
        this.offSet.y = 0;
    }

    this.actual0 = this.actual0.add(this.offSet);

    this.player.update();
    this.levelArray[0].enemies.forEach(enemy => {
        enemy.update();
    });   
    this.wallOfDeath.update();    
  }


  render(ctx) {
    ctx.translate(-1, this.offSet.y);
    this.collisionManager.render(ctx);
    this.levelArray[0].render();
    ctx.restore();
  }

  resetLevel() {
    this.wallOfDeath.collider.position.x = 0;    
  }
}
