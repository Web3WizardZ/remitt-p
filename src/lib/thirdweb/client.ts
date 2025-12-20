import { createThirdwebClient } from "thirdweb";

export const thirdwebClient = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID!,
});
