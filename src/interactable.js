'use strict';

class Interactable{
    /*
    *   Constructor for the interactable object
    */
    constructor(x, y, width, height, tag, axisLock,range){
        
        this.sprite; // TODO: add sprite entity
        this.collider = new BoxCollider(new Vector2(x,y), width, height, [tag], ['saw']);
        this.draggable = new Draggable(this);
        this.draggable.setAxisLock(axisLock, range);
        this.range = range;

        this.sprite = new Sprite(gameNs.game.assetManager.getAsset("assets/levelAssets/PNG Metal/slice03_03.png"),
                                 width,
                                 height,
                                 0,
                                 0,
                                 x,
                                 y,
                                 gameNs.game.ctx);

        this.sprite.scaleX = width / 70;

        this.lastPosition = {x: 0, y:0};

        this.playerCollision = false;
        this.audioManager; // TODO: add sound manager
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
        this.lastPosition.x = this.collider.position.x - x;
        this.lastPosition.y = this.collider.position.y - y;
        
        if(this.lastPosition.y < 50)
        { 
            this.collider.position.y = y;
            this.sprite.y = y;
        }
        this.collider.position.x = x;
        this.sprite.x = x;
    }

    /*
    *   if the player is colliding with the interactable entity and the draggable entity is in
    *   a drag state - update the player position based on the interactable entity
    */
    updatePlayerPos(player){
        if(this.draggable.dragging){
            if(this.draggable.axis == "horizontal"){
                player.circle.position.x = player.circle.position.x - this.lastPosition.x;
            } else {
                if(this.lastPosition.y < 50){
                    player.circle.position.y =  this.collider.position.y - player.circle.radius;
                }
            }
        }
    }

    /*
    *   visual affordance for when the mouse hovers over the interactable - called in drggable component
    */
    hoverStart(){
        this.colour = this.hoverOn;
    }

    /*
    *   when the mouse has stopped colliding with the interactable return it to it's default state
    */
    hoverEnd(){
        // TODO: reset the visuals to default state
        this.colour = this.hoverOff;
    }

    render(){
        gameNs.game.ctx.beginPath();
        gameNs.game.ctx.moveTo(this.range.minX + this.collider.width / 2 ,this.range.minY + this.collider.height / 2);
        gameNs.game.ctx.lineTo(this.range.maxX + this.collider.width / 2,this.range.maxY + this.collider.height / 2);
        gameNs.game.ctx.stroke();
        gameNs.game.ctx.closePath();
        this.sprite.draw();
    }
}