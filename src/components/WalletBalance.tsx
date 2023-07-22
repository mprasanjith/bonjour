import useQuery from "@/lib/airstack";
import { useBalance } from "@/lib/covalent";
import { useWeb3Auth } from "@/providers/Web3AuthProvider";
import chain from "@/utils/chains";
import { Paper, Stack, Title, Text } from "@mantine/core";

const query = `
query WalletBalances($address: Identity!) {
  Wallet(input: {identity: $address, blockchain: polygon}) {
    identity
    tokenBalances {
      amount
      tokenType
      formattedAmount
      token {
        address
        name
      }
    }
  }
}`;

const WalletBalance: React.FC = () => {
  const { address } = useWeb3Auth();
  const { data, total } = useBalance(chain.chainId, address);

  console.log({ data, total });

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
        <Title variant="h1" p="0" m="0">
          ${total}
        </Title>

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
