import { useWeb3Auth } from "@/providers/Web3AuthProvider";
import { Button, Container, Stack, Title, rem } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAnimate, useInView } from "framer-motion";
import { getEthAdapter } from "@/lib/safeEthersAdapter";
import { predictSafeAddress } from "@/lib/safeFactory";
import { ethers } from "ethers";
import { getSafeAA } from "@/lib/safeAA";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const { user, addresses, web3Auth, signIn } = useWeb3Auth();
  const [isInitializingSafe, setIsInitializingSafe] = useState(false);
  const [safeAddress, setSafeAddress] = useState("");

  useEffect(() => {
    if (!user) return;

    if (addresses?.safes?.length) {
      router.replace("/fund");
      return;
    }

    async function initializeSafe() {
      setIsInitializingSafe(true);
      const web3AuthProvider = web3Auth?.getProvider();
      if (!web3AuthProvider) {
        throw new Error("No provider found");
      }

      const web3Provider = new ethers.providers.Web3Provider(web3AuthProvider);
      const signer = web3Provider.getSigner();

      const safeAA = await getSafeAA(signer);
      const predictedSafeAddress = await safeAA.getSafeAddress();
      console.log({ predictedSafeAddress });

      const isSafeDeployed = await safeAA.isSafeDeployed();
      console.log({ isSafeDeployed });

      const ethAdapter = getEthAdapter(signer);
      const safeAddress = await predictSafeAddress(ethAdapter);
      setSafeAddress(safeAddress);
    }

    initializeSafe();
  }, [user, web3Auth, router, addresses]);

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);
  const sentenceSequence: any = [
    ["#anim-title", { opacity: 1, y: 0 }, { delay: 0, duration: 0.5 }],
    ["#anim-subtitle", { opacity: 1, y: 0 }, { delay: 0, duration: 0.5 }],
    ["#anim-btn1", { opacity: 1, y: 0 }, { at: 1, duration: 1 }],
    ["#anim-btn2", { opacity: 1, y: 0 }, { at: 1.5, duration: 1 }],
  ];

  useEffect(() => {
    if (isInView) {
      animate(sentenceSequence);
    }
  }, [isInView]);

  async function initWallet() {
    await signIn();
  }

  if (isInitializingSafe) {
    return (
      <Container>
        <Stack justify="flex-end" h="100vh" pb="xl">
          <Title variant="gradient" weight={700} size={rem(62)}>
            {safeAddress
              ? `Let's get you funded.`
              : "Creating your new account..."}
          </Title>
          {safeAddress && (
            <Title weight={300}>
              Send funds to {safeAddress}. We would have an easy way to fund
              your wallet in the future.
            </Title>
          )}

          {safeAddress && (
            <Stack align="flex-start" py="xl">
              <Link href="/app">
                <Button variant="outline" size="xl">
                  Continue
                </Button>
              </Link>
            </Stack>
          )}
        </Stack>
      </Container>
    );
  }

  return (
    <div ref={scope}>
      <Container>
        <Stack justify="flex-end" h="100vh" pb="xl">
          <Stack mb="xl">
            <Title
              id="anim-title"
              variant="gradient"
              weight={700}
              size={rem(62)}
              style={{ opacity: 0, transform: "translateY(20px)" }}
            >
              Bonjour!
            </Title>
            <Title
              id="anim-subtitle"
              weight={300}
              style={{ opacity: 0, transform: "translateY(20px)" }}
            >
              Let&apos;s get started.
            </Title>
          </Stack>
          <Stack align="flex-start" py="xl">
            <Button
              onClick={initWallet}
              variant="outline"
              size="xl"
              id="anim-btn1"
              style={{ opacity: 0, transform: "translateY(20px)" }}
            >
              I&apos;m new to crypto
            </Button>
            <Button
              onClick={initWallet}
              variant="outline"
              size="xl"
              id="anim-btn2"
              style={{ opacity: 0, transform: "translateY(20px)" }}
            >
              I already have a wallet
            </Button>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
