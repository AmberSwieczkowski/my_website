document.addEventListener('DOMContentLoaded', () => {

    // card options
    const cardArray = [
        {
            name: 'trump',
            img: '/images/memory_game/donald-trump-president.jpg'
        },
        {
            name: 'trump',
            img: '/images/memory_game/donald-trump-president.jpg'
        },
        {
            name: 'orange',
            img: '/images/memory_game/orange-painted-blue.jpg'
        },
        {
            name: 'orange',
            img: '/images/memory_game/orange-painted-blue.jpg'
        },
        {
            name: 'pineapple',
            img: '/images/memory_game/pineapple-with-sunglasses.jpeg'
        },
        {
            name: 'pineapple',
            img: '/images/memory_game/pineapple-with-sunglasses.jpeg'
        },
        {
            name: 'ferrari',
            img: '/images/memory_game/red-ferrari-convertible.jpg'
        },
        {
            name: 'ferrari',
            img: '/images/memory_game/red-ferrari-convertible.jpg'
        },        
        {
            name: 'flag',
            img: '/images/memory_game/small-american-flag.jpg'
        },
        {
            name: 'flag',
            img: '/images/memory_game/small-american-flag.jpg'
        },
        {
            name: 'strawberry',
            img: '/images/memory_game/strawberry.jpg'
        },
        {
            name: 'strawberry',
            img: '/images/memory_game/strawberry.jpg'
        },
        {
            name: 'cabin',
            img: '/images/memory_game/cabin-in-the-snow.jpg'
        },
        {
            name: 'cabin',
            img: '/images/memory_game/cabin-in-the-snow.jpg'
        },
        {
            name: 'pinkFlower',
            img: '/images/memory_game/pink-flower.jpg'
        },
        {
            name: 'pinkFlower',
            img: '/images/memory_game/pink-flower.jpg'
        },        
        {
            name: 'rocket',
            img: '/images/memory_game/rocket-blasting-off.jpg'
        },
        {
            name: 'rocket',
            img: '/images/memory_game/rocket-blasting-off.jpg'
        },
        {
            name: 'sunflower',
            img: '/images/memory_game/sunflower.jpg'
        },
        {
            name: 'sunflower',
            img: '/images/memory_game/sunflower.jpg'
        }
    ]

cardArray.sort(() => 0.5 - Math.random());

const grid = document.querySelector('.memory__game__grid');
const scoreDisplay = document.querySelector('#memory__game__score');
const status = document.querySelector('#memory__game__status');
var cardsChosen = [];
var cardsChosenId = [];
var cardsWon = [];


// create your board
function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        var card = document.createElement('img');
        card.setAttribute('src', '/images/memory_game/blue-marble-tile.jpg');
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    }
}

// check for matches
function checkForMatch() {
    var cards = document.querySelectorAll('img');
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];
    if (cardsChosen[0] === cardsChosen[1] && cardsChosenId[0] !== cardsChosenId[1]) {
        status.textContent = 'You found a match!';
        cards[optionOneId].removeAttribute('img');
        cards[optionTwoId].removeAttribute('img');
        // cards[optionTwoId].setAttribute('src', '/images/memory_game/white-fluff-background.jpg');
        cards[optionOneId].setAttribute('name', 'matched');
        cards[optionTwoId].setAttribute('name', 'matched');
        cardsWon.push(cards)
    } else if (cardsChosenId[0] !== cardsChosenId[1]) {
        cards[optionOneId].setAttribute('src', '/images/memory_game/blue-marble-tile.jpg');
        cards[optionTwoId].setAttribute('src', '/images/memory_game/blue-marble-tile.jpg');
        status.textContent = 'Oops, try again';
    }
    cardsChosen = [];
    cardsChosenId = [];
    scoreDisplay.textContent = cardsWon.length;
    if (cardsWon.length === cardArray.length/2) {
        status.textContent = 'Congratulations! You found all the matches!'
    }
}


// flip your card
function flipCard() {
    var cardId = this.getAttribute('data-id');
    if (this.name !== 'matched' && cardId !== cardsChosenId[0]) {
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);
        this.setAttribute('src', cardArray[cardId].img);
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }
}

createBoard();

})