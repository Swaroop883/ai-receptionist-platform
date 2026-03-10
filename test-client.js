const { io } = require("socket.io-client");

console.log("Attempting to connect to Comms Service...");

const socket = io("http://localhost:3002", {
  transports: ["websocket"] // Force WebSocket for Linux stability
});

socket.on("connect", () => {
  console.log("✅ Connection Successful! ID:", socket.id);
  socket.emit("audio_stream", { text: "What are your hours?", userId: "1" });
});

socket.on("ai_reply", (data) => {
  console.log("🤖 AI Replied:", JSON.stringify(data, null, 2));
});

socket.on("connect_error", (err) => {
  console.log("❌ Connection Error:", err.message);
});