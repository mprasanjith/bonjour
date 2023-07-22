import { useWeb3Auth } from "@/providers/Web3AuthProvider";
import { useRouter } from "next/router";
import { PropsWithChildren, useEffect } from "react";

const AuthOnlyLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const { auth } = useWeb3Auth();

  useEffect(() => {
    if (!auth) {
      router.replace("/onboard");
    }
    auth?.getUserInfo().catch(() => router.replace("/onboard"));
  }, [auth, router]);

  return children;
};

export default AuthOnlyLayout;
