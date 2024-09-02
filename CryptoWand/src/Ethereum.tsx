import React, { useState } from "react";
import { Alchemy, Utils } from "alchemy-sdk";

const Ethereum: React.FC = () => {
  const [publicKey, setPublicKey] = useState<string>("");
  const [balance, setBalance] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchBalance = async () => {
    try {
      const apiKey = ""; 
      const settings = {
        apiKey: apiKey,
      };

      const alchemy = new Alchemy(settings);

      if (!publicKey) {
        throw new Error("Public key is required");
      }

      let resolvedAddress: string = publicKey;

      // Check if the publicKey is an ENS name (basic check)
      if (publicKey.includes(".eth")) {
        const resolved = await alchemy.core.resolveName(publicKey);
        if (resolved) {
          resolvedAddress = resolved;
        } else {
          throw new Error("ENS name could not be resolved");
        }
      }

      const rawBalance = await alchemy.core.getBalance(resolvedAddress, "latest");
      const formattedBalance = Utils.formatEther(rawBalance);

      setBalance(formattedBalance);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(`Failed to fetch balance: ${err.message}`);
      } else {
        setError(`Failed to fetch balance: ${String(err)}`);
      }
      setBalance(null);
      console.error("Error fetching balance:", err);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBalance();
  };

  return (
    <div className="min-h-screen bg-bg-color text-white flex flex-col items-center p-4">
      

      <div className="logo flex items-center justify-center cursor-default mb-20">
        <div className="relative p-1 rounded-full mt-20">
          <div className="absolute inset-0 rounded-full bg-[#FBCFAC] animate-pulse"></div>
          <div className="absolute inset-0 rounded-full bg-[#FBCFAC] blur-xl opacity-80"></div>
          <img
            src="/eth2.jpeg"
            alt="Ethereum Logo"
            className="relative h-40 w-40 rounded-full animate-spin-slow"
          />
        </div>
      </div>



        <div className="w-full max-w-md p-6 bg-bg-color border-4 border-[#FBCFAC] rounded-2xl">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="text"
              value={publicKey}
              onChange={(e) => setPublicKey(e.target.value)}
              placeholder="Enter Ethereum Public Key"
              className="bg-[#FBCFAC] hover:bg-[#e6b8aa] px-4 py-2 rounded-lg font-amarante  text-l text-gray-100"
              required
            />
            <button
              type="submit"
              className="bg-[#FBCFAC] hover:bg-[#e6b8aa] px-4 py-2 rounded-lg font-amarante font-bold text-xl text-gray-900 "
            >
              Check Balance
            </button>
          </form>
          <div className="mt-6 text-xl font-semibold font-amarante">
            Balance:
            {error && (
              <div className="text-red-500 mt-2 font-amarante">{error}</div>
            )}
            {balance !== null && !error && <div className="ml-4 font-amarante">{balance} ETH</div>}
          </div>
        </div>
      </div>
    
  );
};

export default Ethereum;
