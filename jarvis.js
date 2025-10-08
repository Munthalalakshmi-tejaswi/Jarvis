const btn = document.querySelector(".talk");
const content = document.querySelector(".content");
const countrySection = document.getElementById("countrySection");
const countryContainer = document.getElementById("countryContainer");

// Speech synthesis
function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);

    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}
function wishMe() {
    var day = new Date();
    var hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Good Morning Boss...");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Master...");
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

