class Sawblade extends Obstacle {

  constructor(position, radius) {
    super(new CircleCollider(new Vector2(position.x, position.y), radius, ['obstacle'], ['ground', 'obstacle']), position, position, 0);
    this.sprite = new Sprite(gameNs.game.assetManager.getAsset("assets/sprites/saw.png"),
                             415,
                             414,
                             0,
                             0,
                             this.position.x - this.collider.radius,
                             this.position.y - this.collider.radius,
                             gameNs.game.ctx);
    this.sprite.setScale(0.25, 0.25);
  }

  update(){
    this.sprite.rotate(-2);
  }

  render(){
    this.sprite.draw();
  }
}