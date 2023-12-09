import React, { useEffect } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'


import Link from 'next/link';
import { useState } from 'react';
import { useAccount } from 'wagmi';
import {useIsMounted} from '../hooks/useIsMounted'

function Nav() {
  const {isConnected,address} = useAccount();
  const mounted = useIsMounted();



  return (
    <div className='flex flex-row justify-between h-[90px] items-center p-[10px] bg-blue-200 shadow-lg'>
     <Link href="/"> 

<div className='flex flex-row items-center'>
       <img src="/logonobg.png" className='h-[120px]'/>
       <div>
        <p className='font-inter '>Decimal Wallet</p>
        <p className='font-inter text-[13px]'>KYC, Non-custodial & 4337 compliant</p>
        </div>
        </div>
      
      </Link>   
        <div className='flex flex-row gap-[1rem]   '>
        
         
        {/* <ConnectButton chainStatus="icon"/> */}
        </div>
    </div>
  )
}

export default Nav;