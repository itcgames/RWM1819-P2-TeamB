class Play {
  constructor() {

  }

  init() {

	this.collisionManager = new CollisionManager();

    this.backgroundSprite = new Sprite( gameNs.game.assetManager.getAsset("assets/sprites/background.png"),
                                        1920,
                                        1080,
                                        0,
                                        0,
                                        0,
                                        0,
                                        gameNs.game.ctx);
    this.backgroundSprite.setScale(3, 2);

    this.levelArray = [];
    this.levelArray.push(new Level("level1"));
    this.levelArray.push(new Level("level2"));

    this.levelArray.push(new Level("level3"));
    this.index = 0;
    this.ctx;

    this.scrollX = -1;
    this.player = new Player();
    for (var i = 0; i < this.levelArray[this.index].tileMap.height; i++) {
      this.levelArray[this.index].tileMap.tileArray[i].forEach(function (element) {
        if (element.collider) {
          gameNs.game.playScreen.collisionManager.addBoxCollider(element.collider);
        }
      });
    }

    this.player.init();
    this.collisionManager.addCircleCollider(this.player.circle);
    this.collisionManager.addCircleCollider(this.levelArray[this.index].goal.collider);

    this.offSet = new Vector2(0, 0);
    this.actualCentre = new Vector2(0, 0);
    this.actual0 = new Vector2(0, -1000);

    this.levelArray[this.index].enemies.forEach(enemy => {
      this.collisionManager.addCircleCollider(enemy.collider);
    });

    this.levelArray[this.index].platforms.forEach(platform => {
      this.collisionManager.addBoxCollider(platform.collider);
    });

    this.levelArray[this.index].sawBlades.forEach(sawBlade => {
      this.collisionManager.addCircleCollider(sawBlade.collider);
    })

    this.wallOfDeath = new WallOfDeath(0, 1);
    this.collisionManager.addBoxCollider(this.wallOfDeath.collider);
  }

  nextLevel() {
    for (var i = 0; i < this.levelArray[this.index].tileMap.height; i++) {
      this.levelArray[this.index].tileMap.tileArray[i].forEach(function (element) {
        if (element.collider) {
          gameNs.game.playScreen.collisionManager.removeBoxCollider(element.collider);
        }
      });
  } 

  this.levelArray[this.index].enemies.forEach(element => {
    gameNs.game.playScreen.collisionManager.removeCircleCollider(element.collider);
  });

  this.levelArray[this.index].platforms.forEach(platform => {
    gameNs.game.playScreen.collisionManager.removeBoxCollider(platform.collider);
  });

  this.levelArray[this.index].sawBlades.forEach(element => {
    gameNs.game.playScreen.collisionManager.removeCircleCollider(element.collider);
  });

  this.resetLevel();
    this.index++;

    if(this.index == 2) {
      this.scrollX = 0;
    }

    this.player.nextLevel(this.levelArray[this.index].tileMap.playerX,
    this.levelArray[this.index].tileMap.playerY);


    for (var i = 0; i < this.levelArray[this.index].tileMap.height; i++) {
      this.levelArray[this.index].tileMap.tileArray[i].forEach(function (element) {
        if (element.collider) {
          gameNs.game.playScreen.collisionManager.addBoxCollider(element.collider);
        }
      });
    }

    this.levelArray[this.index].enemies.forEach(enemy => {
      this.collisionManager.addCircleCollider(enemy.collider);
    });

    this.levelArray[this.index].sawBlades.forEach(sawBlade => {
      this.collisionManager.addCircleCollider(sawBlade.collider);
    })

    this.levelArray[this.index].platforms.forEach(platform => {
      this.collisionManager.addBoxCollider(platform.collider);
    });

    this.collisionManager.addCircleCollider(this.levelArray[this.index].goal.collider);

    this.actual0.y = this.levelArray[this.index].tileMap.actualY;
    this.ctx.translate(-this.actual0.x, (this.player.circle.position.y - this.levelArray[this.index].tileMap.yOffset));
    this.actual0.x = 0;
  }

  update() {
    //  Update game objects here.
    this.collisionResults = this.collisionManager.checkCircleAndBoxColliderArray();
    for (var i = 0; i < this.collisionResults['BoxResults'].length; i++) {
        if (this.collisionResults['BoxResults'][i][CollisionManager.IndexOfElement(this.collisionManager.circleColliderArray, this.player.circle)] == true){
            this.player.handleCollision(this.collisionManager.boxColliderArray[i], 
              this.levelArray[this.index].tileMap.playerX,
              this.levelArray[this.index].tileMap.playerY);
            if(this.collisionManager.boxColliderArray[i].containsObjectTag('platform')){
                var that = this;
                this.levelArray[this.index].platforms.forEach(function(element){
                    element.updatePlayerPos(that.player);
                })
            }	
        }
    }

    var circleCollisionResults = this.collisionManager.checkCircleColliderArray();
    for (var j = 0; j < circleCollisionResults.length; j++) {
      if (circleCollisionResults[CollisionManager.IndexOfElement(this.collisionManager.circleColliderArray, this.player.circle)][j] == true) {
        if (!this.collisionManager.circleColliderArray[j].containsObjectTag('goal')) {
          this.player.handleCollision(
            this.collisionManager.circleColliderArray[j],
            this.levelArray[this.index].tileMap.playerX,
            this.levelArray[this.index].tileMap.playerY
          );
        } else {
          this.nextLevel();
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

    this.actual0.y += this.offSet.y;
    gameNs.game.relativeCanvas.y = (-this.actual0.y - gameNs.game.deathTranslation.y);

    this.player.update();
    this.levelArray[this.index].enemies.forEach(enemy => {
      enemy.update();
    });
    this.levelArray[this.index].sawBlades.forEach(blade => {
      blade.update();
    });
    if(this.scrollX < 0)
    this.wallOfDeath.update();
  }


  render(ctx) {
    this.ctx = ctx;
    this.actual0.x--;
    ctx.translate(this.scrollX, this.offSet.y);
    gameNs.game.relativeCanvas.x++;
    this.backgroundSprite.draw();
    //this.collisionManager.render(ctx);
    this.levelArray[this.index].render();
    ctx.restore();
  }

  resetLevel() {
    this.ctx.translate(-this.actual0.x, (this.player.circle.position.y - this.levelArray[this.index].tileMap.yOffset));
    this.actual0.x = 0;
    this.actual0.y = this.levelArray[this.index].tileMap.actualY;
    this.wallOfDeath.collider.position.x = 0;
    gameNs.game.relativeCanvas.x = 0;
    gameNs.game.deathTranslation.y = this.player.circle.position.y - this.levelArray[this.index].tileMap.yOffset - this.actual0.y - gameNs.game.relativeCanvas.y;
  }
}
