"use strict";


function gameOverStatus(game) {
    document.getElementById('statusbar').innerHTML = "SCORE = " + game.score;
    if (!game.playing && game.win === true) {
        document.getElementById('statusbar').innerHTML = "YOU WIN!.....FINAL SCORE = " + game.score;
    } else if (!game.playing && game.win === false) {
        document.getElementById('statusbar').innerHTML = "GAME OVER...TRY AGAIN";
    } else {
        document.getElementById('statusbar').innerHTML = "CURRENT SCORE: " + game.score;
    }
};

function testBestScore(game) {
    if (game.finalScore < recordScore | recordScore == "NOT SET") {
        return true;
    };
    return false;
};

function finishGame(game) {
// alert("the tag is : " + tag);   
        game.finalScore = game.score;
        game.playing = false;
        gameOverStatus(game);

    // var updateHighScoreForm = "<form class='updateScore' action='updateHighScore.php' method='post'><input type='submit' id='updateScoreButton' name='updateScoreButton' class='controlButton' value='SAVE NEW RECORD' ><input type='text' name='finalScore' id='finalScore' value='" +game.finalScore + "' </form>"

    var updateHighScoreForm = "<form id='insertUpdateLevelScoreForm' class='updateScore' action='updateHighScore.php' method='post'> \
        <input type='hidden' id='updateScoreButton' name='updateScoreButton' class='controlButton' value='SAVE NEW HIGH SCORE'>\
        <input type='hidden' id='tag' name='tag' value='"+tag+"'>\
        <input type='hidden' id='seedlev' name='seedlev' value='"+seedlev+"'>\
        <input type='hidden' id='newRecordScore' name='newRecordScore' value='"+game.finalScore+"'>\
        <input type='hidden' id='newPuzName' name='newPuzName' value='puzname" + Date() + "'>\
        <input type='hidden' id='randomYesNo' name='randomYesNo' value=''>\
    </form>";


        // alert("Your score: " + game.score + "\nRecord Score: " + recordScore + "\nNew best score? " + testBestScore(game)+ "\nTag: " + tag);
        if (testBestScore(game) & tag != "ANONYMOUS"){
            document.getElementById('statusbar').innerHTML = updateHighScoreForm;
            document.getElementById('updateScoreButton').type="submit";
            //IF RANDOM LEVEL BEAT --> CHANGE NAME TO REFLECT LEVEL BEING SAVED
        if(isRandomLevel) {
            alert('this was a random level, so do that code');
            document.getElementById('updateScoreButton').value="SAVE NEW PUZZLE AND SCORE";
            document.getElementById('newPuzName').type="text";
            document.getElementById('insertUpdateLevelScoreForm').action="insertNewPuzzle.php";
        } else {
            alert('isRandomLevel was set to false, meaning it was already a level');
            
            // document.getElementById('randomYesNo').value="YES";
        };


            //IF EXISTING LEVEL BEAT --> CHANGE NAME TO REFLECT NEW HIGH SCORE BEING SAVED


            
        } else if(puzname == "RANDOM PUZZLE") {
                alert('you beat a random puzzle!');
        };

        // document.getElementById('newRecordScore').type="text";

                        //if they WIN && they ARE LOGGED IN, they should see a button to SAVE their new low score to the database
        
        if (game.finalScore < recordScore) {
            document.getElementById('statusbar').innerHTML += "<? php echo $updateScoreButton ?>";


        };
        //


}

//game = new Game();

// var Util = {
//     seed : Math.random(),     //not ideal since not private
            
//     random : function (newSeed){   //[0 - 1.0)  optional seeding     
//         if(newSeed) Util.seed = newSeed;        
        
//         Util.seed = (Util.seed*9301 + 49297) % 233280;
//         var ret = Util.seed/233280;
//         if(ret>=1) ret = .99999;  //maybe rounding error?
//         return ret;
//     };


// the initial seed with PHP, ESCAPE IT, ECHO IT INTO, and GRAB IT INTO JAVASCRIPT

//getting non-seeded random int between x and y
function getRandomInt(min,max) {
    return Math.floor(Math.random()* (max - min +1)) + min;
};

if (seedlev == 0) {
    // Math.seed = Math.random();
    // seedlev = Math.floor(Math.random()*1000 + 9999);
    seedlev = getRandomInt(100,1000000);
    Math.seed = seedlev;
    // alert("seed is 0 and Math.seed is " + Math.seed);
    // alert("seedlev is " + seedlev);
} else {
    // alert('seedlev is ' + seedlev);
    Math.seed = seedlev;
};

                                        ///NEED TO OUPUT THE RESTART BUTTON
var setRestartActionAttribute = "single.php?seedlev="+seedlev;

document.getElementById('restartCurrentPuzzle').action=setRestartActionAttribute;


// alert(seedlev);
 
// in order to work 'Math.seed' must NOT be undefined,
// so in any case, you HAVE to provide a Math.seed

Math.seededRandom = function(max, min) {
    max = max || 1;
    min = min || 0;
 
    Math.seed = (Math.seed * 9301 + 49297) % 233280;
    var rnd = Math.seed / 233280;
 
    return min + rnd * (max - min);
};


//Get the seed from the page

//use the seed to initiate the puzzle


// function setSeed(seedNumber) {
//     seed = seedNumber;
// };



var gameArray = new InitGame(); // gameArray will hold all the information for the new game...it will be passed to the canvas drawer
                                    // this file should be monitoring for input                                    // ANY CHANGES SHOULD CHANGE THE gameArray object accordingly, and send that object to the canvas drawer


drawBoard(gameArray);
                        //THIS WILL RESIZE THE CANVAS ON WINDOW RESIZE
function resize_canvas(){
            drawBoard(gameArray);
};
        
function InitGame() { // THIS WILL MAKE THE INITIAL ARRAY, 
                      //ASSIGN THE PUSHER TO A SPACE, 
                      //ASSIGN THE TARGET, 
                      //FILL IN THE WEIGHTS
                      //ASSIGN SCORE = 0     ************* this should not be touched after it creates a new game object    
    this.playing = true;        // THIS MEANS THE GAME IS ACTIVE
    this.maxPushWeight = 5;
    // this.maxPushWeight = prompt("give max weight for the game");
    
    function randWeight() {
        var weight;
        var num = Math.seededRandom();
        if (num < .2) {
            weight = 1;
        } else if (num < .3) {
            weight = 2;
        } else if (num < .4) {
            weight = 3;
        } else {
            weight = 0;
        }
        return (weight);
    };
    
   
    var n = Math.floor(Math.seededRandom(13, 8));
    // alert(n);
    this.board = new Array(n);   
    this.score = 0;
        //USE A LOOP TO POPULATE THE BOARD
            for (i = 0; i<this.board.length; i += 1) {
                this.board[i] = [];
                for (var j = 0; j < this.board.length; j +=1) {
                    this.board[i][j] = randWeight();       // POPULATE THE CELLS WITH WEIGHTS
                };
            };  
        var lastRow = this.board.length-1;
        if (this.board[lastRow].indexOf(0) > -1 ) {        //THIS code will be run if there IS a zero in the last row...proceed to place BOBCAT
            var firstZero = this.board[lastRow].indexOf(0);
        };
        
                //ASSIGN THE PUSHER LOCATION (row, col)
    this.pusher = {
        r: this.board.length-1,
        c: 0,
        direction: 'right'
    };

    do { 
        this.pusher.c = Math.floor(Math.seededRandom(n, 0));
        console.log('assigning pusher');
    } while (this.board[this.pusher.r][this.pusher.c] !== 0);
    this.startRow = this.pusher.r;
    this.startCol = this.pusher.c; 
    
    this.target = {
                            //pick a random crate (non-zero) that is NOT on an edge
            r: Math.floor(Math.seededRandom(this.board.length-2, 1)),
            c: Math.floor(Math.seededRandom(this.board.length-2, 1))
             };
        //MAKE SURE THE TARGET ISN'T ON THE EDGE
    while (this.board[this.target.r][this.target.c] === 0) {
        this.target.r = Math.floor(Math.seededRandom(this.board.length-2, 1));
        this.target.c = Math.floor(Math.seededRandom(this.board.length-2, 1));
    };
     
    console.log('Update pusher row and col with "P" ' );
    console.log('the pusher row: ' + this.pusher.r);
    console.log('the pusher col: ' + this.pusher.c);
    console.log('the board length is ' + this.board.length);
    console.log('the TARGET is at row ' + this.target.r + ' column ' + this.target.c);
    var col = this.pusher.c;
    var row = this.pusher.r;

    
    for (var i = 0; i < this.board.length ; i += 1) {
        console.log(this.board[i].join( ' ' ));    
    };   

    return this;
};
//drawBoard(gameArray);

console.log(gameArray);


document.onkeydown = function checkKey(e) {
    e = e || window.event;
//    alert(e.keyCode);


if (!(e.keyCode === 40 || e.keyCode === 83 || e.keyCode === 39 || e.keyCode === 68 || e.keyCode === 37 || e.keyCode === 65 || e.keyCode === 38 || e.keyCode === 87 || e.keyCode === 32)) {
    return;
} else if (isPlayable) {
    
    if (e.keyCode === 32) {
        if(isPlayable(gameArray)) {
        gameArray = moves(gameArray, 'xplode');
        };
        drawBoard(gameArray);
    };
    if (e.keyCode === 38 || e.keyCode === 87) {
        if(isPlayable(gameArray)) {
        gameArray = moves(gameArray, 'up');
        };
        drawBoard(gameArray);        
    };
    if (e.keyCode === 37 || e.keyCode === 65) {
        if(isPlayable(gameArray)) {
        gameArray = moves(gameArray, 'left');
        };
        drawBoard(gameArray);
    };
    if (e.keyCode === 39 || e.keyCode === 68) {
        if(isPlayable(gameArray)){
        gameArray = moves(gameArray, 'right');
        };
        drawBoard(gameArray);
    };
    if (e.keyCode === 40 || e.keyCode === 83) {
        if(isPlayable(gameArray)) {
        gameArray = moves(gameArray, 'down');
        };
        drawBoard(gameArray);
    };
};
    if (!isPlayable(gameArray) && (e.keyCode === 40 || e.keyCode === 83 || e.keyCode === 39 || e.keyCode === 68 || e.keyCode === 37 || e.keyCode === 65 || e.keyCode === 38 || e.keyCode === 87 || e.keyCode === 32)) {
        // alert('Refresh for a new game!');
    };
}; //THIS IS THE KEY READER FOR INPUT - CONTROLLING THE PUSHER


function isPlayable(game) {
                     //IF THE TARGET IS ON THE EDGE, AND THE STARTING SQUARE IS NOT ON THE SAME EDGE, IT IS IMPOSSIBLE TO WIN
        if (game.playing === false) {
            // alert('reload the page to play again');
            return;
        } else if ( (game.target.c === 0 && game.startCol !== 0) || (game.target.c === game.board.length-1 && game.startCol !== game.board.length-1) || (game.target.r === 0)) {
            game.win = false;
            game.playing = false; 

                    // alert('the game is over');

        };
        return game.playing;
    };




function moves (game, input) { //THIS IS THE FUNCTION TO MOVE THE PUSHER AND CRATES
//    console.log(game);

    var direction = game.pusher.direction;
    if (input === "up") {                                   //Player presses UP key
        if (game.pusher.direction === "up") {                                   //already faced up, so make the move up
            console.log("the pusher is facing " + direction);
        } else {
            console.log("turning the pusher");
            console.log("pusher row = " + game.pusher.r + "\n pusher col = " + game.pusher.c);
            if (direction === "left" || direction === "right") {
                game.pusher.direction = "up";
                game.score += 1; //SCORE INCREASE FOR TURNING THE PUSHER
                
            } else if (direction === "down") { //if the pusher is facing down, and the user wants them facing up, it will cost 2 moves
                game.pusher.direction = "up";
                game.score += 2;
            };
            return(game);
        };
    };
//        if (input === "faceDown") {
//        if (game.pusher.direction === "up") {
//            console.log("the pusher is facing " + direction);
//        } else {
//            console.log("turning the pusher");
//            console.log("pusher row = " + game.pusher.r + "\n pusher col = " + game.pusher.c);
//            if (direction === "left" || direction === "right") {
//                game.pusher.direction = "up";
//                game.score += 1;
//            } else if (direction === "down") {
//                game.pusher.direction = "up";
//                game.score += 2;
//            };
////        publishBoard(game);
//        };
//    };
        if (input === "faceLeft") {
        if (game.pusher.direction === "up") {
            console.log("the pusher is facing " + direction);
        } else {
            console.log("turning the pusher");
            console.log("pusher row = " + game.pusher.r + "\n pusher col = " + game.pusher.c);
            if (direction === "left" || direction === "right") {
                game.pusher.direction = "up";
                game.score += 1;
            } else if (direction === "down") {
                game.pusher.direction = "up";
                game.score += 2;
                return(game);
            };
//        publishBoard(game);
        };
    };
        if (input === "faceRight") {
        if (game.pusher.direction === "up") {
            console.log("the pusher is facing " + direction);
        } else {
            console.log("turning the pusher");
            console.log("pusher row = " + game.pusher.r + "\n pusher col = " + game.pusher.c);
            if (direction === "left" || direction === "right") {
                game.pusher.direction = "up";
                game.score += 1;
            } else if (direction === "down") {
                game.pusher.direction = "up";
                game.score += 2;
            };
//        publishBoard(game);
        };
    };
    if (input === "up") {
        console.log('pusher row before moveUp = ' + game.pusher.r);
        console.log('pusher col before moveUp = ' + game.pusher.c);
        game = moveUp(game);
    };
    if (input === "right" ){
        console.log('pusher row before moveRight = ' + game.pusher.r);
        console.log('pusher col before moveRight = ' + game.pusher.c);
        game = moveRight(game);
        
    };
    if (input === "down" ){
        console.log('pusher row before moveDown = ' + game.pusher.r);
        console.log('pusher col before moveDown = ' + game.pusher.c);
        game = moveDown(game);
    };
    if (input === "left" ){
        console.log('pusher row before moveLeft = ' + game.pusher.r);
        console.log('pusher col before moveLeft = ' + game.pusher.c);
        game = moveLeft(game);
        
    };
    
    if (input === "xplode") {                                                              //REMEMBER, DON'T LET IT EXPLODE THE TARGET!
        // if direction UP --> xplode up (row +1)(same col)
        if (game.pusher.direction === "up" ) {
            if(game.pusher.r-1 === game.target.r && game.pusher.c === game.target.c) {
                alert('you cannot blow up the target crate!');
            } else if(game.board[game.pusher.r-1][game.pusher.c] === 0) {
                alert('that\'s an empty space!');
            } else {
                game.board[game.pusher.r-1][game.pusher.c] = 0;
//                game.pusher.r -= 1;  //COMMENTED OUT BECAUSE MAYBE THEY DON'T WANT TO MOVE AS WELL
                //alert('boom');
                game.score += 100;
        };
           
        } else if (game.pusher.direction === "down" ) {     //if direction DOWN --> xplode down (row -1) (same col)
            if(game.pusher.r+1 === game.target.r && game.pusher.c === game.target.c) {
                alert('you cannot blow up the target crate!');
            
            } else if(game.board[game.pusher.r+1][game.pusher.c] === 0) {
                alert('that\'s an empty space!');
            } else {            
                game.board[game.pusher.r+1][game.pusher.c] = 0;
//                game.pusher.r += 1;
                // alert('boom');
                game.score += 100;
            };           
        } else if (game.pusher.direction === "right" ) {                //if direction RIGHT --> xplode right (same row) (col + 1)
            if(game.pusher.r === game.target.r && game.pusher.c+1 === game.target.c) {
                alert('you cannot blow up the target crate!');
            } else if(game.board[game.pusher.r][game.pusher.c+1] === 0) {
                alert('that\'s an empty space!');
            } else {
            game.board[game.pusher.r][game.pusher.c+1] = 0;
//            game.pusher.c += 1;
            //alert('boom');
            game.score += 100;
            };           
        } else if (game.pusher.direction === "left" ) {        //if direction LEFT --> xplode left (same row) (col - 1)
            if(game.pusher.r === game.target.r && game.pusher.c-1 === game.target.c) {
                alert('you cannot blow up the target crate!');
            } else if(game.board[game.pusher.r][game.pusher.c-1] === 0) {
                alert('that\'s an empty space!');
            } else {
                game.board[game.pusher.r][game.pusher.c-1] = 0;
//                game.pusher.c -= 1;
                //alert('boom');
                game.score += 100;
        };
        };        
        //add 100 points to the score
        
        //move the pusher
    };
    
    
    function moveRight(game) {
        //I want to move the pusher to the right (column + 1)
        // It should be FACING right
//        this.pusher = game.pusher;
//        this.board = game.board;
        var direction = game.pusher.direction;
        
        if (direction === "right") {
            console.log("the pusher is facing " + direction);
             var pushRow = game.pusher.r;
            var pushCol = game.pusher.c;
            for (var i = 0; i < game.board.length ; i += 1) {
                console.log(game.board[i].join( ' ' ));    
            };  

            console.log(pushRow + ' ' + pushCol);
            if (game.board[pushRow][pushCol+1] === 0 ) {
                console.log(' the space to to the right of the pusher was empty...moving the pusher' );
                game.board[game.pusher.r][game.pusher.c] = 0;
                game.pusher.c += 1;
                game.score += 1;
                
            } else {                                        // now what to do if it is NOT a zero in front of the pusher
                var rowArray = game.board[game.pusher.r];
                var refCol = game.pusher.c;
                console.log('working with row : ' + rowArray.join( ' ' ));
                console.log('pusher col = ' + game.pusher.c);
                console.log('pusher row = ' + game.pusher.r);
                console.log('col location of next zero in row = ' + rowArray.indexOf(0, game.pusher.c+1));
                
            var nextZeroFwd = rowArray.indexOf(0, game.pusher.c+1);
            if (nextZeroFwd === -1) {
                console.log('NO MOVES IN THIS DIRECTION, BETTER HEAD SOMEWHERE ELSE!');
                } else {
                    var distance = rowArray.indexOf(0, game.pusher.c+1) - game.pusher.c;
                    console.log('game.pusher.column = ' + game.pusher.c);
                    console.log('distance to next zero = ' + distance);

                    var weight=0;
                    for (var col = game.pusher.c; col < nextZeroFwd; col += 1 ) {
                        weight += rowArray[col];
                    };
                console.log("the total weight to the next zero = " + weight);
                
                if ( weight <= game.maxPushWeight) {             // PUSH THE CRATES IF WEIGHT IS 3 OR LESS
                    console.log(' pushing the crates... ' );
                    
                       if(game.pusher.r === game.target.r && game.pusher.c+distance >= game.target.c) {
                            console.log('Target column WAS ' + game.target.c);
                            game.target.c += 1;
                            console.log('Target column is now ' + game.target.c);
//                            if (game.target.r === game.startRow && game.target.c === game.startCol) {
//                                alert("YOU WIN!!! \n your score: " + game.score);
//                                game.playing = false;
//                            };
                        };
                for (var colShift = nextZeroFwd, d = distance; colShift >= game.pusher.c; colShift -= 1, d -=1) {   
                    game.board[game.pusher.r][game.pusher.c + d] = game.board[game.pusher.r][colShift-1];
                    console.log('colShift = ' + colShift);
                    console.log('distance = ' + d);


                    game.board[game.pusher.r][game.pusher.c + d] = game.board[game.pusher.r][colShift-1];  // d is the distance from that column, it takes the value from position 5 and then puts it in position 6
                    console.log('colShift = ' + colShift);
                    console.log('distance = ' + d);
                }

                game.board[game.pusher.r][game.pusher.c] = 0;
                game.pusher.c += 1;                                                      //DON'T FORGET TO UPDATE THE TARGET IF NEEDED
                game.score += 1;
                    
                    
                } else {
                    console.log("TOO HEAVY FOR YOU!");
                    alert("TOO HEAVY FOR YOU! GIRRRRRLY MAAAN!");
                };
            }
        }
    }
        else {
            console.log("turning the pusher");
            console.log("pusher row = " + game.pusher.r + "\n pusher col = " + game.pusher.c);
            if (direction === "up" || direction === "down") {
                game.pusher.direction = "right";
                game.score += 1;
            } else if (direction === "left") {
                game.pusher.direction = "right";
                game.score += 2;
            };
        
        };
            //if there is an empty space in front of it, move it and update the board
            //get the ROW contents in front of it
            //if it = 0 then move the pusher and update game.pusher.c
          
//                var toEmpty = rowArray[game.pusher.r].indexOf(0,game.pusher.c);
//                console.log('number of spaces to empty ' + toEmpty);
                    // if the target is in the same row, find out how far away it is
            return game;        
            };
            
        
                 
    
                                    //probably need to use the Array searching command lastIndexOf(); to search it backwards 
    function moveLeft(game) {
        //I want to move the pusher to the right (column + 1)
        // It should be FACING right
        var pusher = game.pusher;
        var board = game.board;
        var direction = game.pusher.direction;
        
        if (direction === "left") {
            console.log("the pusher is facing " + direction);
            
            
            //if there is an empty space BEFORE it (in the array), move it and update the board
            //get the ROW contents in front of it
            //if it = 0 then move the pusher and update game.pusher.c
            var pushRow = game.pusher.r;
            var pushCol = game.pusher.c;
            for (var i = 0; i < game.board.length ; i += 1) {
                console.log(game.board[i].join( ' ' ));    
            };  

            console.log(pushRow + ' ' + pushCol);
            if (game.board[pushRow][pushCol-1] === 0 ) {        //IF THE SPACE NEXT TO PUSHER IS EMPTY --> DO THE MOVE (to the left)
                console.log(' the space to to the LEFT of the pusher was empty...moving the pusher' );
                game.board[game.pusher.r][game.pusher.c] = 0;
                game.pusher.c -= 1;
                game.score += 1;
                
            } else {                                        // now what to do if it is NOT a zero in front of the pusher
                var rowArray = game.board[game.pusher.r];
                console.log('working with row : ' + rowArray.join( ' ' ));
                console.log('pusher col = ' + game.pusher.c);
                console.log('pusher row = ' + game.pusher.r);
                console.log('col location of next zero in row = ' + rowArray.lastIndexOf(0, game.pusher.c-1));
                
            var nextZeroBack = rowArray.lastIndexOf(0, game.pusher.c-1);
            if (nextZeroBack === -1) {
                console.log('NO MOVES IN THIS DIRECTION, BETTER HEAD SOMEWHERE ELSE!');
            } else {
                var distance = game.pusher.c - nextZeroBack;
                console.log('game.pusher.column = ' + game.pusher.c);
                console.log('distance to next zero = ' + distance);

                var weight=0;
                for (var col = game.pusher.c-1; col > nextZeroBack; col -= 1 ) {
                    weight += rowArray[col];
                };
                console.log("the total weight to the next zero = " + weight);
                
                if ( weight <= game.maxPushWeight) {             // PUSH THE CRATES IF WEIGHT IS 3 OR LESS
                    console.log(' pushing the crates... ' );
                    
                       if(game.pusher.r === game.target.r && game.pusher.c+distance >= game.target.c) {
                            console.log('Target column WAS ' + game.target.c);
                            game.target.c -= 1;                                     //shift target address one space to the left
                            console.log('Target column is now ' + game.target.c);
//                            if (game.target.r === game.startRow && game.target.c === game.startCol) {
//                                alert("YOU WIN!!! \n your score: " + game.score);
//                                game.playing = false;
//                            };
                        };
                    for (var colShift = nextZeroBack, d = distance; colShift <= game.pusher.c; colShift += 1, d -=1) {                      
                        game.board[game.pusher.r][game.pusher.c - d] = game.board[game.pusher.r][colShift+1];  // d is the distance from that column, it takes the value from position 5 and then puts it in position 6
                        console.log('colShift = ' + colShift);
                        console.log('distance = ' + d);
                    }
                    
                    if(game.pusher.c-1 >= 0){
                    game.board[game.pusher.r][game.pusher.c] = 0;
                    game.pusher.c -= 1;
                    game.score += 1;
                } else {
                    console.log('cannot move outside the bounds of the board!');
                }

                    
                    
                } else {
                    console.log("TOO HEAVY FOR YOU!");
                    alert("TOO HEAVY FOR YOU! GIRRRRRLY MAAAN!");
                };
                
            }
        }            
            
            
            
        } 
        
        else {
            console.log("turning the pusher");                                      //IT COSTS POINTS TO TURN THE PUSHER
            console.log("pusher row = " + game.pusher.r + "\n pusher col = " + game.pusher.c);
            if (direction === "up" || direction === "down") {
                game.pusher.direction = "left";
                game.score += 1;
            } else if (direction === "right") {
                game.pusher.direction = "left";
                game.score += 2;
            };
        
        };
        

 return game;
    };
      //end move left              
                
    function moveUp(game) {
        var nextZeroBack;
        //I want to move the pusher to the right (column + 1)
        // It should be FACING right
        var pusher = game.pusher;
        var board = game.board;
        var direction = game.pusher.direction;
        
        if (direction === "up") {
            console.log("the pusher is facing " + direction);
 var colAsRowArray = [];
                for (var r = 0; r <= game.board.length-1; r += 1) {
                    colAsRowArray.push(game.board[r][game.pusher.c]);
                    console.log('col as row = ' + game.board[r][game.pusher.c]);
                };
                    console.log('col as row = ' + colAsRowArray.join( ' ' ));
            //if there is an empty space in the column above it (-1) move it and update the board
            //get the COL contents BEFORE it
            //if it = 0 then move the pusher and update game.pusher.c
            var pushRow = game.pusher.r;
            var pushCol = game.pusher.c;
            for (var i = 0; i < game.board.length ; i += 1) {
                console.log(game.board[i].join( ' ' ));    
            };  

            console.log(pushRow + ' ' + pushCol);
            if (game.board[pushRow-1][pushCol] === 0 ) {        //IF THE SPACE ABOVE THE PUSHER IS EMPTY, JUST MOVE IT
                console.log(' the space above the pusher was empty...moving the pusher' );
                game.board[game.pusher.r][game.pusher.c] = 0;
                game.pusher.r -= 1;
                game.score += 1;
                return game;
                
            } else {                                        // now what to do if it is NOT a zero in above of the pusher
                var colAsRowArray = [];
                for (var r = 0; r <= game.board.length-1; r += 1) {
                    colAsRowArray.push(game.board[r][game.pusher.c]);
                    console.log('col as row = ' + game.board[r][game.pusher.c]);
                };
                    console.log('col as row = ' + colAsRowArray.join( ' ' )); // print out the array formed from the column (from left to right should represent top to bottom)
//                game.board[game.pusher.r];
                console.log('working with column : ' + colAsRowArray.join( ' ' ));
                console.log('pusher col = ' + game.pusher.c);
                console.log('pusher row = ' + game.pusher.r);
                console.log('row location of next zero in column = ' + colAsRowArray.lastIndexOf(0, game.pusher.r-1));
                
            var nextZeroBack = colAsRowArray.lastIndexOf(0, game.pusher.r-1);
            console.log('nextZeroBackwards = ' + nextZeroBack);
            if (nextZeroBack === -1) {
                console.log('NO MOVES IN THIS DIRECTION, BETTER HEAD SOMEWHERE ELSE!');
            } else {
                var distance = game.pusher.r - nextZeroBack;
                console.log('game.pusher.row = ' + game.pusher.r);
                console.log('distance to next zero = ' + distance);

                var weight=0;
                for (var col = game.pusher.r-1; col > nextZeroBack; col -= 1 ) { //REMEMBER, THE PROGRAM TURNED THE COLUMN INTO A ROW AND IS EXAMINING IT THAT WAY
                    weight += colAsRowArray[col];
                };
                console.log("the total weight to the next zero = " + weight);
                
                if ( weight <= game.maxPushWeight) {             // PUSH THE CRATES IF WEIGHT IS 3 OR LESS
                    console.log(' pushing the crates... ' );
                    
                       if(game.pusher.c === game.target.c && game.pusher.r-distance <= game.target.r) {
                            console.log('Target row WAS ' + game.target.r);
                            game.target.r -= 1;                                     //shift target address one space to the left
                            console.log('Target column is now ' + game.target.r);
//                            if (game.target.r === game.startRow && game.target.c === game.startCol) {
//                                alert("YOU WIN!!! \n your score: " + game.score);
//                                game.playing = false;
//                            };
                        };
                    for (var d = distance; d>0; d -=1) { 
                        game.board[game.pusher.r - d][game.pusher.c] = game.board[game.pusher.r - (d-1)][game.pusher.c];  // d is the distance from that column, it takes the value from position 5 and then puts it in position 6
                        console.log('distance = ' + d);
                    }

                                      
                    
                    game.board[game.pusher.r][game.pusher.c] = 0;
                    game.pusher.r -= 1;
                    game.score += 1;

                    
                    
                } else {
                    console.log("TOO HEAVY FOR YOU!");
                    alert("TOO HEAVY FOR YOU! GIRRRRRLY MAAAN!");
                };
                
            };
//                var toEmpty = rowArray[game.pusher.r].indexOf(0,game.pusher.c);
//                console.log('number of spaces to empty ' + toEmpty);
                    // if the target is in the same row, find out how far away it is
                    
            };
            return game;        
        
        } 
        
        else {
            console.log("turning the pusher");
            console.log("pusher row = " + game.pusher.r + "\n pusher col = " + game.pusher.c);
            if (direction === "right" || direction === "left") {
                game.pusher.direction = "up";
                game.score += 1;
            } else if (direction === "down") {
                game.pusher.direction = "up";
                game.score += 2;
            };
        
        };
        game.board = board;
    game.pusher = pusher;
    console.log("pusher STUFF " + game.pusher);
    return game;
    };
    
    //INSERT moveDown() here
        function moveDown(game) {
        //I want to move the pusher to the right (column + 1)
        // It should be FACING right
        var pusher = game.pusher;
        var board = game.board;
        var direction = game.pusher.direction;
        
        if (direction === "down") {
            console.log("the pusher is facing " + direction);
            //if there is an empty space in the column above it (-1) move it and update the board
            //get the COL contents BEFORE it
            //if it = 0 then move the pusher and update game.pusher.c
            var pushRow = game.pusher.r;
            var pushCol = game.pusher.c;
            for (var i = 0; i < game.board.length ; i += 1) {
                console.log(game.board[i].join( ' ' ));    
            };  

            console.log(pushRow + ' ' + pushCol);
            if (game.board[pushRow+1][pushCol] === 0 ) {        //IF THE SPACE BELOW THE PUSHER IS EMPTY, JUST MOVE IT
                console.log(' the space below the pusher was empty...moving the pusher' );
                game.board[game.pusher.r][game.pusher.c] = 0;
                game.pusher.r += 1;
                game.score += 1;
                
            } else {                                        // now what to do if it is NOT a zero in above of the pusher
                var colAsRowArray = [];
                for (var r = 0; r <= game.board.length-1; r += 1) {
                    colAsRowArray.push(game.board[r][game.pusher.c]);
                    console.log(game.board[r][game.pusher.c]);
                };
                    console.log(colAsRowArray.join( ' ' )); // print out the array formed from the column (from left to right should represent top to bottom)
                game.board[game.pusher.r];
                console.log('working with column : ' + colAsRowArray.join( ' ' ));
                console.log('pusher col = ' + game.pusher.c);
                console.log('pusher row = ' + game.pusher.r);
                console.log('row location of next zero in column = ' + colAsRowArray.indexOf(0, game.pusher.r+1));
                
            var nextZeroBack = colAsRowArray.indexOf(0, game.pusher.r+1);
            if (nextZeroBack === -1) {
                console.log('NO MOVES IN THIS DIRECTION, BETTER HEAD SOMEWHERE ELSE!');
            } else {
                var distance = nextZeroBack - game.pusher.r;
                console.log('game.pusher.row = ' + game.pusher.r);
                console.log('distance to next zero = ' + distance);

                var weight=0;
                for (var row = game.pusher.r+1; row < nextZeroBack; row += 1 ) {
                    weight += colAsRowArray[row];
                };
                console.log("the total weight to the next zero = " + weight);
                
                if ( weight <= game.maxPushWeight) {             // PUSH THE CRATES IF WEIGHT IS 3 OR LESS
                    console.log(' pushing the crates... ' );
                    
                       if(game.pusher.c === game.target.c && game.pusher.r+distance >= game.target.r) {
                            console.log('Target row WAS ' + game.target.r);
                            game.target.r += 1;                                     //shift target address one row DOWN
                            console.log('Target row is now ' + game.target.r);
//                            if (game.target.r === game.startRow && game.target.c === game.startCol) {
//                                alert("YOU WIN!!! \n your score: " + game.score);
//                                game.playing = false;
//                            };
                        };

                    for (var d = distance; d >= 0; d -=1) {                      
                        game.board[game.pusher.r + d][game.pusher.c] = game.board[game.pusher.r + (d - 1)][game.pusher.c];  // d is the distance from that column, it takes the value from position 5 and then puts it in position 6
//                        console.log('colShift = ' + rowShift);
                        console.log('distance = ' + d);
                    }
                    
                    game.board[game.pusher.r][game.pusher.c] = 0;
                    game.pusher.r += 1;
                    game.score += 1;

                    
                    
                } else {
                    console.log("TOO HEAVY FOR YOU!");
                    alert("TOO HEAVY FOR YOU! GIRRRRRLY MAAAN!");
                };                                                   //DON'T FORGET TO UPDATE THE TARGET IF NEEDED
                
            };
//                var toEmpty = rowArray[game.pusher.r].indexOf(0,game.pusher.c);
//                console.log('number of spaces to empty ' + toEmpty);
                    // if the target is in the same row, find out how far away it is
                    
            };
            return game;    

            
            
            
            } 
        
        else {
            console.log("turning the pusher");
            console.log("pusher row = " + game.pusher.r + "\n pusher col = " + game.pusher.c);
            if (direction === "right" || direction === "left") {
                game.pusher.direction = "down";
                game.score += 1;
            } else if (direction === "up") {
                game.pusher.direction = "down";
                game.score += 2;
            };
        
        };
        return(game);
    
    };
    return(game);
};

function Game() {

    var gameArray = initGame();
    drawBoard(gameArray);

    
    
            

//





//
//var Game = function(seed) {
//    var size = Math.min(canvas.width, canvas.height); //this is to make the size of things on the page resize as the window is resized
//    startC = bobC;
//    
//    
//    Board.prototype.move = function(dirch) {
//        //this takes care of the move direction char
//        
//        
//    };
//};
//
//
//
//
//// ==================================   ACCESS METHODS
//Board.prototype.hasWon = function() { return state===1;};
//Board.prototype.getScore = function () {return score === ;};
//Board.prototype.getWeight = function() {return crateWeight} //NEED THE VIEWER TO KNOW THE WEIGHTS SO IT CAN DISPLAY THEM

};
//(function() {
//    game1 = new Game();
//})();
