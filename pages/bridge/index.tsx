import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "../../lib/utils"
import { Button } from "../../components/ui/button"
import {BRIDGEARBSEPADDR, BRIDGEABI,BRIDGECELOADDR,BRIDGEETHSEPADDR,TOKENABI,TOKENARBSEPADDR,TOKENCELOADDR,TOKENETHSEPADDR} from '../../lib/contracts'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../../components/ui/command"
import { formatUnits } from "ethers"
import Link from "next/link"
import { ethers } from "ethers"
import { useEffect } from "react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table"
import { usePrepareContractWrite,useContractWrite ,useWaitForTransaction,useContractRead} from "wagmi"
import {MyToken__factory, MyToken} from "../../lib/typechain-types"
const networks = [
  {
    value: "celo",
    label: "Celo Testnet",
    logosrc: "/celo.jpeg",
    chainid: "44787",
    bridge: BRIDGECELOADDR,
    token: TOKENCELOADDR,
    baseurl: "https://alfajores.celoscan.io"
  },
  {
    value: "arbsep",
    label: "Arb Sepolia Testnet",
    logosrc: "/arbitrumone.svg",
    chainid: "421614",
    bridge: BRIDGEARBSEPADDR,
    token: TOKENARBSEPADDR,
    baseurl: "https://sepolia.arbiscan.io"
  },
  {
    value: "ethsep",
    label: "Sepolia Testnet",
    logosrc: "/ethereum.svg",
    chainid: "11155111",
    bridge: BRIDGEETHSEPADDR,
    token: TOKENETHSEPADDR,
    baseurl: "https://sepolia.etherscan.io"
  
  },
  // {
  //   value: "ethereum",
  //   label: "Ethereum",
  //   logosrc: "/ethereum.svg",

  // },
  // {
  //   value: "base",
  //   label: "BASE",
  //   logosrc: "/base.svg",

  // },
  
  
  
  // {
  //   value: "scroll",
  //   label: "Scroll",
  //   logosrc: "/scroll.png",
    
  // },
  // {
  //   value: "zeta",
  //   label: "Zeta",
  //   logosrc: "/zeta.jpg",
    
  // },
  // {
  //   value: "polygon",
  //   label: "Polygon",
  //   logosrc: "/polygon.svg",

  // },
  // {
  //   value: "xdc",
  //   label: "XDC Network",
  //   logosrc: "/xdc.png",
    
  // },
  // {
  //   value: "arbitrum nova",
  //   label: "Arbitrum Nova",
  //   logosrc: "/arbitrumnova.svg",
    
  // },
]

const tokens = [
  {
    value: "decimal token",
    label: "Decimal Token",
    logosrc: "/logonobg.png",
  },
  // {
  //   value: "eth",
  //   label: "ETH",
  //   logosrc: "/ethereum.svg",
  // },
  // {
  //   value: "usdc",
  //   label: "USDC",
  //   logosrc: "/usdc.svg",
  // },
  // {
  //   value: "usdt",
  //   label: "USDT",
  //   logosrc: "/usdt.svg",
  // },
  // {
  //   value: "matic",
  //   label: "MATIC",
  //   logosrc: "/matic.svg",
  // },
  // {
  //   value: "dai",
  //   label: "DAI",
  //   logosrc: "/dai.svg",
  // },
  // {
  //   value: "hop",
  //   label: "HOP",
  //   logosrc: "/hop.svg",
  // },
]

const transactions = [
  {
    transactionNo: 4,
    transactionID: "0x82u392u4ou",
  },
  {
    transactionNo: 3,
    transactionID: "0x82u392u4ou",
  },
  {
    transactionNo: 2,
    transactionID: "0x82u392u4ou",
  },
  {
    transactionNo: 1,
    transactionID: "0x82u392u4ou",
  },
  
]

import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useToast } from "../../components/ui/use-toast"
import { useAccount } from "wagmi"
const Home: NextPage = () => {
  const [open1, setOpen1] = React.useState(false)
  const [value1, setValue1] = React.useState("")
  const [open2, setOpen2] = React.useState(false)
  const [value2, setValue2] = React.useState("")
  const [open3, setOpen3] = React.useState(false)
  const [value3, setValue3] = React.useState("")
  const [input1, setInput1] = React.useState("");
  const [input2, setInput2] = React.useState("");
  const [bridgeAddress, setBridgeAddress] = React.useState(null);
  const [tokenAddress, setTokenAddress] = React.useState(null);
  const [fromChainId, setFromChainId] = React.useState(null);
  const [baseFromUrl, setBaseFromUrl] = React.useState(null);
  const [baseToUrl, setBaseToUrl] = React.useState(null);
  const [toChainId, setToChainId] = React.useState(null);
  const [fromTx,setFromTx] = React.useState(null);
  const [toTx,setToTx] = React.useState(null);
  const [currentAllowance,setCurrentAllowance] = React.useState(null);
  const [allowFlag,setAllowFlag] = React.useState(false);
  const {toast} = useToast();
  const {isConnected,address} = useAccount();
  React.useEffect(() => {
    if (value1 === value3) {
      setValue3(""); // Reset the destination network
    }
  }, [value1, value3]);
  const destinationNetworks = networks.filter(network => network.value !== value1);
  //contract part starts

 
  //token approval 
  

   // corresponding bridge or token addr
   useEffect(() => {
    const selectedNetwork = networks.find(network => network.value === value1);
    const selectedToNetwork = networks.find(network => network.value === value3);
    if (selectedNetwork) {
      // @ts-ignore 
      setBridgeAddress(selectedNetwork.bridge);
         // @ts-ignore 
      setTokenAddress(selectedNetwork.token);
         // @ts-ignore 
      setFromChainId(selectedNetwork.chainid)
        // @ts-ignore 
        setBaseFromUrl(selectedNetwork.baseurl)
     
    }
    if (selectedToNetwork) {
   
        // @ts-ignore 
        setToChainId(selectedToNetwork.chainid)
          // @ts-ignore 
          setBaseToUrl(selectedToNetwork.baseurl)
    }
  }, [value1,value3]);

  const { data, isError:isErrorRead, isLoading:isLoadingRead } = useContractRead({
    address: tokenAddress?tokenAddress:"0xadssw",
    abi: TOKENABI,
    functionName: 'allowance',
    args: [`${address}`,`${bridgeAddress}`],
    onSuccess(data) {
      // @ts-ignore 
      console.log('reading allowance',formatUnits(data, 18))
       // @ts-ignore 
      setCurrentAllowance(formatUnits(data, 18))
  },
  onError(error) {
      console.error(`Error while reading allowance:`, error);
  }
  })

  const { config: configapproval, error: errorapproval } =
    usePrepareContractWrite({
     
      address: tokenAddress?tokenAddress:"0xadssw",
      abi: TOKENABI,
      functionName: "approve",
      args: [
        bridgeAddress?bridgeAddress:"0xadssw",
        input1
          ? ethers.parseEther(`${input1}`)
          : ethers.parseEther(`0.1`),
      ],
      enabled: Boolean(input1) && Boolean(bridgeAddress) && Boolean(tokenAddress),
      onSuccess(data) {
      console.log("success allowance contract set",data)
      },
      onError(error) {
   console.log("error with approval contract call",error)
        // toast({
        //   title: "KYC wallet creation underway",
        //   description: "Accept the 3 transactions to create your KYC Safe Wallet",
        // })
      
      },
    });
  const { write: writeapproval, data: dataapproval } =
    useContractWrite(configapproval);
  const { isSuccess: isSuccessApprove, isError: isError} =
    useWaitForTransaction({
      confirmations: 3,
      hash: dataapproval?.hash,
      onError(error) {
        console.log('Error in approval', error)
      },
    });

    //bridge function call
    const { config: configbridge, error: errorbridge } =
    usePrepareContractWrite({
      // @ts-ignore 
      address: bridgeAddress,
      abi: BRIDGEABI,
      functionName: "bridgeToken",
      args: [
        `${toChainId}`, `${tokenAddress}`,`${input2}`,
        input1
          ? ethers.parseEther(`${input1}`)
          : ethers.parseEther(`0`),
      ],
      enabled: Boolean(input1)  && Boolean(input2) && Boolean(allowFlag),
      onSuccess(data) {
      console.log("success bridge token  contract set",data)
      },
      onError(error) {
   console.log('bridge error',error)
        // toast({
        //   title: "KYC wallet creation underway",
        //   description: "Accept the 3 transactions to create your KYC Safe Wallet",
        // })
      
      },
    });
  const { write: writebridge, data: databridge } =
    useContractWrite(configbridge);
  const { isSuccess: isSuccessBridge, isError: isErrorBridge} =
    useWaitForTransaction({
      confirmations: 3,
      hash: databridge?.hash,
      onError(error) {
        console.log('Error in bridging confirmations', error)
      },
    });


  //contract part ends

  const handleSubmit = async () => {
    console.log(value1, value2, value3, input1, input2);

    toast({
      title: "Token Approval",
      description: "Accept Token Approval to proceed with bridging",
    });
    // // @ts-ignore 
    // await writeapproval();
    // @ts-ignore 
    if (typeof window.ethereum !== 'undefined') {
      // @ts-ignore 
    const provider = new ethers.BrowserProvider(window.ethereum);
console.log(provider)
// Request account access if needed
await provider.send('eth_requestAccounts', []);

// Set up the signer
const signer = await provider.getSigner();
// // @ts-ignore 
// const tokenAddress = tokenAddress || "0xadssw";
// // @ts-ignore 
// const bridgeAddress = bridgeAddress || "0xadssw";
const approvalAmount = input1 ? ethers.parseEther(`${input1}`) : ethers.parseEther("0.1");

// Create a new instance of the contract
// @ts-ignore 
const contract = new ethers.Contract(tokenAddress, TOKENABI, signer);
// @ts-ignore 
const contractbridge = new ethers.Contract(bridgeAddress, BRIDGEABI, signer);
// const tokenContract = MyToken__factory.connect(tokenAddress, signer);

try {

  // let allowance = await tokenContract.allowance(await signer.getAddress(), bridgeAddress);
    // Call the approve function
    const transaction = await contract.approve(bridgeAddress, approvalAmount);

    console.log('Transaction sent:', transaction.hash);

    // Wait for the transaction to be mined
    const receipt = await transaction.wait();
   
    console.log('Transaction confirmed:', receipt);
         toast({
        title: "Token Approval Successful",
        description: "Accept bridge trx to complete bridging of assets",
      });
    // setAllowFlag(true)
    //calling bridge
    // @ts-ignore 
    // await writebridge();
    const transactionbridge = await contractbridge.bridgeToken(`${toChainId}`, `${tokenAddress}`,`${input2}`,
    input1
      ? ethers.parseEther(`${input1}`)
      : ethers.parseEther(`0`));

      console.log('Transaction sent:', transactionbridge.hash);
      const receiptbridge = await transactionbridge.wait();
   
    console.log('Transaction confirmed:', receiptbridge);

     //  @ts-ignore 
     setFromTx(`${baseFromUrl}/tx/${transactionbridge.hash}`)
     //  @ts-ignore 
     setToTx(`${baseToUrl}/address/${input2}#tokentxns`)

     toast({
      title: "Bridging Successful",
      description: "Track your trxs with the links displayed",
    });
} catch (error) {
    console.error('Error with approval contract call', error);
    // Handle errors, e.g., show a toast
}

}   
    
    
  };

  // React.useEffect(() => {

  //    const bridge =  async () => {
  //     // @ts-ignore 
  //     await writebridge();

  //    }
  //   if (isSuccessApprove && !isSuccessBridge) {
  //     toast({
  //       title: "Token Approval Successful",
  //       description: "Accept bridge trx to compelte bridging of assets",
  //     });
  //       bridge();
        
      
  //   }
  // }, [isSuccessApprove]);

  React.useEffect(() => {

   
   if (isSuccessBridge) {
      //  @ts-ignore 
       setFromTx(`${baseFromUrl}/tx/${databridge?.hash}`)
       //  @ts-ignore 
       setToTx(`${baseToUrl}/address/${input2}#tokentxns`)

       toast({
        title: "Bridging Successful",
        description: "Track your trxs with the links displayed",
      });
     
   }
 }, [isSuccessBridge]);

//  React.useEffect(() => {

   
//   if (currentAllowance) {
   
//     // @ts-ignore 
//     if(currentAllowance >= input1)
//      {
//     //   toast({
//     //    title: "Allowance has increased",
//     //    description: "ready to bridge",
//     //  });

//      setAllowFlag(true)
//      console.log('allow flag changed to true')

//     } else
//     {
//       setAllowFlag(false)
//       console.log('allow flag changed to false')
//     }
    
//   }
// }, [currentAllowance,input1,isSuccessApprove]);

 
  


  return (
    <div className="bg-blue-200 h-screen w-full flex items-center flex-col">
      <div className="bg-blue-400 w-11/12  p-[1rem] gap-[1rem] rounded-md shadow-md mt-10 flex items-center flex-col"> 
        <h2 className=" text-xl font-bold">Token Transfer</h2>
        <div className="flex flex-col md:flex-row justify-around w-full">
          <div className="grid w-full max-w-sm items-center gap-1.5 ml-5">
            <Label htmlFor="token">Token</Label>
            <Popover open={open2} onOpenChange={setOpen2}>
                <PopoverTrigger asChild>
                    <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open2}
                    className="w-[200px] justify-between"
                    >
                    {value2
                        ? tokens.find((token) => token.value === value2)?.label
                        : "Select Token..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                    <CommandInput placeholder="Search Token..." />
                    <CommandEmpty>No Token found.</CommandEmpty>
                    <CommandGroup>
                        {tokens.map((token) => (
                        <CommandItem
                            key={token.value}
                            value={token.value}
                            onSelect={(currentValue) => {
                            setValue2(currentValue === value2 ? "" : currentValue)
                            setOpen2(false)
                            }}
                        >
                            <Check
                            className={cn(
                                "mr-2 h-4 w-4",
                                value2 === token.value ? "opacity-100" : "opacity-0"
                            )}
                            />
                            <img src={token.logosrc} className='h-[35px] mr-5'/>
                            {token.label} 
                        </CommandItem>
                        ))}
                    </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 ml-5">
            <Label htmlFor="from Network">from Network</Label>
            <Popover open={open1} onOpenChange={setOpen1}>
                <PopoverTrigger asChild>
                    <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open1}
                    className="w-[200px] justify-between"
                    >
                    {value1
                        ? networks.find((network) => network.value === value1)?.label
                        : "Select Network..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                    <CommandInput placeholder="Search Network..." />
                    <CommandEmpty>No Network found.</CommandEmpty>
                    <CommandGroup>
                        {networks.map((network) => (
                        <CommandItem
                            key={network.value}
                            value={network.value}
                            onSelect={(currentValue) => {
                            setValue1(currentValue === value1 ? "" : currentValue)
                            setOpen1(false)
                            }}
                        >
                            <Check
                            className={cn(
                                "mr-2 h-4 w-4",
                                value1 === network.value ? "opacity-100" : "opacity-0"
                            )}
                            />
                            <img src={network.logosrc} className='h-[35px] mr-5'/>
                            {network.label}
                        </CommandItem>
                        ))}
                    </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
          </div>
          
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="quantity">Quantity</Label>
            <Input type="quantity" id="quantity" placeholder="Quantity" value={input1} onChange={(e) => setInput1(e.target.value)} />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 ml-10">
      <Label htmlFor="destination network">Destination Network</Label>
      <Popover open={open3} onOpenChange={setOpen3}>
          <PopoverTrigger asChild>
              <Button
              variant="outline"
              role="combobox"
              aria-expanded={open3}
              className="w-[200px] justify-between"
              >
              {value3
                  ? destinationNetworks.find((network) => network.value === value3)?.label
                  : "Select Network..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
              <Command>
              <CommandInput placeholder="Search Network..." />
              <CommandEmpty>No Network found.</CommandEmpty>
              <CommandGroup>
                  {destinationNetworks.map((network) => (
                  <CommandItem
                      key={network.value}
                      value={network.value}
                      onSelect={(currentValue) => {
                      setValue3(currentValue === value3 ? "" : currentValue)
                      setOpen3(false)
                      }}
                  >
                      <Check
                      className={cn(
                          "mr-2 h-4 w-4",
                          value3 === network.value ? "opacity-100" : "opacity-0"
                      )}
                      />
                      <img src={network.logosrc} className='h-[35px] mr-5'/>
                      {network.label}
                  </CommandItem>
                  ))}
              </CommandGroup>
              </Command>
          </PopoverContent>
      </Popover>
    </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mr-5">
            <Label htmlFor="destination wallet address">Destination Wallet Address</Label>
            <Input type="destination wallet address" id="destination wallet address" placeholder="Destination Wallet Address" value={input2}  onChange={(e) => setInput2(e.target.value)}/>
          </div>
        </div>
        <Button className="mt-7 text-xl" onClick={handleSubmit}>Bridge</Button>
      </div>
      {toTx && 
      <div className="bg-blue-400 w-11/12 h-2/5 rounded-md shadow-md mt-10 flex items-center flex-col">
        <h2 className="my-5 text-xl font-bold">Transaction Status</h2>
          <Table>
            {/* <TableCaption className="text-md text-black">A list of your past transactions</TableCaption> */}
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px] text-black">link to transaction from source chain</TableHead>
                <TableHead className="w-[400px] text-black ">link to destination address changes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* {transactions.map((transaction) => (
                <TableRow key={transaction.transactionNo}>
                  <TableCell className="font-medium ">{transaction.transactionNo}</TableCell>
                  <TableCell >{transaction.transactionID}</TableCell>
                </TableRow>
              ))} */}
              <TableRow>
              <TableCell className="font-medium ">
                <Link href = {`${fromTx}`} target="_blank">
                {fromTx && fromTx}
                </Link>
                </TableCell>
                  <TableCell > 
                    <Link href = {`${toTx}`} target="_blank">
                {toTx && toTx}
                </Link>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
      </div>
      }
    </div>
  );
};

export default Home



// const Home: NextPage = () => {
//   return (
//     <div >
//       <h1 className="text-3xl font-bold underline">
//         Bridge
//       </h1>
//     </div>
//   );
// };

// export default Home;
