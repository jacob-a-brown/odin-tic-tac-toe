const EMPTY_CELL = " ";
const PLAYER_X_LETTER = "X";
const PLAYER_Y_LETTER = "O";
const TIED_GAME = "tied game";

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

game = (() => {
    // factory function to creates a game
    // - determines if the game is won
    //   - if the game is not won moves on to the next player
    // - determines if a move is legal (i.e. the spot is empty)
    //   - if a move is illegal then replay the round

    // keep track of whose turn it is, starting with playerX;

    const playerX = createPlayer(PLAYER_X_LETTER);
    const playerO = createPlayer(PLAYER_Y_LETTER);
    let currentPlayer = playerX;

    let gameMsg = "";
    let gameOver = false;

    const getGameMsg = function () {
        return gameMsg;
    }

    const setGameMsg = function(msg) {
        gameMsg = msg;
    }

    const getGameOver = function() {
        return gameOver;
    }

    const setGameOver = function(gameOverBool) {
        gameOver = gameOverBool;
    }

    const getCurrentPlayer = function (){
        return currentPlayer;
    }

    const switchCurrentPlayer = function () {
        if (currentPlayer == playerX){
            currentPlayer = playerO;
        } else {
            currentPlayer = playerX;
        }
    }

    const isMoveLegal = function (row, column){
        const currentGameboardArray = gameboard.getBoard()
        if (currentGameboardArray[row][column] === EMPTY_CELL){
            return true;
        } else {
            return false;
        }
    }

    const playTurn = function (row, column){
        if (getGameOver() === true) {
            setGameMsg("The game is over. Restart to play again.")
        } else if (isMoveLegal(row, column)){
            gameboard.setPiece(row, column, currentPlayer.getLetter())
            if (winningLetter() === EMPTY_CELL){
                    setGameMsg("Game on!");
                    switchCurrentPlayer();
                } else if (winningLetter() === TIED_GAME){
                    setGameMsg("The game ends in a tie. Restart to play again.")
                    setGameOver(true);
                } else {
                    setGameMsg(`The winner is Player ${game.getCurrentPlayer().getLetter()}! Restart to play again.`)
                    setGameOver(true);
                }
        } else {
            setGameMsg("Cell is already taken. Try again.")
        } 
    }

    const winningLetter = function (){
        // returns empty string if game is not over
        // returns letter of winning play if the game is over
        const currentGameboardArray = gameboard.getBoard();

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

        // check for tied game
        let tiedGame = false;
        for (let row = 0; row < 3; row++){
            for (let column = 0; column < 3; column++){
                // if there's an empty cell return empty cell string to indicate the game is not over
                if (currentGameboardArray[row][column] === EMPTY_CELL){
                    return EMPTY_CELL
                }
            }
        }

        return TIED_GAME;
    }

    const resetGame = function () {
        currentPlayer = playerX;
        setGameOver(false);
        setGameMsg("Game on!")
        for (row = 0; row < 3; row++){
            for (column = 0; column < 3; column ++){
                gameboard.setPiece(row, column, EMPTY_CELL);
            }
        }
        display.renderGame();
    }

    return {
        getCurrentPlayer,
        getGameMsg,
        setGameMsg,
        winningLetter,
        playTurn,
        resetGame
    }
})();

const display = (() => {

    const playFromDisplay = function () {
        for (let row = 0; row < 3; row++){
            for (let column = 0; column < 3; column++){
                const cellButton = document.querySelector(`#r${row}c${column}`);
                cellButton.addEventListener("click", (event) => {
                    const rowColumnSplit = event.target.id.split("");
                    const row = rowColumnSplit[1];
                    const column = rowColumnSplit[3];
                    game.playTurn(row, column);
                    display.renderGame();
                })
            }
        }

        const restartButton = document.querySelector("#restart");
        restartButton.addEventListener("click", (event) => {
            game.resetGame();
        })

    }

    const renderGame = function(){
        const currentGameboardArray = gameboard.getBoard()
        const currentPlayer = game.getCurrentPlayer()
        const currentGameMsg = game.getGameMsg();

        const playerTurnMsg = document.querySelector("#player-turn-msg");
        playerTurnMsg.textContent = `It is player ${currentPlayer.getLetter()}'s turn`;

        for (let row = 0; row < 3; row++){
            for (let column = 0; column < 3; column ++){
                const currentCellText = document.querySelector(`#r${row}c${column}-text`);
                currentCellText.textContent = currentGameboardArray[row][column];
            }
        }

        const gameMsg = document.querySelector("#game-state-msg");
        gameMsg.textContent = currentGameMsg;
    }

    return {
        renderGame,
        playFromDisplay
    }
})();

display.playFromDisplay();