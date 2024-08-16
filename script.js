let numTosses = 0;
let numHeads = 0;
let numTails = 0;


function tossCoin() {

    numTosses++; // Increment total tosses before determining result

    const random = Math.floor(Math.random() * 2); // Pick 0 or 1 for coin toss
    const resultElement = document.getElementById("resultElement");
    const coinImage = document.getElementById("coinImage");
    const totalTossesElement = document.getElementById("totalTossesElement");
    const countElement = document.getElementById("countElement"); 
    const flipSound = document.getElementById("flipSound");
    

    // Determine the result based on the random number
    if (random === 0) {
        resultElement.textContent = "You got Heads!";
        coinImage.src = "images/coin-heads.png";
        numHeads++;
    } else {
        resultElement.textContent = "You got Tails!";
        coinImage.src = "images/coin-tails.png";
        numTails++;
    }



    updateCount();
    playSound();

}


function updateCounter() {
 
    
    const headsPercentageElement = document.getElementById("headsPercentage");
    const tailsPercentageElement = document.getElementById("tailsPercentage");

    const headsPercentage = (numHeads / numTosses) * 100;
    const tailsPercentage = (numTails / numTosses) * 100;

    totalTossesElement.textContent = 'Total Tosses: ' + numTosses;
    countElement.textContent = 'Heads: ' + numHeads + ' (' + headsPercentage.toFixed(2) + '%) | Tails: ' + numTails + ' (' + tailsPercentage.toFixed(2) + '%)';
}

function playSound() {
    const sound = document.getElementById("flip-sound");
    sound.play();
}


function clear() {
    numTosses = 0;
    numHeads = 0;
    numTails = 0;

}