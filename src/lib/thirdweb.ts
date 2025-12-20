import { createThirdwebClient } from "thirdweb";
import { defineChain } from "thirdweb/chains";

export const thirdwebClient = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID!,
});

// ✅ alias for older imports
export const twClient = thirdwebClient;

export const appChain = defineChain({
  id: Number(process.env.NEXT_PUBLIC_CHAIN_ID ?? "1135"),
  rpc: process.env.NEXT_PUBLIC_RPC_URL ?? "https://rpc.api.lisk.com",
});
