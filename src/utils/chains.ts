const goerli = {
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

const polygon = {
  name: "Polygon",
  title: "Polygon",
  chain: "MATIC",
  rpc: [
    "https://rpc-mainnet.maticvigil.com",
    "https://rpc-mainnet.matic.network",
    "https://matic-mainnet.chainstacklabs.com",
    "https://rpc-mainnet.matic.quiknode.pro"
  ],
  faucets: [],
  nativeCurrency: {
    name: "Matic",
    symbol: "MATIC",
    decimals: 18
  },
  infoURL: "https://docs.matic.network/docs/develop/network-details/network",
  shortName: "matic",
  chainId: 137,
  networkId: 137,
  explorers: [
    {
      name: "polygonscan",
      url: "https://polygonscan.com",
      standard: "EIP3091"
    },
  ],
  txServiceUrl: "https://safe-transaction-polygon.safe.global"
}

const chain = polygon;

export default chain;
