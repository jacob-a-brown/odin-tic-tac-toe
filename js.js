// there can only be one gameboard so make it an IIFE
const gameboard = (() => {
    // - update the game board with a new piece by setting it 
    // - get the current state of the board
    
    // [column, row]
    const gameArray = [["","",""], ["","",""], ["","",""]];

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

function createPlayer(name, letter) {
    // factory function to do the following:
    // - name the player
    // - assign the player's letter
    // - set a piece on the game board

    const playPiece = function (column, row) {
        return [column, row];
    }

    return {
        name,
        letter,
        playPiece
    }
}

function createGame(playerOne, playerTwo){
    // factory function to creates a game
    // - determines if the game is won
    //   - if the game is not won moves on to the next player
    // - determines if a move is legal (i.e. the spot is empty)
    //   - if a move is illegal then replay the round

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
                if (currentCellLetter === "" || previousCellLetter === ""){
                    return ""
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
                if (currentCellLetter === "" || previousCellLetter === ""){
                    return ""
                } else if (currentCellLetter !== previousCellLetter){
                    break;
                } else if (column === 3){
                    winningLetter = currentCellLetter;
                    return winningLetter;
                }
            }
        }

        // check crosses
        if (gamboardArray[0][0] === currentGameboardArray[1][1] && currentGameboardArray[1][1] === currentGameboardArray[2][2] && currentGameboardArray[0][0] !== ""){
            winningLetter = currentGameboardArray[0][0];
            return winningLetter;
        } else if (currentGameboardArray[0][2] === currentGameboardArray[1][1] && currentGameboardArray[1][1] === currentGameboardArray[2][0] && currentGameboardArray[0][2] !== ""){
            winningLetter = currentGameboardArray[0][2];
            return winningLetter;
        }

        return "";
    }

    const isMoveLegel = function (column, row){
        const currentGameboardArray = gameboard.getBoard()
        if (currentGameboardArray[column, row] === ""){
            return true;
        } else {
            return false;
        }
    }
}

console.log(1)
console.log(gameboard.getBoard())
console.log(2)
gameboard.setPiece(0, 0, "X");
console.log(3)
// console.log(gameboard.getBoard())