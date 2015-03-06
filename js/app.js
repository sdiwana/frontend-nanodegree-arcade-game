
/* -------------------------------------------------------------------*/
// This file holds initial object instantiation and global variables.
/* -------------------------------------------------------------------*/

// Using board variable to use original canvas height and width.
// Have extended canvas height in engine, but keeping the original height here.
var board = {

            'width': 505,

            'height': 606

            };

// The tile object with height and width is useful for boundary checking,
// and also as overlap square for player selection
var tile = {

            'width': 101,

            'height': 101

        };

/* -------------------------------------------------------------------*/
// Instantiate enemies, gems, and player in their initial position
// and number to start the game
/* -------------------------------------------------------------------*/

// Declare and reference enemyArray with global allEnemies reference
var allEnemies = enemyArray(3);

// Start with a gem array of one gem
var gems = gemArray(1);

// Now instantiate player object with Player class, position player in bottom middel cell
var player = new Player(board.width/2 - tile.width/2, board.height - tile.height*2);


