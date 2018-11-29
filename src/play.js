class Play
{
  constructor() {

  }

  init() {

    this.collisionManager = new CollisionManager();

      this.levelArray = [];
      this.levelArray.push(new Level("level1"));
      this.levelArray.push(new Level("level2"));
      this.levelArray.push(new Level("level3"));
      this.levelArray.push(new Level("level4"));
      this.index = 0;
      this.ctx;

      this.player = new Player();
      for(var i = 0; i < this.levelArray[this.index].tileMap.height; i++)
      {
        this.levelArray[this.index].tileMap.tileArray[i].forEach(function(element)
        {
            if(element.collider) {
                gameNs.game.playScreen.collisionManager.addBoxCollider(element.collider);
            }
        });
    }

      this.player.init();
      this.collisionManager.addCircleCollider(this.player.circle);
      this.collisionManager.addCircleCollider(this.levelArray[0].goal.collider);
      this.offSetY = 0;

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

  nextLevel() {



    for(var i = 0; i < this.levelArray[this.index].tileMap.height; i++)
    {
      this.levelArray[this.index].tileMap.tileArray[i].forEach(function(element)
      {
          if(element.collider) {
            gameNs.game.playScreen.collisionManager.removeBoxCollider(element.collider);
          }
      });
    }


    this.index++;

    console.log(this.levelArray[this.index]);


    for(var i = 0; i < this.levelArray[this.index].tileMap.height; i++)
    {
      this.levelArray[this.index].tileMap.tileArray[i].forEach(function(element)
      {
          if(element.collider) {
            gameNs.game.playScreen.collisionManager.addBoxCollider(element.collider);
          }
      });
    }
    this.player.circle.shape.position.x = 200;
    this.player.circle.shape.position.y = 500;
    this.actual0 = -200;
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
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
              console.log("Next");
              this.nextLevel();
            }
        }
    }

    if (this.player.alive === false) {
        this.resetLevel();
    }

    this.actualCentre = this.player.circle.shape.position.y + this.actual0 - 500;

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
    this.ctx = ctx;
    ctx.translate(-1, this.offSetY);
    this.collisionManager.render(ctx);
    //this.level1.render();
    this.levelArray[this.index].render();
    ctx.restore();
  }

  resetLevel() {
    this.wallOfDeath.collider.position.x = 0;
  }
}
