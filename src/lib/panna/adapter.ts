import { createThirdwebClient } from "thirdweb";

let _client: ReturnType<typeof createThirdwebClient> | null = null;

function requiredEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

export function getClient() {
  if (_client) return _client;

  _client = createThirdwebClient({
    clientId: requiredEnv("NEXT_PUBLIC_CLIENT_ID"),
  });

  return _client;
}
