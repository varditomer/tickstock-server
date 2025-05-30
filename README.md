# TickStock · Real-Time Stock Ticker App

TickStock is a real-time, event-driven stock ticker application built with **Node.js**, **Express**, and **Socket.IO** for the backend, and **React + TypeScript** for the frontend. The backend also serves the built frontend for easy deployment on platforms like Railway.

> 🚀 Live Demo: [https://tickstock-server-production.up.railway.app](https://tickstock-server-production.up.railway.app)

---

## Features

- 📡 Real-time stock updates via WebSockets
- 📈 Live stock chart with sliding window history
- 📊 Dynamic stock table with price changes
- 🔄 Reconnection handling for unstable network
- 💾 JSON-based storage for simulation (no database required)
- 🧱 Fullstack TypeScript project: Express + React (Vite)

---

## Project Structure

tickstock/
├── client/ # React + Vite frontend (built into backend)
├── data/ # JSON storage for stock data
├── src/
│ ├── index.ts # Express server entry
│ ├── services/
│ │ ├── socket.service.ts
│ │ └── stocks.service.ts
├── public/ # Static assets
├── README.md


---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/tickstock.git
cd tickstock
```

### 2. Install backend dependencies
```bash
Copy
Edit
npm install
```

### 3. Build and integrate frontend
```bash
Copy
Edit
cd client
npm install
npm run build
```
This generates the dist/ folder used by the Express server.

### 4. Run the backend server
```bash
Copy
Edit
cd ..
npm run dev  # or `npm start` in production
```
The server will be available at http://localhost:4000.

JSON Data
data/stocks.initial.json: Initial historical data used for fallback or bootstrapping.

data/stocks.live.json: Auto-updated with last 10 data points per symbol (simulated ticks).

Deployment
The backend serves both the API and the frontend (via express.static), making it ideal for single-host deployment (e.g., Railway, Render).

License
MIT © [Your Name]

---

## ✅ `client/README.md` (frontend-only)

```md
# TickStock Frontend · React + Vite

This is the **frontend** for the TickStock real-time stock tracking app, built using **React**, **TypeScript**, and **Recharts**. It connects to a WebSocket backend to receive live stock updates and displays them in a table and chart UI.

---

## Features

- 🔌 WebSocket connection via `socket.io-client`
- 📊 Kinetic table with live updates
- 📈 Line chart with sliding window history
- 🔄 Reconnection handling and visual indicators

---

## Development

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server
```bash
Copy
Edit
npm run dev
```
The app will be available at http://localhost:5173.

### 3. Connect to Backend
Ensure your backend is running and update the .env file or VITE_SOCKET_URL in socket.service.ts if necessary.

# Build for Production
```bash
Copy
Edit
npm run build
```
The compiled static files will be in the dist/ folder, ready to be served by the backend.


# Live Version
🌐 The live version is hosted by the backend:
https://tickstock-server-production.up.railway.app
