/* Sandhya - After First Review - Eliminated redundant condition checking */
/* from click event listener. */

/*-------------------------------------------------------------------*/
/* EVENTS
/*-------------------------------------------------------------------*/

// This eventlistener listens for a click on one of the players to be
// selected.
document.addEventListener('click', function(event) {

    // Get boundaries
    var x = event.pageX - canvas.offsetLeft,
        y = event.pageY - canvas.offsetTop,
        playerY = board.height - (tile.height/2),
        playerX = 0;

    // Loop through player list
    for (i = 0; i < player.playerList.length; i++) {
        playerX = tile.width * i;
        if (y > playerY && y < playerY + tile.height && x > playerX && x < playerX + tile.width) {
            // Players are displayed one on each tile, so check boundary accordingly.
            // First player's x coordinate starts at 0 then moves on to 5th player, each
            // spaced at tile.width of 101
            player.sprite = player.playerList[i];
        };
    };
}, false);


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