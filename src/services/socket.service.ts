import { Server } from "socket.io";
import { stocksService } from "./stocks.service";

const symbols = ["AAPL", "GOOG", "TSLA", "MSFT", "AMZN"];

export function setupSocketAPI(io: Server) {
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // Send initial historical data for each symbol
    const historyMap: Record<string, { price: number; change: number }[]> = {};
    symbols.forEach((symbol) => {
      const history = stocksService.getHistory(symbol);
      if (history.length) historyMap[symbol] = history;
    });
    socket.emit("initial-data", historyMap);

    const interval = setInterval(() => {
      const symbol = symbols[Math.floor(Math.random() * symbols.length)];
      const price = +(Math.random() * 1000 + 100).toFixed(2);
      const change = +(Math.random() * 10 - 5).toFixed(2);

      stocksService.updateLiveStock(symbol, price, change);
      socket.emit("stock-update", { symbol, price, change });
    }, Math.random() * 5000 + 5000);

    socket.on("disconnect", () => {
      clearInterval(interval);
      console.log("Client disconnected:", socket.id);
    });
  });
}
