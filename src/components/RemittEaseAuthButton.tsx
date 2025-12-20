"use client";

import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from "thirdweb/react";
import { inAppWallet } from "thirdweb/wallets";
import { defineChain } from "thirdweb/chains";

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID!,
});

const chain = defineChain(Number(process.env.NEXT_PUBLIC_CHAIN_ID ?? "1135"));

export function RemittEaseAuthButton() {
  return (
    <ConnectButton
      client={client}
      chain={chain}
      // Only in-app auth: Google/email/phone/passkey — no MetaMask option.
      wallets={[
        inAppWallet({
          partnerId: process.env.NEXT_PUBLIC_PARTNER_ID, // supported option :contentReference[oaicite:1]{index=1}
          auth: {
            options: ["google", "email", "phone", "passkey"],
            mode: "popup",
          },
          metadata: { name: process.env.NEXT_PUBLIC_APP_NAME ?? "RemittEase" },
        }),
      ]}
      showAllWallets={false}
      connectButton={{ label: "Sign in / Create account" }} // valid :contentReference[oaicite:2]{index=2}
      detailsButton={{
        connectedAccountName: "Account", // ✅ replaces label
        connectedAccountAvatarUrl: "/RE%20icon.png",
      }}
    />
  );
}
