const EMPTY_CELL = " ";

// there can only be one gameboard so make it an IIFE
const gameboard = (() => {
    // - update the game board with a new piece by setting it 
    // - get the current state of the board
    
    // [row][column]
    const gameArray = [[EMPTY_CELL, EMPTY_CELL, EMPTY_CELL], [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL], [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL]];

    const setPiece = function (row, column, letter){
        // set a piece on the board
        // assumes that the location is empty
        gameArray[row][column] = letter;
    }

    const getBoard = function (){
        return gameArray;
    }

    return {
        setPiece,
        getBoard
    }    
})();

function createPlayer(letter) {
    // factory function to do the following:
    // - assign the player's letter
    // - set a piece on the game board

    const getLetter = function () {
        return letter;
    }

    return {
        getLetter
    }
}

function createGame(){
    // factory function to creates a game
    // - determines if the game is won
    //   - if the game is not won moves on to the next player
    // - determines if a move is legal (i.e. the spot is empty)
    //   - if a move is illegal then replay the round

    // keep track of whose turn it is, starting with playerX;

    const playerX = createPlayer("X");
    const playerO = createPlayer("O");

    let currentPlayer = playerX;

    const isMoveLegal = function (row, column){
        const currentGameboardArray = gameboard.getBoard()
        if (currentGameboardArray[row][column] === EMPTY_CELL){
            return true;
        } else {
            return false;
        }
    }

    const playPiece = function (row, column){
        if (isMoveLegal(row, column)){
            gameboard.setPiece(row, column, currentPlayer.getLetter())
            if (currentPlayer === playerX){
                currentPlayer = playerO;
            } else {
                currentPlayer = playerX;
            }
            console.log(gameboard.getBoard())
        } else {
            alert(`row ${row} / column ${column} is already taken with ${gameboard.getBoard()}. Play again.`)
        } 
    }

    const gameOver = function (){
        // returns empty string if game is not over
        // returns letter of winning play if the game is over
        const currentGameboardArray = gameboard.getBoard();
        alert(`currentGameBoardArray\n${currentGameboardArray[0]}\n${currentGameboardArray[1]}\n${currentGameboardArray[2]}`);

        // check columns
        for (let column = 0; column < 3; column++){
            const columnCells = [];
            for (let row = 0; row < 3; row++){
                columnCells.push(currentGameboardArray[row][column])
            }
            if (columnCells[0] === columnCells[1] && columnCells[1] === columnCells[2] && columnCells[0] !== EMPTY_CELL){
                return columnCells[0];
            }
        }

        // check rows
        for (let row = 0; row < 3; row++){
            const rowCells = [];
            for (let column = 0; column < 3; column++){
                rowCells.push(currentGameboardArray[row][column])
            }
            alert("rowCells", rowCells);
            if (rowCells[0] === rowCells[1] && rowCells[1] === rowCells[2] && rowCells[0] !== EMPTY_CELL){
                return rowCells[0];
            }
        }

        // check crosses
        if (currentGameboardArray[0][0] === currentGameboardArray[1][1] && currentGameboardArray[1][1] === currentGameboardArray[2][2] && currentGameboardArray[0][0] !== EMPTY_CELL){
            return currentGameboardArray[1][1];
        } else if (currentGameboardArray[0][2] === currentGameboardArray[1][1] && currentGameboardArray[1][1] === currentGameboardArray[2][0] && currentGameboardArray[0][2] !== EMPTY_CELL){
            return currentGameboardArray[1][1];
        }

        return EMPTY_CELL;
    }

    const playGame = function() {
        alert("gameOver", gameOver())
        while(gameOver() === EMPTY_CELL){
            // const cs = gameboard.getBoard()
            // alert(`current state:\n${cs[0]}\n${cs[1]}\n${cs[2]}`)
            let column = parseInt(prompt("column? "))
            let row = parseInt(prompt("row? "))

            playPiece(row, column);
            alert("gameOver", gameOver())
        }
        console.log(gameOver(), "won the game!")
    }

    return {
        playGame
    }
    
}

console.log("starting game");
const currentGame = createGame();
alert("playing game");
currentGame.playGame();