import { MoneriumPack } from "@safe-global/onramp-kit";

const clientId = process.env.NEXT_PUBLIC_MONERIUM_API_KEY;
if (!clientId) {
  throw new Error("Missing NEXT_PUBLIC_MONERIUM_API_KEY env variable");
}

const moneriumPack = new MoneriumPack({
  clientId,
  environment: "sandbox", // Use the proper Monerium environment ('sandbox' | 'production')})
});

export default moneriumPack;
