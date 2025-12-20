import { defineChain } from "thirdweb/chains";

// Lisk Mainnet (chainId 1135) RPC
export const lisk = defineChain({
  id: 1135,
  rpc: "https://rpc.api.lisk.com",
});
