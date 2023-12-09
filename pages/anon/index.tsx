
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useWalletClient } from 'wagmi';
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';
import {
  LogInWithAnonAadhaar,
  useAnonAadhaar,
  AnonAadhaarProof, 
} from "anon-aadhaar-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table"
import { useToast } from '../../components/ui/use-toast';
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
  const [safeAddress, setSafeAddress] = useState(null);
  const [kycModule, setKycModule] = useState(null);
  const [anonAadhaar] = useAnonAadhaar();
  const [proofReady,setProofReady] = useState(false);
  const { address, isConnecting, isDisconnected } = useAccount();
  const { toast } = useToast()
  const { data: walletClient, isError, isLoading } = useWalletClient()
  // This function will handle tab change
  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
  };
  const showToast = () => {
      toast({
      title: "KYC wallet creation underway",
      description: "Accept the 3 transactions to create your KYC Safe Wallet",
    })
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
    // showToast()
    toast({
      title: "KYC wallet creation underway",
      description: "Accept the 3 transactions to create your KYC Safe Wallet",
    });
  
  //   () => {
  //   toast({
  //     title: "KYC wallet creation underway",
  //     description: "Accept the 3 transactions to create your KYC Safe Wallet",
  //   })
  // }
      // @ts-ignore 
    const {a,b,c,Input} = await exportCallDataGroth16FromPCD(anonAadhaar.pcd);
    console.log(JSON.stringify({a,b,c,Input}));
    const signer = await getSigner();
    console.log(signer);
    const response = await createSafe(signer,a,b,c,Input);
    console.log(response);
    // @ts-ignore 
    setSafeAddress(response.safeAddress)
        // @ts-ignore 
    setKycModule(response.kycModule)
    toast({
      title: "Success",
      description: "KYC Safe Wallet has been generated!",
    });
  }

  useEffect(() => {
    console.log("Anon Aadhaar status: ", anonAadhaar.status);
    if(!proofReady && anonAadhaar.status  === "logged-in")
    {
      toast({
        title: "Success",
        description: "Anon Aadhaar KYC proof has been generated!",
      });
    }
  }, [anonAadhaar]);

  const copyToClipboard = () => {
    // @ts-ignore 
    const codeToCopy = JSON.stringify(anonAadhaar.pcd, null, 2);
    navigator.clipboard.writeText(codeToCopy).then(() => {
      // alert('Code copied to clipboard!');
      toast({
        title: "Success",
        description: "Code copied to clipboard!",
      })
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };
  const copyTextToClipboard = (text: string, toastMessage: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Success",
        description: toastMessage,
      });
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  return (


      <div className='bg-blue-200 h-[120rem] w-full flex flex-col  items-center p-[2rem] gap-[2rem] '>
          {/* <h1 className="text-3xl font-bold   font-inter">
              Create Your Anon Wallet
          </h1> */}
          <div className=' bg-blue-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 border border-gray-100  rounded-md shadow-md flex  flex-col p-[2rem] items-center'>
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
                  <p className='font-inter text-3xl font-bold'>Connect your Wallet</p>
                <ConnectButton/>
                <button onClick={handleNextClick} className=" w-full self-end bg-blue-950 text-blue-400 border border-blue-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
                <span className="bg-blue-400 shadow-blue-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
         {`Next ->`}
        </button>
                </div>
                </TabsContent>
              <TabsContent value="password">
              <div className='flex flex-col items-center self-center justify-between gap-[2rem] w-full'>
              <p className='font-inter text-3xl font-bold '>Create Anon KYC Proof</p>
              {/* <LogInWithAnonAadhaar /> */}
              {anonAadhaar?.status !== "logged-in" &&
                  <LogInWithAnonAadhaar />
        }
                  {/* <p>{anonAadhaar?.status}</p> */}
                
                <div >
                </div>
                  {/* Render the proof if generated and valid */}
                  {anonAadhaar?.status === "logged-in" && (
                    <>
                      {/* <p className='text-xl text-teal-700'>KYC Proof has been generated!</p> */}
                      <div className='w-[500px] flex flex-col justify-center'>
                      <AnonAadhaarProof code={JSON.stringify(anonAadhaar.pcd, null, 2)}/>
                      </div>
                      <Button onClick={copyToClipboard} className='bg-white text-black hover:bg-white'>
                    Copy to Clipboard
                      </Button>
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
              <p className='font-inter text-3xl'>Create Anon KYC Proof</p>
                <Button onClick={() => callCreate(anonAadhaar)} className='bg-white text-black hover:bg-white'>Create Wallet</Button>
                <button onClick={handlePreviousClick} className=" w-full self-start bg-blue-950 text-blue-400 border border-blue-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
                <span className="bg-blue-400 shadow-blue-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
         {`<- Previous`}
        </button>
        
        {safeAddress && (<div className='w-full flex flex-col justify-center items-center bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100 p-[2rem] gap-[1rem]'>
        <p className='font-inter'>KYC wallet details</p>
        <Table>
  {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
  <TableHeader>
    <TableRow>
      <TableHead className="w-[50%]">ERC 4337 SAFE wallet Public address</TableHead>
      
      <TableHead className="w-[50%]">Aadhaar KYC Module</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">
      <div className='flex flex-row gap-[1rem] '>
        {safeAddress && safeAddress}
        <button onClick={() => copyTextToClipboard(safeAddress, 'Safe address copied to clipboard!')}>
                  <Clipboard/>
                </button>
                </div>
        </TableCell>
      
      <TableCell >
        <div className='flex flex-row gap-[1rem] '>
        {kycModule && kycModule}
        <button onClick={() => copyTextToClipboard(kycModule?kycModule:"", 'KYC Module copied to clipboard!')}>
                  <Clipboard/>
                </button>
                </div>
        </TableCell>
    </TableRow>
  </TableBody>
</Table>
<Button className='self-end'  onClick={() => window.open('https://app.safe.global', '_blank')}>check @Safe</Button>
</div>
)
}

                </div>
              </TabsContent>
            </Tabs>
           
          </div>
      </div>
   
  );
};

export default Home;
