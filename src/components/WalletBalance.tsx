import { useWeb3Auth } from "@/providers/Web3AuthProvider";
import { Paper, Button, Stack, Title, Text } from "@mantine/core";
import Link from "next/link";

const WalletBalance: React.FC = () => {
  const { addresses } = useWeb3Auth();
  return (
    <Paper
      p="xl"
      shadow="md"
      my="lg"
      radius="md"
      sx={(theme) => ({
        background: theme.fn.gradient({
          from: "#8BC6EC",
          to: "#9599E2",
          deg: 135,
        }),
      })}
    >
      <Stack justify="space-between">
        <Text>Your balance</Text>
        <Title variant="h1" p="0" m="0">$100.56</Title>

        {/* <Link href="/app/transactions">
          <Button
            variant="subtle"
            color="gray.7"
            compact
            uppercase
            p={0}
            mt="md"
          >
            See history
          </Button>
        </Link> */}
      </Stack>
    </Paper>
  );
};

export default WalletBalance;
