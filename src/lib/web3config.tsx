
import { configureChains, createConfig } from "wagmi";
import { mainnet, sepolia, polygon, polygonMumbai } from "wagmi/chains";
import { EthereumClient, w3mConnectors, w3mProvider } from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import React from "react";

// Choose which chains you'd like to support
const chains = [mainnet, sepolia, polygon, polygonMumbai];

// Configure Web3Modal & Ethereum Client
const projectId = "YOUR_PROJECT_ID"; // Replace with your WalletConnect projectId if you have one

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});

export const ethereumClient = new EthereumClient(wagmiConfig, chains);

// Export a function that returns the Web3Modal component instead of directly using JSX
export const getWeb3ModalComponent = () => {
  return Web3Modal && (
    <Web3Modal
      projectId={projectId}
      ethereumClient={ethereumClient}
      themeVariables={{
        '--w3m-accent-color': '#3B82F6',
        '--w3m-background-color': '#FFFFFF'
      }}
    />
  );
};
