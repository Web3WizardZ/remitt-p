import { createThirdwebClient } from "thirdweb";

export const twClient = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID!,
});
