class Obstacle{

    constructor(collider) {
        this.collider = collider;
    }

    get position() {
        return this.collider.position;
    }
}