const chain = {
  name: "Goerli",
  title: "Ethereum Testnet Goerli",
  chain: "ETH",
  rpc: [
    `https://rpc.ankr.com/eth_goerli`,
    "https://rpc.goerli.mudit.blog/",
    "https://ethereum-goerli.publicnode.com",
  ],
  faucets: [
    "http://fauceth.komputing.org?chain=5&address=${ADDRESS}",
    "https://goerli-faucet.slock.it?address=${ADDRESS}",
    "https://faucet.goerli.mudit.blog",
  ],
  nativeCurrency: {
    name: "Goerli Ether",
    symbol: "ETH",
    decimals: 18,
  },
  infoURL: "https://goerli.net/#about",
  shortName: "gor",
  chainId: 5,
  networkId: 5,
  ens: {
    registry: "0x112234455c3a32fd11230c42e7bccd4a84e02010",
  },
  explorers: [
    {
      name: "etherscan-goerli",
      url: "https://goerli.etherscan.io",
      standard: "EIP3091",
    },
  ],
  txServiceUrl: "https://safe-transaction-goerli.safe.global"
};

export default chain;
