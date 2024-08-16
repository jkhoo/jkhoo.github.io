let heads = 0;
let tails = 0;
let numTosses = 1;

function tossCoin() {
    const random = Math.floor(Math.random() * 2);
    const result = document.getElementById("result");
    const coinImage = document.getElementById("coin-image");
    const count = document.getElementById("count");
    const flipSound = document.getElementById("flip-sound");

    // Determine the result based on the random number
    if (random === 0) {
        result.textContent = "Heads";
        coinImage.src = "images/coin-heads.png";
        heads++;
    } else {
        result.textContent = "Tails";
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