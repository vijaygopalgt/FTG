document.addEventListener('DOMContentLoaded', () => {
  const animalImages = [
    "don.jpg",
    "effie.jpg",
    "elric.jpg",
    "susu.jpg",
    "vijay.png",
    "pooja.jpg",
    "reji.jpg",
    "jai.jpg"
  ];

  let gameBoard = document.getElementById('game-board');
  let resetButton = document.getElementById('reset-btn');
  let firstCard = null;
  let secondCard = null;
  let lockBoard = false;
  let matchedPairs = 0;

  // Duplicate & shuffle
  let cards = [...animalImages, ...animalImages].sort(() => 0.5 - Math.random());

  function createBoard() {
    gameBoard.innerHTML = "";
    cards.forEach((imgUrl) => {
      const card = document.createElement('div');
      card.classList.add('card');

      const cardInner = document.createElement('div');
      cardInner.classList.add('card-inner');

      const cardFront = document.createElement('div');
      cardFront.classList.add('card-front');
      cardFront.style.backgroundImage = `url(${imgUrl})`;

      const cardBack = document.createElement('div');
      cardBack.classList.add('card-back'); // dark blue gradient in CSS

      cardInner.appendChild(cardFront);
      cardInner.appendChild(cardBack);
      card.appendChild(cardInner);

      card.addEventListener('click', () => flipCard(card));
      gameBoard.appendChild(card);
    });
  }

  function flipCard(card) {
    if (lockBoard || card === firstCard) return;

    card.classList.add('flipped');

    if (!firstCard) {
      firstCard = card;
    } else {
      secondCard = card;
      checkForMatch();
    }
  }

  function checkForMatch() {
  const img1 = firstCard.querySelector('.card-front').style.backgroundImage;
  const img2 = secondCard.querySelector('.card-front').style.backgroundImage;

  if (img1 === img2) {
    matchedPairs++;
    resetFlip();
    if (matchedPairs === animalImages.length) {
      setTimeout(() => {
        launchCelebration();
      }, 500);
    }
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      resetFlip();
    }, 1000);
  }
}
function launchCelebration() {
  // Confetti burst 🎉
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 }
  });

  // Nice popup message
  const winPopup = document.createElement("div");
  winPopup.innerHTML = " You Won! ";
  winPopup.style.position = "fixed";
  winPopup.style.top = "50%";
  winPopup.style.left = "50%";
  winPopup.style.transform = "translate(-50%, -50%)";
  winPopup.style.padding = "20px 40px";
  winPopup.style.background = "linear-gradient(135deg, #f0f0f0ff, #1d55aaff)";
  winPopup.style.color = "#333";
  winPopup.style.fontSize = "2rem";
  winPopup.style.fontWeight = "bold";
  winPopup.style.borderRadius = "15px";
  winPopup.style.boxShadow = "0 5px 15px rgba(0,0,0,0.2)";
  winPopup.style.zIndex = "1000";
  document.body.appendChild(winPopup);

  // Remove popup & restart game after 3s
  setTimeout(() => {
    winPopup.remove();
    resetGame();
  }, 5000);
}



  function resetFlip() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
  }

  function resetGame() {
    cards = [...animalImages, ...animalImages].sort(() => 0.5 - Math.random());
    matchedPairs = 0;
    createBoard();
  }

  resetButton.addEventListener('click', resetGame);

  createBoard();
});
