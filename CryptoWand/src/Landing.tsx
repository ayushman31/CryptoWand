import React from "react";
import "./App.css";
import { Link } from "react-router-dom";

const Landing: React.FC = () => {
  return (
    <div className="landing">


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


      <div className="heading mt-2 cursor-default ">
        <h1 className="flex  place-content-center text-7xl text-white font-uncial">
          CryptoWand
        </h1>
        <p className="flex  place-content-center mt-5 text-white font-amarante">
          Let's get started with your magical journey of Crypto.
        </p>
      </div>




      <div className="btns flex place-content-center mt-40 space-x-12">
        <div className="create">
          <Link to="/create-new-wallet" className="bg-white hover:bg-gray-200 m-10 mr-36 p-5 rounded-lg font-amarante font-bold text-xl text-bg-color w-56 text-center block">
            Create New Wallet
          </Link>
        </div>

        <div className="import">
          <Link to="/" className="bg-white hover:bg-gray-200 m-10 ml-36 p-5 rounded-lg font-amarante font-bold text-xl text-bg-color w-56 text-center block">
            Import Wallet
          </Link>
        </div>
      </div>


    </div>
  );
};

export default Landing;
