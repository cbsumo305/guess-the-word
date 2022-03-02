const guessedLetters = document.querySelector(".guessed-letters");
const btnGuess = document.querySelector(".guess");
const txtLetter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const numGuesses = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const btnPlayAgain = document.querySelector(".play-again");
const guessForm = document.querySelector(".guess-form-box");

let word = "magnolia";
let alreadyGuessed = [];
let remainingGuesses = 8;





const wordCircles = function (theWord) {
    wordInProgress.innerText = "";
    const letters = theWord.split("");
    let circles = [];
    for (let letter of letters) {
        circles.push("●");
    }
    wordInProgress.innerText = circles.join("");
}

wordCircles(word);

const getWord = async function () {
    const wordLink = await fetch('https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt');
    const words = await wordLink.text();

    const wordArray = words.split("\n");

    const randomIndex = Math.floor(Math.random() * wordArray.length);

    word = wordArray[randomIndex].trim();

    remainingGuesses = word.length;
    numGuesses.innerText = remainingGuesses;

    wordCircles(word);
}

const startOver = function () {
    btnGuess.classList.add("hide");
    remaining.classList.add("hide");
    guessedLetters.classList.add("hide");
    guessForm.classList.add("hide");

    btnPlayAgain.classList.remove("hide");
}

btnGuess.addEventListener("click", function (e) {
    e.preventDefault();
    const ltr = txtLetter.value;
    txtLetter.value = "";
    validateInput(ltr);
})

const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input === "") {
        message.innerText = "Please enter a letter from A to Z.";
    } else if (input.length > 1) {
        message.innerText = "You entered more than 1 letter";
    } else if (input.match(acceptedLetter) === null) {
        message.innerText = "Please enter a letter from A to Z.";
    } else {
        message.innerText = "";
        makeGuess(input);
    }
}

const makeGuess = function (input) {
    const ltr = input.toUpperCase();
    if (alreadyGuessed.includes(ltr)) {
        message.innerText = "You already guessed that letter, silly. Try again.";
    } else {
        alreadyGuessed.push(ltr);
        displayGuesses();
        const ltrExists = revealLetter(ltr);

        if (ltrExists) {
            message.innerText = "You've entered a matching letter!";
            didYouWin();
        } else {
            countGuess(ltr);
        }
        
    }
}

const displayGuesses = function () {
    guessedLetters.innerHTML = "";
    for (let guess of alreadyGuessed) {
        let li = document.createElement("li");
        li.innerText = guess;
        guessedLetters.append(li);
    }
}

const revealLetter = function (ltr) {
    //wordInProgress
    const wordUpper = word.toUpperCase().split("");
    let circleWord = wordInProgress.innerText.split("");
    let trigger = false;
    wordUpper.forEach(function (letter, index) {
        if (letter === ltr) {
            circleWord[index] = ltr;
            trigger = true;
        }
    })

    wordInProgress.innerText = circleWord.join("");
    
    //didYouWin();

    return trigger;
}

const countGuess = function (input) {
    const wordUpper = word.toUpperCase().split("");
    if (!wordUpper.includes(input)) {
        remainingGuesses -= 1;
        numGuesses.innerText = remainingGuesses;
        if (remainingGuesses === 0) {
            message.innerText = `Oops! You lose! The word was ${word.toUpperCase()}.`;
            startOver();
        } else {
            message.innerText = `That is not a matching letter. You are running out of guesses!`;
        }
    }
}

const didYouWin = function () {
    const wordUpper = word.toUpperCase();
    const circleWord = wordInProgress.innerText;

    if (wordUpper === circleWord) {
        message.innerText = "You guessed the correct word! Congrats!";
        message.classList.add("win");
        message.classList.add("highlight");
        startOver();
    }
}

btnPlayAgain.addEventListener("click", function () {
    message.classList.remove("win");
    message.innerText = "";
    guessedLetters.innerHTML = "";
    
    alreadyGuessed = [];
    

    getWord();

    btnGuess.classList.remove("hide");
    remaining.classList.remove("hide");
    guessedLetters.classList.remove("hide");
    guessForm.classList.remove("hide");
    btnPlayAgain.classList.add("hide");
})

