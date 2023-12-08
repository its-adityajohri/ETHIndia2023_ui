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
    <div className='flex flex-row justify-between h-[60px] items-center p-[10px] bg-opacity-20 bg-white backdrop-blur-md border border-gray-200 rounded'>
     <Link href="/"> 
{mounted?
     <h1 className=''>
       
        <p>Decimals</p>
        
      </h1>:""}
      </Link>   
        <div className='flex flex-row gap-[1rem]   '>
          {/* <div className='text-center'>credits private:{credits != null ?credits:"-"}</div> */}
         
        <ConnectButton chainStatus="icon"/>
        </div>
    </div>
  )
}

export default Nav;