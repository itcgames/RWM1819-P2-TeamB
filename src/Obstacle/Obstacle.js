class Obstacle{

    constructor(collider, startPoint, endPoint, speed) {
        this.collider = collider;
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.speed = speed;
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
                this.position.x += this.speed;
            } else if (this.position.x > this.startPoint.x) {
                this.position.x -= this.speed;
            }

            if (this.position.y < this.startPoint.y) {
                this.position.y += this.speed;
            } else if (this.position.y > this.startPoint.y) {
                this.position.y -= this.speed;
            }

            if (Math.abs(this.position.x - this.startPoint.x) <= 5 && Math.abs(this.position.y - this.startPoint.y) <= 5) {
                this.headingToStart = false;
            }
        } else {
            if (this.position.x < this.endPoint.x) {
                this.position.x += this.speed;
            } else if (this.position.x > this.endPoint.x) {
                this.position.x -= this.speed;
            }

            if (this.position.y < this.endPoint.y) {
                this.position.y += this.speed;
            } else if (this.position.y > this.endPoint.y) {
                this.position.y -= this.speed;
            }

            if (Math.abs(this.position.x - this.endPoint.x) <= 5 && Math.abs(this.position.y - this.endPoint.y) <= 5) {
                this.headingToStart = true;
            }
        }     
    }

    get position() {
        return this.collider.position;
    }

    set position(position) {
        this.collider.position = position;
    }
}