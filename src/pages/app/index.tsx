import WalletBalance from "@/components/WalletBalance";
import { AppNavigation } from "@/layouts/AppNavigation";
import AuthOnlyLayout from "@/layouts/AuthOnlyLayout";
import { Container } from "@mantine/core";

const App = () => {
  return (
    <AuthOnlyLayout>
      <AppNavigation />
      <Container>
        <WalletBalance />
      </Container>
    </AuthOnlyLayout>
  );
};

export default App;
