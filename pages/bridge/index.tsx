import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div >
      <Head>
        <title>Decimals</title>
        <meta
          content="decimals ETHIndia 2023"
          name="hack"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <h1 className="text-3xl font-bold underline">
      Bridge
    </h1>

        <ConnectButton />

      

      

        


    
    </div>
  );
};

export default Home;
