const btn = document.querySelector(".talk");
const content = document.querySelector(".content");
const countrySection = document.getElementById("countrySection");
const countryContainer = document.getElementById("countryContainer");

// Speech synthesis
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
}

// Helper functions
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

// ============= COUNTRY DATA (expanded major countries) =============
const countries = {
    "india": {capital:"New Delhi", population:"1.4 Billion", language:"Hindi, English", currency:"Indian Rupee (INR)"},
    "united states": {capital:"Washington, D.C.", population:"331 Million", language:"English", currency:"US Dollar (USD)"},
    "usa": {capital:"Washington, D.C.", population:"331 Million", language:"English", currency:"US Dollar (USD)"},
    "canada": {capital:"Ottawa", population:"38 Million", language:"English, French", currency:"Canadian Dollar (CAD)"},
    "japan": {capital:"Tokyo", population:"125 Million", language:"Japanese", currency:"Yen (JPY)"},
    "germany": {capital:"Berlin", population:"83 Million", language:"German", currency:"Euro (EUR)"},
    "france": {capital:"Paris", population:"65 Million", language:"French", currency:"Euro (EUR)"},
    "china": {capital:"Beijing", population:"1.41 Billion", language:"Mandarin", currency:"Renminbi (Yuan CNY)"},
    "australia": {capital:"Canberra", population:"26 Million", language:"English", currency:"Australian Dollar (AUD)"},
    "united kingdom": {capital:"London", population:"67 Million", language:"English", currency:"Pound Sterling (GBP)"},
    "uk": {capital:"London", population:"67 Million", language:"English", currency:"Pound Sterling (GBP)"},
    "russia": {capital:"Moscow", population:"146 Million", language:"Russian", currency:"Russian Ruble (RUB)"},
    "brazil": {capital:"Brasília", population:"213 Million", language:"Portuguese", currency:"Brazilian Real (BRL)"},
    "south africa": {capital:"Pretoria", population:"60 Million", language:"Zulu, Xhosa, Afrikaans, English", currency:"South African Rand (ZAR)"},
    "mexico": {capital:"Mexico City", population:"128 Million", language:"Spanish", currency:"Mexican Peso (MXN)"},
    "italy": {capital:"Rome", population:"60 Million", language:"Italian", currency:"Euro (EUR)"},
    "spain": {capital:"Madrid", population:"47 Million", language:"Spanish", currency:"Euro (EUR)"},
    "south korea": {capital:"Seoul", population:"52 Million", language:"Korean", currency:"South Korean Won (KRW)"},
    "north korea": {capital:"Pyongyang", population:"25 Million", language:"Korean", currency:"North Korean Won (KPW)"},
    "turkey": {capital:"Ankara", population:"84 Million", language:"Turkish", currency:"Turkish Lira (TRY)"},
    "egypt": {capital:"Cairo", population:"102 Million", language:"Arabic", currency:"Egyptian Pound (EGP)"},
    "argentina": {capital:"Buenos Aires", population:"45 Million", language:"Spanish", currency:"Argentine Peso (ARS)"},
    "saudi arabia": {capital:"Riyadh", population:"35 Million", language:"Arabic", currency:"Saudi Riyal (SAR)"},
    "thailand": {capital:"Bangkok", population:"70 Million", language:"Thai", currency:"Thai Baht (THB)"},
    "pakistan": {capital:"Islamabad", population:"240 Million", language:"Urdu, English", currency:"Pakistani Rupee (PKR)"},
    "bangladesh": {capital:"Dhaka", population:"166 Million", language:"Bengali", currency:"Bangladeshi Taka (BDT)"},
    "indonesia": {capital:"Jakarta", population:"273 Million", language:"Indonesian", currency:"Indonesian Rupiah (IDR)"},
    "new zealand": {capital:"Wellington", population:"5 Million", language:"English, Maori", currency:"New Zealand Dollar (NZD)"},
    "netherlands": {capital:"Amsterdam", population:"17 Million", language:"Dutch", currency:"Euro (EUR)"},
    "switzerland": {capital:"Bern", population:"8.7 Million", language:"German, French, Italian", currency:"Swiss Franc (CHF)"},
    "sweden": {capital:"Stockholm", population:"10 Million", language:"Swedish", currency:"Swedish Krona (SEK)"},
    "norway": {capital:"Oslo", population:"5.4 Million", language:"Norwegian", currency:"Norwegian Krone (NOK)"},
    "finland": {capital:"Helsinki", population:"5.5 Million", language:"Finnish, Swedish", currency:"Euro (EUR)"},
    "denmark": {capital:"Copenhagen", population:"5.8 Million", language:"Danish", currency:"Danish Krone (DKK)"},
    "philippines": {capital:"Manila", population:"113 Million", language:"Filipino, English", currency:"Philippine Peso (PHP)"},
    "singapore": {capital:"Singapore", population:"5.7 Million", language:"English, Malay, Mandarin, Tamil", currency:"Singapore Dollar (SGD)"},
    "malaysia": {capital:"Kuala Lumpur", population:"33 Million", language:"Malay", currency:"Malaysian Ringgit (MYR)"}
};

// Show country info
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

// Speech recognition setup
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
    message = message.toLowerCase();

    // Greetings
    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello Sir, how may I help you?");
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
    else if (message.includes("calculate") || message.includes("what is") || message.includes("solve")) {
        let expr = message.replace("calculate","").replace("what is","").replace("solve","").trim();
        calculate(expr);
    }

    // Country info
    else if (message.includes("country") || message.includes("show") || message.includes("tell me about")) {
        let countryName = message.replace("country","").replace("show","").replace("tell me about","").trim();
        if (countryName) showCountryInfo(countryName);
        else speak("Please say the country name.");
    }

    // Default → Google search
    else {
        window.open(`https://www.google.com/search?q=${message.replace(/ /g,"+")}`, "_blank");
        speak("I found some information for " + message + " on Google");
        content.textContent = "Searching Google for " + message;
    }
}
