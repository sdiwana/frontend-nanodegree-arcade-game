/* Sandhya - After First Review - removed Console.log statement. */
/* Also, took out double spacing. */

/*--------------------------------------------------------------------*/
/* Rules toggle */
/*--------------------------------------------------------------------*/
function drawRules(doc) {
    //create an anchor with game rules text to toggle rules div
    var newAnchor = doc.createElement('a');
    newAnchor.setAttribute('href','#');
    newAnchor.setAttribute('id', 'slider')
    newAnchor.innerHTML = 'CLICK TO SEE GAME RULES';
    doc.body.appendChild(newAnchor);

    //create a div/ul/li structures for game rules
    var newDiv3 = doc.createElement('div');
    newDiv3.setAttribute('id', 'rules');
    newDiv3.style.display = 'none';
    var newUl2 = doc.createElement('ul');
    newUl2.setAttribute('id', 'rulesList');
    newDiv3.appendChild(newUl2);

    //Add rule text to each li
    var newLi1 = doc.createElement('li');
    newLi1.appendChild(doc.createTextNode("1. Mouse click a player on pink pad to change active player."));
    var newLi2 = doc.createElement('li');
    newLi2.appendChild(doc.createTextNode("2. Use keyboard left, up, right, and down arrow to move active player."));
    var newLi3 = doc.createElement('li');
    newLi3.appendChild(doc.createTextNode("3. Each time player collides with a bug, player loses 1 point."));
    var newLi4 = doc.createElement('li');
    newLi4.appendChild(doc.createTextNode("4. Each time player reaches water, player gains 1 point."));
    var newLi5 = doc.createElement('li');
    newLi5.appendChild(doc.createTextNode("5. When player accumulates 3 points, player moves up a level."));
    var newLi6 = doc.createElement('li');
    newLi6.appendChild(doc.createTextNode("6. Each time player collides with a gem, player gains 1 gem. Collect all 6."));
    var newLi7 = doc.createElement('li');
    newLi7.appendChild(doc.createTextNode("7. Player wins one game after player finishes level 3."));
    var newLi8 = doc.createElement('li');
    newLi8.appendChild(doc.createTextNode("8. Whole game restarts after player completes 3 games."));

    //append all li to ul
    newUl2.appendChild(newLi1);
    newUl2.appendChild(newLi2);
    newUl2.appendChild(newLi3);
    newUl2.appendChild(newLi4);
    newUl2.appendChild(newLi5);
    newUl2.appendChild(newLi6);
    newUl2.appendChild(newLi7);
    newUl2.appendChild(newLi8);

    //finally append the div to body
    doc.body.appendChild(newDiv3);

    //Toggle game rules div when anchor text RULES is clicked
    doc.getElementById('slider').onclick = function() {
        var rulesDiv = doc.getElementById('rules');
        if(rulesDiv.style.display == 'none')
            rulesDiv.style.display = 'block';
        else
            rulesDiv.style.display = 'none';
    };
};
