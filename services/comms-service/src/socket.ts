import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import axios from 'axios';

export const setupSocket = (server: HttpServer) => {
  const io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] }
  });

  io.on('connection', (socket) => {
    console.log('⚡ New connection:', socket.id);

    // When the user "speaks" (sends text via WebSocket)
    socket.on('audio_stream', async (data: { text: string, userId: string }) => {
      try {
        console.log(`🎙️ Hearing: "${data.text}" from User: ${data.userId}`);

        // 1. Forward the text to our "Brain" (Port 3003)
        const response = await axios.post('http://localhost:3003/process-speech', {
          userText: data.text,
          userId: data.userId
        });

        // 2. Send the Brain's response back to the user instantly
        socket.emit('ai_reply', {
          text: response.data.aiResponse,
          context: response.data.receivedContext 
        });

      } catch (error) {
        console.error('❌ Brain is unreachable from Comms Service');
        socket.emit('error', 'The AI is currently resting.');
      }
    });

    socket.on('disconnect', () => console.log('🔌 User disconnected'));
  });

  return io;
};