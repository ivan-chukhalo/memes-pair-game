const jsConfetti = new JSConfetti()

const cards = document.querySelectorAll(".card");

function shuffleCards() {
  cards.forEach((card) => {
    let cardOrderNumber = Math.floor(Math.random() * 12);
    card.style.order = cardOrderNumber;
  });
}
shuffleCards();

const numberOfCards = cards.length;
let isThereActivatedCard = false;
let boardIsLocked = false;
let firstCard, secondCard;
let flippedCards = 0;

cards.forEach((card) => card.addEventListener("click", flipCard));

function flipCard() {
  if (boardIsLocked) return;
  if (this === firstCard) return;
  this.classList.add("flip");
  if (!isThereActivatedCard) {
    isThereActivatedCard = true;
    firstCard = this;
    return;
  }
  secondCard = this;
  isThereActivatedCard = false;
  checkForMatch();
}

function checkForMatch() {
  if (firstCard.dataset.img === secondCard.dataset.img) {
    disableCards();
    flippedCards += 2;
    if (flippedCards === numberOfCards) {
      restartGame();
    }
    return;
  }
  resetTwoCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
}

function resetTwoCards() {
  boardIsLocked = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [isThereActivatedCard, boardIsLocked] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function restartGame() {
  jsConfetti.addConfetti();
  shuffleCards();
  resetBoard();
  shuffleCards();
  cards.forEach((card) => {
    card.classList.remove("flip");
  });
  cards.forEach((card) => card.addEventListener("click", flipCard));
  flippedCards = 0;
}
