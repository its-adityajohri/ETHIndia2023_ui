/* eslint-disable @next/next/no-img-element */

import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import imgLogo from '../../assets/logo.jpg';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"


const Wallet: NextPage = () => {
  return (
    <div className="bg-slate-100 h-screen w-full flex items-center flex-col">
        <div className="flex mt-10">
          <img className="flex-shrink-0 w-8 h-8  mr-5" src={imgLogo} alt=""/>
          <h1 className="flex-shrink-0  mr-5 text-3xl font-bold">Anon Decimal Wallet</h1>
          {/* <img class="w-64 h-64" src="../../assets/anon_decimal_wallet_logo.png" alt="Description of the image"> */}
        </div>
        <div className="mt-6 bg-white w-2/3 h-3/4 shadow-lg rounded-lg"> 
            <div className="w-full top-0 h-20 shadow-lg flex justify-around items-center">
              <p>test1</p>
              <p>test2</p>
              <p>test3</p>
            </div>
        </div>
    </div>
  );
};

export default Wallet;
