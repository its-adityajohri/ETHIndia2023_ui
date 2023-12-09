
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
import { useEffect,useState } from 'react';
import { Clipboard } from 'lucide-react';
import createSafe from '../../lib/createSafe';
import { sign } from 'crypto';
const tabHeadings = {
  account: 'Connect Wallet',
  password: 'Go through Anon Aadhaar KYC',
  create: 'Aadhaar Wallet Creation'
};

const Home: NextPage = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [anonAadhaar] = useAnonAadhaar();
  const { data: walletClient, isError, isLoading } = useWalletClient()
  // This function will handle tab change
  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
  };

  // This function will handle the 'Next' button click to navigate tabs
  const handleNextClick = () => {
    const tabKeys = Object.keys(tabHeadings);
    const currentTabIndex = tabKeys.indexOf(activeTab);
    const nextTabIndex = (currentTabIndex + 1) % tabKeys.length;
    setActiveTab(tabKeys[nextTabIndex]);
  };
  // This function will handle the 'Previous' button click to navigate tabs
  const handlePreviousClick = () => {
    const tabKeys = Object.keys(tabHeadings);
    const currentTabIndex = tabKeys.indexOf(activeTab);
    const nextTabIndex = (currentTabIndex - 1) % tabKeys.length;
    setActiveTab(tabKeys[nextTabIndex]);
  };
  async function getSigner() {
    // Check if window.ethereum is available
    // @ts-ignore 
    if (typeof window.ethereum !== 'undefined') {
      // Create a provider
       // @ts-ignore 
      const provider = new ethers.BrowserProvider(window.ethereum);
  
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


      <div className='bg-blue-200 h-[120rem] w-full flex flex-col  items-center p-[2rem] gap-[2rem] '>
          <h1 className="text-3xl font-bold   font-inter">
              Create Your Anon Wallet
          </h1>
          <div className=' bg-blue-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 border border-gray-100 w-11/12 rounded-md shadow-md flex  flex-col p-[2rem] items-center'>
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              {/* <TabsList>
                <TabsTrigger value="account">Connect Wallet</TabsTrigger>
                <TabsTrigger value="password">Go through Anon Aadhaar KYC</TabsTrigger>
                <TabsTrigger value="create">Aadhaar Wallet Creation</TabsTrigger>
              </TabsList> */}
              {/* <TabsList aria-label="Manage your account">
            {Object.entries(tabHeadings).map(([key, title]) => (
              <TabsTrigger key={key} value={key}>{title}</TabsTrigger>
            ))}
          </TabsList> */}
              <TabsContent value="account">
                <div className='flex flex-col items-center self-center justify-between gap-[3rem] w-full'>
                  <p className='font-inter'>Anon Aadhaar KYC - connect your wallet</p>
                <ConnectButton/>
                <button onClick={handleNextClick} className=" self-end bg-blue-950 text-blue-400 border border-blue-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
                <span className="bg-blue-400 shadow-blue-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
         {`Next ->`}
        </button>
                </div>
                </TabsContent>
              <TabsContent value="password">
              <div className='flex flex-col items-center self-center justify-between gap-[3rem] w-full'>
              <p className='font-inter'>Create Anon KYC Proof</p>
                  <LogInWithAnonAadhaar />
                  <p>{anonAadhaar?.status}</p>
                
                <div >
                </div>
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
                    <div className='w-full flex flex-row justify-between'>
<button onClick={handlePreviousClick} className=" self-start bg-blue-950 text-blue-400 border border-blue-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
                <span className="bg-blue-400 shadow-blue-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
         {`<- Previous`}
        </button>
<button onClick={handleNextClick} className=" self-end bg-blue-950 text-blue-400 border border-blue-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
                <span className="bg-blue-400 shadow-blue-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
         {`Next ->`}
        </button>
        </div>
                </div>
                
              </TabsContent>
              <TabsContent value="create">
              <div className='flex flex-col items-center self-center justify-between gap-[3rem] w-full'>
              <p className='font-inter'>Create Anon KYC Proof</p>
                <Button onClick={() => callCreate(anonAadhaar)}>create Wallet</Button>
                <button onClick={handlePreviousClick} className=" self-start bg-blue-950 text-blue-400 border border-blue-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
                <span className="bg-blue-400 shadow-blue-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
         {`<- Previous`}
        </button>
                </div>
              </TabsContent>
            </Tabs>
           
          </div>
      </div>
   
  );
};

export default Home;
