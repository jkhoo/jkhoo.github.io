let numTosses = 0;
let heads = 0;
let tails = 0;


function tossCoin() {

    numTosses++; // Increment total tosses before determining result

    const random = Math.floor(Math.random() * 2); // Pick 0 or 1 for coin toss
    const resultElement = document.getElementById("resultElement");
    const coinImage = document.getElementById("coinImage");
    const totalTossesElement = document.getElementById("totalTossesElement");
    const headsPercentage = (heads / numTosses) * 100;
    const tailsPercentage = (tails / numTosses) * 100;
    const countElement = document.getElementById("countElement");    
    const flipSound = document.getElementById("flipSound");
    

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

    totalTossesElement.textContent = 'Total Tosses: ' + numTosses;
    countElement.textContent = 'Heads: ' + heads + ' (' + headsPercentage.toFixed(2) + '%) | Tails: ' + tails + ' (' + tailsPercentage.toFixed(2) + '%)';

    var sound = document.getElementById("flipSound");
    sound.play();
}