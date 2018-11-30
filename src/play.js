class Play {
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
    for (var i = 0; i < this.levelArray[this.index].tileMap.height; i++) {
      this.levelArray[this.index].tileMap.tileArray[i].forEach(function (element) {
        if (element.collider) {
          gameNs.game.playScreen.collisionManager.addBoxCollider(element.collider);
        }
      });
    }

    this.player = new Player();
    this.player.init();
    this.collisionManager.addCircleCollider(this.player.circle);
    this.collisionManager.addCircleCollider(this.levelArray[0].goal.collider);

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

  nextLevel() {
    for (var i = 0; i < this.levelArray[this.index].tileMap.height; i++) {
      this.levelArray[this.index].tileMap.tileArray[i].forEach(function (element) {
        if (element.collider) {
          gameNs.game.playScreen.collisionManager.removeBoxCollider(element.collider);
        }
      });

      this.levelArray[this.index].enemies.forEach(element => {
        gameNs.game.playScreen.collisionManager.removeCircleCollider(element.collider);
      });

      this.levelArray[this.index].sawBlades.forEach(element => {
        gameNs.game.playScreen.collisionManager.removeCircleCollider(element.collider);
      });

      this.resetLevel();
    }


    this.index++;


    for (var i = 0; i < this.levelArray[this.index].tileMap.height; i++) {
      this.levelArray[this.index].tileMap.tileArray[i].forEach(function (element) {
        if (element.collider) {
          gameNs.game.playScreen.collisionManager.addBoxCollider(element.collider);
        }
      });
    }
    this.player.circle.shape.position.x = 200;
    this.player.circle.shape.position.y = 500;
    this.actual0.y = -200;
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  update() {
    //  Update game objects here.
    this.collisionResults = this.collisionManager.checkCircleAndBoxColliderArray();
    for (var i = 0; i < this.collisionResults['BoxResults'].length; i++) {
      if (this.collisionResults['BoxResults'][i][CollisionManager.IndexOfElement(this.collisionManager.circleColliderArray, this.player.circle)] == true) {
        this.player.handleCollision(this.collisionManager.boxColliderArray[i]);
      }
    }

    var circleCollisionResults = this.collisionManager.checkCircleColliderArray();
    for (var j = 0; j < circleCollisionResults.length; j++) {
      if (circleCollisionResults[CollisionManager.IndexOfElement(this.collisionManager.circleColliderArray, this.player.circle)][j] == true) {
        if (!this.collisionManager.circleColliderArray[j].containsObjectTag('goal')) {
          this.ctx.translate(-this.actual0.x, (this.player.circle.position.y - 1500));
          this.actual0.x = 0;
          this.wallOfDeath.collider.position.x = 0;
          this.actual0.y = -1000;
          this.player.handleCollision(this.collisionManager.circleColliderArray[j]);
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

    this.player.update();
    this.levelArray[this.index].enemies.forEach(enemy => {
      enemy.update();
    });
    this.levelArray[this.index].sawBlades.forEach(blade => {
      blade.update();
    });
    this.wallOfDeath.update();
  }


  render(ctx) {
    this.ctx = ctx;
    this.actual0.x--;
    ctx.translate(-1, this.offSet.y);

    //this.collisionManager.render(ctx);
    this.levelArray[this.index].render();
    ctx.restore();
  }

  resetLevel() {
    this.wallOfDeath.collider.position.x = 0;
  }
}
