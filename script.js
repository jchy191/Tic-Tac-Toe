let playerOne;
let playerTwo;

const gameBoard = (() => {
    let _board = [0,,,,,,,,,];
    
    const _threeInARow = (x,y,z) => {
        if (!x || !y || !z) return;
        if ((x == y) && (x == z)) return true;
    }

    const checkWin = () => {
        let [,a,b,c,d,e,f,g,h,i] = _board;
        
        if (_threeInARow(a,b,c)) return true;
        if (_threeInARow(d,e,f)) return true;
        if (_threeInARow(g,h,i)) return true;
        if (_threeInARow(a,d,g)) return true;
        if (_threeInARow(b,e,h)) return true;
        if (_threeInARow(c,f,i)) return true;
        if (_threeInARow(a,e,i)) return true;
        if (_threeInARow(c,d,g)) return true;
        console.log('not won yet')
    };

    const addMarker = (position, marker) => {
        _board[position] = marker;
    }

    const reset = () => {_board = [0,,,,,,,,,];}

    return {_board, _threeInARow, addMarker, reset, checkWin};
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

    const _changeTurn = () => {
        if (currentPlayerTurn == playerOne.getName()){
            currentPlayerTurn = playerTwo.getName();
            currentPlayerMarker = playerTwo.getMarker();
        } else {
            currentPlayerTurn = playerOne.getName();
            currentPlayerMarker = playerOne.getMarker();
        }
    }

    const grids = document.querySelectorAll('.grid');
        grids.forEach((grid) => {
        grid.addEventListener('click', (e) => {
            if (grid.innerHTML == "") {
                gameBoard.addMarker(grid.id, currentPlayerMarker);
                grid.innerHTML = currentPlayerMarker;
                if (gameBoard.checkWin()) {
                    console.log('gamewon');
                    victory();
                }
                _changeTurn();
            }                   
        });
    });

    const victory = () => {
        alert(`${currentPlayerTurn} has won!`)
        gameBoard.reset();
        grids.forEach((grid) => {
            grid.innerHTML = "";
        })
        initialisation();

    }
    
    return {initialisation}
})();

gameFlow.initialisation();
let currentPlayerTurn = playerOne.getName();
    let currentPlayerMarker = "X";



    



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