const chatContainer = document.getElementById("chatContainer");
const userInput = document.getElementById("userInput");
const micBtn = document.getElementById("micBtn");

// Add message in chat
function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.innerHTML = text;
  chatContainer.appendChild(msg);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Voice output
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.volume = 1;
  window.speechSynthesis.speak(utterance);
}

// Auto greeting on page load
window.onload = function () {
  const greeting = "🤖 Hello! How may I help you?";
  addMessage(greeting, "bot");
  speak(greeting);
};

// Helper functions
function triggerEffects(callback) {
  setTimeout(callback, 500);
}

function speakAndThenNavigate(msg, url) {
  speak(msg);
  addMessage(msg, "bot");
  setTimeout(() => window.open(url, "_blank"), 1500);
}

// Calculator
function calculate(expr) {
  try {
    const result = eval(expr);
    addMessage("Result: " + result, "bot");
    speak("The answer is " + result);
  } catch (e) {
    addMessage("Invalid calculation", "bot");
    speak("Sorry, I cannot calculate that.");
  }
}

// Handle user commands
function handleCommand(message) {
  const lowerMessage = message.toLowerCase();
  addMessage(message, "user");

  // Check AI definition **first**
  if (
    lowerMessage === "what is ai" ||
    lowerMessage === "define ai" ||
    lowerMessage === "meaning of ai" ||
    lowerMessage === "artificial intelligence"
  ) {
    const reply =
      "🤖 Artificial Intelligence, or AI, is a branch of computer science that enables machines to perform tasks that normally require human intelligence — like learning from data, recognizing speech or images, solving problems, and making decisions.";
    addMessage(reply, "bot");
    speak(reply);
    return; // stop further checks
  }

  // Optional greetings
  if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
    const reply = "🤖 Hello! How may I help you?";
    addMessage(reply, "bot");
    speak(reply);
    return;
  }

  // Open websites
  if (lowerMessage.includes("open google")) return speakAndThenNavigate("Opening Google...", "https://www.google.com");
  if (lowerMessage.includes("open youtube")) return speakAndThenNavigate("Opening YouTube...", "https://www.youtube.com");
  if (lowerMessage.includes("open facebook")) return speakAndThenNavigate("Opening Facebook...", "https://www.facebook.com");

  // Time & Date
  if (lowerMessage.includes("time")) {
    const time = new Date().toLocaleTimeString();
    addMessage("🕒 Current Time: " + time, "bot");
    speak("The current time is " + time);
    return;
  }

  if (lowerMessage.includes("date")) {
    const date = new Date().toLocaleDateString();
    addMessage("📅 Today's Date: " + date, "bot");
    speak("Today's date is " + date);
    return;
  }

  // Calculator (avoid triggering on "what is ai")
  if (lowerMessage.includes("calculate") || lowerMessage.includes("solve")) {
    let expr = lowerMessage.replace("calculate", "").replace("solve", "").trim();
    calculate(expr);
    return;
  }

  // Default Google search
  if (!lowerMessage.includes("🤖")) {
    speakAndThenNavigate(
      "Searching for " + message,
      "https://www.google.com/search?q=" + message.replace(/ /g, "+")
    );
    return;
  }

  // Echo fallback
  addMessage("🤖 " + message, "bot");
  speak(message);
}

// Send message when clicking send
function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;
  handleCommand(text);
  userInput.value = "";
}

// Send on Enter key
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

// Voice recognition setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = false;
recognition.lang = "en-US";

micBtn.addEventListener("click", () => recognition.start());

recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;
  handleCommand(transcript);
};
