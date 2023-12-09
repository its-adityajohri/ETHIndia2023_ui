import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { configureChains, Connector, createConfig, sepolia, WagmiConfig } from 'wagmi';
import {
  arbitrum,
  goerli,
  mainnet,
  optimism,
  polygon,
  base,
  zora,
  arbitrumSepolia,
  celoAlfajores,
} from 'wagmi/chains';

import { publicProvider } from 'wagmi/providers/public';
import Nav from '../components/nav';
import { AnonAadhaarProvider } from "anon-aadhaar-react";
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { Toaster } from "../components/ui/toaster"
const app_id = process.env.NEXT_PUBLIC_APP_ID || "";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
   sepolia, arbitrumSepolia,celoAlfajores,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : []),
  ],
  [publicProvider()]
);
const { wallets } = getDefaultWallets({
  appName: 'RainbowKit App',
  projectId: '8bfb5108a6332499700ca9e62adf9b84',
  chains,
});



 const connectors = connectorsForWallets([
  ...wallets,

 ])


const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
       <AnonAadhaarProvider _appId={app_id}>
      <RainbowKitProvider chains={chains}>
        <Nav/>
        <Component {...pageProps} />
        <Toaster />
      </RainbowKitProvider>
      </AnonAadhaarProvider>
    </WagmiConfig>
  );
}

export default MyApp;
