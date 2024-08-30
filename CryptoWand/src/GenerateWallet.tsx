import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Keypair } from '@solana/web3.js';
import nacl from 'tweetnacl';
import { ethers } from 'ethers';
import bs58 from "bs58";

const GenerateWallet: React.FC = () => {
  const { blockchain } = useParams<{ blockchain: string }>();
  const [wallet, setWallet] = useState<{ publicKey: string; privateKey: string } | null>(null);

  const generateSolanaWallet = () => {
    const keypair = Keypair.generate();
    const publicKey = keypair.publicKey.toString();
    const secretKey = keypair.secretKey;
    const privateKey = bs58.encode(secretKey);

    // Signing and verifying a message for demonstration
    const message = new TextEncoder().encode('hello world');
    const signature = nacl.sign.detached(message, secretKey);
    const result = nacl.sign.detached.verify(message, signature, keypair.publicKey.toBytes());

    console.log('Public Key:', publicKey);
    console.log('Private Key (Secret Key):', privateKey);
    console.log('Signature is valid:', result);

    setWallet({ publicKey, privateKey: privateKey });
  };

  const generateEthereumWallet = async () => {
    const wallet = ethers.Wallet.createRandom();
    const publicKey = wallet.address;
    const privateKey = wallet.privateKey;

    const message = 'hello world';
    const signature = await wallet.signMessage(message);
    const recoveredAddress = ethers.verifyMessage(message, signature);

    console.log('Public Key (Address):', publicKey);
    console.log('Private Key:', privateKey);
    console.log('Signature is valid:', recoveredAddress === publicKey);

    setWallet({ publicKey, privateKey });
  };

  const handleCreateNewWallet = () => {
    if (blockchain === 'solana') {
      generateSolanaWallet();
    } else if (blockchain === 'ethereum') {
      generateEthereumWallet();
    }
  };

  const handleClearWallet = () => {
    setWallet(null);
  };

  useEffect(() => {
    if (blockchain === 'solana') {
      generateSolanaWallet();
    } else if (blockchain === 'ethereum') {
      generateEthereumWallet();
    }
  }, [blockchain]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bg-color text-white">
      <h2 className="text-3xl font-uncial mb-6">Your {blockchain?.toUpperCase()} Wallet</h2>
      {wallet ? (
        <div className="bg-gray-800 p-6 rounded-lg">
          <p className="mb-4">
            <strong>Public Key:</strong> {wallet.publicKey}
          </p>
          <p className="mb-4">
            <strong>Private Key:</strong> {wallet.privateKey}
          </p>
          <p className="text-red-500">
            Please store your private key securely. Do not share it with anyone.
          </p>
          <div className="mt-6 flex space-x-4">
            <button
              onClick={handleCreateNewWallet}
              className="bg-[#FBCFAC] hover:bg-[#e6b8aa] px-4 py-2 rounded-lg font-amarante font-bold text-xl text-gray-900"
            >
              Create New Wallet
            </button>
            <button
              onClick={handleClearWallet}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-amarante font-bold text-xl text-white"
            >
              Clear Wallet
            </button>
          </div>
        </div>
      ) : (
        <p>Generating your wallet...</p>
      )}
    </div>
  );
};

export default GenerateWallet;
