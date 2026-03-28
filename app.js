function renderHazelResponse(text, containerId) {
    const container = document.getElementById(containerId);
    let i = 0;
    container.innerHTML = ""; // Clear loader

    // Professional Typewriter Algorithm
    function type() {
        if (i < text.length) {
            container.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, 15); // Adjust speed for that "Pro" feel
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    }
    type();
}
