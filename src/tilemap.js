class TileMap
{
    /**
     *
     * Default constructor
     * @param {*} level The level name passed as a string
     */
    constructor(level)
    {
        this.level = level;
        this.width = levels[0][level].width; //width in number of tiles
        this.height = levels[0][level].height; //height in number of tiles
        this.tileWidth = levels[0][level].tilewidth; //width in pixels of individual tiles
        this.tileHeight = levels[0][level].tileheight; //height in pixels of individual tile
        this.frameLeft = 0;
        this.frameTop = 0;
        this.tileTypes = Object.freeze({'Air':0, 'Grass':26, 'Dirt':30, 'Right lip':18, 'Left lip':25});
    }

    init() {
        //Create 2d array for tile objects
        this.tileArray = new Array(this.height);

        for (var i = 0; i < this.tileArray.length; i++) {
            this.tileArray[i] = [];
        }

        //Create 2d array of numbers from the level data
        this.dataArray = new Array(this.height);

        for (var i = 0; i < this.dataArray.length; i++) {
            this.dataArray[i] = new Array(this.width);
        }

        //Get the values from levelData and load them into an array we can reference
        for(var i = 0; i < (this.width * this.height); i += this.width)
        {
            for(var j = 0; j < this.width; j++)
            {
                this.dataArray[i / this.width][j] = levels[0][this.level]["layers"][0]["data"][i + j];
            }
        }

        for(var i = 0; i < this.height; i++)
        {
            for(var j = 0; j < this.width; j++)
            {
                //Change the sprite's frame sizes based on what tile we want to create
                if (this.dataArray[i][j] === this.tileTypes['Grass']) {
                    this.frameLeft = 280;
                    this.frameTop = 210;
                } else if(this.dataArray[i][j] === this.tileTypes['Dirt']) {
                    this.frameLeft = 70;
                    this.frameTop = 280;
                } else if(this.dataArray[i][j] === this.tileTypes["Left lip"]) {
                    this.frameLeft = 210;
                    this.frameTop = 210;
                } else if(this.dataArray[i][j] === this.tileTypes["Right lip"]) {
                    this.frameLeft = 208;
                    this.frameTop = 140;
                } else {
                    this.frameLeft = 400;
                    this.frameTop = 200;
                }

                //lastly push the new tile to the 2d array
                this.tileArray[i].push(new Tile(j * this.tileWidth,
                                                i * this.tileHeight,
                                                this.frameLeft,
                                                this.frameTop,
                                                this.tileWidth,
                                                this.tileHeight,
                                                this.dataArray[i][j]));
            }
        }
    }

    render() {
        for (var i = 0; i < this.height; i++) {
            this.tileArray[i].forEach(function(element) {
                element.render();
            });
        }
    }
}
