class Play
{
  constructor() {

  }

  init() {

      this.collisionManager = new CollisionManager();
      this.player = new Player();
      this.square = new BoxCollider(new Vector2(0, 400), 200, 100);
      this.player.init();

      this.collisionManager.addCircleCollider(this.player.circle);
      this.collisionManager.addBoxCollider(this.square);

  }

  update() {
      //  Update game objects here.
      if(CollisionManager.CircleRectangleCollision(this.square, this.player.circle)){
          this.player.stopGravity = true;
      } else {
          this.stopGravity = false;
      }

      this.player.update();
  }


  render(ctx) {
      this.collisionManager.render(ctx);
  }
}
