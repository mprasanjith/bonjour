import { ADAPTER_EVENTS } from "@web3auth/base";
import { getWeb3Auth } from "@/lib/web3AuthModalPack";
import { AuthKitSignInData, Web3AuthModalPack } from "@safe-global/auth-kit";
import { OpenloginUserInfo } from "@web3auth/openlogin-adapter";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface Web3AuthContextType {
  web3Auth: Web3AuthModalPack | null;
  signInData: AuthKitSignInData | null;
  user: Partial<OpenloginUserInfo> | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const Web3AuthContext = createContext<Web3AuthContextType>({
  web3Auth: null,
  signInData: null,
  user: null,
  signIn: async () => {},
  signOut: async () => {},
});

export const Web3AuthContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [web3Auth, setWeb3Auth] = useState<Web3AuthModalPack | null>(null);
  const [signInData, setSignInData] = useState<AuthKitSignInData | null>(null);
  const [user, setUser] = useState<Partial<OpenloginUserInfo> | null>(null);

  useEffect(() => {
    getWeb3Auth().then((client) => setWeb3Auth(client));
  }, []);

  useEffect(() => {
    web3Auth?.subscribe(ADAPTER_EVENTS.CONNECTED, () => {
      web3Auth.getUserInfo().then(setUser);
    });
  }, [web3Auth]);

  useEffect(() => {
    web3Auth?.subscribe(ADAPTER_EVENTS.DISCONNECTED, () => {
      setUser(null);
      setSignInData(null);
    });
  }, [web3Auth]);

  const signIn = async () => {
    const signInData = await web3Auth?.signIn();
    setSignInData(signInData ?? null);
  };

  const signOut = async () => {
    await web3Auth?.signOut();
    setSignInData(null);
  };

  return (
    <Web3AuthContext.Provider
      value={{ web3Auth, signInData, signIn, signOut, user }}
    >
      {children}
    </Web3AuthContext.Provider>
  );
};

export const useWeb3Auth = () => {
  const { web3Auth, signIn, signInData, signOut, user } =
    useContext(Web3AuthContext);
  return { web3Auth, signIn, signInData, signOut, user };
};
