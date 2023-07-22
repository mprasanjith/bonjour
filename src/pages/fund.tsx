import { useWeb3Auth } from "@/providers/Web3AuthProvider";
import { Button, Container, Stack, Title, rem } from "@mantine/core";
import { useEffect } from "react";
import { useAnimate, useInView } from "framer-motion";
import Link from "next/link";
import { initTransak } from "@/lib/transak";

export default function Fund() {
  const { smartAccount } = useWeb3Auth();

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

  async function showTransak() {
    const smartAccountAddress = await smartAccount?.getSmartAccountAddress();
    if (!smartAccountAddress) return;

    initTransak(smartAccountAddress);
  }

  return (
    <Container>
      <Stack justify="flex-end" h="100vh" pb="xl">
        <Title variant="gradient" weight={700} size={rem(62)}>
          Let&apos;s get you funded.
        </Title>

        <Stack align="flex-start" py="xl">
          <Button variant="outline" size="xl" onClick={showTransak}>
            Deposit money
          </Button>

          <Link href="/app">
            <Button variant="outline" size="xl">
              Skip for now
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Container>
  );
}
