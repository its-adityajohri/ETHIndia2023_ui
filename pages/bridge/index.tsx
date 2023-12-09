"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "../../lib/utils"
import { Button } from "../../components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../../components/ui/command"
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


const networks = [
  {
    value: "ethereum",
    label: "Ethereum",
  },
  {
    value: "gnosis",
    label: "Gnosis",
  },
  {
    value: "polygon",
    label: "Polygon",
  },
  {
    value: "optimism",
    label: "Optimism",
  },
  {
    value: "arbitrum one",
    label: "Arbitrum One",
  },
  {
    value: "base",
    label: "BASE",
  },
  {
    value: "linea",
    label: "Linea",
  },
  {
    value: "arbitrum nova",
    label: "Arbitrum Nova",
  },
]

const tokens = [
  {
    value: "eth",
    label: "ETH",
  },
  {
    value: "usdc",
    label: "USDC",
  },
  {
    value: "usdt",
    label: "USDT",
  },
  {
    value: "matic",
    label: "MATIC",
  },
  {
    value: "dai",
    label: "DAI",
  },
  {
    value: "hop",
    label: "HOP",
  },
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


const Home: NextPage = () => {
  const [open1, setOpen1] = React.useState(false)
  const [value1, setValue1] = React.useState("")
  const [open2, setOpen2] = React.useState(false)
  const [value2, setValue2] = React.useState("")
  const [open3, setOpen3] = React.useState(false)
  const [value3, setValue3] = React.useState("")
  return (
    <div className="bg-blue-200 h-screen w-full flex items-center flex-col">
      <div className="bg-blue-400 w-11/12 h-2/6 rounded-md shadow-md mt-10 flex items-center flex-col"> 
        <h2 className="my-5 text-xl font-bold">Token Transfer</h2>
        <div className="flex justify-around w-full">
          <div className="grid w-full max-w-sm items-center gap-1.5 ml-5">
            <Label htmlFor="from network">From Network</Label>
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
                            {token.label}
                        </CommandItem>
                        ))}
                    </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 ml-5">
            <Label htmlFor="token">Token</Label>
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
            <Input type="quantity" id="quantity" placeholder="Quantity" />
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
                        ? networks.find((network) => network.value === value3)?.label
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
            <Input type="destination wallet address" id="destination wallet address" placeholder="Destination Wallet Address" />
          </div>
        </div>
        <Button className="mt-7">Submit</Button>
      </div>
      <div className="bg-blue-400 w-11/12 h-2/5 rounded-md shadow-md mt-10 flex items-center flex-col">
        <h2 className="my-5 text-xl font-bold">Transfer History</h2>
          <Table>
            <TableCaption className="text-md text-black">A list of your past transactions</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px] text-black">Transaction No.</TableHead>
                <TableHead className="w-[400px] text-black ">Transaction ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.transactionNo}>
                  <TableCell className="font-medium ">{transaction.transactionNo}</TableCell>
                  <TableCell >{transaction.transactionID}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
      </div>
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
