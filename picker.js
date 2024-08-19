const selectionArea = document.getElementById('selection-area');
let participants = [];
let timer;

// Random color generator
function getRandomColor() {
    const r_value = Math.floor(Math.random() * 256);
    const g_value = Math.floor(Math.random() * 256);
    const b_value = Math.floor(Math.random() * 256);
    
    return `rgb(${r_value}, ${g_value}, ${b_value})`;
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
        timer = setTimeout(selectRandomParticipant, 2000); // Select after 2 seconds
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
        timer = setTimeout(selectRandomParticipant, 2000 + Math.random()); // Select after 2 seconds
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
        }, 5000); // 5 seconds; adjust this time based on animation duration
    }
}
