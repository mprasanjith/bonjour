import { ADAPTER_EVENTS } from "@web3auth/base";
import { getWeb3Auth } from "@/lib/web3AuthModalPack";
import { AuthKitSignInData, Web3AuthModalPack } from "@safe-global/auth-kit";
import { OpenloginUserInfo } from "@web3auth/openlogin-adapter";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface Web3AuthContextType {
  web3Auth: Web3AuthModalPack | null;
  addresses: AuthKitSignInData | null;
  user: Partial<OpenloginUserInfo> | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const Web3AuthContext = createContext<Web3AuthContextType>({
  web3Auth: null,
  addresses: null,
  user: null,
  signIn: async () => {},
  signOut: async () => {},
});

export const Web3AuthContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [web3Auth, setWeb3Auth] = useState<Web3AuthModalPack | null>(null);
  const [addresses, setAddresses] = useState<AuthKitSignInData | null>(null);
  const [user, setUser] = useState<Partial<OpenloginUserInfo> | null>(null);

  console.log("web3Auth", web3Auth);
  console.log("signInData", addresses);
  console.log("user", user);

  const signIn = useCallback(async () => {
    async function triggerSignIn() {
      let web3AuthPack = web3Auth;
      if (!web3Auth) {
        web3AuthPack = await getWeb3Auth();
        if (!web3AuthPack?.safeAuthData) {
          const signInData = await web3AuthPack?.signIn();
          setAddresses(signInData ?? null);
          setWeb3Auth(web3AuthPack);

          const user = await web3AuthPack?.getUserInfo();
          setUser(user ?? null);
        }
      }
    }

    triggerSignIn();
  }, [web3Auth]);

  useEffect(() => {
    function handler() {
      web3Auth?.getUserInfo().then(setUser);
    }

    web3Auth?.subscribe(ADAPTER_EVENTS.CONNECTED, handler);

    return () => {
      web3Auth?.unsubscribe(ADAPTER_EVENTS.CONNECTED, handler);
    };
  }, [web3Auth]);

  useEffect(() => {
    function handler() {
      setUser(null);
      setAddresses(null);
    }
    web3Auth?.subscribe(ADAPTER_EVENTS.DISCONNECTED, handler);

    return () => {
      web3Auth?.unsubscribe(ADAPTER_EVENTS.DISCONNECTED, handler);
    };
  }, [web3Auth]);

  const signOut = async () => {
    await web3Auth?.signOut();
    setAddresses(null);
  };

  return (
    <Web3AuthContext.Provider
      value={{ web3Auth, addresses, signIn, signOut, user }}
    >
      {children}
    </Web3AuthContext.Provider>
  );
};

export const useWeb3Auth = () => {
  const {
    web3Auth,
    signIn,
    addresses,
    signOut,
    user,
  } = useContext(Web3AuthContext);
  return { web3Auth, signIn, addresses, signOut, user };
};
