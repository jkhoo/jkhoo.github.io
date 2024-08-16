function tossCoin() {
  // Generate a random number (0 or 1)
  const random = Math.floor(Math.random() * 2);
  const resultElement = document.getElementById("result");

  // Determine the result based on the random number
  if (random === 0) {
    resultElement.textContent = "Heads";
  } else {
    resultElement.textContent = "Tails";
  }
}