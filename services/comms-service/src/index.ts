import express from 'express';
import { createServer } from 'http';
import { setupSocket } from './socket';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const httpServer = createServer(app);

// Initialize the WebSocket "Ears"
setupSocket(httpServer);

app.get('/health', (req, res) => {
  res.json({ service: 'comms-service', status: 'active' });
});

const PORT = process.env.PORT || 3002;
httpServer.listen(PORT, () => {
  console.log(`🚀 Comms Service (Ears) active on port ${PORT}`);
});