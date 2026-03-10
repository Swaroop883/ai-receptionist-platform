import express from 'express';
import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
app.use(express.json());

app.post('/process-speech', async (req, res) => {
  const { userText, userId } = req.body;

  try {
    // 1. Ask the Data Service for business facts (The Librarian)
    const knowledgeRes = await axios.get(`${process.env.DATA_SERVICE_URL}/knowledge/${userId}`);
    const context = knowledgeRes.data;

    // 2. This is where the LLM logic will go next!
    console.log(`🧠 AI is thinking about: ${userText} with context:`, context);

    res.json({ aiResponse: "I am processing your request with the knowledge base." });
  } catch (error: any) {
    // This will print the EXACT error in your terminal
    console.error("❌ Detailed Error:", error.message); 
    res.status(500).json({ error: "Brain had a hiccup.", details: error.message });
}
});

app.get('/health', (req, res) => {
  res.json({ service: 'ai-voice-engine', status: 'active' });
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`🧠 AI Voice Engine (Brain) active on port ${PORT}`);
});