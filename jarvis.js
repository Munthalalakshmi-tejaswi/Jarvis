const btn = document.querySelector('.talk');
const content = document.querySelector('.content');
function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);

    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}
const countries = [
    { name: "India", capital: "New Delhi", currency: "INR", region: "Asia", population: "1.4 billion", languages: "Hindi, English" },
    { name: "United States", capital: "Washington, D.C.", currency: "USD", region: "North America", population: "331 million", languages: "English" },
    { name: "United Kingdom", capital: "London", currency: "GBP", region: "Europe", population: "67 million", languages: "English" },
    { name: "Japan", capital: "Tokyo", currency: "JPY", region: "Asia", population: "126 million", languages: "Japanese" },
    { name: "Germany", capital: "Berlin", currency: "EUR", region: "Europe", population: "83 million", languages: "German" },
    { name: "France", capital: "Paris", currency: "EUR", region: "Europe", population: "67 million", languages: "French" },
    { name: "Australia", capital: "Canberra", currency: "AUD", region: "Oceania", population: "25 million", languages: "English" },
    { name: "Canada", capital: "Ottawa", currency: "CAD", region: "North America", population: "38 million", languages: "English, French" },
    { name: "China", capital: "Beijing", currency: "CNY", region: "Asia", population: "1.41 billion", languages: "Mandarin Chinese" },
    { name: "Brazil", capital: "Brasília", currency: "BRL", region: "South America", population: "213 million", languages: "Portuguese" }
];
function displayCountries() {
    countries.forEach(country => {
        const card = document.createElement("div");
        card.className = "country-card";
        card.innerHTML = `
            <h3>${country.name}</h3>
            <p><strong>Capital:</strong> ${country.capital}</p>
            <p><strong>Currency:</strong> ${country.currency}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <p><strong>Population:</strong> ${country.population}</p>
            <p><strong>Languages:</strong> ${country.languages}</p>
        `;
        countryContainer.appendChild(card);
    });
}
window.addEventListener('load', displayCountries);

// Country Info Voice Command
function takeCommand(message) {
    let found = false;
    for (let country of countries) {
        if (message.includes(country.name.toLowerCase())) {
            const info = `${country.name}'s capital is ${country.capital}, currency is ${country.currency}, region is ${country.region}, population is ${country.population}, and languages spoken are ${country.languages}.`;
            speak(info);
            content.textContent = info;
            found = true;
            break;
        }
    }
    if (!found) {
        content.textContent = "Listening...";
    }
}

let todoList = [];

// Add Task
function addTask(task) {
    todoList.push(task);
    speak(`Task added: ${task}`);
    content.textContent = `Task added: ${task}`;
}

// Show Tasks
function showTasks() {
    if (todoList.length === 0) {
        speak("Your to-do list is empty.");
        content.textContent = "Your to-do list is empty.";
    } else {
        const tasks = todoList.join(", ");
        speak("Your tasks are: " + tasks);
        content.textContent = "Your tasks: " + tasks;
    }
}

// Remove Task
function removeTask(task) {
    const index = todoList.indexOf(task);
    if (index > -1) {
        todoList.splice(index, 1);
        speak(`Task removed: ${task}`);
        content.textContent = `Task removed: ${task}`;
    } else {
        speak(`Task not found: ${task}`);
        content.textContent = `Task not found: ${task}`;
    }
}

// Clear All Tasks
function clearTasks() {
    todoList = [];
    speak("All tasks cleared.");
    content.textContent = "All tasks cleared.";
}

// Array to store reminders
let reminders = [];

// Function to set a reminder
function setReminder(timeString, task) {
    const now = new Date();
    const reminderTime = new Date(now.toDateString() + ' ' + timeString);

    if (reminderTime < now) {
        speak("The specified time has already passed. Please set a future time.");
        content.textContent = "Reminder time must be in the future!";
        return;
    }

    reminders.push({ time: reminderTime, task: task });
    speak(`Reminder set for ${timeString}: ${task}`);
    content.textContent = `Reminder set for ${timeString}: ${task}`;

    // Check every second if reminder time has arrived
    const interval = setInterval(() => {
        const currentTime = new Date();
        if (currentTime >= reminderTime) {
            speak(`Reminder: ${task}`);
            content.textContent = `Reminder: ${task}`;
            clearInterval(interval);
        }
    }, 1000);
}

function wishMe() {
    var day = new Date();
    var hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Good Morning Boss...");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Master...");
    } else {
        speak("Good Evening Sir...");
    }
}

window.addEventListener('load', () => {
    speak("Initializing JARVIS...");
    wishMe();
});
 
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
    content.textContent = "Listening...";
    recognition.start();
});


function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Sir, How May I Help You?");
    } else if (message.includes("open google")) {
        window.open("https://www.bing.com/search?pglt=297&q=google&cvid=9075900a09d148fe9f91608832c90cfd&gs_lcrp=EgRlZGdlKgYIABBFGDkyBggAEEUYOTIGCAEQRRg8MgYIAhBFGDwyBggDEEUYQTIGCAQQRRhBMgYIBRBFGDwyBggGEEUYPDIGCAcQRRhBMgYICBBFGDzSAQgzMzQ5ajBqMagCALACAA&FORM=ANNTA1&PC=HCTS", "_blank");
        window.open("https://www.google.com", "_blank");
        speak("Opening Google...");
        window.location.href = "https://www.google.com";  // navigates immediately in the same tab google
    } 
    else if (message.includes("open whatsapp")) {
        window.open("https://wa.me/", "_blank");
        speak("Opening Whatsapp...");
        window.location.href = "https://wa.me/1234567890";  // navigates immediately in the same tab whatsapp
    }
  

    else if (message.includes("open youtube")) {
        window.open("https://www.youtube.com/", "_blank");
        speak("Opening Youtube...");
        window.location.href = "https://www.youtube.com";  // navigates immediately in the same tab youtube
    } else if (message.includes("open facebook")) {
        window.open("https://www.facebook.com/login/?next=https%3A%2F%2Fwww.facebook.com%2F", "_blank");
        speak("Opening Facebook...");
        window.location.href = "https://www.facebook.com";  // navigates immediately in the same tab facebook
    } 
else if (message.includes("open calculator")) {
    speak("Opening calculator");
    window.open("https://www.desmos.com/scientific", "_blank");
    window.location.href = "https://www.desmos.com/scientific";  // navigates immediately in the same tab calculator
}
    else if (message.includes("joke")) {
        const jokes = [
            "Why do programmers prefer dark mode? Because light attracts bugs!",
    "I told my computer I needed a break, and now it won't stop sending me Kit Kat ads.",
    "Why do Java developers wear glasses? Because they don't C sharp.",
    "Why did the programmer quit his job? Because he didn't get arrays.",
    "Why don’t skeletons fight each other? They don’t have the guts.",
    "Why can’t you hear a pterodactyl go to the bathroom? Because the P is silent.",
    "What do you call cheese that isn't yours? Nacho cheese!",
    "Why was the math book sad? It had too many problems.",
    "I used to play piano by ear, but now I use my hands.",
    "Parallel lines have so much in common… it’s a shame they’ll never meet.",
    "Why did the scarecrow win an award? Because he was outstanding in his field!",
    "I asked my dog what's two minus two. He said nothing.",
    "I would tell you a construction joke, but I’m still working on it.",
    "Did you hear about the restaurant on the moon? Great food, no atmosphere.",
    "What do you call fake spaghetti? An impasta!",
    "What did the zero say to the eight? Nice belt!",
    "Why can't your nose be 12 inches long? Because then it would be a foot!",
    "I told my wife she was drawing her eyebrows too high. She looked surprised.",
    "I’m reading a book about anti-gravity. It’s impossible to put down!",
    "I told my computer I needed a break, now it won’t stop recommending beaches.",
    "Why don’t oysters share their pearls? Because they’re shellfish.",
    "What happens to a frog's car when it breaks down? It gets toad away.",
    "Want to hear a joke about paper? Never mind, it’s tearable.",
    "Why did the bicycle fall over? Because it was two-tired.",
    "Why do programmers hate nature? It has too many bugs"
    
        ];
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        speak(randomJoke);
        content.textContent = randomJoke;
    }

else if (message.includes("jokes for students")) {
        const jokesforstudents = [
            "Why was the math book sad? Because it had too many problems.",
    "Why did the student eat his homework? Because the teacher told him it was a piece of cake!",
    "Why don’t scientists trust atoms? Because they make up everything!",
    "Why did the music teacher go to jail? Because she got caught with too many notes.",
    "What did the zero say to the eight? Nice belt!",
    "Why was the computer cold? Because it left its Windows open!",
    "Why do we never tell secrets on a farm? Because the potatoes have eyes and the corn has ears!",
    "Why did the student bring a ladder to school? Because she wanted to go to high school.",
    "How do you make seven an even number? Remove the ‘s’!",
    "Why can't you do your math homework in the jungle? Because if you add 4+4, you get ate!",
    "Why did the teacher wear sunglasses to class? Because her students were so bright!",
    "Why did the pencil get an award? Because it had a point.",
    "Why did the biology teacher break up with the physics teacher? There was no chemistry.",
    "Teacher: 'Why are you late?' Student: 'Class started before I got here!'",
    "Why don’t we write with broken pencils? Because it’s pointless."
        ];
        const randomJoke = jokesforstudents[Math.floor(Math.random() * jokesforstudents.length)];
        speak(randomJoke);
        content.textContent = randomJoke;
    }


else if (message.includes("open instagram")) {
        window.open("https://www.instagram.com/", "_blank");
        speak("Opening Instagram...");
        window.location.href = "https://www.instagram.com/";  // navigates immediately in the same tab instagram
    } 
  else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(/ /g, "+")}`,"_blank");
        const finalText = "This is what I found on the internet regarding " + message;
        speak(finalText);
    }
  else if (message.includes("battery")) {
    if ("getBattery" in navigator) {
        navigator.getBattery().then(function(battery) {
            const level = Math.round(battery.level * 100);
            const chargingStatus = battery.charging ? "Yes, it is charging." : "No, it is not charging.";

            // First message: battery percentage
            speak(`Your battery is at ${level} percent.`);
            content.textContent = `Your battery is at ${level} percent.`;

            // Delay the second message slightly so they don't overlap
            setTimeout(() => {
                speak(`Is it charging? ${chargingStatus}`);
                content.textContent += `\nIs it charging? ${chargingStatus}`;
            }, 2500); // 2.5 second delay
        });
    } else {
        const unsupported = "Sorry, your device does not support checking battery status.";
        speak(unsupported);
        content.textContent = unsupported;
    }
}
 

    else if (message.includes("open wikipedia")) {
        window.open("https://www.wikipedia.org/", "_blank");
        speak("Opening wikipedia...");
        window.location.href = "https://www.wikipedia.org/";  // navigates immediately in the same tab wikipedia
    } 
     else if (message.includes("play music")) {
        window.open("https://music.youtube.com", "_blank");
        speak("Opening YouTube Music for you...");
        window.location.href = "https://music.youtube.com";  // navigates immediately in the same tab music
    } 
      else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        const finalText = "Today's date is " + date;
        speak(finalText);
    }  else {
        window.open(`https://www.google.com/search?q=${message.replace(/ /g, "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on Google";
        speak(finalText);
    }
}
function takeCommand(message) {
    if (message.includes("open google")) {
        const utterance = new SpeechSynthesisUtterance("Opening Google...");
        utterance.onend = () => {
            window.location.href = "https://www.google.com";
        };
        window.speechSynthesis.speak(utterance);
    } 
    // Set Alarm or Reminder
else if (message.includes("set alarm") || message.includes("set reminder")) {
    // Try to extract time and task from the message
    const timeMatch = message.match(/(\d{1,2}(:\d{2})?\s?(am|pm)?)/i);
    const taskMatch = message.match(/for (.+)/i);

    if (timeMatch) {
        const time = timeMatch[0]; // Extracted time
        const task = taskMatch ? taskMatch[1] : "Alarm"; // Extract task or default "Alarm"
        setReminder(time, task);
    } else {
        speak("Please specify a valid time for the reminder.");
        content.textContent = "Specify a valid time for the reminder.";
    }
}

    else if (message.includes("open facebook")) {
        const utterance = new SpeechSynthesisUtterance("Opening Facebook...");
        utterance.onend = () => {
            window.location.href = "https://www.facebook.com";
        };
        window.speechSynthesis.speak(utterance);
    }

        else if (message.includes("open whatsapp")) {
        const utterance = new SpeechSynthesisUtterance("Opening Whatsapp...");
        utterance.onend = () => {
            window.location.href = "https://wa.me/1234567890";
        };
        window.speechSynthesis.speak(utterance);
    }
       else if (message.includes("open youtube")) {
        const utterance = new SpeechSynthesisUtterance("Opening YouTube...");
        utterance.onend = () => {
            window.location.href = "https://www.youtube.com";
        };
        window.speechSynthesis.speak(utterance);
    }
   else if (message.includes("time")) {
        const time = new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });

        const finalText = "The current time is " + time;
        speak(finalText);                // Say it
        content.textContent = finalText; // Show it
    }
    else if (message.includes("open instagram")) {
        const utterance = new SpeechSynthesisUtterance("Opening Instagram...");
        utterance.onend = () => {
            window.location.href = "https://www.instagram.com/";
        };
        window.speechSynthesis.speak(utterance);
    }
      else if (message.includes("open wikipedia")) {
        const utterance = new SpeechSynthesisUtterance("Opening wikipedia...");
        utterance.onend = () => {
            window.location.href = "https://www.wikipedia.org/";
        };
        window.speechSynthesis.speak(utterance);
    }
      else if (message.includes("joke")) {
        const jokes = [
           "Why do programmers prefer dark mode? Because light attracts bugs!",
    "I told my computer I needed a break, and now it won't stop sending me Kit Kat ads.",
    "Why do Java developers wear glasses? Because they don't C sharp.",
    "Why did the programmer quit his job? Because he didn't get arrays.",
    "Why don’t skeletons fight each other? They don’t have the guts.",
    "Why can’t you hear a pterodactyl go to the bathroom? Because the P is silent.",
    "What do you call cheese that isn't yours? Nacho cheese!",
    "Why was the math book sad? It had too many problems.",
    "I used to play piano by ear, but now I use my hands.",
    "Parallel lines have so much in common… it’s a shame they’ll never meet.",
    "Why did the scarecrow win an award? Because he was outstanding in his field!",
    "I asked my dog what's two minus two. He said nothing.",
    "I would tell you a construction joke, but I’m still working on it.",
    "Did you hear about the restaurant on the moon? Great food, no atmosphere.",
    "What do you call fake spaghetti? An impasta!",
    "What did the zero say to the eight? Nice belt!",
    "Why can't your nose be 12 inches long? Because then it would be a foot!",
    "I told my wife she was drawing her eyebrows too high. She looked surprised.",
    "I’m reading a book about anti-gravity. It’s impossible to put down!",
    "I told my computer I needed a break, now it won’t stop recommending beaches.",
    "Why don’t oysters share their pearls? Because they’re shellfish.",
    "What happens to a frog's car when it breaks down? It gets toad away.",
    "Want to hear a joke about paper? Never mind, it’s tearable.",
    "Why did the bicycle fall over? Because it was two-tired.",
    "Why do programmers hate nature? It has too many bugs"
        ];
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        speak(randomJoke);
        content.textContent = randomJoke;
    }
 else if (message.includes("jokes for students")) {
        const jokesforstudents = [
            "Why was the math book sad? Because it had too many problems.",
    "Why did the student eat his homework? Because the teacher told him it was a piece of cake!",
    "Why don’t scientists trust atoms? Because they make up everything!",
    "Why did the music teacher go to jail? Because she got caught with too many notes.",
    "What did the zero say to the eight? Nice belt!",
    "Why was the computer cold? Because it left its Windows open!",
    "Why do we never tell secrets on a farm? Because the potatoes have eyes and the corn has ears!",
    "Why did the student bring a ladder to school? Because she wanted to go to high school.",
    "How do you make seven an even number? Remove the ‘s’!",
    "Why can't you do your math homework in the jungle? Because if you add 4+4, you get ate!",
    "Why did the teacher wear sunglasses to class? Because her students were so bright!",
    "Why did the pencil get an award? Because it had a point.",
    "Why did the biology teacher break up with the physics teacher? There was no chemistry.",
    "Teacher: 'Why are you late?' Student: 'Class started before I got here!'",
    "Why don’t we write with broken pencils? Because it’s pointless."
        ];
        const randomJoke = jokesforstudents[Math.floor(Math.random() * jokesforstudents.length)];
        speak(randomJoke);
        content.textContent = randomJoke;
    }
    // Timer command
else if (message.includes("set timer")) {
    // Example: "set timer 2 minutes" or "set timer 30 seconds"
    const timeMatch = message.match(/(\d+)\s?(seconds|second|minutes|minute)/i);
    if (timeMatch) {
        let value = parseInt(timeMatch[1]);
        let unit = timeMatch[2].toLowerCase();
        if (unit.includes("minute")) value *= 60; // convert to seconds
        startTimer(value);
    } else {
        speak("Please specify the timer duration in seconds or minutes.");
        content.textContent = "Specify timer duration.";
    }
}
// To-Do List Commands
else if (message.includes("add task")) {
    const task = message.replace("add task", "").trim();
    if (task) addTask(task);
    else {
        speak("Please specify a task to add.");
        content.textContent = "Specify a task to add.";
    }
}
else if (message.includes("show tasks") || message.includes("my tasks")) {
    showTasks();
}
else if (message.includes("remove task")) {
    const task = message.replace("remove task", "").trim();
    if (task) removeTask(task);
    else {
        speak("Please specify a task to remove.");
        content.textContent = "Specify a task to remove.";
    }
}
else if (message.includes("clear tasks")) {
    clearTasks();
}

    else if (message.includes("open calculator")) {
        const utterance = new SpeechSynthesisUtterance("Opening Calculator...");
        utterance.onend = () => {
            window.location.href = "https://www.desmos.com/scientific";
        };
        window.speechSynthesis.speak(utterance);
    }  
    else if (message.includes("battery")) {
    if ("getBattery" in navigator) {
        navigator.getBattery().then(function(battery) {
            const level = Math.round(battery.level * 100);
            const chargingStatus = battery.charging ? "Yes, it is charging." : "No, it is not charging.";

            // First message: battery percentage
            speak(`Your battery is at ${level} percent.`);
            content.textContent = `Your battery is at ${level} percent.`;

            // Delay the second message slightly so they don't overlap
            setTimeout(() => {
                speak(`Is it charging? ${chargingStatus}`);
                content.textContent += `\nIs it charging? ${chargingStatus}`;
            }, 2500); // 2.5 second delay
        });
    } else {
        const unsupported = "Sorry, your device does not support checking battery status.";
        speak(unsupported);
        content.textContent = unsupported;
    }
}
  



    else if (message.includes("play music")) {
        const utterance = new SpeechSynthesisUtterance("Opening YouTube Music for you...");
        utterance.onend = () => {
            window.location.href = "https://music.youtube.com";
        };
        window.speechSynthesis.speak(utterance);
    }  
   else if (message.includes("date")) {
    const date = new Date().toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    const finalText = "Today's date is " + date;
    speak(finalText);                // Speak the date
    content.textContent = finalText; // Show it on the screen
}

}

