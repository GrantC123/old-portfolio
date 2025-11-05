// Dark mode initialization - runs immediately to prevent flash
(function() {
    // Check if dark mode preference exists, default to dark mode
    const darkModePreference = localStorage.getItem('darkMode');
    const isDarkMode = darkModePreference !== 'false'; // Default to true unless explicitly set to false
    
    if (isDarkMode) {
        document.documentElement.classList.add('dark');
        // Set the preference if it doesn't exist
        if (darkModePreference === null) {
            localStorage.setItem('darkMode', 'true');
        }
    }
})();
