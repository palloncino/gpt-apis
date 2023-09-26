require('dotenv').config()
const OpenAI = require("openai");
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001; // A port different from your React app

app.use(bodyParser.json());
app.use(cors());

const openai = new OpenAI();

app.post('/api/chat', async (req, res) => {
  const { prompt } = req.body;
  console.log(1)
    try {
      const completion = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt: prompt,
        max_tokens: 1500,
        temperature: 0,
      });
      console.log(1.2)
      res.json({payload: completion.choices[0].text});
    } catch (error) {
      console.log(2, error)
        res.status(500).json({ error: "Error making request to OpenAI" });
    }
    
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
