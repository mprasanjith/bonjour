import chain from "@/utils/chains";
import SafeApiKit from "@safe-global/api-kit";
import { EthAdapter } from "@safe-global/safe-core-sdk-types";

export function getSafeService(ethAdapter: EthAdapter) {
  const safeService = new SafeApiKit({
    txServiceUrl: chain.txServiceUrl,
    ethAdapter: ethAdapter,
  });

  return safeService;
}
