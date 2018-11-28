'use strict';

class Interactable{
    /*
    *   Constructor for the interactable object
    */
    constructor(x, y, width, height, tag, colour,range){
        
        this.sprite; // TODO: add sprite entity
        this.collider = new BoxCollider(new Vector2(x,y), width, height, tag, "");
        this.draggable = new Draggable(this);
        this.draggable.setAxisLock("horizontal", range);

        console.log(this.collider);

        this.playerCollision = false;
        this.audioManager; // TODO: add sound manager
        this.colour = colour;

        this.hoverOn = 'blue';
        this.hoverOff = colour;
    }

    /*
    *   get the box collider of the entity - called in the draggable component
    */
    getCollider(){
        if(this.collider != undefined){
            return this.collider;
        }
    }

    getBoundingBox(){
        if(this.collider != undefined){
            return {x: this.collider.shape.position.x, y: this.collider.shape.position.y, 
            width: this.collider.shape.width, height: this.collider.shape.height};}
    }

    /*
    *   set the boolean to confirm that the player has collided with this object
    */
    collidingWithPlayer(colliding){
        this.playerCollision = colliding;
    }

    /*
    *   function to call an audio response from the manager - called in the draggable component
    */
    audioResponse(name)
    {
        if(this.audioManager != undefined){   
            this.audioManager.playSound(name);}
    }

    updatePosition(x,y){
        this.collider.shape.position.x = x;
        this.collider.shape.position.y = y;
    }

    /*
    *   if the player is colliding with the interactable entity and the draggable entity is in
    *   a drag state - update the player position based on the interactable entity
    */
    updatePlayerPos(player){
        if(this.draggable.dragging){
            var pCollider = player.getCollider()
            if(this.draggable.axisLock == "horizontal"){
                player.setX(this.collider.x + pCollider.position.x);
            } else {
                player.setY(this.collider.y + pCollider.position.y);
            }
        }
    }

    /*
    *   visual affordance for when the mouse hovers over the interactable - called in drggable component
    */
    hoverStart(){
        // TODO: add visual affordance for hover over
        this.colour = this.hoverOn;
    }

    /*
    *   when the mouse has stopped colliding with the interactable return it to it's default state
    */
    hoverEnd(){
        // TODO: reset the visuals to default state
        this.colour = this.hoverOff;
    }

    draw(ctx){
        // TODO: replace with sprite rendering
        // testing the draw
        ctx.beginPath();
        ctx.fillStyle = this.colour;
        var collider = this.getCollider();
        ctx.fillRect(collider.x, collider.y, collider.width, collider.height);
        ctx.closePath();
    }
}