
const cardList = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt',
        'fa fa-cube', 'fa fa-anchor', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-diamond', 'fa fa-bomb',
        'fa fa-leaf', 'fa fa-bomb', 'fa fa-bolt', 'fa fa-bicycle', 'fa fa-paper-plane-o', 'fa fa-cube'];
let cardContainer = document.querySelector('.deck');
let opened = [];
let matched = [];
let moves = 0;
let status = 0; // 0:stop 1:running
let stars = document.querySelector('.stars');
let time = document.querySelector('.time');

//Making the cards and making them clickable
function setupCards() {
    
    shuffle(cardList);
    
    for (let i = 0; i < cardList.length; i++) {

        let card = document.createElement('li');
            card.classList.add('card');
            card.innerHTML = '<i class = "' + cardList[i] + '"></i>';
            cardContainer.appendChild(card);
                card.addEventListener('click', function () {
                card.classList.add('open', 'show', 'disable');
                opened.push(card);
                status=1;
                
                if (opened.length > 1) {
                compareCards(card, opened[0]);
                updateMovesDisplay();
                isGameEnd();
                }
                });
        }
}

//star rating's change
function rating() {

const starOne = document.getElementsByClassName("one");
const starTwo = document.getElementsByClassName("two");
const starThree = document.getElementsByClassName("three");

   if (moves <= 3) {
        //do nothing
      } else if (moves <= 5) {
        starThree[0].style.color = "#b2b0b0";
      } else if (moves <= 7) {
        starTwo[0].style.color = "#b2b0b0";
      }
}

//Updating the number of moves on screen
function updateMovesDisplay() {
document.querySelector('.moves').innerHTML = moves;
}

//Comparing opened cards
function compareCards(secondCard, firstCard) {
    moves++;
    if (secondCard.innerHTML === firstCard.innerHTML) {
        firstCard.classList.add('match');
        opened[1].classList.add('match');
        matched.push(firstCard, opened[1]);
        opened.splice(0, 2);
    } else {
        setTimeout(function () {
        firstCard.classList.remove('open', 'show', 'disable');
        opened[1].classList.remove('open', 'show', 'disable');
        opened.splice(0, 2);
        }, 500);
    }
}
//Checking if the game ended 
function isGameEnd() {
    if (matched.length === cardList.length) {
    $('.moves').html(moves);
            $('#myModal').modal('show');
    }
}

function startGame() {
//delete cards
cardContainer.innerHTML = "";
        setupCards();
        opened = [];
        matched = [];
        document.querySelector('.moves').innerHTML = 0;
        shuffle(cardList);
        time.innerHTML = '00:00';
        status = 0;
}

//Timer https://stackoverflow.com/questions/20618355/the-simplest-possible-javascript-countdown-timer
if(status===1){function timer() {
    let minutes = 0;
    let seconds = 0;
    gameInterval = setInterval(function () {
        seconds = parseInt(seconds, 10) + 1;
        minutes = parseInt(minutes, 10);
        if (seconds >= 60) {
            minutes += 1;
            seconds = 0;
        }

        seconds = seconds < 10 ? "0" + seconds : seconds;
        minutes = minutes < 10 ? "0" + minutes : minutes;

        time.innerHTML = minutes + ":" + seconds;
    }, 1000);
};
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
var currentIndex = array.length, temporaryValue, randomIndex;
        while (currentIndex !== 0) {
randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
}

return array;
        }
//Restart button function
document.querySelector('.restart').addEventListener('click', function () {
startGame();
});

startGame();
rating();
      
        /*
         * set up the event listener for a card. If a card is clicked:
         *  - display the card's symbol (put secondCard functionality in another function that you call from secondCard one)
         *  - add the card to a *list* of "open" cards (put secondCard functionality in another function that you call from secondCard one)
         *  - if the list already has another card, check to see if the two cards match
         *    + if the cards do match, lock the cards in the open position (put secondCard functionality in another function that you call from secondCard one)
         *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put secondCard functionality in another function that you call from secondCard one)
         *    + increment the move counter and display it on the page (put secondCard functionality in another function that you call from secondCard one)
         *    + if all cards have matched, display a message with the final score (put secondCard functionality in another function that you call from secondCard one)
         */