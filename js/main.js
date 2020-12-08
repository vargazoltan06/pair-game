'use strict';

const cards = document.querySelectorAll('.card');
let firstCard;
let secondCard;
let hasFlippedCard = false;
let min = document.querySelector('.minute');
let sec = document.querySelector('.second');
let second = 0;
let minute = 0;
let moves = 0;
let clickBlock = false;
let matches = 0;
let interval;

function flipCard() {
    if (clickBlock)
        return;
    if (this === firstCard)
        return;
    this.classList.add('card--back')
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        countClicks()
        return;
    }
    secondCard = this;
    hasFlippedCard = false;

    matchChecking();
};


cards.forEach(card => card.addEventListener('click', flipCard));

const matchChecking = () => {
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        disableCards()
        matches++
        if (matches === 5) {
            clearInterval(interval);
            restartGame()
        };
        return
    }
    unflipCards();
}




function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
}

function unflipCards() {
    clickBlock = true;

    setTimeout(() => {
        firstCard.classList.remove('card--back');
        secondCard.classList.remove('card--back');

        clickBlock = false;
    }, 1500);
}

function startTimer() {
    interval = setInterval(() => {
        min.innerHTML = minute
        second++;
        if (second < 9) {
            sec.innerHTML = "0" + second
        }
        if (second > 9) {
            sec.innerHTML = second
        }
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute < 9) {
            min.innerHTML = "0" + minute
        }
        if (minute > 9) {
            min.innerHTML = minute
        }
    }, 1000);
}

function countClicks() {
    moves++
    if (moves == 1) {
        startTimer()
    }
}

(function shuffle() {
    cards.forEach(card => {
        let ramdomPos = Math.floor(Math.random() * 12);
        card.style.order = ramdomPos;
    });
})();

const restartGame = () => {
    interval = setInterval(() => {
        window.location.reload();
    }, 5000);
}
