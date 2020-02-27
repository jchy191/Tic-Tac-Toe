//GameBoard Module

const gameBoard = (() => {
    
    let _board = [0,"","","","","","","","",""];
    let [,a,b,c,d,e,f,g,h,i] = _board;


    const checkWin = () => {
        [,a,b,c,d,e,f,g,h,i] = _board;
        console.log(a,b,c,d,e,f,g,h,i);

        const _threeInARow = (x,y,z) => {
            if (!x || !y || !z) return;
            if ((x == y) && (x == z)) return "win";
        };
        if (_threeInARow(a,b,c)) return "win";
        if (_threeInARow(d,e,f)) return "win";
        if (_threeInARow(g,h,i)) return "win";
        if (_threeInARow(a,d,g)) return "win";
        if (_threeInARow(b,e,h)) return "win";
        if (_threeInARow(c,f,i)) return "win";
        if (_threeInARow(a,e,i)) return "win";
        if (_threeInARow(c,e,g)) return "win";
        if (a && b && c && d && e && f && g && h && i) {
            return "drawn";
        };
    };

    const addMarker = (position, marker) => {
        _board[position] = marker;
    };

    const availGrids = (board) => {
        let available = [];
        for (let i = 1; i <= 9; i++){
            if (board[i] === "") available.push(i);
        };
        return available;
    };

    const currentBoard = () => {
        return _board;
    }

    const reset = () => {
        _board = [0,"","","","","","","","",""];
    };

    return {currentBoard, addMarker, availGrids, reset, checkWin};
})();


//Player Object 

let playerOne;
let playerTwo;

const Player = (name, marker) => {
    
    const getName = () => name;
    const getMarker = () => marker;
    
    return {getName, getMarker};
};



//GameFlowTwoPlayer Module

const GameFlowTwoPlayer = (() => {

    let currentPlayerMarker;
    let currentPlayerTurn;

    const _initialisation = () => {
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
    };


    const _changeTurn = () => {
        if (currentPlayerTurn == playerOne.getName()){
            currentPlayerTurn = playerTwo.getName();
            currentPlayerMarker = playerTwo.getMarker();
        } else {
            currentPlayerTurn = playerOne.getName();
            currentPlayerMarker = playerOne.getMarker();
        }
        document.querySelector('#gametext').innerHTML = 
            `It's now ${currentPlayerTurn}'s turn! Have fun! Press the button to reset the game.`;
    }
    const _victory = () => {
            document.querySelector('#gametext').innerHTML = 
            `${currentPlayerTurn} has won! Press the button to reset the game.`;
        };
    
    const _gamedrawn = () => {
        document.querySelector('#gametext').innerHTML = 
        `The game is drawn! Press the button to reset the game.`;
    };

    //Buttons

    const gridButtons = document.querySelectorAll('.grid');
        gridButtons.forEach((grid) => {
        grid.addEventListener('click', () => {
            if (grid.innerHTML === "") {
                gameBoard.addMarker(grid.id, currentPlayerMarker);
                grid.innerHTML = currentPlayerMarker;
                if (gameBoard.checkWin() === "win") {
                    _victory();
                    currentPlayerMarker = "";
                    return;
                };
                if (gameBoard.checkWin() === "drawn"){
                    _gamedrawn();
                    return;
                };
                _changeTurn();
            };                
        });
    });

    const newGameButton = document.querySelector('#newgame');
    newGameButton.addEventListener('click', () => {
        _initialisation();

        document.querySelector('.gameboard').style.display = "grid";
        document.querySelector('.gameongoing').style.display = "block";
        document.querySelector('.newgame').style.display = "none";
        document.querySelector('#gametext').innerHTML = 
        `It's now ${currentPlayerTurn}'s turn! Have fun! Press the button to reset the game.`;
    });


    const resetButton = document.querySelector('#resetgame');
    resetButton.addEventListener('click', () => {

        gridButtons.forEach((grid) => {
            grid.innerHTML = "";
        });

        const gridAIButtons = document.querySelectorAll('.gridAI');
        gridAIButtons.forEach((grid) => {
            grid.innerHTML = "";
        });

        document.querySelector('.gameboard').style.display = "none";
        document.querySelector('.gameboardAI').style.display = "none";
        document.querySelector('.gameongoing').style.display = "none";
        document.querySelector('.newgame').style.display = "block";
        
        gameBoard.reset();

    });      
})();



//GameFlowSinglePlayer Module

const GameFlowSinglePlayer = (() => {

    let currentPlayerTurn;
    let currentPlayerMarker;

    const _initialisation = () => {

        playerOne = Player("human", "X");
        playerTwo = Player("AI", "O");

        currentPlayerMarker = playerOne.getMarker();
        currentPlayerTurn = playerOne.getName();
    };

    const _victory = () => {
        document.querySelector('#gametext').innerHTML = 
        `${currentPlayerTurn} has won! Press the button to reset the game.`;
    };

    const _gamedrawn = () => {
        document.querySelector('#gametext').innerHTML = 
        `The game is drawn! Press the button to reset the game.`;
    };
    
    const _computerTurn = () => {

        currentPlayerMarker = playerTwo.getMarker();
        currentPlayerTurn = playerTwo.getName();

        let _availMoves = gameBoard.availGrids(gameBoard.currentBoard());
        let i = Math.floor(Math.random() * _availMoves.length);
        gameBoard.addMarker(_availMoves[i], currentPlayerMarker);

        const grids = document.querySelectorAll('.gridAI');
        grids.forEach((grid) => {
            if (grid.id == _availMoves[i]){
                grid.innerHTML = currentPlayerMarker;
            };
        });
        
        currentPlayerMarker = playerOne.getMarker();
        currentPlayerTurn = playerOne.getName();

        if (gameBoard.checkWin() === "win") {
            _victory();
            currentPlayerMarker = "";
            return;
        };
        if (gameBoard.checkWin() === "drawn"){
            _gamedrawn();
            return;
        };
    };

    const newGameButton = document.querySelector('#newAIgame');
    newGameButton.addEventListener('click', () => {
        
        _initialisation();

        document.querySelector('.gameboardAI').style.display = "grid";
        document.querySelector('.gameongoing').style.display = "block";
        document.querySelector('.newgame').style.display = "none";
        document.querySelector('#gametext').innerHTML = 
        `It's now your turn! Have fun! Press the button to reset the game.`;
    });

    

    const gridButtons = document.querySelectorAll('.gridAI');
    gridButtons.forEach((grid) => {
    grid.addEventListener('click', () => {



        if (grid.innerHTML === "") {
            gameBoard.addMarker(grid.id, currentPlayerMarker);
            grid.innerHTML = currentPlayerMarker;
            if (gameBoard.checkWin() === "win") {
                _victory();
                currentPlayerMarker = "";
                return;
            };
            if (gameBoard.checkWin() === "drawn"){
                _gamedrawn();
                return;
            };
            _computerTurn();
        };                
    });

});

   // return {humanPlayer, aiPlayer};

})();









const computerBrain = (() => {
    
  //  let humanPlayer = Player("human", "X");
    let aiPlayer = Player("AI", "O");
    
    
    


    const findBestMove = (board) => {

        let _availMoves = gameBoard.availGrids(gameBoard.currentBoard());
        let moves = [];


        _availMoves.forEach(index => {
            let newBoard = board;
            newBoard[index] = aiPlayer.getMarker();
            let moveScore = _minimax(newBoard, 0, "AI");
            moves.push({index: index, score: moveScore});
        });

        return moves;
    };


    const _minimax = (board, depth, player) => {
        
        let _availMoves = gameBoard.availGrids(board);

        if (gameBoard.checkWin() === "drawn") return 0;
        if (gameBoard.checkWin() === "win" && player === "human") return -10 + depth;
        if (gameBoard.checkWin() === "win" && player === "AI") return 10 - depth;

        
        if (player === "AI"){
            let bestValue = -Infinity
            _availMoves.forEach(index => {
                let newBoard = board;
                newBoard[index] = aiPlayer.getMarker();
                let value = _minimax(newBoard, depth+1, "human");
                bestValue = Math.max(bestValue, value);
            });
            return bestValue;
        };

        if (player === "human"){
            let bestValue = +Infinity
            _availMoves.forEach(index => {
                let newBoard = board;
                newBoard[index] = aiPlayer.getMarker();
                let value = _minimax(newBoard, depth+1, "AI");
                bestValue = Math.min(bestValue, value);
            });
            return bestValue;
        };
        
    };

    return{findBestMove}

})()
