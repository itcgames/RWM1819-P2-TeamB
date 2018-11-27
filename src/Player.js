var that = {};

class Player
{
  constructor() {

  }
  init() {
      //  Initialise game objects here
      that = this;
      this.circle = new CircleCollider(new Vector2(100,100), 50);
      
      this.gravity = new Vector2(0, .98);
      this.velocity = new Vector2(0,0);
      this.acceleration = new Vector2(0,0);
  }

  playerKeys(keys) {
    keys.forEach(function(element) {
      if(element == "a") {
        that.velocity.x -= 6;
      }
      if(element == "d") {
        that.velocity.x += 6;
      }
    });
  }

  update() {
    this.acceleration.y += this.gravity.y

    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;

    gameNs.game.player.circle.shape.position.x += this.velocity.x;
    gameNs.game.player.circle.shape.position.y += this.velocity.y;

    this.acceleration = new Vector2(0,0);
  }


  render() {
  }
}
