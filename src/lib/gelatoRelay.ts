import { GelatoRelayPack } from "@safe-global/relay-kit";

const apiKey = process.env.NEXT_PUBLIC_GELATO_RELAY_API_KEY;
if (!apiKey) throw new Error("Missing NEXT_PUBLIC_GELATO_RELAY_API_KEY env variable");

const relayKit = new GelatoRelayPack(apiKey);

export default relayKit;
