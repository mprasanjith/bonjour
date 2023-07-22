import { SafeFactory, SafeAccountConfig } from "@safe-global/protocol-kit";
import { EthAdapter } from "@safe-global/safe-core-sdk-types";

export async function predictSafeAddress(ethAdapter: EthAdapter) {
  const safeFactory = await SafeFactory.create({
    ethAdapter,
  });

  const signerAddress = await ethAdapter.getSignerAddress();
  if (!signerAddress) throw new Error("No signer address");
  
  const safeAccountConfig: SafeAccountConfig = {
    owners: [signerAddress],
    threshold: 1,
  };

  const safeAddress = await safeFactory.predictSafeAddress(safeAccountConfig);
  return safeAddress;
}

export async function deploySafe(ethAdapter: EthAdapter) {
  const safeFactory = await SafeFactory.create({
    ethAdapter,
  });

  const signerAddress = await ethAdapter.getSignerAddress();
  if (!signerAddress) throw new Error("No signer address");
  
  const safeAccountConfig: SafeAccountConfig = {
    owners: [signerAddress],
    threshold: 1,
  };

  const safe = await safeFactory.deploySafe({ safeAccountConfig });
  return safe;
}
