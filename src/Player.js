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
      this.alive = true;

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
      this.resitution = new Vector2(1, .098);
      this.friction = new Vector2(.97, .97); // x represents ground friction and y air friction
      this.velocity = new Vector2(0,0);
      this.acceleration = new Vector2(0,0);
      this.previousV = new Vector2(0,0);


        //Listens for mouse movement event and updates position var
      window.addEventListener("mousemove", function(e) {
        gameNs.game.mX = e.pageX + gameNs.game.relativeCanvas.x;
        gameNs.game.mY = e.pageY + gameNs.game.relativeCanvas.y;
      })

      //Projectile and Projectile Manager
      this.pm = new ProjectileManager();
      this.p = new Projectile("pOne");
      this.p.setPosition(500, 100);
      this.p.setAngle(45);
      this.p.setSpeed(0.15);
      this.pm.setGlobalGravity(2.1);
      this.pm.setGlobalFriction(0.02);
      this.pm.addProjectile(this.p);

      //Array of emitters
      this.emitters = new Array();
      //Particle Emitter

      this.moveEmitter = new Emitter(new Vector(this.circle.position.x, this.circle.position.y), Vector.fromAngle(-0.5, 0.5), 0.5, 'rgb(0, 0, 255');

      this.moveEmitter.setMaxParticles(1000);
      this.moveEmitter.setEmissionRate(1);

      //Create SoundManager Object
      this.sm = new SoundManager();
      this.initSound();
      this.isGrounded = false;
      this.jumped = false;
      this.timer = 0;

      this.previousV = new Vector2(0,0);

      this.MAX_SPEED_X = 6;
  }

  playerKeys(keys) {
    keys.forEach(function(element) {
      if(element == "a") {
        that.acceleration.x -= 3;
      }

      if(element == "d") {
        that.acceleration.x += 3;
      }


      if(element == "w") {
          if(that.isGrounded === true){
            that.acceleration.y -= 10;
            that.sm.playSound("jump", false);
          }
      }

      if(element == "f") {
        if (that.p.IsFired() === false){
          that.fire();
          that.sm.playSound("proj", false);
        }
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
  handleCollision(entity, x, y)
  {
    if(entity != undefined){
      if (entity.containsObjectTag('ground') || entity.containsObjectTag('platform')) {
        // colliding with the right side of the entity
        if (this.circle.position.x < entity.position.x) {
          if (this.circle.position.y - this.circle.radius < entity.position.y + entity.height && this.circle.position.y + this.circle.radius > entity.position.y + this.circle.radius / 4) {
              this.circle.position.x = entity.position.x - this.circle.radius;
              this.velocity.x *= -this.resitution.x;
            }
        }

        // colliding with the right side of the entity
        if (this.circle.position.x > entity.position.x + entity.width) {
          if (this.circle.position.y - this.circle.radius < entity.position.y + entity.height && this.circle.position.y + this.circle.radius > entity.position.y + this.circle.radius / 4) {
              this.circle.position.x = entity.position.x + entity.width + this.circle.radius;
              this.velocity.x *= -this.resitution.x;
            }
        }

        // colliding with the bottom side of the entity
        if (this.circle.position.y > entity.position.y + entity.height) {
          this.circle.position.y = entity.position.y + entity.height + this.circle.radius;
            this.velocity.y *= -this.resitution.y;
        }

        // colliding with the top side of the entity
        if (this.circle.shape.position.y  < entity.shape.position.y) {
          this.circle.shape.position.y = entity.shape.position.y - this.circle.shape.radius;
          this.velocity.y *= -this.resitution.y;
          this.timer = 0;

          if (!this.isGrounded) {
            this.sm.playSound("land", false);
            let canvas = document.getElementById("mycanvas");

            this.emitters.push(new Emitter(new Vector(this.circle.position.x, this.circle.position.y), Vector.fromAngle(-10, 10), 2.3, 'rgb(0, 0, 0)'));

            for (let i = 0; i < this.emitters.length; i++)
            {
              this.emitters[i].setMaxParticles(100);
              this.emitters[i].setEmissionRate(100);
              this.emitters[i].plotParticles(canvas.width, canvas.height);

              for (let j = 0; j < this.emitters[i].maxParticles; j++)
              {
                this.emitters[i].addNewParticles();
              }
            }
          }
          this.isGrounded = true;

        }

        this.p.setFired(false);
      } else if (entity.containsObjectTag('obstacle')) {
        this.alive = false;
        this.resetPlayer(x, y);
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

      this.velocity.y += this.acceleration.y;

      this.velocity.x *= this.friction.x;
      this.velocity.y *= this.friction.y;

      if (this.jumped)
      {
        //this.jumpEmitter.addNewParticles();
        this.jumped = false;
      }

      this.moveEmitter.setPos(this.circle.position.x, this.circle.position.y);
      this.moveEmitter.addNewParticles();
      let canvas = document.getElementById("mycanvas");

      //Plot all the particles in the array
      for (let i = 0; i < this.emitters.length; i++)
      {
        this.emitters[i].plotParticles(canvas.width, canvas.height);
      }
      this.moveEmitter.plotParticles(canvas.width, canvas.height);

      if (this.velocity.x < .005 && this.velocity.x > -.005) {
        this.velocity.x = 0;
      }

      if (!this.circle.colliding) {
        this.timer += 1 / 60;
        if (this.timer > 0.2)
        {
          this.isGrounded = false;
          this.timer = 0;
        }
      }
      // update the object position with the current velocity
      this.circle.shape.position.x += this.velocity.x;
      this.circle.shape.position.y += this.velocity.y;

      if (this.p.velocityX > 100) {
        this.p.velocityX = 100;
      } else if (this.p.velocityX < -100) {
        this.p.velocityX = -100;
      }


      if (this.p.IsFired()) {
        this.p.setPosition(this.circle.position.x, this.circle.position.y);
        this.velocity = this.p.getVelocity();
      } else {
        this.p.setPosition(this.circle.position.x, this.circle.position.y);
      }

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

      this.sprite.setPosition(this.circle.position.x - 50,
                              this.circle.position.y - 50);


      this.sprite.rotate(this.velocity.x);

      this.pm.update();
    }
  }


  render()
  {
    //Render call to draw projectiles, disabled except for debugging
    //this.pm.render();
    let canvas = document.getElementById("mycanvas");
    let ctx = canvas.getContext("2d");

    this.moveEmitter.draw(ctx);

    for (let i = 0; i < this.emitters.length; i++)
    {
      this.emitters[i].draw(ctx);
    }

    this.sprite.draw();
  }

  fire()
  {
    this.pm.fireProjectiles();
  }

  nextLevel(x,y) {
    this.circle.position.x = x;
    this.circle.position.y = y;
    this.velocity.x = 0;
    this.velocity.y = 0;
    this.p.setVelocity(0, 0);
  }

  resetPlayer(x, y) {
    this.circle.position.x = x;
    this.circle.position.y = y;
    this.velocity.x = 0;
    this.velocity.y = 0;
    this.alive = true;
    this.p.setVelocity(0, 0);
    gameNs.game.playScreen.resetLevel();
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
