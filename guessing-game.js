/* 
Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "npm test".

// getElementById("prompt").innerText()
// document.createElement("li")
// getElementById
// getElementsByClassName
// getElementsByTag
// querySelectorAll
// innerText


In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.
*/



function generateWinningNumber() {
    let winningNum = Math.floor(Math.random() * 100 + 1);
    return winningNum;
}

function shuffle(array) {
    let m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}
function newGame() {
    let game = {
        playersGuess: null,
        pastGuesses: [],
        winningNumber: generateWinningNumber(),
        difference: function () {
            return Math.abs(this.playersGuess - this.winningNumber);
        },
        isLower: function () {
            if (this.playersGuess < this.winningNumber) {
                return true
            } else {
                return false
            }
        },
        playersGuessSubmission: function (num) {
            num = Math.floor(num)
            this.playersGuess = num;
            if (num < 1 || num > 100 ||  Number.isNaN(num)) {
                throw 'That is an invalid guess.'
            } else {
                let currentGuess = this.playersGuess
                return this.checkGuess(currentGuess)
            }
        },
        checkGuess: function (guess) {
            let result = '';
            if (guess === this.winningNumber) {  // checks to see if you won
                return 'You Win!';
            } else if (this.pastGuesses.includes(guess)) {
                return 'You have already guessed that number.';
            } else if (this.difference() < 10) {
                this.pastGuesses.push(guess);
                result = "You\'re burning up!";
            } else if (this.difference() < 25) {
                this.pastGuesses.push(guess);
                result = "You\'re lukewarm.";
            } else if (this.difference() < 50) {
                this.pastGuesses.push(guess);
                result = "You\'re a bit chilly.";
            } else if (this.difference() < 100) {
                this.pastGuesses.push(guess);
                result = "You\'re ice cold!";
            }
            if (this.pastGuesses.length >= 5) {  // checks to see if you've lost
                result = 'You Lose.';
            }
            return result;
        },
        provideHint: function () {
            let randArray = [];
            randArray[0] = this.winningNumber;
            for (let i = 1; i < 3; i++) {
                randArray[i] = generateWinningNumber();
            }
            let hintArray = shuffle(randArray);
            return hintArray;
        }
    }

    let pastGuess = document.getElementsByClassName('guess')
    document.getElementById('hint').innerText = ''
    for(let i = 0; i < pastGuess.length; i++){
        pastGuess[i].innerText = ''
    }
    gameObject = game;
    counter = 0;
    document.getElementById('playerGuess').value = 'enter guess here'
}


// let gameObject = newGame();
let guessArea = document.getElementById("previousGuesses"); //previous guess list

function subGuess() {
    let guess = document.getElementById('playerGuess').value;
    let clue = document.getElementById('hint');
    clue.innerText = gameObject.playersGuessSubmission(Number(guess));
    let pastGuess = document.getElementsByClassName('guess')
    if(clue.innerText === "You have already guessed that number."){
        return
    } else if(counter > 5){
        clue.innerText = "You Lose!"
        return
    } else{
        pastGuess[counter].innerText = guess
        counter++
    }
}

function sendHint(){
    let hint = gameObject.provideHint();
    let hintSent = `The number is one of these nubmers, ${hint[0]}, ${hint[1]}, ${hint[2]}`
    document.getElementById('hint').innerText = hintSent;
}

newGame();



