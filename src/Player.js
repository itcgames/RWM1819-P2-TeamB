var that = {};

class Player
{
  constructor() {

  }
  init() {
      //  Initialise game objects here
      that = this;
      this.collision = false;
      
      this.circle = new CircleCollider(new Vector2(500,100), 50);

      this.gravity = new Vector2(0, .098);
      this.resitution = new Vector2(.50, .50); // how much bounce as applied to the ball
      this.friction = new Vector2(.97, .97); // x represents ground friction and y air friction
      this.velocity = new Vector2(0,0); //
      this.acceleration = new Vector2(0,0);
      this.previousV = new Vector2(0,0);

      //Projectile and Projectile Manager
      this.pm = new ProjectileManager();
      this.p = new Projectile("pOne");
      this.p.setPosition(500, 100);
      this.p.setAngle(45);
      this.p.setSpeed(1.2);
      this.pm.setGlobalGravity(2.1);
      this.pm.setGlobalFriction(0.02);
      this.pm.addProjectile(this.p);
  }

  playerKeys(keys) {
    keys.forEach(function(element) {
      if(element == "a") {
        that.acceleration.x -= 6;
      }
      if(element == "d") {
        that.acceleration.x += 6;
      }
      if(element == "w") {
        that.acceleration.y -= 6;
      }
      if(element == "f") {
        that.fire();
      if(element == "Escape") {
        gameNs.game.menuHandler.goToScene("Pause");
      }
    });
  }

  /*
  * Method to handle the collision physics of the object
  * @arg entity - this is an entity that is passed only if it has collided with the object
  *               the entity contains a shape which has its own position vector and size values
  */
  handleCollision(entity)
  {
    if(entity != undefined){
      // colliding with the right side of the entity
      if(this.circle.shape.position.x < entity.shape.position.x){
          if(this.circle.shape.position.y - this.circle.shape.radius < entity.shape.position.y + entity.shape.height
            && this.circle.shape.position.y + this.circle.shape.radius > entity.shape.position.y + this.circle.shape.radius / 4){
              this.circle.shape.position.x = entity.shape.position.x - this.circle.shape.radius;
              this.velocity.x *= -this.resitution.x;
              console.log("right");
            }
        }

      // colliding with the right side of the entity
      if(this.circle.shape.position.x > entity.shape.position.x + entity.shape.width){
        if(this.circle.shape.position.y - this.circle.shape.radius < entity.shape.position.y + entity.shape.height
          && this.circle.shape.position.y + this.circle.shape.radius > entity.shape.position.y + this.circle.shape.radius / 4){
            this.circle.shape.position.x = entity.shape.position.x + entity.shape.width + this.circle.shape.radius;
            this.velocity.x *= -this.resitution.x;
            console.log("left");
          }
      }

      // colliding with the bottom side of the entity
      if(this.circle.shape.position.y > entity.shape.position.y + entity.shape.height){
        this.circle.shape.position.y = entity.shape.position.y + entity.shape.height + this.circle.shape.radius;
          this.velocity.y *= -this.resitution.y;
      }
      // colliding with the top side of the entity
      if(this.circle.shape.position.y  < entity.shape.position.y){
        this.circle.shape.position.y = entity.shape.position.y - this.circle.shape.radius;
        this.velocity.y *= -this.resitution.y;
      }
    }
  }

  update() {
    this.render();
    this.acceleration.y += this.gravity.y;

    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;

    this.velocity.x *= this.friction.x;
    this.velocity.y *= this.friction.y;

    // threshold for the velocity, come to rest after a while
    if(this.velocity.y < .05 && this.velocity.y > -.05){
      this.velocity.y = 0;
    }
    if(this.velocity.x < .005 && this.velocity.x > -.005){
      this.velocity.x = 0;
    }

    // update the object position with the current velocity
    this.circle.shape.position.x += this.velocity.x;
    this.circle.shape.position.y += this.velocity.y;

    //this.velocity = this.p.getVelocity();
    //this.circle.shape.position = this.p.getPosition();

    this.previousV = this.velocity;
    this.acceleration = new Vector2(0,0);

    this.pm.update();
  }

  render() 
  {
    this.pm.render();
  }

  fire()
  {
    this.pm.fireProjectiles();
  }
}
