import React, { useState } from 'react';
import { motion } from 'framer-motion';

type Props = {
  onWalletConnect: (address: string) => void;
  onCreateItemClicked: () => void;
};

export default function Header({
  onWalletConnect,
  onCreateItemClicked,
}: Props) {
  const [currentAccount, setCurrentAccount] = useState(null);

  const createItem = () => {
    onCreateItemClicked();
  };
  const connectWallet = async () => {
    try {
      const { ethereum } = window as any;

      if (!ethereum) {
        alert('Get MetaMask!');
        return;
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      console.log('Connected', accounts[0]);
      setCurrentAccount(accounts[0]);
      onWalletConnect(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-slate-300 sticky top-0 z-20 ">
      <header className="p-3 flex items-starts justify-between max-w-7xl mx-auto  xl:items-center ">
        <motion.div
          initial={{
            x: -500,
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            x: 0,
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1.5,
          }}
          className="flex flex-row items-center"
        >
          {currentAccount && (
            <p className="text-xs text-gray-700 ">
              Your address is: {currentAccount}
            </p>
          )}
          {!currentAccount && (
            <p className="text-xs text-gray-700 ">
              Connect your wallet to get started!
            </p>
          )}
        </motion.div>
        <motion.div
          initial={{
            x: 500,
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            x: 0,
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1.5,
          }}
        >
          {!currentAccount && (
            <button
              className="block  bg-blue-400 w-full mx-1 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:text-gray-600 focus:shadow-outline"
              onClick={connectWallet}
            >
              Connect Wallet
            </button>
          )}
          {currentAccount && (
            <button
              className="block  bg-blue-400 w-full mx-1 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:text-gray-600 focus:shadow-outline"
              onClick={createItem}
            >
              Create item
            </button>
          )}
        </motion.div>
      </header>
    </div>
  );
}