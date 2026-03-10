import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

export const setupSocket = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: "*", // Allows your frontend to connect from anywhere
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('⚡ New connection established:', socket.id);

    // This is where the AI will "Hear" the user later
    socket.on('audio_stream', (data) => {
      console.log('🎙️ Received audio data from caller');
      // Later, we will send this 'data' to the ai-voice-engine
    });

    socket.on('disconnect', () => {
      console.log('🔌 Caller hung up:', socket.id);
    });
  });

  return io;
};