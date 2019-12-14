console.log("CONNECTED!")

var x;
var y;
var turn = "X";
var turns = 0;
var win = false;
var tie = false;
$(".p2Text").css("display", "none")


var board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
]
//board[y][x]
//They x and y axis are switched


makeBoard()
listenBtnPress()




//Listens for a press on the board and does the logic
function listenBtnPress(){
    $("table").on("click", "td", function(){
        //Checks if the square is empty and if no one won yet
        if ($(this).text() == "" && win == false && tie == false){
            x = parseInt($(this).data("x"));
            y = parseInt($(this).data("y"));
            //adds to the board array an X/O
            board[y][x] = turn;
            makeBoard();
            checkTie();
            checkWin();
            changeTurn();
        };
    });
};



//Checks if someone won
function checkWin(){
    //Checks for win horizontally
    for(var i=0; i < 3; i++){
        if(board[i][0] == turn && board[i][1] == turn && board[i][2] == turn){
            displayWin()
        }
    }
    //Checks for win vertically
    for(var i=0; i < 3; i++){
        if(board[0][i] == turn && board[1][i] == turn && board[2][i] == turn){
            displayWin()
        }
    }
    //Chekcs for win diagonally (top left to bottom right)
    if(board[0][0] == turn && board[1][1] == turn && board[2][2] == turn){
        displayWin()
    }
    //Checks for win diagonally (top right to bottom left)
    if(board[0][2] == turn && board[1][1] == turn && board[2][0] == turn){
        displayWin()
    }
}

function displayWin() {
    console.log("YOU WIN!")
    $("span").text(turn);
    $(".players").css("display", "none")
    $(".winner").css("display", "block")
    win = true;
}

function checkTie(){
    turns = turns + 1
    if (turns == 9){
        tie = true;
        console.log("Tie!")
        $(".winner").text("Its a tie!")
        $(".players").css("display", "none")
        $(".winner").css("display", "block")
    }
}




//Changes the turn
function changeTurn(){
    if (turn === "X"){
        turn = "O";
        $(".p1Text").css("display", "none")
        $(".p2Text").css("display", "block")
        $(".p2Text").css("color", "black")
        
    }else{
        turn = "X";
        $(".p1Text").css("color", "black")
        $(".p1Text").css("display", "block")
        $(".p2Text").css("display", "none")
    }
}

//Makes the board
function makeBoard(){
    $("td").remove()
    $("tr").remove()
    for(var y=0; y < 3; y++){
        $("table").append("<tr>")
        for(var x=0; x <3; x++){
            $("table").append('<td data-x='+x+' data-y='+y+'>'+ board[y][x] +'</td>')  
        }
    }
}


function reset(){
    board = [["","","",],["","","",],["","","",]];
    turn = "X"
    turns = 0;
    win = false;
    tie = false;
    $(".players").css("display", "block")
    $(".p1Text").css("display", "block")
    $(".p2Text").css("display", "none")
    $(".winner").html("<h1 class='winner'><span></span> Has won!</h1>")
    $(".winner").css("display", "none")
    makeBoard();
}
