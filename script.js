let numTosses = 0;
let heads = 0;
let tails = 0;
let headsPercentage = 0;
let tailsPercentage = 0;

function tossCoin() {

    numTosses++; // Increment total tosses before determining result

    const random = Math.floor(Math.random() * 2);
    const resultElement = document.getElementById("resultElement");
    const coinImage = document.getElementById("coinImage");
    const countElement = document.getElementById("countElement");
    const totalTossesElement = document.getElementById("totalTosses");
    const flipSound = document.getElementById("flip-sound");

    // Determine the result based on the random number
    if (random === 0) {
        resultElement.textContent = "You got Heads!";
        coinImage.src = "images/coin-heads.png";
        heads++;
    } else {
        resultElement.textContent = "You got Tails!";
        coinImage.src = "images/coin-tails.png";
        tails++;
    }

    const headsPercentage = (heads / numTosses) * 100;
    const tailsPercentage = (tails / numTosses) * 100;

    updateCounter();
    playSound();
}


function updateCounter() {

    totalTossesElement.textContent = 'Total Tosses: ${numTosses}';
    countElement.textContent = 'Heads: ${heads} (${headsPercentage.toFixed(2)}%) | Tails: ${tails} (${tailsPercentage.toFixed(2)}%)';
}


function playSound() {
    var sound = document.getElementById("flip-sound");
    sound.play();
}