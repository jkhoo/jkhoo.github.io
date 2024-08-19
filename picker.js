const selectionArea = document.getElementById('selection-area');
let participants = [];
let timer;

// Random color generator
function getRandomColor() {
    const colors = ['#3498db', '#9b59b6', '#1abc9c', '#e74c3c', '#f39c12', '#2ecc71', '#e67e22'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Add a participant when the area is clicked
selectionArea.addEventListener('click', (event) => {
	const rect = selectionArea.getBoundingClientRect();
	const x = event.clientX - rect.left;
	const y = event.clientY - rect.top;

    // Create the participant element
    const participant = document.createElement('div');
    participant.classList.add('participant');
    participant.style.left = `${x}px`;
    participant.style.top = `${y}px`;
    participant.style.backgroundColor = getRandomColor(); // Assign a random color

    // Add the participant to the screen and the list
    selectionArea.appendChild(participant);
    participants.push(participant);

    // Start the selection process if there are at least 2 participants
    if (participants.length >= 2) {
        if (timer) clearTimeout(timer); // Clear any existing timer
        timer = setTimeout(selectRandomParticipant, 2000 + Math.random() * 1000); // Select after 2 to 3 seconds
    }
});

// Add a participant when the area is tapped (mobile)
selectionArea.addEventListener('touchstart', (event) => {
	
	// Prevent default behavior to prevent scrolling
	event.preventDefault();

	// Get touch coordinates
	const touch = event.touches[0];
	const rect = selectionArea.getBoundingClientRect();
	const x = touch.clientX - rect.left;
	const y = touch.clientY - rect.top;
  
	// Create the participant element
    const participant = document.createElement('div');
    participant.classList.add('participant');
    participant.style.left = `${x}px`;
    participant.style.top = `${y}px`;
    participant.style.backgroundColor = getRandomColor(); // Assign a random color

    // Add the participant to the screen and the list
    selectionArea.appendChild(participant);
    participants.push(participant);

    // Start the selection process if there are at least 2 participants
    if (participants.length >= 2) {
        if (timer) clearTimeout(timer); // Clear any existing timer
        timer = setTimeout(selectRandomParticipant, 2000 + Math.random() * 1000); // Select after 2 to 3 seconds
    }

});


// Function to randomly select a participant
function selectRandomParticipant() {
    if (participants.length > 1) {
        // Clear any previous selections
        participants.forEach(participant => participant.classList.remove('selected'));

        // Trigger haptic feedback (if supported)
        if (navigator.vibrate) {
            navigator.vibrate(200); // Vibrate for 200ms
        }

        // Choose a random participant
        const randomIndex = Math.floor(Math.random() * participants.length);
        const chosenParticipant = participants[randomIndex];

        // Add flashing animation
        chosenParticipant.classList.add('selected');

        // Optional: Reset the selection after the animation
        setTimeout(() => {
            chosenParticipant.classList.remove('selected');
        }, 1500); // Adjust this time based on animation duration
    }
}
