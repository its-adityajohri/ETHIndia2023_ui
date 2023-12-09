/* eslint-disable @next/next/no-img-element */

import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import React from 'react';
import { cn } from "../../lib/utils"
import Link from 'next/link';
// import { Icons } from "../../components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../../components/ui/navigation-menu"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

const networks: { title: string }[] = [
  {
    title: "Ethereum Mainnet",
  },
  {
    title: "Linea Mainnet",
  },
  {
    title: "Mantle Mainnet",
  },
  {
    title: "Scroll",
  },
  {
    title: "Ethereum Mainnet",
  },
  {
    title: "Linea Mainnet",
  },
  {
    title: "Mantle Mainnet",
  },
  {
    title: "Scroll",
  },
  {
    title: "Ethereum Mainnet",
  },
  {
    title: "Linea Mainnet",
  },
  {
    title: "Mantle Mainnet",
  },
  {
    title: "Scroll",
  },

]
const accounts: { id: string, address: string }[] = [
  {
    id: "1",
    address: "0x1aa...aa"
  },
  {
    id: "2",
    address: "0x2aa...aa"
  },
  {
    id: "3",
    address: "0x3aa...aa"
  },
  {
    id: "4",
    address: "0x4aa...aa"
  },
  {
    id: "1",
    address: "0x1aa...aa"
  },
  {
    id: "2",
    address: "0x2aa...aa"
  },
  {
    id: "3",
    address: "0x3aa...aa"
  },
  {
    id: "4",
    address: "0x4aa...aa"
  },
  {
    id: "1",
    address: "0x1aa...aa"
  },
  {
    id: "2",
    address: "0x2aa...aa"
  },
  {
    id: "3",
    address: "0x3aa...aa"
  },
  {
    id: "4",
    address: "0x4aa...aa"
  },

]

const Wallet: NextPage = () => {
  return (
    <div className="bg-slate-100 h-screen w-full flex items-center flex-col">
        <div className="flex mt-10">
          <img className="flex-shrink-0 w-8 h-8  mr-5" src="/logo.jpg" alt=""/>
          <h1 className="flex-shrink-0  mr-5 text-3xl font-bold">Anon Decimal Wallet</h1>
          {/* <img class="w-64 h-64" src="../../assets/anon_decimal_wallet_logo.png" alt="Description of the image"> */}
        </div>
        <div className="mt-6 bg-white w-2/3 h-3/4 shadow-lg rounded-lg"> 
            <div className="w-full top-0 h-20 shadow-lg flex justify-around items-center">
              
            </div>
        </div>
    </div>
  );
};
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
export default Wallet;
