import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
// import { Web3AuthContextProvider } from "@/providers/Web3AuthProvider";
import dynamic from "next/dynamic";

const Web3AuthContextProvider = dynamic(
  () => import("@/providers/Web3AuthProvider").then((res) => res.Web3AuthContextProvider),
  {
    ssr: false,
  }
);

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
          fontFamily: '"Fira Sans", sans-serif',
          primaryColor: "cyan",
          defaultGradient: { from: "#2af598", to: "#009efd", deg: 120 },
        }}
      >
        <Web3AuthContextProvider>
          <Component {...pageProps} />
        </Web3AuthContextProvider>
      </MantineProvider>
    </>
  );
}
