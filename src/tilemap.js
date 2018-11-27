class TileMap
{
    /**
     * Default constructor
     * @param {*} path path to tmx file
     */
    constructor(path)
    {
        this.path = path;
        this.parser = new DOMParser();
        // this.xmlDocument = this.parser.parseFromString(levelDataAsString, "text/xml");

        this.width; //width in number of tiles
        this.height; //height in number of tiles
    }

    init()
    {
        this.loadTMX();
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