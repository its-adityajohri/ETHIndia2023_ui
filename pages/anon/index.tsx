
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useWalletClient } from 'wagmi';
import { ethers } from 'ethers';
import {
  LogInWithAnonAadhaar,
  useAnonAadhaar,
  AnonAadhaarProof, 
} from "anon-aadhaar-react";
import { Button } from "../../components/ui/button"
import {exportCallDataGroth16FromPCD} from 'anon-aadhaar-pcd'
import { useEffect } from 'react';
import { Clipboard } from 'lucide-react';
import createSafe from '../../lib/createSafe';
import { sign } from 'crypto';
const Home: NextPage = () => {
  const [anonAadhaar] = useAnonAadhaar();
  const { data: walletClient, isError, isLoading } = useWalletClient()
  async function getSigner() {
    // Check if window.ethereum is available
    // @ts-ignore 
    if (typeof window.ethereum !== 'undefined') {
      // Create a provider
       // @ts-ignore 
      const provider = new ethers.providers.Web3Provider(window.ethereum);
  
      // Request the user to enable the wallet if it's not already enabled
      await provider.send("eth_requestAccounts", []);
  
      // Get the signer
      const signer = provider.getSigner();
  
      return signer;
    } else {
      console.error('Please install MetaMask!');
      return null;
    }
  }
  async function callCreate(anonAadhar: any) {
    // Check if window.ethereum is available
    // @ts-ignore 
    
    const {a,b,c,Input} = await exportCallDataGroth16FromPCD(anonAadhaar.pcd);
    console.log(JSON.stringify({a,b,c,Input}));
    const signer = await getSigner();
    console.log(signer);
    createSafe(signer,a,b,c,Input);

  }

  useEffect(() => {
    console.log("Anon Aadhaar status: ", anonAadhaar.status);
  }, [anonAadhaar]);

  const copyToClipboard = () => {
    // @ts-ignore 
    const codeToCopy = JSON.stringify(anonAadhaar.pcd, null, 2);
    navigator.clipboard.writeText(codeToCopy).then(() => {
      alert('Code copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  return (

    <div>
      <div className='bg-blue-200 h-screen w-full flex flex-col  items-center p-[2rem] gap-[2rem] '>
          <h1 className="text-3xl font-bold   font-inter">
              Create Your Anon Wallet
          </h1>
          <div className='bg-blue-400 w-11/12 h-2/4 rounded-md shadow-md flex items-center flex-col p-4 justify-center'>
            <Tabs defaultValue="account" className="w-[400px]">
              <TabsList>
                <TabsTrigger value="account">Connect Wallet</TabsTrigger>
                <TabsTrigger value="password">Go through Anon Aadhaar KYC</TabsTrigger>
                <TabsTrigger value="create">Aadhaar Wallet Creation</TabsTrigger>
              </TabsList>
              <TabsContent value="account"><ConnectButton/></TabsContent>
              <TabsContent value="password">
                <div>
                  <LogInWithAnonAadhaar />
                  <p>{anonAadhaar?.status}</p>
                </div>
                <div >
                  {/* Render the proof if generated and valid */}
                  {anonAadhaar?.status === "logged-in" && (
                    <>
                      <p>✅ Proof is valid</p>
                      <AnonAadhaarProof code={JSON.stringify(anonAadhaar.pcd, null, 2)}/>
                      <button onClick={copyToClipboard}>
                    <Clipboard/>
                      </button>
                    </>
                    )}
                </div>
              </TabsContent>
              <TabsContent value="create">
                <Button onClick={() => callCreate(anonAadhaar)}>create Wallet</Button>
              </TabsContent>
            </Tabs>
          </div>
      </div>
    </div>  
  );
};

export default Home;
