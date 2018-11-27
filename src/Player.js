var that = {};

class Player
{
  constructor() {

  }
  init() {
      //  Initialise game objects here
      that = this;
      this.stopGravity = false;
      this.circle = new CircleCollider(new Vector2(100,100), 50);

      this.gravity = new Vector2(0, .098);
      this.friction = new Vector2(.97, 1); // x represents ground friction and y air friction
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
    if(!this.stopGravity){
      this.acceleration.y += this.gravity.y;
    }
    else{
      this.velocity.y = 0;
    }

    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;

    this.velocity.x *= this.friction.x;
    this.velocity.y *= this.friction.y;

    this.circle.shape.position.x += this.velocity.x;
    this.circle.shape.position.y += this.velocity.y;

    this.acceleration = new Vector2(0,0);
  }


  render() {
  }
}
