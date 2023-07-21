import { Button, Container, Stack, Text, Title, rem } from "@mantine/core";
import { useState } from "react";

enum OnboardingStep {
  Bonjour,
}

export default function Home() {
  const [step, setStep] = useState(OnboardingStep.Bonjour);

  return (
    <Container>
      <Stack justify="flex-end" h="100vh" pb="xl">
        <Stack mb="xl">
          <Title variant="gradient" weight={700} size={rem(62)}>
            Bonjour!
          </Title>
          <Title weight={300}>Let&apos;s get started.</Title>
        </Stack>
        <Stack align="flex-start" py="xl">
          <Button variant="outline" size="xl">
            I&apos;m new to crypto
          </Button>
          <Button variant="outline" size="xl">
            I already have a wallet
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
