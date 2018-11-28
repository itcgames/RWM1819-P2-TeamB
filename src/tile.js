class Tile
{
    constructor(xPos, yPos, frameLeft, frameTop, width, height, ctx)
    {
        //Sprite initialization
        this.sprite = new Sprite(gameNs.game.assetManager.getAsset("assets/levels/grassSheet.png"), 
                                 width, 
                                 height, 
                                 frameLeft, 
                                 frameTop, 
                                 xPos, 
                                 yPos, 
                                 gameNs.game.ctx);
        
        this.x = xPos;
        this.y = yPos;
    }

    render()
    {
        this.sprite.draw();
    }

    
}