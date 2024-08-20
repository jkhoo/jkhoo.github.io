const gameArea = document.getElementById('game-area');
const instruction = document.getElementById('instruction');
const result = document.getElementById('result');
let touches = []; // Store active touches

// Add touchstart event to track initial touches
gameArea.addEventListener('touchstart', (event) => {
    for (let i = 0; i < event.changedTouches.length; i++) {
        const touch = event.changedTouches[i];
        addFingerCircle(touch);
    }
});

// Add touchmove event to update the position of the fingers
gameArea.addEventListener('touchmove', (event) => {
    for (let i = 0; i < event.changedTouches.length; i++) {
        const touch = event.changedTouches[i];
        moveFingerCircle(touch);
    }
});

// Add touchend event to remove the finger circles when touches end
gameArea.addEventListener('touchend', (event) => {
    for (let i = 0; i < event.changedTouches.length; i++) {
        const touch = event.changedTouches[i];
        removeFingerCircle(touch);
    }
});

// Add touchcancel event (similar to touchend)
gameArea.addEventListener('touchcancel', (event) => {
    for (let i = 0; i < event.changedTouches.length; i++) {
        const touch = event.changedTouches[i];
        removeFingerCircle(touch);
    }
});

// Function to add finger circles when touch starts
function addFingerCircle(touch) {
    const finger = document.createElement('div');
    finger.classList.add('finger');
    finger.id = `finger-${touch.identifier}`;
    finger.style.left = `${touch.clientX - 35}px`; // Center the circle
    finger.style.top = `${touch.clientY - 35}px`;
    finger.innerText = touches.length + 1; // Number the finger
	
	// Assign a random color
	const r = Math.floor(Math.random() * 256);
	const b = Math.floor(Math.random() * 256);
	const g = Math.floor(Math.random() * 256);
	finger.style.color = `rgb(${r}, ${b}, ${g})`;

    gameArea.appendChild(finger);
    touches.push(touch); // Store the touch information

    // Update instruction
    instruction.innerText = 'Hold still... selecting a finger';
}

// Function to move finger circles as the user moves their fingers
function moveFingerCircle(touch) {
    const finger = document.getElementById(`finger-${touch.identifier}`);
    if (finger) {
        finger.style.left = `${touch.clientX - 35}px`;
        finger.style.top = `${touch.clientY - 35}px`;
    }
}

// Function to remove finger circles when touch ends
function removeFingerCircle(touch) {
    const finger = document.getElementById(`finger-${touch.identifier}`);
    if (finger) {
        finger.remove();
    }

    // Remove the touch from the touches array
    touches = touches.filter(t => t.identifier !== touch.identifier);

    // If all touches are removed, reset instruction and result
    if (touches.length === 0) {
        instruction.innerText = 'Touch the screen with multiple fingers';
        result.innerText = '';
    }
}

// Function to select a random finger after a delay
function selectRandomFinger() {
    if (touches.length > 0) {
        const randomIndex = Math.floor(Math.random() * touches.length);
        const selectedTouch = touches[randomIndex];
        const selectedFinger = document.getElementById(`finger-${selectedTouch.identifier}`);

        // Highlight the selected finger
        selectedFinger.classList.add('selected');

        // Show the result
        result.innerText = `Selected Finger: ${randomIndex + 1}`;
    }
}

// Automatically select a random finger after 3 seconds of holding
let selectionTimeout;
gameArea.addEventListener('touchstart', () => {
    clearTimeout(selectionTimeout); // Reset timeout if touch starts again
    selectionTimeout = setTimeout(selectRandomFinger, 3000); // 3-second delay before selection
});
