// ================= Welcome Message =================
function showWelcomeMessage() {
    const message = "Welcome to Jarvis";
    const welcomeElement = document.getElementById("welcomeMessage");

    // Clear and show the element
    welcomeElement.textContent = "";
    welcomeElement.style.display = "block";

    let i = 0;
    const intervalTime = 200; // milliseconds per letter

    const interval = setInterval(() => {
        welcomeElement.textContent += message[i];
        i++;
        if (i >= message.length) {
            clearInterval(interval);

            // Hide the welcome message after 1.5 seconds
            setTimeout(() => {
                welcomeElement.style.display = "none";
            }, 1500);
        }
    }, intervalTime);

    // Speak the full message once
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
}

// Call on page load
window.addEventListener("load", showWelcomeMessage);
