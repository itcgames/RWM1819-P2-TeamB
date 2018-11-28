class Enemy extends Obstacle {

    /**
     * 
     * @param {Vector2} startPoint 
     * @param {Vector2} endPoint 
     */
    constructor(startPoint, endPoint){
        super(new CircleCollider(new Vector2(startPoint.x, startPoint.y), 10, ['obstacle']));
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.headingToStart = false;
    }

    /**
     * 
     */
    update() {
        this.patrol();
    }

    /**
     * 
     */
    patrol() {
        if (this.headingToStart) {
            if (this.position.x < this.startPoint.x) {
                this.position.x += 3;
            } else if (this.position.x > this.startPoint.x) {
                this.position.x -= 3;
            }

            if (this.position.y < this.startPoint.y) {
                this.position.y += 3;
            } else if (this.position.y > this.startPoint.y) {
                this.position.y -= 3;
            }

            if (Math.abs(this.position.x - this.startPoint.x) <= 5 && Math.abs(this.position.y - this.startPoint.y) <= 5) {
                this.headingToStart = false;
            }
        } else {
            if (this.position.x < this.endPoint.x) {
                this.position.x += 3;
            } else if (this.position.x > this.endPoint.x) {
                this.position.x -= 3;
            }

            if (this.position.y < this.endPoint.y) {
                this.position.y += 3;
            } else if (this.position.y > this.endPoint.y) {
                this.position.y -= 3;
            }

            if (Math.abs(this.position.x - this.endPoint.x) <= 5 && Math.abs(this.position.y - this.endPoint.y) <= 5) {
                this.headingToStart = true;
            }
        }     
    }
}