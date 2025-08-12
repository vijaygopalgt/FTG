document.addEventListener('DOMContentLoaded', () => {
  const cardColors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'cyan'];
  let gameBoard = document.getElementById('game-board');
  let resetButton = document.getElementById('reset-btn');
  let firstCard = null;
  let secondCard = null;
  let lockBoard = false;
  let matchedPairs = 0;

  // Duplicating the card colors for matching pairs and shuffling them
  let cards = [...cardColors, ...cardColors].sort(() => 0.5 - Math.random());

  // Function to create cards and append them to the board
  function createBoard() {
      cards.forEach((color, index) => {
          const card = document.createElement('div');
          card.classList.add('card');
          card.dataset.color = color;
          card.addEventListener('click', flipCard);
          gameBoard.appendChild(card);
      });
  }

  // Function to flip the card
  function flipCard() {
      if (lockBoard || this === firstCard) return;

      this.style.backgroundColor = this.dataset.color;
      this.classList.add('flipped');

      if (!firstCard) {
          firstCard = this;
      } else {
          secondCard = this;
          checkForMatch();
      }
  }

  // Function to check if the two flipped cards are a match
  function checkForMatch() {
      if (firstCard.dataset.color === secondCard.dataset.color) {
          matchedPairs++;
          resetFlip();
          if (matchedPairs === cardColors.length) {
              setTimeout(() => alert('You won!'), 500);
          }
      } else {
          lockBoard = true;
          setTimeout(() => {
              firstCard.style.backgroundColor = 'lightgray';
              secondCard.style.backgroundColor = 'lightgray';
              firstCard.classList.remove('flipped');
              secondCard.classList.remove('flipped');
              resetFlip();
          }, 1000);
      }
  }

  // Function to reset the flipped cards
  function resetFlip() {
      firstCard = null;
      secondCard = null;
      lockBoard = false;
  }

  // Function to reset the game
  function resetGame() {
      gameBoard.innerHTML = '';
      cards = [...cardColors, ...cardColors].sort(() => 0.5 - Math.random());
      matchedPairs = 0;
      createBoard();
  }

  // Event listener for the reset button
  resetButton.addEventListener('click', resetGame);

  // Initialize the game board
  createBoard();
});
