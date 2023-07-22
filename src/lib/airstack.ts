import { init, useQuery } from "@airstack/airstack-react";

const airstackApiKey = process.env.NEXT_PUBLIC_AIRSTACK_API_KEY;
if (!airstackApiKey) {
    throw new Error("Missing NEXT_PUBLIC_AIRSTACK_API_KEY env var");
}

init(airstackApiKey);

export default useQuery;