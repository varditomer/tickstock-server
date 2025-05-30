import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Set the port from environment variable or default to 4000
const PORT = process.env.PORT || 4000;

// Create an Express application and set up Socket.IO
const app = express();
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  const symbols = ["AAPL", "GOOG", "TSLA", "MSFT", "AMZN"];

  const interval = setInterval(() => {
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
    const price = +(Math.random() * 1000 + 100).toFixed(2);
    const change = +(Math.random() * 10 - 5).toFixed(2); // -5 to +5
    socket.emit("stock-update", { symbol, price, change });
  }, Math.random() * 5000 + 5000); // every 5-10 sec

  socket.on("disconnect", () => {
    clearInterval(interval);
    console.log("Client disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
