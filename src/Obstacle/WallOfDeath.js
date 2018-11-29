class WallOfDeath extends Obstacle {

    /**
     * 
     * @param {Scalar} startPointX the x-coordinate of the walls start position.
     * @param {Scalar} speed 
     */
    constructor(startPointX, speed) {
        super(new BoxCollider(new Vector2(0, 0), 10, gameNs.game.canvas.height, ['obstacle'], ['ground', 'obstacle']), new Vector2(startPointX, 0), new Vector2(gameNs.game.canvas.width, 0), speed);
    }
}