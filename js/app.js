

/*
 * Create a list that holds all of your cards
 */
const deck = ['fa-diamond', 'fa-diamond',
'fa-paper-plane-o', 'fa-paper-plane-o',
'fa-anchor', 'fa-anchor',
'fa-bolt', 'fa-bolt',
'fa-cube', 'fa-cube',
'fa-leaf', 'fa-leaf',
'fa-bicycle', 'fa-bicycle',
'fa-bomb', 'fa-bomb'];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

let num = "";

function gameStart () {
// Number of moves reset  to zero
let num = 0;
stopTimer();
const timeCount = setInterval (count,1000);

const list = document.querySelector('.deck');
//Remove the current deck
if (!(list.childNodes.length==0)){
// console.log(true);
while (list.firstChild) {
    list.removeChild(list.firstChild);
}
// console.log(list);
shuffle(deck);
createDeck();
}

else{
// Shuffle the deck
shuffle(deck);
createDeck();
}
// Loop through each card and create its HTML
function createDeck (){
deck.forEach(function(card){
    const item = document.createElement('li');
    list.appendChild(item);
    item.className = "card";
    const item1 = document.createElement('i');
    item.appendChild(item1);
    item1.classList.add ("fa", card);
  });
}

// flipping the cards on a click
const allCards = document.querySelectorAll('.card');
let cards = [];
// Create an array that stores all the matched cards to check when the game is over
let match = [];

allCards.forEach(function(card){

  card.addEventListener('click',function(e){

    // condition for when a card is clicked twice
    if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')){
    card.classList.add('open','show');
    cards.push(card);
    // console.log(cards.length);
    // Leave open in case of match
    if(cards.length == 2){
      const card1 = cards[0];
      const card2 = cards[1];
      if(card1.childNodes[0].classList[1]===card2.childNodes[0].classList[1]){
          card1.classList.add('match');
          card2.classList.add('match');
          // Push into the array that stores all matched cards to know when the game is over
          match.push(card1);
          match.push(card2);
          cards = [];
      }
      // Hide if no match
      else {
      setTimeout(function () {
        cards.forEach(function(card){
          card.classList.remove('open','show');
        });
        cards = [];
      }, 1000);
    }
    }


}
// Update number of Moves
num += 1;
const moves = document.querySelector('.moves');
moves.innerHTML = num;

// Stars rating
const stars = document.querySelectorAll('.fa-star');
if (num>20 && num<31) {
  stars[2].style.display = "none";
}
else if (num>30) {
  stars[2].style.display = "none";
  stars[1].style.display = "none";
}


// Winning
const popup = document.querySelectorAll('.popup')[0];
if (match.length == 2) {
  stopTimer();
  popup.style.display = "block";
}
});
});
}



// Timer setup
const timeCount = setInterval (count,1000);
let time = 0;
let second = "";
let minute = "";
function count () {
    time += 1;
    second = (time % 60);
    minute = parseInt(time / 60);
    document.querySelectorAll('#timer')[0].innerHTML = minute + ":" + second;
  }

function stopTimer() {
    window.clearInterval(timeCount);
}


// if(num=1){
//   const timeCount = setInterval (count,1000);
// }
// else {
//   window.clearInterval(timeCount);
// }

gameStart();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */





// Restart button
const restart = document.querySelector('.restart');
restart.addEventListener('click', function(e){
  gameStart();
  // window.clearInterval(timeCount);
  // const timeCount = setInterval (count,1000);
  console.log('restart');
});
