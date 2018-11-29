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
      this.pos = new Vector2(400, 1700)
      this.circle = new CircleCollider(new Vector2(this.pos.x, this.pos.y), 50);

      this.sprite = new Sprite(gameNs.game.assetManager.getAsset("assets/sprites/marble.png"),
                                                                152,
                                                                152,
                                                                0,
                                                                0,
                                                                this.pos.x,
                                                                this.pos.y,
                                                                gameNs.game.ctx);

      this.sprite.setScale(0.66, 0.66);
      this.alive = true;

      this.gravity = new Vector2(0, .098);
      this.resitution = new Vector2(1.2, .098);
      this.friction = new Vector2(.97, .97); // x represents ground friction and y air friction
      this.velocity = new Vector2(0,0);
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

      //Create SoundManager Object
      this.sm = new SoundManager();
      this.initSound();
      this.isGrounded = false;
      this.timer = 0;

      this.previousV = new Vector2(0,0);

      this.MAX_SPEED_X = 6;
  }

  playerKeys(keys) {
    keys.forEach(function(element) {
      if(element == "a") {
        that.acceleration.x -= 1;
        this.sprite.rotate(-10);
      }

      if(element == "d") {
        that.acceleration.x += 1;
        this.sprite.rotate(10);
      }

      if(element == "w") {
        that.acceleration.y -= 6;
        that.sm.playSound("jump", false);
      }

      if(element == "f") {
        that.fire();
        that.sm.playSound("proj", false);
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
        if (this.circle.position.x < entity.position.x) {
          if (this.circle.position.y - this.circle.radius < entity.position.y + entity.height && this.circle.position.y + this.circle.radius > entity.position.y + this.circle.radius / 4) {
              this.circle.position.x = entity.position.x - this.circle.radius;
              this.velocity.x *= -this.resitution.x;
              this.p.setFired(false);
            }
        }

        // colliding with the right side of the entity
        if (this.circle.position.x > entity.position.x + entity.width) {
          if (this.circle.position.y - this.circle.radius < entity.position.y + entity.height && this.circle.position.y + this.circle.radius > entity.position.y + this.circle.radius / 4) {
              this.circle.position.x = entity.position.x + entity.width + this.circle.radius;
              this.velocity.x *= -this.resitution.x;
              this.p.setFired(false);
            }
        }

        // colliding with the bottom side of the entity
        if (this.circle.position.y > entity.position.y + entity.height) {
          this.circle.position.y = entity.position.y + entity.height + this.circle.radius;
            this.velocity.y *= -this.resitution.y;
            this.p.setFired(false);
        }

        // colliding with the top side of the entity
        if (this.circle.shape.position.y  < entity.shape.position.y) {
          this.circle.shape.position.y = entity.shape.position.y - this.circle.shape.radius;
          this.velocity.y *= -this.resitution.y;
          this.p.setFired(false);
          this.timer = 0;
          if (!this.isGrounded) {
            this.sm.playSound("land", false);
          }
          this.isGrounded = true;
        }
      } else if (entity.containsObjectTag('obstacle')) {
        this.alive = false;
      }
    }
  }

  update() {
    if (this.alive) {
      this.render();
      this.acceleration.y += this.gravity.y;

      if (this.velocity.x < this.MAX_SPEED_X && this.velocity.x > -this.MAX_SPEED_X) {
        this.velocity.x += this.acceleration.x;
      }

      this.velocity.y += this.acceleration.y;

      this.velocity.x *= this.friction.x;
      this.velocity.y *= this.friction.y;

      // threshold for the velocity, come to rest after a while
      if (this.velocity.y < .05 && this.velocity.y > -.05) {
        this.velocity.y = 0;
      }

      if (this.velocity.x < .005 && this.velocity.x > -.005) {
        this.velocity.x = 0;
      }

      if (!this.circle.colliding) {
        this.timer += 1 / 60;
        console.log("Timer: " + this.timer);
        if (this.timer > 0.2)
        {
          this.isGrounded = false;
          this.timer = 0;
        }

      }
      //this.timer = 0;
      // update the object position with the current velocity
      this.circle.shape.position.x += this.velocity.x;
      this.circle.shape.position.y += this.velocity.y;

      if (this.p.velocityX > 100) {
        this.p.velocityX = 100;
      } else if (this.p.velocityX < -100) {
        this.p.velocityX = -100;
      }

      if (this.p.velocityY > 100) {
        this.p.velocityY = 100;
      } else if (this.p.velocityY < -100) {
        this.p.velocityY = -100;
      }

      if (this.p.IsFired()) {
        this.velocity = this.p.getVelocity();
      } else {
        this.p.setPosition(this.circle.position.x, this.circle.position.y);
      }

      this.previousV = this.velocity;
      this.acceleration = new Vector2(0,0);
      this.pm.update();
    } else {
      this.resetPlayer();
    }

    this.sprite.setPosition(this.circle.position.x - 50,
                            this.circle.position.y - 50);

    this.pm.update();
  }

  render()
  {
    //Render call to draw projectiles, disabled except for debugging
    //this.pm.render();
    this.sprite.draw();
  }

  fire()
  {
    this.pm.fireProjectiles();
  }

  resetPlayer() {
    this.circle.position.x = this.pos.x;
    this.circle.position.y = this.pos.y;
    this.velocity.x = 0;
    this.velocity.y = 0;
    this.alive = true;
    this.p.setVelocity(0, 0);
  }

  initSound() {
    //Initialize the soundmanager
    this.sm.initialize();
    //this.sm.setVolume(0.8);
    //Load Jump Sound
    this.sm.loadSound("jump", "assets/audio/player_jump.ogg");
    this.sm.loadSound("land", "assets/audio/player_land.ogg");
    this.sm.loadSound("proj", "assets/audio/player_proj.ogg");
  }
}
