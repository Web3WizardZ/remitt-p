import { client, wallet } from "panna-sdk/core";

export const pannaClient = client.createPannaClient({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID!,
});

export function createLiskAccount() {
  return wallet.createAccount({
    partnerId: process.env.NEXT_PUBLIC_PARTNER_ID!,
  });
}
