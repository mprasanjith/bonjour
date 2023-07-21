import { useWeb3Auth } from "@/providers/Web3AuthProvider";
import { Button, Container, Modal, Stack, Title, rem } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const web3Auth = useWeb3Auth();
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    web3Auth
      ?.getUserInfo()
      .then(() => router.replace("/app"))
      .catch(() => {});
  }, [web3Auth, router]);

  async function initWallet() {
    if (!web3Auth) return;

    setOpened(true);
    const signInData = await web3Auth.signIn();
    if (signInData) router.replace("/app");

    setOpened(false);
  }

  async function close() {
    setOpened(false);
  }

  return (
    <Modal.Root opened={opened} onClose={close}>
      <Modal.Overlay />
      <Container>
        <Stack justify="flex-end" h="100vh" pb="xl">
          <Stack mb="xl">
            <Title variant="gradient" weight={700} size={rem(62)}>
              Bonjour!
            </Title>
            <Title weight={300}>Let&apos;s get started.</Title>
          </Stack>
          <Stack align="flex-start" py="xl">
            <Button variant="outline" size="xl" onClick={initWallet}>
              I&apos;m new here
            </Button>
            <Button variant="outline" size="xl" onClick={initWallet}>
              I already have an account
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Modal.Root>
  );
}
