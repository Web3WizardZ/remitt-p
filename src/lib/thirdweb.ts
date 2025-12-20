import { createThirdwebClient } from "thirdweb";
import { defineChain } from "thirdweb/chains";

export const thirdwebClient = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID!,
});

// Prefer explicit RPC if you have one; otherwise thirdweb will still work with clientId infra.
// You can set NEXT_PUBLIC_RPC_URL if needed.
export const appChain = defineChain({
  id: Number(process.env.NEXT_PUBLIC_CHAIN_ID ?? "1135"),
  rpc: process.env.NEXT_PUBLIC_RPC_URL ?? "https://rpc.api.lisk.com",
});
