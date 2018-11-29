class Level {
  /**
   *
   * @param {*} level number of the level to init
   */
  constructor(level) {
    this.level = level;
    this.tileMap = new TileMap(this.level);
    this.tileMap.init();

    levels[level]["layers"]["GoalMarker"]["objects"].forEach(element => {
      this.goal = new Goal(element["x"], element["y"], 0, 0, 210, 215, gameNs.game.ctx);
    });

    this.sawBlades = [];
    if (levels[level]["layers"]["SawBladeMarkers"] !== undefined) {
      levels[level]["layers"]["SawBladeMarkers"]["objects"].forEach(element => {
        this.sawBlades.push(new Sawblade(new Vector2(element["x"], element["y"]), 50));
      });
    }

    this.enemies = [];
    if (levels[level]["layers"]["AIMarkers"] !== undefined) {
      levels[level]["layers"]["AIMarkers"]["objects"].forEach(element => {
        this.enemies.push(new Enemy(new Vector2(element["x"], element["y"]), new Vector2(element["x"] + 100, element["y"]), 3));
      });
    }

    this.goal.sprite.setScale(0.5, 0.5);
    this.goal.sprite.setPosition(this.goal.x - this.goal.sprite.getGlobalBounds().width / 2, this.goal.y - this.goal.sprite.getGlobalBounds().height / 2);
  }

  render() {
    this.enemies.forEach(enemy => {
      enemy.render();
    });
    this.sawBlades.forEach(blade => {
      blade.render();
    });
    this.tileMap.render();
    this.goal.render();
  }

}