
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div  >
    

     
            <div className="bg-gray-100 dark:bg-transparent h-[100rem]">
                <div className="container mx-auto flex flex-col items-center py-12 sm:py-24">
                    <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col  mb-5 sm:mb-10">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-gray-800 dark:text-white font-black leading-7 md:leading-10">
                           Decimal 
                            <span className="text-indigo-700"></span>
                            
                        </h1>
                        <p className="mt-5 sm:mt-10 lg:w-10/12 text-gray-400 font-normal text-center text-sm sm:text-lg">Anon Aadhaar Safe Wallets & Efficient Bridges</p>
                    </div>
                    <div className="flex justify-center items-center">
                        <Link href="/anon" className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-blue-400 transition duration-150 ease-in-out hover:bg-blue-400 lg:text-xl lg:font-bold  rounded text-white px-4 sm:px-10 border border-indigo-700 py-2 sm:py-4 text-sm">Anon Wallet</Link>
                        <Link href="/bridge" className="ml-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-transparent transition duration-150 ease-in-out hover:border-indigo-600 lg:text-xl lg:font-bold  hover:text-indigo-600 rounded border border-indigo-700 text-indigo-700 px-4 sm:px-10 py-2 sm:py-4 text-sm">Bridge</Link>
                    </div>
                </div>
            </div>
        



      

      

        


    
    </div>
  );
};

export default Home;
