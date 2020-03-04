//GameBoard Module

const gameBoard = (() => {
    let _board = [0,"","","","","","","","",""];

    

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

    const checkWin = (board) => {
        let [,a,b,c,d,e,f,g,h,i] = board;

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

    return {
        get board(){
            return _board;
        }, 
        addMarker, 
        availGrids, 
        reset, 
        checkWin};

})();


//Player Object 

let playerOne;
let playerTwo;

const Player = (name, marker) => {
    
    let _name = name;
    let _marker = marker;
    
    return {
        get name(){
            return _name;
        },
        get marker(){
            return _marker;
        }
    }
};

const display = (() => {

    const victory = () => {
        if (gameFlow.gameMode === 2){
            document.querySelector('#gametext').innerHTML = 
            `${gameFlow.currentPlayerTurn} has won! Press the button to reset the game.`;
        } else if (gameFlow.currentPlayerTurn == "human"){
            document.querySelector('#gametext').innerHTML = 
            `You have won! Press the button to reset the game.`;
        } else {
            document.querySelector('#gametext').innerHTML = 
            `Oh no! You lost! Press the button to reset the game.`;
        }
        gameFlow.currentPlayerMarker = "";
    };

    const draw = () => {
        document.querySelector('#gametext').innerHTML = 
        `The game is drawn! Press the button to reset the game.`;
    };

    const changeTurn = () => {
        document.querySelector('#gametext').innerHTML = 
        `It's now ${gameFlow.currentPlayerTurn}'s turn! Have fun! Press the button to reset the game.`;
    };

    const yourTurn = () => {
        document.querySelector('#gametext').innerHTML = 
            `It's now your turn! Have fun! Press the button to reset the game.`;
    };

    const computerTurn = () => {
        document.querySelector('#gametext').innerHTML = 
                `The computer is thinking... Press the button to reset the game.`;
    };

    const gameBegin = () => {
        document.querySelector('.gameboard').style.display = "grid";
        document.querySelector('.gameongoing').style.display = "block";
        document.querySelector('.newgame').style.display = "none";
    };

    const startingPage = () => {
        document.querySelector('.gameboard').style.display = "none";
        document.querySelector('.gameongoing').style.display = "none";
        document.querySelector('.newgame').style.display = "block";
    };

    return {victory, draw, changeTurn, yourTurn, computerTurn, gameBegin, startingPage};

})();


const gameFlow = (() => {
        
    let _currentPlayerTurn;
    let _currentPlayerMarker;
    
    const gridButtons = document.querySelectorAll('.grid');

    let _gameMode = 0;


    const newGameButton = document.querySelector('.newgamebutton');
    newGameButton.addEventListener('click', () => {
        _gameMode = 2;     
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

        _currentPlayerMarker = playerOne.marker;
        _currentPlayerTurn = playerOne.name;

        display.gameBegin();
        display.changeTurn();
    });


    const newAIGameButton = document.querySelectorAll('.newAIgamebutton');
    newAIGameButton.forEach(button => {
        button.addEventListener('click', (e) => {

            playerOne = Player("human", "X");
            playerTwo = Player("AI", "O");
            _currentPlayerMarker = playerOne.marker;
            _currentPlayerTurn = playerOne.name;

            display.gameBegin();
            display.yourTurn();
            
            gridButtons.forEach((grid) => {
                grid.innerHTML = "";
            });
            if (e.target.id === "easyai") _gameMode = 1.1;
            if (e.target.id === "hardai") _gameMode = 1.2;
        });
    });


    const resetButton = document.querySelector('#resetgame');
    resetButton.addEventListener('click', () => {

        gridButtons.forEach((grid) => {
            grid.innerHTML = "";
        });
        
        display.startingPage();
        gameBoard.reset();
        _gameMode = 0;

    });    

    return {
        get gameMode() {
            return _gameMode;
        },
        get currentPlayerTurn() {
            return _currentPlayerTurn;
        },
        set currentPlayerTurn(input) {
            _currentPlayerTurn = input;
        },
        get currentPlayerMarker() {
            return _currentPlayerMarker;
        },
        set currentPlayerMarker(input) {
            _currentPlayerMarker = input;
        }
    };
})();

//GameFlowTwoPlayer Module

(() => {

    const _changeTurn = () => {
        if (gameFlow.currentPlayerTurn == playerOne.name){
            gameFlow.currentPlayerTurn = playerTwo.name;
            gameFlow.currentPlayerMarker = playerTwo.marker;
        } else {
            gameFlow.currentPlayerTurn = playerOne.name;
            gameFlow.currentPlayerMarker = playerOne.marker;
        }
        display.changeTurn();
    };


    const gridButtons = document.querySelectorAll('.grid');
    gridButtons.forEach((grid) => {
        grid.addEventListener('click', () => {
            if (grid.innerHTML === "" && gameFlow.gameMode == 2) {
                gameBoard.addMarker(grid.id, gameFlow.currentPlayerMarker);
                grid.innerHTML = gameFlow.currentPlayerMarker;
                if (gameBoard.checkWin(gameBoard.board) === "win") {
                    display.victory();
                    return;
                }
                if (gameBoard.checkWin(gameBoard.board) === "drawn"){
                    display.draw();
                    return;
                }
                _changeTurn();
            }        
        });
    });
})();


//GameFlowSinglePlayer Module

(() => {

    const _computerMove = () => {
        
        let choice;

        if (gameFlow.gameMode === 1.1) choice = easyComputer.chooseGrid();
        if (gameFlow.gameMode === 1.2) choice = hardComputer.chooseGrid();

        gameBoard.addMarker(choice, gameFlow.currentPlayerMarker);

        const grids = document.querySelectorAll('.grid');
        grids.forEach((grid) => {
            if (grid.id == choice){
                grid.innerHTML = gameFlow.currentPlayerMarker;
            }
        });
        
        if (gameBoard.checkWin(gameBoard.board) === "win") {
            display.victory();
            return;
        }
        if (gameBoard.checkWin(gameBoard.board) === "drawn"){
            display.draw();
            return;
        }
        
        gameFlow.currentPlayerMarker = playerOne.marker;
        gameFlow.currentPlayerTurn = playerOne.name;

        display.yourTurn();
    }; 

    const gridButtons = document.querySelectorAll('.grid');
    gridButtons.forEach((grid) => {
        grid.addEventListener('click', () => {
            if (grid.innerHTML === "" && gameFlow.gameMode !== 2 && gameFlow.currentPlayerMarker === playerOne.marker) {
                gameBoard.addMarker(grid.id, gameFlow.currentPlayerMarker);
                grid.innerHTML = gameFlow.currentPlayerMarker;
                if (gameBoard.checkWin(gameBoard.board) === "win") {
                    display.victory();
                    gameFlow.currentPlayerMarker = "";
                    return;
                }
                if (gameBoard.checkWin(gameBoard.board) === "drawn"){
                    display.draw();
                    return;
                }

                gameFlow.currentPlayerMarker = playerTwo.marker;
                gameFlow.currentPlayerTurn = playerTwo.name;

                setTimeout(_computerMove, 500);

                display.computerTurn();
            }              
        });
    });
})();




const easyComputer = (() => {
    const chooseGrid = () => {
        let _availMoves = gameBoard.availGrids(gameBoard.board);
        let i = Math.floor(Math.random() * _availMoves.length);
        return _availMoves[i];
    }
    return {chooseGrid};
})();




const hardComputer = (() => {
    
    const chooseGrid = () => {

        let _availMoves = gameBoard.availGrids(gameBoard.board);
        //let _availMoves = [];
        let moves = [];
        console.log(_availMoves);


        _availMoves.forEach(index => {
            let newBoard = gameBoard.board.slice(0);
            newBoard[index] = 'O';
            let moveScore = _minimax(newBoard, 0, "AI");
            moves.push({index: index, score: moveScore});
        });
        console.log({moves});
        let _findBestMove = moves.reduceRight((highest, move) => {
            return (highest.score || 0) > move.score ? highest : move;
        }, {})

        console.log(_findBestMove);

        return _findBestMove.index;
    };

 

    const _minimax = (board, depth, player) => {
        let _availMoves = gameBoard.availGrids(board);
       
        //console.log({board,depth,player});
    
        if (gameBoard.checkWin(board) === "drawn") {console.log("draw"); return 0;}
        if (gameBoard.checkWin(board) === "win" && player === "human") {console.log("playerwin"); return -10 + depth;}
        if (gameBoard.checkWin(board) === "win" && player === "AI") {console.log("AIwin"); return 10 - depth;}

        
        if (player === "AI"){
            let bestValue = -Infinity
            _availMoves.forEach(index => {
                let newBoard = board.slice(0);
                newBoard[index] = "O";
                let value = _minimax(newBoard, depth+1, "human");
                console.log
                bestValue = Math.max(bestValue, value);
            });
            return bestValue;
        }

        if (player === "human"){
            let bestValue = +Infinity
            _availMoves.forEach(index => {
                let newBoard = board;
                newBoard[index] = "X";
                let value = _minimax(newBoard, depth+1, "AI");
                bestValue = Math.min(bestValue, value);
            });
            return bestValue;
        }
        
    };

    return{chooseGrid}

})()
