import React from 'react';
import { Link } from 'react-router-dom';

const BlockExplorer: React.FC = () => {
  return (
    <div className="min-h-screen bg-bg-color text-white flex flex-col items-center justify-center">
      <div className="logo flex items-center justify-center cursor-default">
        <div className="relative p-1 rounded-full mt-20">
          <div className="absolute inset-0 rounded-full bg-[#FBCFAC] animate-pulse"></div>
          <div className="absolute inset-0 rounded-full bg-[#FBCFAC] blur-xl opacity-80"></div>
          <img
            src="/CryptoWand.jpeg"
            alt="CryptoWand Logo"
            className="relative h-40 w-40 rounded-full animate-spin-slow"
          />
        </div>
      </div>

      <div className="flex items-center justify-center space-x-8 mt-48 gap-40">
        <Link to="/ethereum">
          <img
            className="h-44 mr-4 w-auto hover:h-56 duration-500 rounded-full"
            src="/eth2.jpeg"
            alt="Ethereum"
          />
        </Link>
        <Link to="/solana">
          <img
            className="h-44 ml-4 w-auto rounded-full hover:h-56 duration-500"
            src="https://imgs.search.brave.com/vA8y8wGcYOsbDE5mHwviKnyY052sS6irnHtcp5PQQAQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdHls/ZXMucmVkZGl0bWVk/aWEuY29tL3Q1X2hj/czJuL3N0eWxlcy9j/b21tdW5pdHlJY29u/X2o3M3U0ODU2MXk2/ODEucG5n"
            alt="Solana"
          />
        </Link>
      </div>

      <div className="mt-20 flex items-center justify-center">
        <h1 className="text-2xl font-bold font-amarante text-gray-400 text-center">
          Click on the blockchain of which you want to check the balance.
        </h1>
      </div>
    </div>
  );
};

export default BlockExplorer;
