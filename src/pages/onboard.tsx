import { Button, Stack } from "@mantine/core";

export default function Home() {
  return (
    <>
      <Stack
        justify="flex-end"
        h={300}
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        })}
      >
        <Button variant="outline">1</Button>
        <Button variant="outline">2</Button>
        <Button variant="outline">3</Button>
      </Stack>
    </>
  );
}
