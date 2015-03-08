/* Sandhya - After First Review - removed commented code left here by mistake. */
/* Also, eliminated double spacing throughout the code. */

/*-------------------------------------------------------------------*/
/* PLAYER */
/*-------------------------------------------------------------------*/
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// Added renderThenInitPlayer(), checkCollisions(), renderPlayerBoard(),
// renderScoreBoard(), renderScore(), renderLevel(), renderGemCount(),
// and renderGameCount() prototype functions.


// Variable to reset setInterval ID
var setIntervalID;

var Player = function(x, y, sprite) {
    // Player class or constructor
    this.width = 50,
    this.height = 50,
    this.x = x,
    this.y = y,
    this.score = 0,
    this.gemCount = 0,
    this.level = 1,
    this.gameCount = 0,
    this.sprite = 'images/char-cat-girl.png',
    // Player image array to be used
    // for display of players for selection
    // Not quite sure if this belongs to player object
    this.playerList = ['images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-boy.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png'
    ];
};


Player.prototype.reset = function() {
    // When player reached water, it was rendered using setInterval, clear the setInterval.
    if (this.y === 0) {
        clearInterval(setIntervalID);
    };

    // Position player in middle column of bottom row
    this.x = board.width/2 - tile.width/2;
    this.y = board.height - tile.height*2;
};


Player.prototype.update = function() {
    // This is where all calculations, collision check, and re-rendering takes place
    var waterLevel = 0;
    // If player out of right, left, or down boundary, put player in starting position.
    if ((this.x >= board.width) || // Exceeds canvas width on right side
        ((this.x + this.width) <= 0) || // Or is less than the srating point of x on left side
        (this.y >= (board.height - tile.height))) { // Or goes out of bottom range of canvas
            // Init player so it goes back to starting position
            this.reset();
    } else if (this.y === waterLevel) {  //player has reached water
            this.handleWaterLevelAccess();
            this.handleLevelandGameIncrement();
    } else { //check for and handle collision with enemies or gems
            this.handleEnemyAndGemCollisions();
    };
};


Player.prototype.render = function() {
    // Display the score board
    this.renderScoreBoard();
    // Display the active Player
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    // Display players to be selected from
    this.renderPlayerBoard();
};


Player.prototype.renderThenInitPlayer = function() {
    // Get setInterval ID, so it can later be cleared in player.init()
    setIntervalID = setInterval(function() {
        // Give player .01 second to render, then put in starting position
        player.render();
        player.reset();
    }, 10);
};


Player.prototype.handleWaterLevelAccess = function() {
    // Render player in water for a 10th of a second, then put it in starting position
    this.renderThenInitPlayer();
    // Give player one point for reaching water
    this.renderScore(this.score++);
};


Player.prototype.handleLevelandGameIncrement = function() {
    //declare variables
    var  maxScore = 3,
        maxLevel = 3,
        startingScore = 0;

    // Increment level as long as max level is not reached
    if (this.score === maxScore) {
        // Keep incrementing level as long as it hasn't reached max level
        if (this.level <= (maxLevel - 1)) {
            this.level++;
            // When one level reached, adjust score to 0 for next level
            this.score = startingScore;
            // Instantiate gems based on level
            gems = gemArray(this.level);
        } else if (this.level === maxLevel) { // If player reaches max level
            // Player accumulates 1 Game after reaching max Level.
            this.renderGameCount(this.gameCount++);
            // Increase enemy count by one for each game won
            allEnemies = enemyArray(this.gameCount + 3);
            //reset score, level, gemCount, and gameCount
            this.resetAndRenderAll();
        };
    };
};


Player.prototype.handleEnemyAndGemCollisions = function() {
    // Check enemy collision
    if (this.checkCollisions(allEnemies)) {
        // Put player back to initial position if collision with enemy
        this.reset();
        // Deduct one point from player for colliding with enemy
        this.renderScore(this.score--);
    };

    //check gem collision
    var gem;
    if (gem = this.checkCollisions(gems)) {
        // Put gems back to initial position if collision with player
        gem.reset();
        // Increment gem score if player collides with a gem
        this.renderGemCount(this.gemCount++);
    };
};


Player.prototype.resetAndRenderAll = function() {
    // MaxLevel reached, reset score, level, gemCount, and instantiate one gem
    this.reset();
    this.score = 0;
    this.level = 1;
    this.gemCount = 0;
    // Reset game to 0 and restart with initial enemy count
    if (this.gameCount === 3) {
        this.gameCount = 0;
        allEnemies = enemyArray(3);
    }
};


Player.prototype.checkCollisions = function(collisionArray) {
    //local variable
    var collided;
    // Check collision between player and enemy or player and gem
    // Check if x,y coordinate of player is within the colliding object's rectangle
    for (i = 0; i < collisionArray.length; i++) {
        collided = collisionArray[i];
        if (this.x < collided.x + collided.width &&
            this.x + this.width > collided.x &&
            this.y < collided.y + collided.height &&
            this.y + this.height > collided.y) {
                return collided;
            };
    };
};


Player.prototype.renderPlayerBoard = function() {
    // Display pink pad for players to be selected
    ctx.fillStyle = '#CC0066';
    ctx.fillRect(0, board.height, board.width, tile.height);
    // Go through player.playerlist and display players set apart by tile.width
    for (i = 0; i < this.playerList.length; i++) {
        ctx.drawImage(Resources.get(this.playerList[i]), tile.width * i, board.height - tile.width);
    };
};


Player.prototype.renderScoreBoard = function() {
    // Display Score Board with score, level, gems and game label and initial values
    ctx.fillStyle = '#CC0066';
    ctx.fillRect( 0, 0, board.width, tile.height/2);
    ctx.strokeStyle="#FFFFFF";
    ctx.fillStyle = '#000000';
    ctx.font = "20px Georgia";
    ctx.strokeText("SCORE: ", 20, 30);
    ctx.strokeText("LEVEL: ", 150, 30);
    ctx.strokeText("GEMS: ", 270, 30);
    ctx.strokeText("GAME: ", 390, 30);
    ctx.font = "30px Georgia";
    ctx.strokeText(this.score, 100, 30);
    ctx.strokeText(this.level, 230, 30);
    ctx.strokeText(this.gemCount, 340, 30);
    ctx.strokeText(this.gameCount, 460, 30);
    ctx.save();
};


Player.prototype.renderScore = function(score) {
    // Display changed score
    ctx.strokeText(score, 100, 30);
};


Player.prototype.renderLevel = function(level) {
    // Display changed level
    ctx.strokeText(level, 230, 30);
};


Player.prototype.renderGemCount = function(gemCount) {
    // Display changed gem count
    ctx.strokeText(gemCount, 340, 30);
};


Player.prototype.renderGameCount = function(gameCount) {
    // Display changed game count
    ctx.strokeText(gameCount, 460, 30);
};


Player.prototype.handleInput = function (moveKey) {
    // First check if Player is not getting out of the board,
    // then increase or decrease x or y movement.
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
