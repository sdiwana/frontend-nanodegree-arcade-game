
/*-------------------------------------------------------------------*/
/* GEMS */
/*-------------------------------------------------------------------*/
// Create Gem class and provide reset, render and update prototype methods.

var Gems = function(x, y, sprite, speed) {

    // Gem class or constructor

    this.width = 50,

    this.height = 50,

    this.x = x,

    this.y = y,

    this.speed = speed,

    this.sprite = sprite;

};


Gems.prototype.reset = function() {

    // Hide gems behind the board
    this.x = -101,

    this.y = 0,

    this.speed = 0;

};


Gems.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};


Gems.prototype.update = function(dt) {

    if (this.x > board.width) {
        // Reset gems to starting point, if it exceeds board width
        this.x = 0;

    } else {
        // else allow gem to move
        this.x = this.x + this.speed *dt;

    }

};

/*-------------------------------------------------------------------*/
// Now instantiate gems array as global, did not want to keep declaring
// inside the gemArray funciton.

var gemImageArray = [

    'images/GemBlue.png',

    'images/GemGreen.png',

    'images/GemOrange.png'

];


var gemArray = function(numGems) {

// Place gem objects in an array called gemArray, number of gems
// depends on the level of the game.
    var tempArr = [],

        firstSpeed = 450;

    for (i = 0; i < numGems; i++) {

        tempArr[i] = new Gems(tile.width, (tile.height * (i+1)), gemImageArray[i], (firstSpeed + (i*100)));

    };

    return tempArr;

};
