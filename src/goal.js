class Goal
{
    constructor(xPos, yPos, frameLeft, frameTop, width, height, ctx)
    {
        this.collider = new CircleCollider(new Vector2(xPos - width / 2, yPos), width / 4, ['goal']);
        //Sprite initialization
        this.sprite = new Sprite(gameNs.game.assetManager.getAsset("assets/sprites/endGoal.png"),
                                 width,
                                 height,
                                 frameLeft,
                                 frameTop,
                                 xPos - this.collider.radius,
                                 yPos - this.collider.radius,
                                 gameNs.game.ctx);

        this.x = xPos;
        this.y = yPos;        
    }

    render()
    {
        this.sprite.draw();
    }


}
