
import { configureChains, createConfig } from "wagmi";
import { mainnet, sepolia, polygon, polygonMumbai } from "wagmi/chains";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { InjectedConnector } from "wagmi/connectors/injected";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { infuraProvider } from "wagmi/providers/infura";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

// Configure chains and providers with reliable fallbacks
const { chains, publicClient } = configureChains(
  [mainnet, sepolia, polygon, polygonMumbai],
  [
    // Using infura as primary provider with fallback to a default JSON-RPC URL
    infuraProvider({ apiKey: "9aa3d95b3bc440fa88ea12eaa4456161" }), // Public Infura ID, replace with your own for production
    jsonRpcProvider({
      rpc: (chain) => ({
        http: chain.rpcUrls.default.http[0],
      }),
    }),
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
