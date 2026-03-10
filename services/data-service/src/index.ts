import express from 'express';
import { DataRepository } from './repository';

const app = express();
app.use(express.json());

// A simple route to test if this service is working
app.get('/health', (req, res) => {
  res.json({ service: 'data-service', status: 'active' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Data Service active on port ${PORT}`);
});
// This route allows the AI Voice Engine to "fetch" facts
app.get('/knowledge/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const knowledge = await DataRepository.getKnowledgeByUser(userId);
    res.json(knowledge);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch knowledge" });
  }
});