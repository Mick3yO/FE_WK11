// Ensure the document is fully loaded before executing JavaScript. Iwas having some issues when loading the html for some reason.
$(document).ready(function() {
    // Select important elements using jQuery for easy manipulation
    const $game = $('#game');
    const $resetButton = $('#resetButton');
    const $turnIndicator = $('#turnIndicator');
    let currentPlayer = 'X'; // Starting player
    let moves = 0; // Counter for moves made

    // Event handler for cell clicks
    $game.on('click', '.cell', function() {
        const $cell = $(this);

        // Check if the clicked cell is empty
        if (!$cell.text()) {
            $cell.text(currentPlayer); // Set the current player's mark in the cell
            moves++; // Increment the moves counter

            // Check for a winner or a draw
            if (checkWinner()) {
                showWinner(currentPlayer);
            } else if (moves === 9) {
                showDraw();
            } else {
                switchPlayer(); // Switch to the next player
                updateTurnIndicator(); // Update the heading to indicate the current player's turn
            }
        }
    });

    // Event handler for the "Restart Game" button click
    $resetButton.on('click', function() {
        resetGame();
    });

    // Function to switch the current player
    function switchPlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    // Function to check for a winner by examining the content of the cells
    // This was probably what took me the longest to impement. I wasn't 100% on what it would be the best impementation.
    function checkWinner() {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        // Iterate through the winning lines and check if any player has a winning combination
        for (const line of lines) {
            const [a, b, c] = line;
            const cells = $game.find('.cell');
            if (cells.eq(a).text() && cells.eq(a).text() === cells.eq(b).text() && cells.eq(b).text() === cells.eq(c).text()) {
                return true; // Declare a winner
            }
        }

        return false;
    }

    // Function to display an alert and reset the game when there's a winner
    function showWinner(winner) {
        alert(`Player ${winner} wins!`);
        resetGame();
    }

    // Function to display an alert and reset the game in case of a draw
    function showDraw() {
        alert('It\'s a draw!');
        resetGame();
    }

    // Function to reset the game by clearing the content of cells, resetting the player, and updating the heading
    function resetGame() {
        $game.find('.cell').text(''); // Clear the content of all cells
        currentPlayer = 'X'; // Reset the player to 'X'
        moves = 0; // Reset the moves counter
        updateTurnIndicator(); // Update the heading to indicate the current player's turn
    }

    // Function to update the heading to indicate the current player's turn
    function updateTurnIndicator() {
        $turnIndicator.text(`It's ${currentPlayer}'s turn`);
    }
});
