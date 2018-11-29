class Sawblade extends Obstacle {

    constructor(position, radius) {
        super(new CircleCollider(new Vector2(position.x, position.y), radius, ['obstacle'], ['ground', 'obstacle']), position, position, 0);
    }
}