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

// ================= To-Do List Setup =================
let todos = []; // store tasks in memory

function addTodoTask(task) {
  if (!task) return;
  todos.push(task);
  addMessage("📝 Task added: " + task, "bot");
  speak("Task added: " + task);
}

function clearTodoTasks() {
  todos = [];
  addMessage("🗑 All tasks cleared.", "bot");
  speak("All tasks cleared.");
}

function listTodoTasks() {
  if (todos.length === 0) {
    addMessage("No tasks yet.", "bot");
    speak("You have no tasks.");
  } else {
    let list = todos.map((t, i) => `${i + 1}. ${t}`).join("<br>");
    addMessage("📋 Your tasks:<br>" + list, "bot");
    speak("Here are your tasks.");
  }
}

// ================= Weather API Integration =================
async function getWeather(city) {
  const apiKey = "YOUR_API_KEY"; // <-- Replace with your OpenWeatherMap API key
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();

    if (data.cod === 200) {
      const msg = `Weather in ${city}: ${data.weather[0].description}, Temp: ${data.main.temp}°C`;
      addMessage(msg, "bot");
      speak(msg);
    } else {
      addMessage("City not found", "bot");
      speak("Sorry, I couldn't find that city.");
    }
  } catch (error) {
    addMessage("Error fetching weather", "bot");
    speak("There was an error getting the weather.");
  }
}

// Handle user commands
function handleCommand(message) {
  const lowerMessage = message.toLowerCase();
  addMessage(message, "user");

  // ✅ To-Do List commands
  if (lowerMessage.startsWith("add task")) {
    const task = lowerMessage.replace("add task", "").trim();
    addTodoTask(task);
    return;
  }
  if (lowerMessage.startsWith("clear tasks")) {
    clearTodoTasks();
    return;
  }
  if (lowerMessage.startsWith("show tasks") || lowerMessage.startsWith("list tasks")) {
    listTodoTasks();
    return;
  }

  // AI definition
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
    return;
  }

  // Greetings
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

  // Calculator
  if (lowerMessage.includes("calculate") || lowerMessage.includes("solve")) {
    let expr = lowerMessage.replace("calculate", "").replace("solve", "").trim();
    calculate(expr);
    return;
  }

  // Weather command
  if (lowerMessage.includes("weather in")) {
    const city = lowerMessage.replace("weather in", "").trim();
    getWeather(city);
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

// ================= Mic Button (Siri Voice Mode) =================
micBtn.addEventListener("click", () => {
  speak("Switching to Siri Voice Mode...");
  document.body.style.opacity = 0;
  document.body.style.transition = "opacity 0.5s ease";
  setTimeout(() => {
    window.location.href = "siri.html";
  }, 500);
});
