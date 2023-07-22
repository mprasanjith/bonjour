import { IBundler, Bundler } from "@biconomy/bundler";
import {
  BiconomySmartAccount,
  BiconomySmartAccountConfig,
  DEFAULT_ENTRYPOINT_ADDRESS,
} from "@biconomy/account";
import { Signer } from "ethers";
import { ChainId } from "@biconomy/core-types";
import SocialLogin from "@biconomy/web3-auth";
import chain from "@/utils/chains";
import { BiconomyPaymaster, IPaymaster } from "@biconomy/paymaster";

export const bundler: IBundler = new Bundler({
  bundlerUrl: "https://bundler.biconomy.io/api/v2/80001/abc",
  chainId: chain.chainId,
  entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
});

export const paymaster: IPaymaster = new BiconomyPaymaster({
  paymasterUrl: process.env.NEXT_PUBLIC_BICONOMY_PAYMASTER_URL || "" 
})

export async function createAccount(signer: Signer) {
  const biconomySmartAccountConfig: BiconomySmartAccountConfig = {
    signer,
    chainId: ChainId.POLYGON_MUMBAI,
    bundler: bundler,
  };

  let biconomySmartAccount = new BiconomySmartAccount(
    biconomySmartAccountConfig
  );
  biconomySmartAccount = await biconomySmartAccount.init();
  return biconomySmartAccount;
}

export async function getSocialLogin() {
  // create an instance of SocialLogin
  const socialLogin = new SocialLogin();

  const signature1 = await socialLogin.whitelistUrl("https://localhost:3000");
  const signature2 = await socialLogin.whitelistUrl("https://gobonjour.com");

  await socialLogin.init({
    chainId: chain.chain,
    network: "mainnet",
    whitelistUrls: {
      "https://localhost:3000": signature1,
      "https://gobonjour.com": signature2,
    },
    whteLableData: {
      name: "Bonjour",
      logo: "https://gobonjour.com/logo.png",
    }
  });

  return socialLogin;
}
