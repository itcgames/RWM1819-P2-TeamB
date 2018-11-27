class Player
{
  constructor() {

  }

  init() {

      //  Initialise game objects here
      this.circle = new CircleCollider(new Vector2(100,100), 50);

  }

  playerKeys(keys) {
    keys.forEach(function(element) {
      if(element == "a") {
        gameNs.game.player.circle.shape.position.x -= 6;
      }
      if(element == "d") {
        gameNs.game.player.circle.shape.position.x += 6;
      }
    });
  }

  update() {

  }


  render() {

  }
}
