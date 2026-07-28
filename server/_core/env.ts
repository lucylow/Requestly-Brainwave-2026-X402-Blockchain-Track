export const ENV = {
  appId: process.env.VITE_APP_ID ?? "",
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",
  /** Algorand address that receives payments */
  avmAddress: process.env.AVM_ADDRESS?.trim() ?? "",
  /** Algorand private key (base64) for the agent */
  avmPrivateKey: process.env.AVM_PRIVATE_KEY?.trim() ?? "",
  /** Algorand RPC URL */
  algorandTestnetRpc: process.env.ALGORAND_TESTNET_RPC?.trim() ?? "https://testnet-api.algonode.cloud",
  /** X402 Facilitator URL */
  facilitatorUrl: process.env.FACILITATOR_URL?.trim() ?? "https://facilitator.goplausible.xyz",
  /** Algorand TestNet CAIP-2 Identifier */
  algorandTestnetCaip2: process.env.ALGORAND_TESTNET_CAIP2?.trim() ?? "algorand:SGO1GKSzyE7IEPItTxCByw9x8FmnrCDe",
  /** USDC Asset ID on Algorand Testnet */
  usdcAssetId: process.env.USDC_ASSET_ID?.trim() ?? "10458941",
};
