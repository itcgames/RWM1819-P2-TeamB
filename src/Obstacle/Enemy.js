class Enemy extends Obstacle {

    /**
     * 
     * @param {Vector2} startPoint 
     * @param {Vector2} endPoint 
     * @param {Scalar} speed
     */
    constructor(startPoint, endPoint, speed) {
        super(new CircleCollider(new Vector2(startPoint.x, startPoint.y), 50, ['obstacle'], ['ground', 'obstacle']), startPoint, endPoint, speed);
        this.sprite = new Sprite(gameNs.game.assetManager.getAsset("assets/sprites/saw.png"),
                             415,
                             414,
                             0,
                             0,
                             this.position.x - this.collider.radius,
                             this.position.y - this.collider.radius,
                             gameNs.game.ctx);
        this.sprite.setScale(0.25, 0.25);
    }

    update(){
        this.sprite.rotate(-2);
        this.patrol();
        this.sprite.x = this.collider.position.x - this.collider.radius;
        this.sprite.y = this.collider.position.y - this.collider.radius;
    }

    render(){
    this.sprite.draw();
    }
}