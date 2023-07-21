import { getWeb3Auth } from "@/lib/web3AuthModalPack";
import { Web3AuthModalPack } from "@safe-global/auth-kit";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface Web3AuthContextType {
  web3Auth: Web3AuthModalPack | null;
}

const Web3AuthContext = createContext<Web3AuthContextType>({ web3Auth: null });

export const Web3AuthContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [web3Auth, setWeb3Auth] = useState<Web3AuthModalPack | null>(null);

  useEffect(() => {
    getWeb3Auth().then((client) => setWeb3Auth(client));
  }, []);

  return (
    <Web3AuthContext.Provider value={{ web3Auth }}>
      {children}
    </Web3AuthContext.Provider>
  );
};

export const useWeb3Auth = () => {
  const { web3Auth } = useContext(Web3AuthContext);
  return web3Auth;
};
