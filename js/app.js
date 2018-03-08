//Global defaults
rowPixels = 101;
colPixels = 83;
minRow = 0;
minColumn = 0;
maxRow = 4;
maxColumn = 5;
x_PlayerOrigin = 2;
y_PlayerOrigin = 4;

// Enemies our player must avoid
var Enemy = function(row,col,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
    this.x = rowPixels*row;
    this.y = colPixels*col;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.checkCollisions();    
    if(this.x > maxRow*rowPixels){
        this.x = minRow;
    }
    else{
        this.x += dt * this.speed;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollisions = function(){ 
    if ((Math.trunc(this.x / rowPixels) == Math.trunc(player.x / rowPixels)) && (this.y == player.y)){
     player.resetPosition();        
   }     
}

// Player class
var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.x = rowPixels*x_PlayerOrigin;
    this.y = colPixels*y_PlayerOrigin;
}

//Draw the player on screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function() {
    
};

// Check which key was pressed and call the respective method
Player.prototype.handleInput = function(key){
    switch(key){
        case 'left': this.moveLeft();
        break;
        case 'up': this.moveUp();
        break;
        case 'right': this.moveRight();
        break;
        case 'down': this.moveDown();
        break;
    }
}

// When left arrow key is pressed, the x co-ordinate of player
// should be decreased and if the end of page has reached, 
// the player position needs to be reset.
Player.prototype.moveLeft = function(){
    this.x -= rowPixels;
    if(this.x < minRow*rowPixels){
        this.resetPosition();
    }    
}

// When right arrow key is pressed, the x co-ordinate of player
// should be increased and if the end of page has reached, 
// the player position needs to be reset.
Player.prototype.moveRight = function(){ 
    this.x += rowPixels;
    if(this.x > maxRow*rowPixels){
        this.resetPosition();
    }
}

// When up arrow key is pressed, the y co-ordinate of player
// should be decreased and if the end of page has reached, 
// the player position needs to be reset.
Player.prototype.moveUp = function(){
    this.y -= colPixels;    
    if(this.y < (minColumn+1)*colPixels){
        this.resetPosition();
    }
}

// When down arrow key is pressed, the y co-ordinate of player
// should be increased and if the end of page has reached, 
// the player position needs to be reset.
Player.prototype.moveDown = function(){   
    this.y += colPixels; 
    if(this.y > maxColumn*colPixels){
        this.resetPosition();
    }
}

//Function to reset position of the player.
//Should be positioned on the grass row, in the center.
Player.prototype.resetPosition = function(){
    this.x = x_PlayerOrigin*rowPixels;
    this.y = y_PlayerOrigin*colPixels;
}


//Instantiating
var player = new Player();

var bug1 = new Enemy(0,1,200);
var bug2 = new Enemy(0,2,80);
var bug3 = new Enemy(1,3,250);
var bug4 = new Enemy(0,3,100);
var bug5 = new Enemy(3,2,300);
var bug1 = new Enemy(0,3,100)
var allEnemies=[];

allEnemies.push(bug1,bug2,bug3,bug4,bug5);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

