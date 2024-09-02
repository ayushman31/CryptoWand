import React, { useState } from "react";
import { Connection, PublicKey } from "@solana/web3.js";

const Solana: React.FC = () => {
  const [publicKey, setPublicKey] = useState<string>("");
  const [balance, setBalance] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchBalance = async () => {
    try {
      const connection = new Connection("https://docs-demo.solana-mainnet.quiknode.pro/");

      if (!publicKey) {
        throw new Error("Public key is required");
      }

      const pubKey = new PublicKey(publicKey);
      const rawBalance = await connection.getBalance(pubKey);
      const formattedBalance = (rawBalance / 1e9).toFixed(9); // Convert lamports to SOL and format it

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
          <div className="absolute inset-0 rounded-fullbg-gradient-to-r from-purple-600 via-blue-500 to-green-400 animate-pulse"></div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 via-blue-500 to-green-400 blur-xl opacity-80"></div>
          <img
            src="https://imgs.search.brave.com/vA8y8wGcYOsbDE5mHwviKnyY052sS6irnHtcp5PQQAQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdHls/ZXMucmVkZGl0bWVk/aWEuY29tL3Q1X2hj/czJuL3N0eWxlcy9j/b21tdW5pdHlJY29u/X2o3M3U0ODU2MXk2/ODEucG5n"
            alt="Ethereum Logo"
            className="relative h-40 w-40 rounded-full animate-spin-slow"
          />
        </div>
      </div>

      

        <div className="w-full max-w-md p-6 bg-gray-800 border-4 border-purple-500 rounded-2xl">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="text"
              value={publicKey}
              onChange={(e) => setPublicKey(e.target.value)}
              placeholder="Enter Solana Public Key"
              className="border border-gray-300 p-2 rounded w-full bg-black text-green-400 font-amarante"
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-600 via-blue-500 to-green-400 text-white p-2 rounded hover:bg-gradient-to-l font-amarante transition duration-300"
            >
              Check Balance
            </button>
          </form>
          <div className="mt-6 text-xl font-semibold font-amarante">
            Balance:
            {error && (
              <div className="text-red-500 mt-2 font-amarante">{error}</div>
            )}
            {balance !== null && !error && (
              <div className="ml-4 font-amarante">{balance} SOL</div>
            )}
          </div>
        </div>
      </div>
    
  );
};

export default Solana;
