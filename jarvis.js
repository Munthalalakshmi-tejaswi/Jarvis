const btn = document.querySelector(".talk");
const content = document.querySelector(".content");
const countrySection = document.getElementById("countrySection");
const countryContainer = document.getElementById("countryContainer");

// ================= Speech synthesis =================
function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.rate = 1;
    speech.pitch = 1;
    speech.volume = 1;
    window.speechSynthesis.speak(speech);
}

// ================= Greeting =================
function wishMe() {
    const hour = new Date().getHours();
    if (hour < 12) speak("Good Morning Boss");
    else if (hour < 17) speak("Good Afternoon Boss");
    else speak("Good Evening Boss");
}

// ================= Helpers =================
function speakAndThenNavigate(msg, url) {
    speak(msg);
    setTimeout(() => window.open(url, "_blank"), 1200);
}

function calculate(expr) {
    try {
        const result = eval(expr);
        speak(`The answer is ${result}`);
        content.textContent = `Result: ${result}`;
    } catch {
        speak("Invalid calculation");
    }
}

// ================= Weather =================
async function getWeather(city) {
    const apiKey = "YOUR_API_KEY";
    try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${apiKey}&units=metric`
        );
        const data = await res.json();

        if (data.cod === 200) {
            const msg = `Weather in ${city}: ${data.weather[0].description}, ${data.main.temp}°C`;
            speak(msg);
            content.textContent = msg;
        } else {
            speak("City not found");
        }
    } catch {
        speak("Weather error");
    }
}

// ================= Country Info =================
const countries = {
    india: { capital: "New Delhi", population: "1.4 Billion", language: "Hindi, English", currency: "INR" },
    usa: { capital: "Washington DC", population: "331 Million", language: "English", currency: "USD" },
    japan: { capital: "Tokyo", population: "125 Million", language: "Japanese", currency: "JPY" }
};

function showCountryInfo(name) {
    const data = countries[name.toLowerCase()];
    if (!data) return speak("No data for that country");

    countrySection.style.display = "block";
    countryContainer.innerHTML = `
        <div class="country-card">
            <h3>${name.toUpperCase()}</h3>
            <p><b>Capital:</b> ${data.capital}</p>
            <p><b>Population:</b> ${data.population}</p>
            <p><b>Language:</b> ${data.language}</p>
            <p><b>Currency:</b> ${data.currency}</p>
        </div>`;
    speak(`Information about ${name}`);
}

// ================= Definitions =================
const definitions = {
    ai: "Artificial Intelligence enables machines to think and learn.",
    html: "HTML creates the structure of web pages.",
    css: "CSS styles web pages.",
    javascript: "JavaScript makes websites interactive."
};

function getDefinition(term) {
    return definitions[term] || null;
}

// ================= Speech Recognition =================
const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

btn.addEventListener("click", () => recognition.start());

recognition.onresult = (e) => {
    const transcript = e.results[e.resultIndex][0].transcript.toLowerCase();
    content.textContent = transcript;
    takeCommand(transcript);
};

// ================= Command Handler =================
function takeCommand(message) {

    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello, how can I help?");
    }

    else if (message.startsWith("what is")) {
        const term = message.replace("what is", "").trim();
        const def = getDefinition(term);
        def ? speak(def) : speak("No definition found");
    }

    else if (message.includes("open google"))
        speakAndThenNavigate("Opening Google", "https://www.google.com");

    else if (message.includes("open youtube"))
        speakAndThenNavigate("Opening YouTube", "https://www.youtube.com");

    else if (message.includes("open facebook"))
        speakAndThenNavigate("Opening Facebook", "https://www.facebook.com");

    else if (message.includes("time")) {
        const time = new Date().toLocaleTimeString();
        speak("Current time is " + time);
        content.textContent = time;
    }

    else if (message.includes("date")) {
        const date = new Date().toDateString();
        speak("Today's date is " + date);
        content.textContent = date;
    }

    else if (message.includes("calculate")) {
        calculate(message.replace("calculate", "").trim());
    }

    else if (message.includes("weather in")) {
        getWeather(message.replace("weather in", "").trim());
    }

    else if (message.includes("country")) {
        showCountryInfo(message.replace("country", "").trim());
    }

    else if (message.includes("joke")) {
        const jokes = [
            "Why do programmers hate nature? Too many bugs.",
            "Why did Java break up with Python? Too many exceptions."
        ];
        const joke = jokes[Math.floor(Math.random() * jokes.length)];
        speak(joke);
        content.textContent = joke;
    }

    else {
        window.open(
            `https://www.google.com/search?q=${message.replace(/ /g, "+")}`,
            "_blank"
        );
        speak("Here is what I found on Google");
    }
}
