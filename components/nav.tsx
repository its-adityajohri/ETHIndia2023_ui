import React, { useEffect } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'



import Link from 'next/link';
import { useState } from 'react';
import { useAccount } from 'wagmi';
import {useIsMounted} from '../hooks/useIsMounted'
import { useRouter } from 'next/router';
function Nav() {
  const {isConnected,address} = useAccount();
  const mounted = useIsMounted();
  const router = useRouter();


  return (
    <div className='flex flex-row justify-between h-[120px] items-center px-[10px] py-[20px] bg-blue-200 shadow-lg'>
     <Link href="/"> 

     {router.pathname === '/bridge' ? (
           <div className='flex flex-row justify-center items-center'>
              <img src="/bridgelogo.png" className='h-[160px]' alt="Bridge Logo" />
              <div>
                <p className='font-inter text-3xl font-bold'>Decimal Bridge</p>
                <p className='font-inter text-xl font-bold text-[13px]'>Faster, cheaper and more secure</p>
              </div>
            </div>
          ) : (
            <div className='flex flex-row justify-center items-center'>
              <img src="/logonobg.png" className='h-[160px]' alt="Decimal Wallet Logo" />
              <div>
                <p className='font-inter text-3xl font-bold'>Decimal Wallet</p>
                <p className='font-inter text-xl font-bold text-[13px]'>KYC, Non-custodial & 4337 compliant</p>
              </div>
            </div>
          )}
      
      </Link>   
        <div className='flex flex-row gap-[1rem]   '>
        
         
        {/* <ConnectButton chainStatus="icon"/> */}
        </div>
    </div>
  )
}

export default Nav;