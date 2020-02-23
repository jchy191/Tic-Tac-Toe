let playerOne;
let playerTwo;

const gameBoard = (() => {
    const board = [0,,,,,,,,,];


    const checkWin = () => {
        


    };

    const addMarker = (position, marker) => {
        board[position] = marker;
    }

    const reset = () => {board = [0,,,,,,,,,];}

    return {board, addMarker, reset, checkWin};
})();

const Player = (name, marker) => {
    
    const getName = () => name;
    const getMarker = () => marker;
    
    return {getName, getMarker};
};



const gameFlow = (() => {
    
    const initialisation = () => {
        playerOne = Player("Ali", "X");
        playerTwo = Player("Baba", "O"); //tochange to prompt
    };

    let currentPlayerTurn = 1;
    let currentPlayerMarker = "X";

    const changeTurn = () => {
        if (currentPlayerTurn == 1){
            currentPlayerTurn = 2;
            currentPlayerMarker = playerTwo.getMarker();
        } else {
            currentPlayerTurn = 1;
            currentPlayerMarker = playerOne.getMarker();
        }
    }

    const grids = document.querySelectorAll('.grid');
        grids.forEach((grid) => {
        grid.addEventListener('click', (e) => {
            if (grid.innerHTML == "") {
                gameBoard.addMarker(grid.id, currentPlayerMarker);
                grid.innerHTML = currentPlayerMarker;
                changeTurn();
            }                   
        });
    });
    
    return {initialisation}
})();

gameFlow.initialisation();



    



/*
gameBoard module:
    M addmarker
    M check for winning
    M reset

Players:
    P Name
    P Marker
    M getname

Buttons:
    id is position array

Gameflow:
    
    P whose turn 
    M checking if game over

    Buttons: check turn & current square vacancy, then addmarker, then check 

Initialsation
*/