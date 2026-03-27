const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config(); // Load secrets from .env file

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serves your HTML/CSS/JS

const API_KEY = process.env.HAZEL_API_KEY; // Pulled from your GitHub Secrets

app.post('/api/chat', async (req, res) => {
    try {
        // This is the call to the AI engine using your specific key
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: req.body.prompt }]
        }, {
            headers: { 'Authorization': `Bearer ${API_KEY}` }
        });

        res.json({ reply: response.data.choices[0].message.content });
    } catch (err) {
        res.status(500).json({ error: "Hazel Connection Failed" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Hazel Core running on port ${PORT}`));
