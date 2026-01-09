// ====== ELEMENTS ======
const chatContainer = document.getElementById("chatContainer");
const userInput = document.getElementById("userInput");
const micBtn = document.getElementById("micBtn");

// ====== GLOBAL ======
let listening = false;
let todoMode = false;
let todos = [];

// ==========================================
//  MIC BUTTON → OPEN SIRI PAGE
// ==========================================
micBtn.addEventListener("click", () => {
    window.location.href = "siri.html";   // OPEN SIRI UI PAGE
});


// ====== SPEECH RECOGNITION (NOT USED NOW BECAUSE SIRI TAKES OVER) ======
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = true;
recognition.interimResults = false;
recognition.lang = "en-US";

// Start Listening (disabled in AI mode, Siri will handle)
function startListening() {
  if (listening) return;
  try {
    recognition.start();
    listening = true;
    micBtn.classList.add("listening");
    addMessage("🔊 Listening...", "bot");
  } catch (e) {}
}

// Stop Listening
function stopListening() {
  if (!listening) return;
  try {
    recognition.stop();
  } catch (e) {}
  listening = false;
  micBtn.classList.remove("listening");
  addMessage("🔈 Paused listening.", "bot");
}

// REMOVE auto-start on load (Siri handles listening)
window.addEventListener("load", () => {
    botReply("🤖 Hello! How may I help you?");
});

// Auto restart if needed
recognition.onend = () => {
  if (listening) {
    setTimeout(() => {
      try { recognition.start(); } catch (e) {}
    }, 300);
  }
};

// When speech detected
recognition.onresult = (event) => {
  const transcript = event.results[event.results.length - 1][0].transcript.trim();
  addMessage(transcript, "user");
  handleCommand(transcript);
};

// Speech error handling
recognition.onerror = (event) => {
  if (listening && (event.error === "no-speech" || event.error === "network")) {
    setTimeout(() => recognition.start(), 500);
  }
};

// ====== TO-DO FUNCTIONS ======
function addTodo(task) {
  if (!task) return botReply("❌ Please provide a task to add.");
  todos.push({ task, done: false });
  botReply(`✅ Added task: "${task}"`);
}

function listTodos() {
  if (todos.length === 0) return botReply("📭 Your To-Do list is empty.");
  let list = "📋 Your To-Do List:<br>";
  todos.forEach((t, i) => {
    list += `${i + 1}. [${t.done ? "✔️" : "❌"}] ${t.task}<br>`;
  });
  botReply(list, false);
}

function completeTodo(index) {
  index -= 1;
  if (!todos[index]) return botReply("❌ Invalid task number.");
  todos[index].done = true;
  botReply(`✔️ Marked task "${todos[index].task}" as done.`);
}

function deleteTodo(index) {
  index -= 1;
  if (!todos[index]) return botReply("❌ Invalid task number.");
  const removed = todos.splice(index, 1);
  botReply(`🗑️ Deleted task: "${removed[0].task}"`);
}

function clearTodos() {
  todos = [];
  botReply("🧹 All tasks cleared.");
}

// ====== CHAT DISPLAY ======
function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.innerHTML = text;
  chatContainer.appendChild(msg);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// ====== TEXT TO SPEECH ======
function speak(text) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 1;
  utter.pitch = 1;
  utter.volume = 1;
  speechSynthesis.speak(utter);
}

function botReply(text, voice = true) {
  addMessage(text, "bot");
  if (voice) speak(text);
}

// ====== CALCULATOR ======
function calculate(expr) {
  try {
    const result = eval(expr);
    botReply("Result: " + result);
  } catch (e) {
    botReply("❌ Invalid calculation.");
  }
}

<<<<<<< HEAD
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
=======
// ====== NAVIGATION ======
function speakAndThenNavigate(msg, url) {
  botReply(msg);
  setTimeout(() => window.open(url, "_blank"), 1500);
}

// ====== COMMAND HANDLER ======
>>>>>>> 9bda70ba55f1f075c7a9b5ee55e977e3e89dbdf8
function handleCommand(message) {
  const lower = message.toLowerCase();

<<<<<<< HEAD
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
=======
  // To-do mode
  if (lower === "starttodolist") {
    todoMode = true;
    return botReply("📝 To-Do List mode activated.");
  }

  if (lower === "exittodolist") {
    todoMode = false;
    return botReply("🛑 To-Do List mode deactivated.");
>>>>>>> 9bda70ba55f1f075c7a9b5ee55e977e3e89dbdf8
  }

  // To-do commands
  const parts = message.split(" ");
  const main = parts[0].toLowerCase();
  const arg = parts.slice(1).join(" ");

  switch (main) {
    case "add": return addTodo(arg);
    case "list": return listTodos();
    case "done": return completeTodo(parseInt(arg));
    case "delete": return deleteTodo(parseInt(arg));
    case "clear": return clearTodos();
  }

  // AI Mode Navigation
  if (["ai mode", "enable ai mode", "open ai mode"].includes(lower)) {
    botReply("🤖 Activating AI Mode...");
    return setTimeout(() => { window.location.href = "ai.html"; }, 1500);
  }

  // Definitions
  const definitions = [
    { keys: ["what is ai","ai"], reply: "🤖 AI is the ability of machines to think and learn like humans." },
    { keys: ["what is sql","sql"], reply: "💾 SQL is a language used to manage databases." },
    { keys: ["what is html","html"], reply: "🌐 HTML structures web pages." },
    { keys: ["what is css","css"], reply: "🎨 CSS styles web pages." },
    { keys: ["what is javascript","javascript","js"], reply: "🟨 JavaScript makes websites interactive." },
  ];

  for (const def of definitions) {
    if (def.keys.includes(lower)) return botReply(def.reply);
  }

  // Greetings
  if (lower.includes("hello") || lower.includes("hi"))
    return botReply("🤖 Hello! How may I help you?");

  // Time & Date
  if (lower.includes("time"))
    return botReply("🕒 Current Time: " + new Date().toLocaleTimeString());

  if (lower.includes("date"))
    return botReply("📅 Today's Date: " + new Date().toLocaleDateString());

  // Websites
  if (lower.includes("open google")) return speakAndThenNavigate("Opening Google...", "https://google.com");
  if (lower.includes("open youtube")) return speakAndThenNavigate("Opening YouTube...", "https://youtube.com");
  if (lower.includes("open facebook")) return speakAndThenNavigate("Opening Facebook...", "https://facebook.com");

  // Calculator
  if (lower.includes("calculate") || lower.includes("solve")) {
    let expr = lower.replace("calculate", "").replace("solve", "").trim();
    return calculate(expr);
  }
<<<<<<< HEAD
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
=======

  // Default search
  speakAndThenNavigate(`Searching for ${message}`, "https://www.google.com/search?q=" + message.replace(/ /g, "+"));
>>>>>>> 9bda70ba55f1f075c7a9b5ee55e977e3e89dbdf8
}

// ====== MANUAL MESSAGE SEND ======
function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;
  addMessage(text, "user");
  handleCommand(text);
  userInput.value = "";
}

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});
<<<<<<< HEAD

// ================= Mic Button (Siri Voice Mode) =================
micBtn.addEventListener("click", () => {
  speak("Switching to Siri Voice Mode...");
  document.body.style.opacity = 0;
  document.body.style.transition = "opacity 0.5s ease";
  setTimeout(() => {
    window.location.href = "siri.html";
  }, 500);
});
=======
>>>>>>> 9bda70ba55f1f075c7a9b5ee55e977e3e89dbdf8
