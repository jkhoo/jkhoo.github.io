function toggleMenu() {
	const navLinks = document.querySelector('.nav-links');
	const hamburger = document.querySelector('.hamburger');

	// Toggle the active class for both the nav and hamburger icon
	navLinks.classList.toggle('active');
	hamburger.classList.toggle('active');
}

// Highlight the active page in the navbar
function highlightCurrentPage() {
	const currentLocation = window.location.href;
	const navLinks = document.querySelectorAll('.nav-links a');

	navLinks.forEach(link => {
		if (link.href === currentLocation) {
			link.classList.add('active');
		}
	});
}

// Call the function to highlight the active link
highlightCurrentPage();