import { AppNavigation } from "@/layouts/AppNavigation";
import AuthOnlyLayout from "@/layouts/AuthOnlyLayout";
import { Container } from "@mantine/core";

const App = () => {
  return (
    <AuthOnlyLayout>
      <AppNavigation />
      <Container>
        <h1>App</h1>
      </Container>
    </AuthOnlyLayout>
  );
};

export default App;
