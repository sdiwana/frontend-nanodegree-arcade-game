
// The game board object with height and width to be used for boundary checking.
// Using object literal syntax
var board = {

    'width': 505,

    'height': 606

};

// The tile object with height and width in the game board, for boundary checking.
var tile = {

    'width': 101,

    'height' : 101

};


//global variable to caatch setInterval ID
var setIntervalID;

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

//Enemy prototype methods to be inherited by each instantiated enemy

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > board.width)
        //reset eneny to starting point, if it exceeds borad width
        this.x = 0;
    else
        //else allow enemy to run
        this.x = this.x + this.speed *dt;

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var enemyArray = function(numEnemies) {

    var tempArr = [];

    for (i=0; i < numEnemies; i++) {

        //vary the row position of enemy on y coordinate
        tempArr[i] = new Enemy(0, tile.width + 50*i);

    }

    return tempArr;

};


//Reference enemyArray with global allEnemies reference
var allEnemies = enemyArray(3);

/*-------------------------------------------------------------------*/
/* PLAYER */
/*-------------------------------------------------------------------*/
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, sprite) {

    //Player class or constructor
    this.width = 50,

    this.height = 50,

    this.x = x,

    this.y = y,

    this.score = 0,

    this.gems = 0,

    this.level = 1,

    this.catGirl = 'images/char-cat-girl.png',

    this.hornGirl = 'images/char-horn-girl.png',

    this.boy = 'images/char-boy.png',

    this.pinkGirl = 'images/char-pink-girl.png',

    this.princessGirl = 'images/char-princess-girl.png',

    this.sprite = sprite;

};

Player.prototype.init = function() {

    //if player reached water, and was rendered using setInterval, clear the setInterval.
    if (this.y === 0) {

        clearInterval(setIntervalID);

    };

    //position player in middle column and bottom row
    this.x = board.width/2 - tile.width/2;

    this.y = board.height - tile.height*2;

};


Player.prototype.update = function(dt) {

    //if player out of right, left, or down boundary, put player in starting position.
    if ((this.x >= board.width) ||

        ((this.x + this.width) <= 0) ||

        (this.y >= (board.height - tile.height))) {

            //init so that the player stays in same row?
            this.init();

    } else if (this.y === 0) {

            //if player reaches water, render player in water, then put in starting position
            this.renderThenInitPlayer();

            // give player one point for reaching water
            this.renderScore(this.score++);


    } else {

        //else if player collides with an enemy, put player in starting position
        if (this.checkCollisions()) {

            //put player back to initial position if collision with enemy
            this.init();

            //deduct one point from player for colliding with enemy
            this.renderScore(this.score--);

        }

    }

};

Player.prototype.render = function() {

    this.renderPlayerBoard();

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    this.renderScoreBoard();

};

Player.prototype.renderThenInitPlayer = function() {

            // get setInterval ID, so it can later be cleared in player.init()
            setIntervalID = setInterval(function() {
                // give player (using setInterval(10)), .01 second to render,
                // then put in starting position
                player.render();

                player.init();

            }, 10);
};


Player.prototype.renderPlayerBoard = function() {

    ctx.fillStyle = '#CC0066';

    ctx.fillRect(0, 596, board.width, tile.height*2);

    ctx.drawImage(Resources.get(this.catGirl), 0, board.height - tile.height);

    ctx.drawImage(Resources.get(this.hornGirl), tile.width, board.height - tile.height);

    ctx.drawImage(Resources.get(this.boy), tile.width*2, board.height - tile.height);

    ctx.drawImage(Resources.get(this.pinkGirl), tile.width*3, board.height - tile.height);

    ctx.drawImage(Resources.get(this.princessGirl), tile.width*4, board.height - tile.height);

};


Player.prototype.renderScoreBoard = function() {

    ctx.fillStyle = '#CC0066';

    ctx.fillRect( 0, 0, board.width, tile.height/2);

    ctx.fillStyle = '#FF00FF';

    ctx.font = "20px Georgia";

    ctx.strokeText("SCORE: ", 40, 30);

    ctx.strokeText("LEVEL: ", 200, 30);

    ctx.strokeText("GEMS: ", 380, 30);

    ctx.font = "30px Georgia";

    ctx.strokeText(this.score, 120, 30);

    ctx.strokeText(this.level, 280, 30);

    ctx.strokeText(this.gems, 460, 30);

    ctx.save();

};


Player.prototype.renderScore = function(score) {

    ctx.strokeText(score, 120, 30);

};


Player.prototype.handleInput = function (moveKey) {
    //First check if Player is not getting out of the board,
    //then increase or decrease x or y movement.
    switch(moveKey) {

        case 'left':

            if (this.x >= 0)

                this.x = this.x - tile.width;

            break;

        case 'up':

            if (this.y >= 0)

                this.y = this.y - tile.height;

            break;

        case 'right':

            if (this.x <= board.width - tile.width)

                this.x = this.x + tile.width;

            break;

        case 'down':

            if (this.y <= board.width - tile.width)

                this.y = this.y + tile.height;

            break;

    }

};

Player.prototype.checkCollisions = function() {

       var playerCoord = this;

       var enemyCoord;

       for (i = 0; i < allEnemies.length; i++) {

                enemyCoord = allEnemies[i];

                if (playerCoord.x < enemyCoord.x + enemyCoord.width &&

                    playerCoord.x + playerCoord.width > enemyCoord.x &&

                    playerCoord.y < enemyCoord.y + enemyCoord.height &&

                    playerCoord.y + playerCoord.height > enemyCoord.y) {

                    return true;

                }

        }

};




document.addEventListener('dblclick', function(e) {


            console.log("DOUBLE CLICKED!! clientX = " + e.clientX + " clientY = " + e.clientY);


            ctx.rect(391,578,71,71);
            if (ctx.isPointInPath(e.clientX, e.clientY)) {
                //player.selectPlayer('1');
                selectPlayer('1');
                e.preventDefault();
                return;
            };

            ctx.rect(491,578,71, 71);
            if (ctx.isPointInPath(e.clientX, e.clientY)) {
                //player.selectPlayer('2');
                selectPlayer('2');
                e.preventDefault();
                return;
            };

            ctx.rect(591,578,71, 71);
            if (ctx.isPointInPath(e.clientX, e.clientY)) {
                //player.selectPlayer('3');
                selectPlayer('3');
                e.preventDefault();
                return;
            };

            ctx.rect(691,578,71, 71);
            if (ctx.isPointInPath(e.clientX, e.clientY)) {
                //player.selectPlayer('4');
                selectPlayer('4');
                e.preventDefault();
                return;
            };

            ctx.rect(791,578,71, 71);
            if (ctx.isPointInPath(e.clientX, e.clientY)) {
                //player.selectPlayer('5');
                selectPlayer('5');
                e.preventDefault();
                return;
            };



});

var playerImage;
var player;



//Player.prototype.selectPlayer = function(playerNo) {
function selectPlayer(playerNo) {
    console.log("SELECT PLAYER playerNo " + playerNo);

    switch(playerNo) {

        case '1':

            playerImage = 'images/char-cat-girl.png';
            mySprite.image = playerImage;
            //player = new Player(board.width/2 - tile.width/2, board.height - tile.height*2, 'images/char-cat-girl.png');
            console.log("playerImage = " + playerImage);
            console.log("mySprite.image = " + mySprite.image);
            break;

        case '2':

            playerImage = 'images/char-horn-girl.png';

            console.log("playerImage = " + playerImage);

            break;

        case '3':

            playerImage ='images/char-boy.png';

            console.log("playerImage = " + playerImage);

            break;

        case '4':

            playerImage = 'images/char-pink-girl.png';

            console.log("playerImage = " + playerImage);

            break;

        case '5':

            playerImage = 'images/char-princess-girl.png';

            console.log("playerImage = " + playerImage);

            break;
        }


};

console.log (" after playerImage = " + playerImage);
//var player = new Player(board.width/2 - tile.width/2, board.height - tile.height*2, playerImage);
var player = new Player(board.width/2 - tile.width/2, board.height - tile.height*2, 'images/char-cat-girl.png');





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