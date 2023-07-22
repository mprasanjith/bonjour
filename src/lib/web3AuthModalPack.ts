import { Web3AuthModalPack, Web3AuthConfig } from "@safe-global/auth-kit";
import { Web3AuthOptions } from "@web3auth/modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import chain from "@/utils/chains";

const clientId = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID;
if (!clientId) {
  throw new Error("Missing NEXT_PUBLIC_WEB3AUTH_CLIENT_ID env variable");
}

const chainConfig = {
  chainId: chain.chainId.toString(16),
  rpcTarget: chain.rpc[0],
  displayName: chain.name,
  blockExplorer: chain.explorers[0].url,
  ticker: chain.nativeCurrency.symbol,
  tickerName: chain.nativeCurrency.name,
};

// https://web3auth.io/docs/sdk/pnp/web/modal/initialize#arguments
const options: Web3AuthOptions = {
  clientId,
  web3AuthNetwork: "testnet",
  authMode: "DAPP",
  chainConfig: {
    chainNamespace: "eip155",
    chainId: chain.chainId.toString(16),
    rpcTarget: chain.rpc[0],
  },
  uiConfig: {
    theme: "light",
    appName: "Bonjour",
  },
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

// https://web3auth.io/docs/sdk/pnp/web/modal/initialize#configuring-adapters
const modalConfig = {
  torus_evm: {
    label: "torus",
    showOnModal: false,
  },
  metamask: {
    label: "metamask",
    showOnDesktop: true,
    showOnMobile: false,
  },
};

// https://web3auth.io/docs/sdk/pnp/web/modal/whitelabel#whitelabeling-while-modal-initialization
const openloginAdapter = new OpenloginAdapter({
  loginSettings: {
    mfaLevel: "mandatory",
  },
  privateKeyProvider,
  adapterSettings: {
    uxMode: "popup",
    whiteLabel: {
      name: "Bonjour",
      url: "https://gobonjour.com",
      // logoLight: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
      // logoDark: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
      // defaultLanguage: "en", // en, de, ja, ko, zh, es, fr, pt, nl
      // dark: true, // whether to enable dark mode. defaultValue: false
      theme: {
        primary: "#2af598",
      },
    },
  },
});

export const web3AuthConfig: Web3AuthConfig = {
  txServiceUrl: chain.txServiceUrl,
};

export async function getWeb3Auth() {
    const web3AuthModalPack = new Web3AuthModalPack(web3AuthConfig);
    
    await web3AuthModalPack.init({
        options,
        adapters: [openloginAdapter as any],
        modalConfig,
    });
    
    return web3AuthModalPack;
}