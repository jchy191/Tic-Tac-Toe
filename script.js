let playerOne;
let playerTwo;


//Player Object 

const Player = (name, marker) => {
    
    const getName = () => name;
    const getMarker = () => marker;
    
    return {getName, getMarker};
};


//GameBoard Module

const gameBoard = (() => {
    
    let _board = [0,,,,,,,,,];

    const checkWin = () => {

        let [,a,b,c,d,e,f,g,h,i] = _board;

        const _threeInARow = (x,y,z) => {
            if (!x || !y || !z) return;
            if ((x == y) && (x == z)) return "win";
        }

        if (_threeInARow(a,b,c)) return "win";
        if (_threeInARow(d,e,f)) return "win";
        if (_threeInARow(g,h,i)) return "win";
        if (_threeInARow(a,d,g)) return "win";
        if (_threeInARow(b,e,h)) return "win";
        if (_threeInARow(c,f,i)) return "win";
        if (_threeInARow(a,e,i)) return "win";
        if (_threeInARow(c,d,g)) return "win";
        if (a && b && c && d && e && f && g && h && i) {
            return "drawn";
        }
        console.log('not won yet')
    };

    const addMarker = (position, marker) => {
        _board[position] = marker;
    }

    const reset = () => {_board = [0,,,,,,,,,];}

    return {_board, addMarker, reset, checkWin};
})();


//GameFlow Module

const gameFlow = (() => {

    const initialisation = () => {
        let x = document.querySelector('input#playeronename').value;
        let y = document.querySelector('input#playertwoname').value;
        
        if(x === "" || y === ""){
            alert('Please enter player names.');
            return;
        };
        
        if (x === y) {
            alert('Please enter different player names');
            return;
        };

        let xCapitalised = x[0].toUpperCase() + x.slice(1, x.length);
        let yCapitalised = y[0].toUpperCase() + y.slice(1, y.length);

        playerOne = Player(xCapitalised, "X");
        playerTwo = Player(yCapitalised, "O");

        currentPlayerMarker = playerOne.getMarker();
        currentPlayerTurn = playerOne.getName();

        document.querySelector('.gameboard').style.display = "grid";
        document.querySelector('.gameongoing').style.display = "block";
        document.querySelector('.newgame').style.display = "none";
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
    const _victory = () => {
            document.querySelector('#gametext').innerHTML = 
            `${currentPlayerTurn} has won! Press the button to reset the game.`;
        };
    
    const _gamedrawn = () => {
        document.querySelector('#gametext').innerHTML = 
        `The game is drawn! Press the button to reset the game.`;
    };


    const gridButtons = document.querySelectorAll('.grid');
        gridButtons.forEach((grid) => {
        grid.addEventListener('click', () => {
            if (grid.innerHTML === "") {
                gameBoard.addMarker(grid.id, currentPlayerMarker);
                grid.innerHTML = currentPlayerMarker;
                if (gameBoard.checkWin() === "win") {
                    console.log('gamewon');
                    _victory();
                };
                if (gameBoard.checkWin() === "drawn"){
                    _gamedrawn();
                };
                _changeTurn();
            };                
        });
    });

    const newGameButton = document.querySelector('#newgame');
    newGameButton.addEventListener('click', () => {
        initialisation();
    });


    const resetButton = document.querySelector('#resetgame');
    resetButton.addEventListener('click', () => {

        gameBoard.reset();
        gridButtons.forEach((grid) => {
            grid.innerHTML = "";
        });

        document.querySelector('.gameboard').style.display = "none";
        document.querySelector('.gameongoing').style.display = "none";
        document.querySelector('.newgame').style.display = "block";

    });      
    return {initialisation};

})();




    



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