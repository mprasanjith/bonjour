import { ethers } from "ethers";
import { EthersAdapter } from "@safe-global/protocol-kit";
import { JsonRpcSigner } from '@ethersproject/providers';

export function getEthAdapter(signer: JsonRpcSigner) {
  
  const ethAdapter = new EthersAdapter({
    ethers,
    signerOrProvider: signer,
  });
  return ethAdapter;
}
