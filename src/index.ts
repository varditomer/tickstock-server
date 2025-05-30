import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
const http = createServer(app);

// Dynamic CORS config for socket.io
const isProduction = process.env.NODE_ENV === 'production';

const io = new Server(http, {
  cors: isProduction
    ? undefined // Allow same-origin by default
    : {
        origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
        credentials: true,
      },
});

// Middleware
app.use(express.json());

// Serve frontend
if (isProduction) {
  // When deploying, serve built frontend from here
  app.use(express.static(path.resolve(__dirname, '../client/dist')));
} else {
  const corsOptions = {
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
  };
  app.use(cors(corsOptions));
}

// Simulated socket data
const symbols = ['AAPL', 'GOOG', 'TSLA', 'MSFT', 'AMZN'];

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  const interval = setInterval(() => {
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
    const price = +(Math.random() * 1000 + 100).toFixed(2);
    const change = +(Math.random() * 10 - 5).toFixed(2);
    socket.emit('stock-update', { symbol, price, change });
  }, Math.random() * 5000 + 5000);

  socket.on('disconnect', () => {
    clearInterval(interval);
    console.log('Client disconnected:', socket.id);
  });
});

// SPA fallback for client-side routing
app.get(/.*/, (_req, res) => {
    console.log('222222222222222222222222222');
  res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
});

const PORT = process.env.PORT || 4000;
http.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
});
