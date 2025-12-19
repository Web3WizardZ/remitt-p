let _client: any | null = null;

function requiredEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

export async function getPannaClient(): Promise<any> {
  if (_client) return _client;

  const mod: any = await import("panna-sdk");

  const factory =
    mod.createClient ??
    mod.createPannaClient ??
    mod.Client?.create ??
    mod.default?.createClient ??
    mod.default;

  if (!factory) {
    throw new Error(
      "panna-sdk: Could not find a client factory export (expected createClient/createPannaClient/etc)."
    );
  }

  _client = factory({
    clientId: requiredEnv("NEXT_PUBLIC_CLIENT_ID"),
    partnerId: requiredEnv("NEXT_PUBLIC_PARTNER_ID"),
    chainId: Number(requiredEnv("NEXT_PUBLIC_CHAIN_ID")),
    appName: process.env.NEXT_PUBLIC_APP_NAME,
    appDescription: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
  });

  return _client;
}
