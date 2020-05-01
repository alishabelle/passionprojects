// Game
const board       = document.getElementsByClassName('storeCards')[0];
const cards       = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9];
let   gameStart = false;

// Selections
let cardVal  = [];
let card_tile  = [];
let hold   = [];    // Cards that is flipped and matches
let selections = null;
let flip    = null;

// Shuffle function
Array.prototype.shuffle = function() {
    let i = this.length, j, temp;
    while (--i > 0) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}

/* Add cards to board */
function newGame() {

    // Don't generate if there already is a game
    if (gameStart)
        return;

    cards.shuffle();
    flip = 0;

    // Clear board if its filled already
    clearBoard();

    for (let i = 0; i < cards.length; i++) {

        // first create new li
        const cardLi = document.createElement('li');
        cardLi.classList.add('tileboard');

        // create the card class
        const card = document.createElement('div');
        card.classList.add('card');      // Assign className to new element
        card.classList.add(`tile_${i}`); // set identifier for card

        // the clickSelector
        card.setAttribute('onclick', `flipTile(this, ${cards[i]})`);

        // append card to Li, and then that to the board
        cardLi.appendChild(card);
        board.appendChild(cardLi);
    }

    gameStart = true;
}

/* The flip function */
function flipTile(tile, val) {

        // Check if card already is matched or is currently selected
        if (hold.includes(tile.classList[1]))
            return;

        if (card_tile.includes(tile.classList[1]))
            return;

        // Only process 2 clicks at a time
        selections++;
        if (selections > 2)
            return;

        // Set background for tile
        tile.style.background = `black url(images/image-${val}.png) 100px`;
        tile.style.backgroun;

        // First card selected
        if (cardVal.length === 0) {
            cardVal.push(val);
            card_tile.push(tile.classList[1]);            
        }
        
        // Second card selected
       else if (cardVal.length === 1) {
            cardVal.push(val);
            card_tile.push(tile.classList[1]);

            // See if they are the same
            if (cardVal[0] == cardVal[1]) {
                flip += 2;

                // Save the 2 cards
                hold.push(card_tile[0]);
                hold.push(card_tile[1]);

                // Reset 
                card_tile = [];
                cardVal = [];
                selections = 0;

                // See if game is finished
                setTimeout(function() {
                    if (flip == cards.length) {
                        gameStart = false;
                        if (window.confirm('Congratulations, you made it! Want to play again?'))
                        {
                            // Flip all cards back
                            const tmp = document.querySelectorAll('.card');
                            tmp.forEach(function(e) {
                                e.style.background = 'url(images/default.png)';
                            });

                            // Start new game
                            setTimeout(function() {
                                resetGame();
                            }, 400);   
                        }

                        else
                            window.location = 'https://images.app.goo.gl/RwMQWkxNTUDdigyA8';   
                    }
                }, 750);
            }

            // else flipback
            else {
                setTimeout(function() {

                    // Change back
                    for (let i = 0; i < card_tile.length; i++) {
                        const selected = document.querySelector(`.${card_tile[i]}`);
                        selected.style.background= 'url(images/default.png)';
                    }

                    // Reset
                    card_tile = [];
                    cardVal = [];
                    selections = 0;
                }, 750);
            }
        }
};

function clearBoard() {
    var divs = document.querySelectorAll('.tileboard');
    if (divs.length > 1)
        Array.from(divs).forEach((div) => div.remove())
};

// Setup a game on first sight
window.onload = function () {
    newGame();
};

// New game functionallity
const key = document.getElementsByClassName('key')[0];
key.addEventListener('click', () => {
    resetGame();
});


// Reset the board
function resetGame() {

    // Disable game
    gameStart = false;

    // Empty variables
    cardVal = [];
    card_tile = [];
    hold = []; 
    selections = null;
    flip = null;

    // Clear board
    const divs = document.querySelectorAll('.tileboard');
    divs.forEach(function (e) {
        e.style.opacity = '0';
    });

    setTimeout(function () {
        newGame(); // Calls resetBoard() aswell, no need to do it in this function
    }, 900);
}