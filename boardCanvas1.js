"use strict";



function drawBoard(game) {
    gameOverStatus(game);


    console.log(game);

    if (game.playing === true) {
//game.prototype.queueImage('crateW1.gif');

console.log('board length = ' + game.board.length);
var boardSize = game.board.length;
    
    var two_pi = 2*Math.PI;
    var pi = Math.PI;
    var deg = 10;
    var intervalID = null;
    var canvas = document.getElementById('canvas'),
        ctx = canvas.getContext("2d");
     

  var windowHeight = window.innerHeight;
  var windowWidth = window.innerWidth;

  ctx.canvas.width  = windowWidth-200;
  ctx.canvas.height = windowHeight-200;
  
      

  var scaleSize;
  
  
  
  console.log('width = ' + ctx.canvas.width + ' and height = ' + ctx.canvas.height); // PRINT THE WINDOW DIMENSIONS TO THE CONSOLE
  
if (ctx.canvas.height > ctx.canvas.width) { //if height of window is LARGER than width, set the crateBox's length to match the width, and vice versa
    scaleSize = ctx.canvas.width;
} else {
    scaleSize = ctx.canvas.height;
}

var scoreDivSize = (scaleSize/2) + "px";
var leftMargin = .5*(windowWidth - ctx.canvas.width) + "px";
//alert('height = ' + ctx.canvas.height + ' width = ' + ctx.canvas.width);

console.log('scale size = ' + scaleSize + ' scoreDivSize = ' + scoreDivSize);
document.getElementById('statusbar').style.width = scoreDivSize;
//
//if windowHeight > width {
//    sideMargin = .5*(windowWidth - canvasWidth);
//} else {
//    sideMargin = 
//}
//
//if width < height, just use 1/2(windowWidth - canvasWidth)


// document.getElementById('statusbar').style.marginLeft = leftMargin;

//...drawing code...


    
    var canvasSize = scaleSize;
    console.log('canvas size = ' + canvasSize);
    canvas = document.getElementById('canvas');
    canvas.setAttribute("width", scaleSize);
    canvas.setAttribute("height", scaleSize);
    // canvas.setAttribute("style", "margin-left: "+leftMargin+";");
    
    
    var boxSize = Math.floor(canvasSize/boardSize); //fix bug with some edge crates not having closure
    var width = canvas.width;
    var height = canvas.height;
//    ctx.fillStyle = 'black';
//    ctx.fillRect(0,0,width,height);
//    ctx.stroke();
    
    
    ctx.strokeStyle = 'black';
    
////// BUILD ARRAY OF CUBES

var crateBox  = {
    x: 0,
    y: 0,
    size: boxSize
};

    var x = crateBox.x;
    var y = crateBox.y;

    var outerBoxSize = Math.round(crateBox.size);


//THIS WILL DRAW THE GRID OF CRATES


var pic = new Image();
pic.src = 'images/bob135x203.gif';
var targetCrate = new Image();
        //get target weight and load appropriate image
    var tCol = game.target.c;
    var tRow = game.target.r;
    console.log('Target crate COL: ' + tCol + ' target ROW: ' + tRow);        
            if (game.board[tRow][tCol] === 1) {
                   targetCrate.src = 'images/Target1.gif';
               } else if (game.board[tRow][tCol] === 2) {
                   targetCrate.src = 'images/Target2.gif';
               } else if (game.board[tRow][tCol] === 3) {
                   targetCrate.src = 'images/Target3.gif';
               };

//queueImage('CrateW1.gif');
//queueImage('CrateW2.gif');
//queueImage('CrateW3.gif');
//queueImage('Target1.gif');
//queueImage('Target2.gif');
//queueImage('Target3.gif');

var crate1 = new Image();
crate1.src = 'images/CrateW1.gif';
var crate2 = new Image();
crate2.src = 'images/CrateW2.gif';
var crate3 = new Image();
crate3.src = 'images/CrateW3.gif';

var continueLoading = 0;
console.log(crate1.onload > 0);



crate3.onload = function() {


//    game.pusher.direction = "right";
    
    
    for (var col = 0, x = crateBox.x; col < boardSize; x+= outerBoxSize, col += 1) { //this loop will make the rectangles start further and further along X axis    

        for (var row = 0, y = crateBox.y; row < boardSize; y += outerBoxSize, row += 1) {

            ctx.strokeRect(x,y,outerBoxSize, outerBoxSize);

            if (game.board[row][col] === 1) {
                ctx.drawImage(crate1, x+(outerBoxSize/10), y+(outerBoxSize/10), outerBoxSize/1.25, outerBoxSize/1.25);
            };
            if (game.board[row][col] === 2) {
                ctx.drawImage(crate2, x+(outerBoxSize/10), y+(outerBoxSize/10), outerBoxSize/1.25, outerBoxSize/1.25);
            }; 
            if (game.board[row][col] === 3) {
                ctx.drawImage(crate3, x+(outerBoxSize/10), y+(outerBoxSize/10), outerBoxSize/1.25, outerBoxSize/1.25);
              
            };
            
        if (row === tRow && col === tCol) {
                ctx.strokeStyle = 'blue';
                var defaultLineWidth = ctx.lineWidth;
                ctx.lineWidth = 10;
                ctx.strokeRect(x+(outerBoxSize/10), y+(outerBoxSize/10), outerBoxSize/1.25, outerBoxSize/1.25);
                ctx.strokeStyle = 'black';
                ctx.lineWidth = defaultLineWidth;
                ctx.drawImage(targetCrate, x+(outerBoxSize/10), y+(outerBoxSize/10), outerBoxSize/1.25, outerBoxSize/1.25);
            };
        if (row === game.startRow && col === game.startCol) {
                ctx.strokeStyle = 'red';
                var defaultLineWidth = ctx.lineWidth;
                ctx.lineWidth = 10;
                ctx.strokeRect(x+(outerBoxSize/10), y+(outerBoxSize/10), outerBoxSize/1.25, outerBoxSize/1.25);
                ctx.strokeStyle = 'black';
                ctx.lineWidth = defaultLineWidth;
            };

        if (row === tRow && col === tCol) {
                ctx.strokeStyle = 'blue';
                var defaultLineWidth = ctx.lineWidth;
                ctx.lineWidth = 10;
                ctx.strokeRect(x+(outerBoxSize/10), y+(outerBoxSize/10), outerBoxSize/1.25, outerBoxSize/1.25);
                ctx.strokeStyle = 'black';
                ctx.lineWidth = defaultLineWidth;
                ctx.drawImage(targetCrate, x+(outerBoxSize/10), y+(outerBoxSize/10), outerBoxSize/1.25, outerBoxSize/1.25);
            } else if (game.board[row][col] === 1) {
                ctx.drawImage(crate1, x+(outerBoxSize/10), y+(outerBoxSize/10), outerBoxSize/1.25, outerBoxSize/1.25);
            } else if (game.board[row][col] === 2) {
                ctx.drawImage(crate2, x+(outerBoxSize/10), y+(outerBoxSize/10), outerBoxSize/1.25, outerBoxSize/1.25);
            } else if (game.board[row][col] === 3) {
                ctx.drawImage(crate3, x+(outerBoxSize/10), y+(outerBoxSize/10), outerBoxSize/1.25, outerBoxSize/1.25);
              
            };

            ctx.save();
            
            
            
            //WRITE A COMMAND TO FILL RECTANGLES BASED ON boardArray
            if (row === game.pusher.r && col === game.pusher.c) {
                //FIGURE OUT DIRECTION AND DRAW THE PUSHER
                if (game.pusher.direction === "up") {
                ctx.drawImage(pic, x+(outerBoxSize/10), y+(outerBoxSize/10), outerBoxSize/1.25, outerBoxSize/1.25);
            } else if (game.pusher.direction === "right") {
                
                ctx.translate(x+outerBoxSize, y);
//                ctx.translate(x+.5*outerBoxSize, y+.5*outerBoxSize);
                ctx.rotate(pi/2);
//                ctx.translate(-1*(x+.5*outerBoxSize), -1*(y+.5*outerBoxSize));
//                ctx.clearRect(x+(outerBoxSize/10), y+(outerBoxSize/10), outerBoxSize/1.25, outerBoxSize/1.25);
                ctx.drawImage(pic, outerBoxSize/10, outerBoxSize/10, outerBoxSize/1.25, outerBoxSize/1.25);
                ctx.restore();
            } else if (game.pusher.direction === "down") {
                
                ctx.translate(x + outerBoxSize, y + outerBoxSize);
//                ctx.translate(x+.5*outerBoxSize, y+.5*outerBoxSize);
                ctx.rotate(pi);
//                ctx.translate(-1*(x+.5*outerBoxSize), -1*(y+.5*outerBoxSize));
//                ctx.clearRect(x+(outerBoxSize/10), y+(outerBoxSize/10), outerBoxSize/1.25, outerBoxSize/1.25);
                ctx.drawImage(pic, outerBoxSize/10, outerBoxSize/10, outerBoxSize/1.25, outerBoxSize/1.25);
                ctx.restore();                
            } else if (game.pusher.direction === "left") {
                
                ctx.translate(x, y + outerBoxSize);
//                ctx.translate(x+.5*outerBoxSize, y+.5*outerBoxSize);
                ctx.rotate(1.5*pi);
//                ctx.translate(-1*(x+.5*outerBoxSize), -1*(y+.5*outerBoxSize));
//                ctx.clearRect(x+(outerBoxSize/10), y+(outerBoxSize/10), outerBoxSize/1.25, outerBoxSize/1.25);
                ctx.drawImage(pic, outerBoxSize/10, outerBoxSize/10, outerBoxSize/1.25, outerBoxSize/1.25);
                ctx.restore();
            }
        };



        };
                console.log('pusher col = ' + game.pusher.c + ' row = ' + game.pusher.r);
                
            
        };
        console.log("y total = " + y + " x total = " + x);
    isPlayable(game);
    gameOverStatus(game);
    // if (!game.playing) {
    //     document.getElementById('statusbar').innerHTML = "GAME OVER.....FINAL SCORE = " + game.score;
    // };
    //IF THE GAME IS OVER WE WANT TO DRAW THE FINAL BOARD AND SET THE STATE TO FALSE
    if (game.target.r === game.startRow && game.target.c === game.startCol) {
        alert("YOU WIN!!! \n your score: " + game.score);
        game.win = true;
        
        finishGame(game);

        // game.finalScore = game.score;
        // game.playing = false;
        // gameOverStatus(game);

        // alert("Your score: " + game.score + "\nRecord Score: " + recordScore + "\nNew best score? " + testBestScore(game))
        // // document.getElementById('statusbar').innerHTML = "GAME OVER.....FINAL SCORE = " + game.score;
    };
    //    ctx.strokeRect(crateBox.x,crateBox.y,crateBox.size, crateBox.size);
    };
}  
else {
    alert('refresh and start a new game!');
};
    if (!game.playing) {
        document.getElementById('statusbar').innerHTML = "GAME OVER.....FINAL SCORE = " + game.score;
    };

};