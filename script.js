let heads = 0;
let tails = 0;
let numTosses = 1;

function tossCoin() {
    const random = Math.floor(Math.random() * 2);
    const resultElement = document.getElementById("result");
    const coinImage = document.getElementById("coin-image");
    const countElement = document.getElementById("count");
    const flipSound = document.getElementById("flip-sound");

    // Determine the result based on the random number
    if (random === 0) {
        resultElement.textContent = "Heads";
        coinImage.src = "images/coin-heads.png";
        heads++;
    } else {
        resultElement.textContent = "Tails";
        coinImage.src = "images/coin-tails.png";
        tails++;
    }

    updateCounter();
    playSound();
}

function updateCounter() {
    countElement.textContent = 'Heads: ${heads} Tails: ${tails}';
}

function updateNumTosses() {
    numTosses = document.getElementById("num-tosses").value;
}

// Call updateNumTosses() before each coin toss