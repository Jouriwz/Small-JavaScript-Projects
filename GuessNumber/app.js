// UI elements
const gameEl = document.querySelector('#game');
const minNum = document.querySelector('.min-num');
const maxNum = document.querySelector('.max-num');
const guessBtn = document.querySelector('#guess-btn');
const guessInput = document.querySelector('#guess-input');
const message = document.querySelector('.message');
const guessGame = document.querySelector('#guessGame');

const minInput = document.querySelector('#min-input');
const maxInput = document.querySelector('#max-input');
const guessLeftInput = document.querySelector('#guessleft-input');
const settingsBtn = document.querySelector('#settings-btn');

// Hides the game element until game parameters are given
let gameCard = guessGame.style.display = 'none';

settingsBtn.addEventListener('click', function (e) {

    let min = parseInt(minInput.value);
    let max = parseInt(maxInput.value);
    let winningNum = getRandomNum(min, max);
    let guessesLeft = parseInt(guessLeftInput.value);

    // Get winning num
    function getRandomNum(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // Shows the game element
    guessGame.style.display = '';

    // Assign UI Min and Max
    minNum.textContent = min;
    maxNum.textContent = max;

    // Listen for guess
    guessBtn.addEventListener('click', function (e) {
        let guess = parseInt(guessInput.value);

        // Validate input
        if (isNaN(guess) || guess < min || guess > max) {
            setMessage(`Please enter a number between ${min} and ${max}`, 'red');
        }

        // Check if won
        if (guess === winningNum) {
            gameOver(true, `${winningNum} is correct, you win!`)
        } else {
            // if guess != winningNum
            guessesLeft -= 1;
            if (guessesLeft === 0) {
                gameOver(false, `${guess} is incorrect, YOU LOSE! 
            The correct number was ${winningNum}`)
            } else {
                guessInput.style.borderColor = 'red';
                guessInput.value = '';

                // Gives player a tip
                if (guess > winningNum) {
                    setMessage(`${guess} is incorrect, go lower. ${guessesLeft} guesses left`, 'red');
                } else {
                    setMessage(`${guess} is incorrect, go higher. ${guessesLeft} guesses left`, 'red');
                }
            }
        }
    });

});


// Game over
function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';
    // Disable input
    guessInput.disabled = true;
    // Change border color
    guessInput.style.borderColor = color;
    // set text color
    message.style.color = color;
    // Set message
    setMessage(msg);

    // Play again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}