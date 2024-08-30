import React from "react";
import { Link } from "react-router-dom";

const CreateNewWallet: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bg-color text-white">


      <div className="logo flex items-center justify-center cursor-default -mt-80">
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


      <div className="mt-20 flex flex-col items-center justify-center bg-bg-color text-white">
        <h2 className="text-3xl font-uncial mb-6">Choose Your Blockchain</h2>
        <div className="flex space-x-4 gap-10">
          <Link
            to="/generate-phrase/ethereum"
            className="bg-[#FBCFAC] hover:bg-[#e6b8aa] text-gray-900 font-bold py-2 px-4 flex place-content-center rounded w-28"
          >
            Ethereum
          </Link>
          <Link
            to="/generate-phrase/solana"
            className="bg-[#FBCFAC] hover:bg-[#e6b8aa] text-gray-900 font-bold py-2 px-4 flex place-content-center rounded w-28"
          >
            Solana
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateNewWallet;
