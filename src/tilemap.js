class TileMap
{
    /**
     * 
     * Default constructor
     * @param {*} level The level number you want a tilemap for(starting at 1)
     * @param {*} tileSheetPath Path to the tilesheet for the level
     */
    constructor(level, tileSheetPath)
    {
        this.path = tileSheetPath;
        this.levelNumber = level - 1; //to get the index array
        this.width = level1[this.levelNumber].width; //width in number of tiles
        this.height = level1[this.levelNumber].height; //height in number of tiles
    }

    init()
    {
  
        
    }

     

    onTMXLoad()
    {

    }
  
    loadTMX()
    {

    }

    update()
    {

    }


    render()
    {

    }


}