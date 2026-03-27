const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Function to add a message bubble to the UI
function appendMessage(role, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${role === 'hazel' ? 'hazel-msg' : 'user-msg'}`;
    msgDiv.innerText = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to bottom
}

async function handleHazelChat() {
    const message = userInput.value.trim();
    if (!message) return;

    // 1. Show User Message
    appendMessage('user', message);
    userInput.value = '';

    // 2. Show "Hazel is thinking..." (Optional/Pro Touch)
    const loadingId = "loading-" + Date.now();
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'message hazel-msg';
    loadingDiv.id = loadingId;
    loadingDiv.innerText = "...";
    chatBox.appendChild(loadingDiv);

    try {
        // 3. Send to your Backend (where the API key is hidden)
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: message })
        });

        const data = await response.json();
        document.getElementById(loadingId).remove(); // Remove loading dots
        appendMessage('hazel', data.reply);
    } catch (error) {
        document.getElementById(loadingId).innerText = "System Error: Hazel is offline.";
    }
}

sendBtn.addEventListener('click', handleHazelChat);
userInput.addEventListener('keypress', (e) => { if(e.key === 'Enter') handleHazelChat(); });
