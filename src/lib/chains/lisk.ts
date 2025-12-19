import type { Chain } from "viem";

export const liskMainnet: Chain = {
  id: 1135,
  name: "Lisk",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.api.lisk.com"] },
    public: { http: ["https://rpc.api.lisk.com"] },
  },
  blockExplorers: {
    default: { name: "Blockscout", url: "https://blockscout.lisk.com" },
  },
};

export const liskSepolia: Chain = {
  id: 4202,
  name: "Lisk Sepolia Testnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.sepolia-api.lisk.com"] },
    public: { http: ["https://rpc.sepolia-api.lisk.com"] },
  },
  blockExplorers: {
    default: { name: "Blockscout", url: "https://sepolia-blockscout.lisk.com" },
  },
};
