import fs from "fs";
import path from "path";

const initialFile = path.resolve(__dirname, "../../data/stocks.initial.json");
const liveFile = path.resolve(__dirname, "../../data/stocks.live.json");

type StockDataPoint = {
  price: number;
  change: number;
};

type StocksMap = Record<string, StockDataPoint[]>;

function safeReadJson(filePath: string): StocksMap {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export const stocksService = {
  // Get only the latest data point per stock (for table)
  getLatestLiveStocks(): Record<string, StockDataPoint> {
    const data = safeReadJson(liveFile);
    const result: Record<string, StockDataPoint> = {};
    for (const symbol in data) {
      const history = data[symbol];
      if (Array.isArray(history) && history.length > 0) {
        result[symbol] = history[history.length - 1];
      }
    }
    return result;
  },

  // Get history (for chart)
  getHistory(symbol: string): StockDataPoint[] {
    const data = safeReadJson(liveFile);
    return data[symbol] || [];
  },

  // Called when a new tick is received
  updateLiveStock(symbol: string, price: number, change: number) {
    const current = safeReadJson(liveFile);
    const history = Array.isArray(current[symbol]) ? current[symbol] : [];

    const updated = [...history, { price, change }];
    current[symbol] = updated.slice(-10); // Keep last 10

    fs.writeFileSync(liveFile, JSON.stringify(current, null, 2));
  },

  // For initial load fallback
  getInitialStocks(): StocksMap {
    return safeReadJson(initialFile);
  },
};
