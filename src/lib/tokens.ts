export type AppToken = {
  symbol: string;
  name: string;
  address?: string; // ERC20 address if known
};

// Fallback list only. If Panna exposes tokens/consts at runtime, we’ll prefer that.
export const FALLBACK_TOKENS: AppToken[] = [
  { symbol: "USDC", name: "USD Coin" },
  { symbol: "USDT", name: "Tether" },
];
