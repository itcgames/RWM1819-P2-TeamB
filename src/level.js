class Level
{
    /**
     *
     * @param {*} level number of the level to init
     */
    constructor(level)
    {
        this.level = level;
        this.tileMap = new TileMap(this.level);
        this.tileMap.init();
        //this.goal = new Goal(levels[this.level].layers[])
        for (var i = 0; i < levels[0][level]["layers"].length; i++)
        {
            if(levels[0][level]["layers"][i]["name"] == "GoalMarker")
            {
                this.goal = new Goal(levels[0][level]["layers"][i]["objects"][0]["x"],
                                     levels[0][level]["layers"][i]["objects"][0]["y"],
                                     0,
                                     0,
                                     210,
                                     215,
                                     gameNs.game.ctx);
            }
        }

        this.goal.sprite.setScale(0.5, 0.5);
        this.goal.sprite.setPosition(this.goal.x - this.goal.sprite.getGlobalBounds().width / 2, this.goal.y - this.goal.sprite.getGlobalBounds().height / 2);
    }

    render()
    {
        this.tileMap.render();
        this.goal.render();
    }

}
