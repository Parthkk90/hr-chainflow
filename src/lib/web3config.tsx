
import { configureChains, createClient, createConfig } from "wagmi";
import { mainnet, sepolia, polygon, polygonMumbai } from "wagmi/chains";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { publicProvider } from "wagmi/providers/public";
import { infuraProvider } from "wagmi/providers/infura";

// Configure chains and providers
const { chains, publicClient } = configureChains(
  [mainnet, sepolia, polygon, polygonMumbai],
  [
    publicProvider(),
    // You can add infuraProvider if needed for better stability
    // infuraProvider({ apiKey: "your-infura-key" }),
  ]
);

// Create connectors
const metamaskConnector = new MetaMaskConnector({
  chains,
  options: {
    shimDisconnect: true,
  },
});

const injectedConnector = new InjectedConnector({
  chains,
  options: {
    shimDisconnect: true,
    name: "Injected",
  },
});

// Create wagmi config
export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [metamaskConnector, injectedConnector],
  publicClient,
});

// We don't need Web3Modal anymore, as we're using direct connectors
export const getWeb3ModalComponent = () => null;
