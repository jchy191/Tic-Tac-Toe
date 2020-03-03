//GameBoard Module

const gameBoard = (() => {
    let _board = [0,"","","","","","","","",""];

    const currentBoard = () => {
        return _board;
    };

    const addMarker = (position, marker) => {
        _board[position] = marker;
    };

    const availGrids = (board) => {
        let available = [];
        for (let i = 1; i <= 9; i++){
            if (board[i] === "") available.push(i);
        }
        return available;
    };

    const reset = () => {
        _board = [0,"","","","","","","","",""];
    };

    const checkWin = () => {
        let [,a,b,c,d,e,f,g,h,i] = _board;
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
        }
    };

    return {currentBoard, addMarker, availGrids, reset, checkWin};

})();


//Player Object 

let playerOne;
let playerTwo;
    
let currentPlayerTurn;
let currentPlayerMarker;

const Player = (name, marker) => {
    
    const getName = () => name;
    const getMarker = () => marker;
    
    return {getName, getMarker};
};


const gameFlow = (() => {

    const gridButtons = document.querySelectorAll('.grid');

    let _gameMode = 0;
    const getGameMode = () => _gameMode;

    const _initialisation = () => {

        if (_gameMode == 1) {
            playerOne = Player("human", "X");
            playerTwo = Player("AI", "O");
        } else {
            let x = document.querySelector('input#playeronename').value;
            let y = document.querySelector('input#playertwoname').value;
            
            if(x === "" || y === ""){
                alert('Please enter player names.');
                return;
            }
            
            if (x === y) {
                alert('Please enter different player names');
                return;
            }

            let xCapitalised = x[0].toUpperCase() + x.slice(1, x.length);
            let yCapitalised = y[0].toUpperCase() + y.slice(1, y.length);

            playerOne = Player(xCapitalised, "X");
            playerTwo = Player(yCapitalised, "O");
        }

        currentPlayerMarker = playerOne.getMarker();
        currentPlayerTurn = playerOne.getName();

    };

    const victory = () => {
        
        if (_gameMode == 2){
            document.querySelector('#gametext').innerHTML = 
            `${currentPlayerTurn} has won! Press the button to reset the game.`;
        } else if (currentPlayerTurn == "human"){
            document.querySelector('#gametext').innerHTML = 
            `You have won! Press the button to reset the game.`;
        } else {
            document.querySelector('#gametext').innerHTML = 
            `Oh no! You lost! Press the button to reset the game.`;
        }
        currentPlayerMarker = "";
    };

    const draw = () => {
        document.querySelector('#gametext').innerHTML = 
        `The game is drawn! Press the button to reset the game.`;
    };

    const newGameButton = document.querySelector('#newgame');
    newGameButton.addEventListener('click', () => {
        _gameMode = 2;     
        _initialisation();

        document.querySelector('.gameboard').style.display = "grid";
        document.querySelector('#gametext').innerHTML = 
            `It's now ${currentPlayerTurn}'s turn! Have fun! Press the button to reset the game.`;
        document.querySelector('.gameongoing').style.display = "block";
        document.querySelector('.newgame').style.display = "none";
        
    });


    const newAIGameButton = document.querySelector('#newAIgame');
    newAIGameButton.addEventListener('click', () => {
        _gameMode = 1;
        _initialisation();

        document.querySelector('.gameboard').style.display = "grid";
        document.querySelector('#gametext').innerHTML = 
            `It's now your turn! Have fun! Press the button to reset the game.`;
        document.querySelector('.gameongoing').style.display = "block";
        document.querySelector('.newgame').style.display = "none";
        
        gridButtons.forEach((grid) => {
            grid.innerHTML = "";
        });

    });


    const resetButton = document.querySelector('#resetgame');
    resetButton.addEventListener('click', () => {

        gridButtons.forEach((grid) => {
            grid.innerHTML = "";
        });

        document.querySelector('.gameboard').style.display = "none";
        document.querySelector('.gameongoing').style.display = "none";
        document.querySelector('.newgame').style.display = "block";
        
        gameBoard.reset();
        _gameMode = 0;

    });    

    return {victory, draw, getGameMode};
})();

//GameFlowTwoPlayer Module

const GameFlowTwoPlayer = (() => {

    const _changeTurn = () => {
        if (currentPlayerTurn === playerOne.getName()){
            currentPlayerTurn = playerTwo.getName();
            currentPlayerMarker = playerTwo.getMarker();
        } else {
            currentPlayerTurn = playerOne.getName();
            currentPlayerMarker = playerOne.getMarker();
        }
        document.querySelector('#gametext').innerHTML = 
            `It's now ${currentPlayerTurn}'s turn! Have fun! Press the button to reset the game.`;
    };


    const gridButtons = document.querySelectorAll('.grid');
    gridButtons.forEach((grid) => {
        grid.addEventListener('click', () => {
            if (grid.innerHTML === "" && gameFlow.getGameMode() == 2) {
                gameBoard.addMarker(grid.id, currentPlayerMarker);
                grid.innerHTML = currentPlayerMarker;
                if (gameBoard.checkWin() === "win") {
                    gameFlow.victory();
                    return;
                }
                if (gameBoard.checkWin() === "drawn"){
                    gameFlow.draw();
                    return;
                }
                _changeTurn();
            }        
        });
    });
})();
console.log("hi");


//GameFlowSinglePlayer Module

const GameFlowSinglePlayer = (() => {

    const _computerTurn = () => {
        
        let _availMoves = gameBoard.availGrids(gameBoard.currentBoard());
        let i = Math.floor(Math.random() * _availMoves.length);
        gameBoard.addMarker(_availMoves[i], currentPlayerMarker);

        const grids = document.querySelectorAll('.grid');
        grids.forEach((grid) => {
            if (grid.id == _availMoves[i]){
                grid.innerHTML = currentPlayerMarker;
            }
        });
        
        if (gameBoard.checkWin() === "win") {
            gameFlow.victory();
            return;
        }
        if (gameBoard.checkWin() === "drawn"){
            gameFlow.draw();
            return;
        }
        
        currentPlayerMarker = playerOne.getMarker();
        currentPlayerTurn = playerOne.getName();

        document.querySelector('#gametext').innerHTML = 
            `It's now your turn! Press the button to reset the game.`;
    }; 

    const gridButtons = document.querySelectorAll('.grid');
    gridButtons.forEach((grid) => {
        grid.addEventListener('click', () => {
            if (grid.innerHTML === "" && gameFlow.getGameMode() === 1 && currentPlayerMarker === playerOne.getMarker()) {
                gameBoard.addMarker(grid.id, currentPlayerMarker);
                grid.innerHTML = currentPlayerMarker;
                if (gameBoard.checkWin() === "win") {
                    gameFlow.victory();
                    currentPlayerMarker = "";
                    return;
                }
                if (gameBoard.checkWin() === "drawn"){
                    gameFlow.draw();
                    return;
                }

                currentPlayerMarker = playerTwo.getMarker();
                currentPlayerTurn = playerTwo.getName();

                setTimeout(_computerTurn, 500);

                document.querySelector('#gametext').innerHTML = 
                `The computer is thinking... Press the button to reset the game.`;
            }              
        });
    });
})();









const computerBrain = (() => {
    
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
        }

        if (player === "human"){
            let bestValue = +Infinity
            _availMoves.forEach(index => {
                let newBoard = board;
                newBoard[index] = aiPlayer.getMarker();
                let value = _minimax(newBoard, depth+1, "AI");
                bestValue = Math.min(bestValue, value);
            });
            return bestValue;
        }
        
    };

    return{findBestMove}

})()
