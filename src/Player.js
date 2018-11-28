var that = {};

class Player
{
  constructor() {

  }
  
  init() {
      //  Initialise game objects here
      that = this;
      this.collision = false;
      this.alive = true;

      this.circle = new CircleCollider(new Vector2(500,100), 50);

      this.gravity = new Vector2(0, .098);
      this.resitution = new Vector2(1.2, .098);
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

      this.previousV = new Vector2(0,0);

      this.MAX_SPEED_X = 6;
  }

  playerKeys(keys) {
    keys.forEach(function(element) {
      if(element == "a") {
        that.acceleration.x -= 1;
      }
      if(element == "d") {
        that.acceleration.x += 1;
      }
      if(element == "w") {
        that.acceleration.y -= 6;
      }
      if(element == "f") {
        that.fire();
      }
      if(element == "Escape") {
        gameNs.game.menuHandler.goToScene("Pause");
      }
    })
  }


  /*
  * Method to handle the collision physics of the object
  * @arg entity - this is an entity that is passed only if it has collided with the object
  *               the entity contains a shape which has its own position vector and size values
  */
  handleCollision(entity)
  {
    if(entity != undefined){
      if (entity.containsObjectTag('ground')) {
        // colliding with the right side of the entity
        if(this.circle.position.x < entity.position.x){
          if(this.circle.position.y - this.circle.radius < entity.position.y + entity.height
            && this.circle.position.y + this.circle.radius > entity.position.y + this.circle.radius / 4){
              this.circle.position.x = entity.position.x - this.circle.radius;
              this.velocity.x *= -this.resitution.x;
              console.log("right");
              this.p.setFired(false);
            }
        }

        // colliding with the right side of the entity
        if(this.circle.position.x > entity.position.x + entity.width){
          if(this.circle.position.y - this.circle.radius < entity.position.y + entity.height
            && this.circle.position.y + this.circle.radius > entity.position.y + this.circle.radius / 4){
              this.circle.position.x = entity.position.x + entity.width + this.circle.radius;
              this.velocity.x *= -this.resitution.x;
              console.log("left");
              this.p.setFired(false);
            }
        }

        // colliding with the bottom side of the entity
        if(this.circle.position.y > entity.position.y + entity.height){
          this.circle.position.y = entity.position.y + entity.height + this.circle.radius;
            this.velocity.y *= -this.resitution.y;
            this.p.setFired(false);
        }
        // colliding with the top side of the entity
        if(this.circle.position.y  < entity.position.y){
          this.circle.position.y = entity.position.y - this.circle.radius;
          this.velocity.y *= -this.resitution.y;
          this.p.setFired(false);
        }
      } else if (entity.containsObjectTag('obstacle')) {
        this.circle.position.x = 500;
        this.circle.position.y = 100;
      }    
    }
  }

  update() {
    if (this.alive) {
      this.render();
      this.acceleration.y += this.gravity.y;

      if(this.velocity.x < this.MAX_SPEED_X && this.velocity.x > -this.MAX_SPEED_X) {
        this.velocity.x += this.acceleration.x;
      }

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
      this.circle.position.x += this.velocity.x;
      this.circle.position.y += this.velocity.y;

      if (this.p.IsFired())
      {
        this.velocity = this.p.getVelocity();
      }
      else
      {
        this.p.setPosition(this.circle.position.x, this.circle.position.y);
      }

      //this.velocity = this.p.getVelocity();
      //this.circle.position = this.p.getPosition();

      this.previousV = this.velocity;
      this.acceleration = new Vector2(0,0);

      this.pm.update();
    }    
  }

  render()
  {
    //this.pm.render();
  }

  fire()
  {
    this.pm.fireProjectiles();
  }
}
