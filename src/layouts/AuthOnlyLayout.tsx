import { useWeb3Auth } from "@/providers/Web3AuthProvider";
import { useRouter } from "next/router";
import { PropsWithChildren, useEffect } from "react";

const AuthOnlyLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const web3Auth = useWeb3Auth();

  useEffect(() => {
    web3Auth?.getUserInfo().catch(() => router.replace("/onboard"));
  }, [web3Auth, router]);

  return children;
};

export default AuthOnlyLayout;
