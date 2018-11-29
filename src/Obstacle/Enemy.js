class Enemy extends Obstacle {

    /**
     * 
     * @param {Vector2} startPoint 
     * @param {Vector2} endPoint 
     * @param {Scalar} speed
     */
    constructor(startPoint, endPoint, speed){
        super(new CircleCollider(new Vector2(startPoint.x, startPoint.y), 10, ['obstacle'], ['ground', 'obstacle']), startPoint, endPoint, speed);
    }
}