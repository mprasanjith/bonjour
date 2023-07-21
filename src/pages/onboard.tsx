import { Button, Container, Stack, Text, Title, rem } from "@mantine/core";
import { useState, useEffect } from "react";
import { useAnimate, stagger, useInView } from "framer-motion";

enum OnboardingStep {
  Bonjour,
}

// const AnimatedSentences = ({ animate, scope }) => {

//   return (

//   );
// };

export default function Home() {
  const [step, setStep] = useState(OnboardingStep.Bonjour);
  const [scope, animate] = useAnimate(); // Use useAnimate hook here


  const isInView = useInView(scope);

  const sentenceSequence: any = [
    ["#anim-title", { opacity: 1, y: 0 }, { delay: 0, duration: 0.5 }],
    ["#anim-subtitle", { opacity: 1, y: 0 }, { delay: 0, duration: 0.5 }],
    ["#anim-btn1", { opacity: 1, y: 0 }, { at: 1, duration: 1 }],
    ["#anim-btn2", { opacity: 1, y: 0 }, { at: 2, duration: 1 }],
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
            <Title id="anim-title" variant="gradient" weight={700} size={rem(62)} style={{ opacity: 0, transform: "translateY(20px)" }}>
              Bonjour!
            </Title>
            <Title id="anim-subtitle" weight={300} style={{ opacity: 0, transform: "translateY(20px)" }}>Let&apos;s get started.</Title>
          </Stack>
          <Stack align="flex-start" py="xl">
            <Button variant="outline" size="xl" id="anim-btn1" style={{ opacity: 0, transform: "translateY(20px)" }}>
              I&apos;m new to crypto
            </Button>
            <Button variant="outline" size="xl" id="anim-btn2" style={{ opacity: 0, transform: "translateY(20px)" }}>
              I already have a wallet
            </Button>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
