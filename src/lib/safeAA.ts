import { JsonRpcSigner } from "@ethersproject/providers";
import AccountAbstraction, {
  AccountAbstractionConfig,
} from "@safe-global/account-abstraction-kit-poc";
import relayKit from "./gelatoRelay";

export async function getSafeAA(signer: JsonRpcSigner) {
  const safeAccountAbstraction = new AccountAbstraction(signer);
  const sdkConfig: AccountAbstractionConfig = {
    relayPack: relayKit,
  };
  await safeAccountAbstraction.init(sdkConfig);

  return safeAccountAbstraction;
}
