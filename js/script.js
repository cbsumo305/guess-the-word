const guessedLetters = document.querySelector(".guessed-letters");
const btnGuess = document.querySelector(".guess");
const txtLetter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const numGuesses = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const btnPlayAgain = document.querySelector(".play-again");

let word = "magnolia";

//Create and name a function to update the paragraph’s innerText for the “words-in-progress” element with circle symbols (●) to represent each letter in the word. The symbols will stay on the screen until the correct letter is guessed (in a future step). Hint: Copy and paste the ● symbol into your code!

//Call the function and pass it the word variable as the argument. You should see 8 circle symbols on the screen, one for each letter in the word “magnolia.” Hint: You’ll need to use an array and then join it back to a string using the .join("") method.

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

btnGuess.addEventListener("click", function (e) {
    e.preventDefault();
    const ltr = txtLetter.value;
    txtLetter.value = "";
})

