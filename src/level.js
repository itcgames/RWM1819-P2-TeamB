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
        console.log(levels);
        //this.goal = new Goal(levels[this.level].layers[])
        for (var i = 0; i < levels[0]["level1"]["layers"].length; i++)
        {
            if(levels[0]["level1"]["layers"][i]["name"] == "GoalMarker")
            {
                this.goal = new Goal(levels[0]["level1"]["layers"][i]["objects"][0]["x"],
                                     levels[0]["level1"]["layers"][i]["objects"][0]["y"],
                                     0,
                                     0,
                                     210,
                                     215,
                                     gameNs.game.ctx);
            }
            if(levels[0]["level1"]["layers"][i]["name"] == "Interactable")
            {
                var x = levels[0]["level1"]["layers"][i]["objects"][0]["x"];
                var y = levels[0]["level1"]["layers"][i]["objects"][0]["y"];
                this.elevator = new Interactable(x, y,
                                     levels[0]["level1"]["layers"][i]["objects"][0]["width"],
                                     levels[0]["level1"]["layers"][i]["objects"][0]["height"],
                                     'platform',
                                     "vertical",
                                     {minX: x, minY: y, maxX:x, maxY:y - 800});
            }
        }

        this.goal.sprite.setScale(0.5, 0.5);
        this.goal.sprite.setPosition(this.goal.x - this.goal.sprite.getGlobalBounds().width / 2, this.goal.y - this.goal.sprite.getGlobalBounds().height / 2);
    }

    render()
    {
        this.tileMap.render();
        this.goal.render();
        this.elevator.render();
    }

}
    