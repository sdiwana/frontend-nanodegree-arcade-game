frontend-nanodegree-arcade-game
===============================

Students should use this rubric: https://www.udacity.com/course/viewer#!/c-ud015/l-3072058665/m-3072588797

for self-checking their submission.
<<<<<<< HEAD

# After Second Review
## Running the Frogger game
1. Run python server on your terminal from same directory as your project with the following command:
*python -m SimpleHTTPServer*
2. Then in your browser, type ip and port to run the game: 127.0.0.1:8000


# After First Review:
1. Eliminated double spacing in all files.
2. Created consistent var declaration in engine.js.
3. Took out SelectPlayer function and call, as they were not used.
4. Fixed click event functionality and eliminated redundant condition checking.
5. Took out some commented code that were left there by mistake.
6. NOT combining files (review does not seem to strictly require combining back) as it may create more work for reviewer??


# Before First Review:
### engine.js
- added div around canvas for show only.
- added display rules functionality by including gameRules.js file.

### app.js
- app.js now hold the global variable declarations.  Separated player.js, enemy.js, gem.js, and events.js from app.js.

### enemy.js
- provided class constructor, and update and render functionalities.  It also provides a function to instantiate enemy array based on number of enemies.

### gem.js
- provided class constructor, and update and render functionalities.  It also provides a function to instantiate gem array based on the level of the game.

### player.js
- This is where most of the action takes place.
- provided class constructor, and update and render functionalities.
- In addition, provided renderThenInitPlayer(), checkCollisions(), renderPlayerBoard(), renderScoreBoard(), renderScore(), renderLevel(), renderGemCount(), and renderGameCount() functionalities.

### events.js
= provided an addEventListener() function to catch click for player selection

### index.html
- included enemy.js, gem.js, player.js, and events.js

### style.css
- provided some style for game rules text.


||||||| merged common ancestors
=======



>>>>>>> FETCH_HEAD
