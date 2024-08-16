let numTosses = 0;
let heads = 0;
let tails = 0;
let headsPercentage = 0;
let tailsPercentage = 0;

function tossCoin() {
    const random = Math.floor(Math.random() * 2);
    const result = document.getElementById("resultElement");
    const coinImage = document.getElementById("coinImage");
    const count = document.getElementById("countElement");
    const totalTossesElement = document.getElementById("totalTosses");
    const flipSound = document.getElementById("flip-sound");

    numTossses++;

    // Determine the result based on the random number
    if (random === 0) {
        result.textContent = "You got Heads!";
        coinImage.src = "images/coin-heads.png";
        heads++;
    } else {
        result.textContent = "You got Tails!";
        coinImage.src = "images/coin-tails.png";
        tails++;
    }

    updateCounter();
    playSound();
}

function updateCounter() {
	const headsPercentage = (heads / numTosses) * 100;
	const tailsPercentage = (tails / numTosses) * 100;

    totalTosses.textContent = 'Total Tosses: ${numTosses}';
    count.textContent = 'Heads: ${heads} (${headsPercentage.toFixed(2)}%) | Tails: ${tails} (${tailsPercentage.toFixed(2)}%)';
}