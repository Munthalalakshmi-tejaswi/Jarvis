const btn = document.querySelector(".talk");
const content = document.querySelector(".content");
const countrySection = document.getElementById("countrySection");
const countryContainer = document.getElementById("countryContainer");

// ================= Speech synthesis =================
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
}

// ================= Helper functions =================
function triggerEffects(callback) {
    setTimeout(callback, 500);
}

function speakAndThenNavigate(msg, url) {
    speak(msg);
    setTimeout(() => window.open(url, "_blank"), 1500);
}

function calculate(expr) {
    try {
        let result = eval(expr);
        speak(`The answer is ${result}`);
        content.textContent = `Result: ${result}`;
    } catch (error) {
        speak("Sorry, I couldn't calculate that.");
    }
}

// ================= Weather API =================
async function getWeather(city) {
    const apiKey = "YOUR_API_KEY"; // <-- Replace with your OpenWeatherMap API key
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (data.cod === 200) {
            const msg = `Weather in ${city}: ${data.weather[0].description}, Temp: ${data.main.temp}°C`;
            speak(msg);
            content.textContent = msg;
        } else {
            speak("Sorry, I couldn't find that city.");
            content.textContent = "City not found";
        }
    } catch (error) {
        speak("There was an error fetching the weather.");
        content.textContent = "Weather API error";
    }
}

// ================= Country Info =================
const countries = {
    "india": {capital:"New Delhi", population:"1.4 Billion", language:"Hindi, English", currency:"INR"},
    "usa": {capital:"Washington, D.C.", population:"331 Million", language:"English", currency:"USD"},
    "canada": {capital:"Ottawa", population:"38 Million", language:"English, French", currency:"CAD"},
    "japan": {capital:"Tokyo", population:"125 Million", language:"Japanese", currency:"JPY"},
    "germany": {capital:"Berlin", population:"83 Million", language:"German", currency:"EUR"},
};

function showCountryInfo(name) {
    const data = countries[name.toLowerCase()];
    if (data) {
        countrySection.style.display = "block";
        countryContainer.innerHTML = `
            <div class="country-card">
                <h3>${name.toUpperCase()}</h3>
                <p><b>Capital:</b> ${data.capital}</p>
                <p><b>Population:</b> ${data.population}</p>
                <p><b>Language:</b> ${data.language}</p>
                <p><b>Currency:</b> ${data.currency}</p>
            </div>`;
        speak(`Here is some information about ${name}`);
    } else {
        speak("Sorry, I don't have data for that country yet.");
    }
}

// ================= Definitions =================
const definitions = {
    "ai": "Artificial Intelligence is a branch of computer science that enables machines to perform tasks that normally require human intelligence, like learning, reasoning, problem-solving, and decision-making.",
    "html": "HTML stands for HyperText Markup Language. It is used to create the structure of web pages and web applications.",
    "css": "CSS stands for Cascading Style Sheets. It is used to style and design web pages, including layouts, colors, and fonts.",
    "javascript": "JavaScript is a programming language used to make web pages interactive, including animations, form validation, and dynamic content.",
    "python": "Python is a high-level programming language used for web development, data analysis, artificial intelligence, and scientific computing.",
    "java": "Java is a versatile, object-oriented programming language used for building platform-independent applications, mobile apps, and enterprise software.",
    "react": "React is a JavaScript library used for building user interfaces, especially single-page web applications with dynamic components.",
    "nodejs": "Node.js is a runtime environment that allows JavaScript to be run on the server-side to build scalable network applications.",
    "database": "A database is an organized collection of data that can be easily accessed, managed, and updated. Examples include MySQL, MongoDB, and PostgreSQL.",
    "api": "An API, or Application Programming Interface, is a set of rules that allows different software applications to communicate and exchange data."
};

function getDefinition(term) {
    term = term.toLowerCase().trim();
    return definitions[term] || null;
}

// ================= Indian States & Cities =================
const indiaCities = {
    "andhra pradesh": ["amaravati", "visakhapatnam", "guntur", "tirupati", "vijayawada", "nellore", "kurnool", "anantapur", "kadapa"],
    "telangana": ["hyderabad", "warangal", "nizamabad", "karimnagar", "khammam", "mahbubnagar"],
    "maharashtra": ["mumbai", "pune", "nagpur", "nashik", "aurangabad", "solapur", "thane", "kolhapur", "amravati"],
    "delhi": ["new delhi", "delhi"],
    // ... Add more states and cities as needed
};

// ================= Speech Recognition =================
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

btn.addEventListener("click", () => recognition.start());

recognition.onresult = (event) => {
    const transcript = event.results[event.resultIndex][0].transcript.toLowerCase();
    content.textContent = transcript;
    takeCommand(transcript);
};

// ================= Command Handling =================
function takeCommand(message) {
    message = message.toLowerCase().trim();

    // Greetings
    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello! How may I help you?");
    }

    // Definitions
    else if (message.startsWith("what is") || message.startsWith("define")) {
        let term = message.replace("what is","").replace("define","").trim();
        const def = getDefinition(term);
        if(def) {
            speak(def);
            content.textContent = def;
        } else {
            speak("Sorry, I don't have a definition for " + term);
            content.textContent = "No definition found for " + term;
        }
    }

    // AI Mode
    else if (message.includes("ai mode") || message.includes("jarvis mode") || message.includes("change to ai")) {
        triggerEffects(() => {
            speak("Switching to Jarvis AI Mode...");
            window.location.href = "ai-mode.html";
        });
    }

    // Open websites
    else if (message.includes("open google")) speakAndThenNavigate("Opening Google...", "https://www.google.com");
    else if (message.includes("open youtube")) speakAndThenNavigate("Opening YouTube...", "https://www.youtube.com");
    else if (message.includes("open facebook")) speakAndThenNavigate("Opening Facebook...", "https://www.facebook.com");

    // Date & Time
    else if (message.includes("date")) {
        const date = new Date().toLocaleDateString(undefined, {weekday:"long", month:"long", day:"numeric", year:"numeric"});
        speak("Today's date is " + date);
        content.textContent = "Today's date is " + date;
    } 
    else if (message.includes("time")) {
        const time = new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
        speak("The current time is " + time);
        content.textContent = "Time: " + time;
    }

    // Calculator
    else if (message.includes("calculate") || message.includes("solve")) {
        let expr = message.replace("calculate","").replace("solve","").trim();
        calculate(expr);
    }

    // Country info
    else if (message.includes("country") || message.includes("show") || message.includes("tell me about")) {
        let countryName = message.replace("country","").replace("show","").replace("tell me about","").trim();
        if (countryName) showCountryInfo(countryName);
        else speak("Please say the country name.");
    }

    // Weather (Indian cities)
    else if (message.includes("weather in")) {
        let city = message.replace("weather in","").trim().toLowerCase();
        let found = false;

        for (let state in indiaCities) {
            if (indiaCities[state].some(c => c.toLowerCase() === city)) {
                found = true;
                break;
            }
        }

        if(found) {
            // Capitalize each word for API + add country code
            let cityForAPI = city.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
            getWeather(`${cityForAPI},IN`);
        } else {
            speak("I couldn't find that city in India. Please try another city.");
            content.textContent = "City not found in India";
        }
    }

    // Default → Google search
    else {
        window.open(`https://www.google.com/search?q=${message.replace(/ /g,"+")}`, "_blank");
        speak("I found some information for " + message + " on Google");
        content.textContent = "Searching Google for " + message;
    }
}
