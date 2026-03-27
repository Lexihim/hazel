// server.js (Node.js/Express)
const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

const HAZEL_API_KEY = process.env.HAZEL_KEY; // Your key: 7bf09ef8...

app.post('/api/chat', async (req, res) => {
    try {
        const response = await axios.post('https://api.your-ai-provider.com/v1/chat', {
            message: req.body.message
        }, {
            headers: { 'Authorization': `Bearer ${HAZEL_API_KEY}` }
        });
        res.json({ reply: response.data.choices[0].text });
    } catch (error) {
        res.status(500).send("Hazel is resting. Try again shortly.");
    }
});

app.listen(3000, () => console.log('Hazel Backend is Live on Port 3000'));
