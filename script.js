const chatsContainer = document.querySelector(".chats-container"); 
const promptForm = document.querySelector(".prompt-form"); 
const promptInput = promptForm.querySelector(".prompt-input");

const API_KEY = "AIzaSyAyuKbYN2kRoHv_y4QTkMaRDIC_71979uc";
const API_KEY2 = "AIzaSyDNtcXE9bdPG7q6PPsQ0m8uBsuE3m0Sx5k"

const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAyuKbYN2kRoHv_y4QTkMaRDIC_71979uc';
const API_URL2 = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?x-goog-api-key:AIzaSyDNtcXE9bdPG7q6PPsQ0m8uBsuE3m0Sx5k';

let userMessage = "";
const chatHistory = [];

const createMsgElement = (content, ...classes) => {
    const div = document.createElement("div"); 
    div.classList.add("message", ...classes);
    div.innerHTML = content;
    return div;
}


const generateResponse = async () => {
    chatHistory.push({
        role : "user",
        parts: [{text: userMessage}]
    })

    try{
        const response = await fetch(API_URL2, {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({content: chatHistory})
        });

        const data = await response.json();
        if(!response.ok) throw new Error(data.error.message);

        console.log(data);
    }catch(error){
        console.log(error);
    }
}

// Handle the form submission 
const handleFormSubmit = (e) => {
    e.preventDefault();
    userMessage = promptInput.value.trim(); 
    if(!userMessage) return;

    promptInput.value = "";

    const userMsgHTML = `<p class="message-text"></p>`;
    const userMsgDiv = createMsgElement (userMsgHTML, "user-message");

    userMsgDiv.querySelector(".message-text").textContent = userMessage;
    chatsContainer.appendChild(userMsgDiv);

    setTimeout(() => {
        const botMsgHTML = '<img src="student.png" class="avatar"><p class="message-text">Baik , Tunggu Sebentar ya.....</p>'
        const botMsgDiv = createMsgElement (botMsgHTML, "bot-message", "loading");
        chatsContainer.appendChild(botMsgDiv);
        generateResponse();
    }, 600);
}

promptForm.addEventListener("submit", handleFormSubmit);
