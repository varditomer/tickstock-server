import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import { setupSocketAPI } from "./services/socket.service";

dotenv.config();

const app = express();
const http = createServer(app);

const isProduction = process.env.NODE_ENV === "production";
const io = new Server(http, {
  cors: isProduction
    ? undefined
    : {
        origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
        credentials: true,
      },
});

app.use(express.json());

if (isProduction) {
  app.use(express.static(path.resolve(__dirname, "../client/dist")));
} else {
  const corsOptions = {
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  };
  app.use(cors(corsOptions));
}

setupSocketAPI(io);

app.get(/.*/, (_req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
});

const PORT = process.env.PORT || 4000;
http.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
});
