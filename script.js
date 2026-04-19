const boardElement = document.getElementById('chessboard');
const turnIndicator = document.getElementById('turn-indicator');

// Unicode characters for chess pieces
const pieces = {
    r: '♜', n: '♞', b: '♝', q: '♛', k: '♚', p: '♟', // Black pieces
    R: '♖', N: '♘', B: '♗', Q: '♕', K: '♔', P: '♙'  // White pieces
};

// Initial board state (FEN-like structure)
let boardState = [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
];

let selectedSquare = null;
let currentTurn = 'white'; // 'white' starts

// Initialize the board
function createBoard() {
    boardElement.innerHTML = '';
    
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement('div');
            square.classList.add('square');
            
            // Alternating colors
            if ((row + col) % 2 === 0) {
                square.classList.add('light');
            } else {
                square.classList.add('dark');
            }

            // Add piece if it exists
            const pieceStr = boardState[row][col];
            if (pieceStr !== '') {
                square.textContent = pieces[pieceStr];
                // Store piece color for turn validation
                square.dataset.color = pieceStr === pieceStr.toUpperCase() ? 'white' : 'black';
            }

            square.dataset.row = row;
            square.dataset.col = col;
            
            square.addEventListener('click', handleSquareClick);
            boardElement.appendChild(square);
        }
    }
}

function handleSquareClick(e) {
    const clickedSquare = e.target;
    const row = parseInt(clickedSquare.dataset.row);
    const col = parseInt(clickedSquare.dataset.col);
    const pieceStr = boardState[row][col];

    // If a piece is already selected
    if (selectedSquare) {
        const prevRow = parseInt(selectedSquare.dataset.row);
        const prevCol = parseInt(selectedSquare.dataset.col);

        // Clicking the same square deselects it
        if (prevRow === row && prevCol === col) {
            clearSelection();
            return;
        }

        // Move the piece (No complex rule validation in this basic version)
        boardState[row][col] = boardState[prevRow][prevCol];
        boardState[prevRow][prevCol] = '';
        
        // Change turn
        currentTurn = currentTurn === 'white' ? 'black' : 'white';
        turnIndicator.textContent = currentTurn === 'white' ? "White's Turn" : "Black's Turn";
        
        clearSelection();
        createBoard(); 
    } else {
        // Select a piece to move
        if (pieceStr !== '') {
            const pieceColor = clickedSquare.dataset.color;
            
            // Only allow selecting pieces of the current turn
            if (pieceColor === currentTurn) {
                clearSelection();
                selectedSquare = clickedSquare;
                selectedSquare.classList.add('selected');
            }
        }
    }
}

function clearSelection() {
    if (selectedSquare) {
        selectedSquare.classList.remove('selected');
        selectedSquare = null;
    }
}

// Start the game
createBoard();
