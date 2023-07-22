import { useWeb3Auth } from "@/providers/Web3AuthProvider";
import { Button, Container, Stack, Title, rem } from "@mantine/core";
import { useEffect } from "react";
import { useAnimate, useInView } from "framer-motion";

export default function Home() {
  const { web3Auth } = useWeb3Auth();

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
              Awesome!
            </Title>
            <Title
              id="anim-subtitle"
              weight={300}
              style={{ opacity: 0, transform: "translateY(20px)" }}
            >
              You now have a shiny new wallet.
            </Title>
          </Stack>
          <Stack align="flex-start" py="xl">
            <Button
              variant="outline"
              size="xl"
              id="anim-btn1"
              style={{ opacity: 0, transform: "translateY(20px)" }}
            >
              Let&apos;s add some funds
            </Button>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
