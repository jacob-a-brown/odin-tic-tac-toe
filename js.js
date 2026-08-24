const EMPTY_CELL = " ";

// there can only be one gameboard so make it an IIFE
const gameboard = (() => {
    // - update the game board with a new piece by setting it 
    // - get the current state of the board
    
    // [column, row]
    const gameArray = [[EMPTY_CELL, EMPTY_CELL, EMPTY_CELL], [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL], [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL]];

    const setPiece = function (column, row, letter){
        // set a piece on the board
        // assumes that the location is empty
        gameArray[column][row] = letter;
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

    const isMoveLegal = function (column, row){
        const currentGameboardArray = gameboard.getBoard()
        if (currentGameboardArray[column, row] === EMPTY_CELL){
            console.log("go ahead!")
            return true;
        } else {
            console.log("don't go ahead!")
            return false;
        }
    }

    const playPiece = function (column, row){
        if (isMoveLegal(column, row)){
            gameboard.setPiece(column, row, currentPlayer.getLetter())
            if (currentPlayer === playerX){
                currentPlayer = playerO;
            } else {
                currentPlayer = playerX;
            }
            console.log(gameboard.getBoard())
        } else {
            alert(`[${column}, ${row}] is already taken with ${gameboard.getBoard()}. Play again.`)
        } 
    }

    const gameOver = function (){
        // returns empty string if game is not over
        // returns letter of winning play if the game is over
        const currentGameboardArray = gameboard.getBoard();
        let winningLetter;

        // check columns
        for (let column = 0; column < 3; column++){
            const previousCellLetter = currentGameboardArray[column, 0];
            for (let row = 1; row < 3; row++){
                const currentCellLetter = currentGameboardArray[column][row];
                if (currentCellLetter === EMPTY_CELL || previousCellLetter === EMPTY_CELL){
                    return EMPTY_CELL
                } else if (currentCellLetter !== previousCellLetter){
                    break;
                } else if (row === 3){
                    winningLetter = currentCellLetter;
                    return winningLetter;
                }
            }
        }

        // check rows
        for (let row = 0; row < 3; row++){
            const previousCellLetter = currentGameboardArray[0, row];
            for (let column = 1; column < 3; column++){
                const currentCellLetter = currentGameboardArray[column][row];
                if (currentCellLetter === EMPTY_CELL || previousCellLetter === EMPTY_CELL){
                    return EMPTY_CELL
                } else if (currentCellLetter !== previousCellLetter){
                    break;
                } else if (column === 3){
                    winningLetter = currentCellLetter;
                    return winningLetter;
                }
            }
        }

        // check crosses
        if (gamboardArray[0][0] === currentGameboardArray[1][1] && currentGameboardArray[1][1] === currentGameboardArray[2][2] && currentGameboardArray[0][0] !== EMPTY_CELL){
            winningLetter = currentGameboardArray[0][0];
            return winningLetter;
        } else if (currentGameboardArray[0][2] === currentGameboardArray[1][1] && currentGameboardArray[1][1] === currentGameboardArray[2][0] && currentGameboardArray[0][2] !== EMPTY_CELL){
            winningLetter = currentGameboardArray[0][2];
            return winningLetter;
        }

        return EMPTY_CELL;
    }

    const playGame = function() {
        while(gameOver() === EMPTY_CELL){
            let column = parseInt(prompt("column? "))
            let row = parseInt(prompt("row? "))

            playPiece(column, row);
        }
        console.log(gameOver(), "won the game!")
    }

    return {
        playGame
    }
    
}


const currentGame = createGame();
currentGame.playGame();