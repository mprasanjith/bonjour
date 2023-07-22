import Transak from "@biconomy/transak";

export function initTransak(
  walletAddress: string,
  firstName?: string,
  email?: string
) {
  const transak = new Transak("PRODUCTION", {
    walletAddress,
    userData: {
      firstName: firstName,
      email: email,
    },
    network: "polygon",
  });
  transak.init();
}
