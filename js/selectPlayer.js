
/*--------------------------------------------------------------------*/
/* Player Selection */
/*--------------------------------------------------------------------*/
function selectPlayer(doc) {
    //create an array of players to be selected at any time
    var playerArr = ['images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-boy.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png'];

    //create div/ul/li/img structure
    var newDiv2 = doc.createElement('div');
    newDiv2.setAttribute('id', 'players');
    var newUl1 = doc.createElement('ul');
    newUl1.setAttribute('id', 'playersList');
    newDiv2.appendChild(newUl1);

    //create 5 li for 5 images, append them to ul, and assign 1 to 5 id to images
    for (var i = 0; i < 5; i++) {
        var newLi = doc.createElement('li');
        newUl1.appendChild(newLi);
        var newImage = doc.createElement('img');
        newImage.src = playerArr[i];
        newImage.setAttribute('id', i+1);
        newLi.appendChild(newImage);
    }

    //append the whole structure to the div
    doc.body.appendChild(newDiv2);

    //when player clicked, assign corresponding image to player sprite.
    doc.getElementById('1').onclick = function() {
        player.sprite = playerArr[0];
    };

    doc.getElementById('2').onclick = function() {
        player.sprite = playerArr[1];
    };

    doc.getElementById('3').onclick = function() {
        player.sprite = playerArr[2];
    };

    doc.getElementById('4').onclick = function() {
        player.sprite = playerArr[3];
    };

    doc.getElementById('5').onclick = function() {
        player.sprite = playerArr[4];
    };

};

