const express = require('express');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');
const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

initializeApp({
  credential: applicationDefault()
});
const db = getFirestore();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/api/vision', async (req, res) => {
  const { imageUrl } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        { role: "user", content: "Describe the objects in the image and count them." },
        { role: "system", content: `Image: ${imageUrl}` }
      ],
      max_tokens: 1000,
    });

    const detectedItems = JSON.parse(response.choices[0].message.content);
    res.json({ detectedItems });
  } catch (error) {
    console.error("Error processing image with Vision API:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
