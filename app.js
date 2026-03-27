// Replace this URL with the one Render gives you after you deploy
const HZ_BACKEND_URL = "https://your-hazel-app.onrender.com/api/chat";

async function handleHazelChat() {
    const message = userInput.value.trim();
    if (!message) return;

    appendMessage('user', message);
    userInput.value = '';

    try {
        // We now fetch from the REAL live server, not a local file
        const response = await fetch(HZ_BACKEND_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: message })
        });

        const data = await response.json();
        appendMessage('hazel', data.reply);
    } catch (error) {
        console.error("Hazel Connection Error:", error);
        appendMessage('hazel', "I'm having trouble connecting to my server.");
    }
}
