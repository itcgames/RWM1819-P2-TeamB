class TileMap
{
    /**
     * Default constructor
     * @param {*} path path to tmx file
     */
    constructor(path)
    {
        this.path = path;
        this.xmlLoader = new URLLoader();
        this.xmlLoader.addEventListener(Event.COMPLETE, xmlLoadComplete);
        this.xmlLoader.load(new URLRequest(this.path));
    }


    xmlLoadComplete(e)
    {
        this.xml = new XMLDocument(e.target.data);
        this.mapWidth = xml.attribute("width");
        console.log(this.mapWidth); 
    }
    /**
     * Load method to get a .tmx file.
     * @param {*} path Path to the .tmx file
     */
    load()
    {

    }


    update()
    {

    }


    render()
    {

    }


}