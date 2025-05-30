import fs from "fs";
import path from "path";

const initialFile = path.resolve(__dirname, "../../data/stocks.initial.json");
const liveFile = path.resolve(__dirname, "../../data/stocks.live.json");

function safeReadJson(
  filePath: string
): Record<string, { price: number; change: number }> {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export const stocksService = {
  getInitialStocks() {
    return safeReadJson(initialFile);
  },

  getLiveStocks() {
    return safeReadJson(liveFile);
  },

  updateLiveStock(symbol: string, price: number, change: number) {
    const current = safeReadJson(liveFile);
    current[symbol] = { price, change };
    fs.writeFileSync(liveFile, JSON.stringify(current, null, 2));
  },
};
