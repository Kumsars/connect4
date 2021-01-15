//Constants
const colCount = 7;
const rowCount = 6;
var score = {red: 0, black: 0}

var firstTurnCounter = 0; //If each game diff player starts game. For now loser starts
var gamePositions = new Array(colCount);
var gameField = document.getElementById('gamefield'); 
var movesMade = 0;

function makeGameField(){
    firstTurnCounter++;
    document.getElementById("gamefield").style.pointerEvents = "unset";
    gameField.innerHTML = "";
    
    

    for(var c=0; c<gamePositions.length; c++){

        gamePositions[c] = new Array(); //Each column has rowArray inside

        var colElement = document.createElement('div');
        colElement.classList.add('col');
        colElement.setAttribute("data-index", c);
        gameField.appendChild(colElement);
        colElement.addEventListener('click',pushNtoggle);
    }
 
}
     //Click event listener
     function pushNtoggle(){
        
        movesMade++;
        var chosenCol = this;
        if (chosenCol){
            var colIndex = chosenCol.getAttribute('data-index');
            
        }
        var rowElement = document.createElement('div');
        if(movesMade % 2 == 1 ){
            rowElement.classList.add('player1');
            gamePositions[colIndex].push(1);
            var rowIndex = gamePositions[colIndex].length -1;   
        }else{
            rowElement.classList.add('player2');
            gamePositions[colIndex].push(2);
            var rowIndex = gamePositions[colIndex].length -1;       
        }

        this.appendChild(rowElement);
        var childs = this.childNodes.length;
        if(childs == rowCount){
            this.removeEventListener("click", pushNtoggle);
        }

        //CHECK WINNER 
        checkColumn(colIndex);
        checkRow(rowIndex);
        checkDiagonallyC0R02();
        checkDiagonallyR0C13();
        checkDiagonallyC6R02();
        checkDiagonallyR0C53();

    }
//Check Functions
function checkColumn(index){

        var arrCol = gamePositions[index];
        var count = 1;
        var lastElement;

        arrCol.forEach(function(element){
            //For element "1"
            if(element != undefined && element == lastElement){
                count++
            }else{
                count = 1;
            }
            if(count===4){
                console.log("THE WINNER IS PLAYER "+element);
                winCounter(lastElement)
                document.getElementById("gamefield").style.pointerEvents = "none";
            }
           
            lastElement = element;
        });
}

function checkRow(rowIndex){
    
    var count = 1;
    var lastElement;
    gamePositions.forEach(function(column){

        var element = column[rowIndex];

        if(element != undefined && element == lastElement){
            count++
        }else{
            count = 1;
        }
        if(count === 4){
            console.log("Winner is: player "+lastElement);
            winCounter(lastElement);
            document.getElementById("gamefield").style.pointerEvents = "none";
        }
        
        lastElement = element;
    });
}

function checkDiagonallyC0R02(){
    
    var rowStart = 0;
    var colMax = 5;
    var lastElement = 0;

    for(var row = 0; row < 3; row++){
        var count = 0;
        rowIndex = rowStart;

        for(var i = 0; i<=colMax; i++){

            var value = gamePositions[i][rowIndex];
            
            if(value != undefined && value == lastElement){
                count++;
                
            }else{
                count = 1;
            }
            if(count >= 4){
                console.log("WINNER DIAGONALLY PLAYER "+lastElement);
                winCounter(lastElement);
                document.getElementById("gamefield").style.pointerEvents = "none";
            }
            rowIndex++;
            lastElement = value;
            
        } 
        
        rowStart++;
        lastElement = 0;
    }
}

function checkDiagonallyR0C13(){
    
    var colIndex = 1;
    var colMax = 6;
    var lastElement = 0;

    for(var col = 1; col < 4; col++){
        
        var count = 1;
        var rowIndex = 0;
        colStart = colIndex;
        for(colStart; colStart <= colMax; colStart++){
            
            var value = gamePositions[colStart][rowIndex];
            
            if(value != undefined && value == lastElement){
                count++;
                
            }else{
                count = 1;
            }
            if(count >= 4){
                console.log("WINNER DIAGONALLY PLAYER "+lastElement);
                winCounter(lastElement);
                document.getElementById("gamefield").style.pointerEvents = "none";
            }
            rowIndex++;
            lastElement = value;
            
        } 
        colIndex++;
        lastElement = 0;
    }
}

function checkDiagonallyC6R02(){
    
    var rowStart = 0;
    var colMax = 0;
    var lastElement = 0;

    for(var row = 0; row < 3; row++){
        var count = 0;
        rowIndex = rowStart;

        for(var i = 6; i > colMax; i--){

            var value = gamePositions[i][rowIndex];

            if(value != undefined && value == lastElement){
                count++;
                
            }else{
                count = 1;
            }
            if(count >= 4){
                console.log("WINNER DIAGONALLY PLAYER "+lastElement);
                winCounter(lastElement);
                document.getElementById("gamefield").style.pointerEvents = "none";
            }
            rowIndex++;
            lastElement = value;
            
        } 
        
        rowStart++;
        lastElement = 0;
    }
}

function checkDiagonallyR0C53(){
    
    var colIndex = 5;
    var colMax = 0;
    var lastElement = 0;

    for(var col = 5; col > 2; col--){
        
        var count = 1;
        var rowIndex = 0;
        colStart = colIndex;
        for(colStart; colStart >= colMax; colStart--){
            
            var value = gamePositions[colStart][rowIndex];
            
            if(value != undefined && value == lastElement){
                count++;
                
            }else{
                count = 1;
            }
            if(count >= 4){
                console.log("WINNER DIAGONALLY PLAYER "+lastElement);
                winCounter(lastElement);
                document.getElementById("gamefield").style.pointerEvents = "none";
            }
            rowIndex++;
            lastElement = value;
            
        } 
        colIndex--;
        lastElement = 0;
    }
}

function winCounter(value){
    
    if(value == 1){
        score.red++;
        var label1 = document.getElementById('p1wins');
        label1.innerHTML = "Wins: " + score.red;
    }
    if(value == 2){
        score.black++;
        var label2 = document.getElementById('p2wins');
        label2.innerHTML = "Wins: " + score.black;
    }
}
  