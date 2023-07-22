import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import SocialLogin from "@biconomy/web3-auth";
import "@biconomy/web3-auth/dist/src/style.css";
import { bundler, paymaster } from "@/lib/biconomy";
import chain from "@/utils/chains";
import { ethers } from "ethers";
import {
  BiconomySmartAccount,
  BiconomySmartAccountConfig,
} from "@biconomy/account";

interface Web3AuthContextType {
  auth: SocialLogin | null;
  loading?: boolean;
  provider?: any;
  address?: string;
  smartAccount?: BiconomySmartAccount | null;
  smartAccountAddress?: string;
  signIn: () => void;
  signOut: () => void;
  setupSmartAccount: () => void;
}

const Web3AuthContext = createContext<Web3AuthContextType>({
  auth: null,
  loading: false,
  provider: null,
  address: "",
  smartAccount: null,
  smartAccountAddress: "",
  signIn: () => {},
  signOut: () => {},
  setupSmartAccount: () => {},
});

export const Web3AuthContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [interval, enableInterval] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const sdkRef = useRef<any>(null);
  const [provider, setProvider] = useState<any>(null);
  const [address, setAddress] = useState<string>("");
  const [smartAccount, setSmartAccount] = useState<BiconomySmartAccount | null>(
    null
  );

  useEffect(() => {
    let configureLogin: any;
    if (interval) {
      configureLogin = setInterval(() => {
        if (!!sdkRef.current?.provider) {
          setupSmartAccount();
          clearInterval(configureLogin);
        }
      }, 1000);
    }
  }, [interval]);

  async function login() {
    if (!sdkRef.current) {
      const socialLoginSDK = new SocialLogin();
      const signature1 = await socialLoginSDK.whitelistUrl(
        "http://localhost:3000/"
      );
      await socialLoginSDK.init({
        chainId: ethers.utils.hexValue(chain.chainId).toString(),
        network: "mainnet",
        whitelistUrls: {
          "http://localhost:3000/": signature1,
        },
      });
      sdkRef.current = socialLoginSDK;
    }
    if (!sdkRef.current.provider) {
      sdkRef.current.showWallet();
      enableInterval(true);
    } else {
      setupSmartAccount();
    }
  }

  async function setupSmartAccount() {
    if (!sdkRef?.current?.provider) return;
    sdkRef.current.hideWallet();
    setLoading(true);
    const web3Provider = new ethers.providers.Web3Provider(
      sdkRef.current.provider
    );
    setProvider(web3Provider);

    try {
      const biconomySmartAccountConfig: BiconomySmartAccountConfig = {
        signer: web3Provider.getSigner(),
        chainId: chain.chainId,
        bundler: bundler,
        paymaster: paymaster,
      };
      let biconomySmartAccount = new BiconomySmartAccount(
        biconomySmartAccountConfig
      );
      biconomySmartAccount = await biconomySmartAccount.init();
      setAddress(await biconomySmartAccount.getSmartAccountAddress());
      setSmartAccount(biconomySmartAccount);
      setLoading(false);
    } catch (err) {
      console.log("error setting up smart account... ", err);
    }
  }

  const logout = async () => {
    if (!sdkRef.current) {
      console.error("Web3Modal not initialized.");
      return;
    }
    await sdkRef.current.logout();
    sdkRef.current.hideWallet();
    setSmartAccount(null);
    setAddress("");
    enableInterval(false);
  };

  return (
    <Web3AuthContext.Provider
      value={{
        auth: sdkRef.current,
        signIn: login,
        signOut: logout,
        setupSmartAccount,
        loading,
        provider,
        address,
        smartAccount,
      }}
    >
      {children}
    </Web3AuthContext.Provider>
  );
};

export const useWeb3Auth = () => {
  const {
    auth,
    signIn,
    setupSmartAccount,
    signOut,
    address,
    loading,
    provider,
    smartAccount,
  } = useContext(Web3AuthContext);
  return {
    auth,
    signIn,
    signOut,
    setupSmartAccount,
    address,
    loading,
    provider,
    smartAccount,
  };
};
