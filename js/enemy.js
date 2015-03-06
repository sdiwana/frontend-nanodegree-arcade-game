
/*-------------------------------------------------------------------*/
/* ENEMY */
/*-------------------------------------------------------------------*/

// Enemy class constructor with x, y parameters, so enemies can be
// instantiated at different coordinates.
// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.width = 50,

    this.height = 50,

    this.x = x,

    this.y = y,

    this.speed = 10 + Math.random()*200,

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

};


// Reset enemy at the end of level 3
Enemy.prototype.reset = function() {

    // Hide gems behind the board
    this.x = -101,

    this.y = 0,

    this.speed = 0;

};


// Enemy prototype methods to be inherited by each instantiated enemy
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > board.width)
        // Reset enemy to starting point, if it exceeds borad width
        this.x = 0;
    else
        // else allow enemy to run
        this.x = this.x + this.speed *dt;

};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};


/*-------------------------------------------------------------------*/
// Now instantiate enemy array
// Place all enemy objects in an array called allEnemies

var enemyArray = function(numEnemies) {

    var tempArr = [];

    for (i = 0; i < numEnemies; i++) {

        //vary the row position of enemy on y coordinate
        tempArr[i] = new Enemy(0, tile.width + 50*i);

    }

    return tempArr;

};

