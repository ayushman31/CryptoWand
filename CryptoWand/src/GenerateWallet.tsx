import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { mnemonicToSeed } from 'bip39';
import { Keypair } from '@solana/web3.js';
import nacl from 'tweetnacl';
import { ethers, HDNodeWallet, Wallet } from 'ethers';
import bs58 from 'bs58';
import { derivePath } from 'ed25519-hd-key';

const GenerateWallet: React.FC = () => {
  const { blockchain } = useParams<{ blockchain: string }>();
  const [wallets, setWallets] = useState<Array<{ publicKey: string; privateKey: string }>>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const mnemonic = localStorage.getItem('mnemonic') || ''; // Retrieving the mnemonic from localStorage

  useEffect(() => {
    console.log("Mnemonic being used:", mnemonic); // Debugging: Ensure the mnemonic is different
  }, [mnemonic]);

  const generateSolanaWallet = async () => {
    const seed = await mnemonicToSeed(mnemonic);
    console.log("Seed generated for Solana:", seed.toString('hex')); // Debugging: Check the seed
    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString('hex')).key;
    console.log("Derived seed for Solana path:", derivedSeed.toString('hex')); // Debugging: Check the derived seed
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);
    const publicKey = keypair.publicKey.toString();
    const privateKey = bs58.encode(secret);

    setWallets([...wallets, { publicKey, privateKey }]);
    setCurrentIndex(currentIndex + 1); // Incrementing the index to generate a new wallet
  };

  const generateEthereumWallet = async () => {
    const seed = await mnemonicToSeed(mnemonic);
    console.log("Seed generated for Ethereum:", seed.toString('hex')); // Debugging: Check the seed
    const derivationPath = `m/44'/60'/0'/0/${currentIndex}`;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(derivationPath);
    const privateKey = child.privateKey;
    const wallet = new Wallet(privateKey);

    setWallets([...wallets, { publicKey: wallet.address, privateKey }]);
    setCurrentIndex(currentIndex + 1); // Incrementing the index to generate a new wallet
  };

  const handleCreateNewWallet = () => {
    if (blockchain === 'solana') {
      generateSolanaWallet();
    } else if (blockchain === 'ethereum') {
      generateEthereumWallet();
    }
  };

  const handleClearWallets = () => {
    setWallets([]);
    setCurrentIndex(0);
  };

  useEffect(() => {
    // Generate the first wallet on component mount
    handleCreateNewWallet();
  }, [blockchain]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bg-color text-white">
      <h2 className="text-3xl font-uncial mb-6">Your {blockchain?.toUpperCase()} Wallets</h2>
      <div className="mt-6 flex space-x-4 mb-4 ">
        <button
          onClick={handleCreateNewWallet}
          className="bg-[#FBCFAC] hover:bg-[#e6b8aa] px-4 py-2 rounded-lg font-amarante font-bold text-xl text-gray-900"
        >
          Create New Wallet
        </button>
        <button
          onClick={handleClearWallets}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-amarante font-bold text-xl text-white"
        >
          Clear Wallets
        </button>
      </div>
      {wallets.length > 0 ? (
        <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
          {wallets.map((wallet, index) => (
            <div key={index} className="mb-4 ">
              <div className='overflow-hidden hover:overflow-auto'>
              <p className="break-words">
                <strong>Wallet {index + 1}</strong>
              </p>
              <p className="break-words">
                <strong>Public Key:</strong> {wallet.publicKey}
              </p>
              <p className="">
                <strong>Private Key:</strong> {wallet.privateKey}
              </p>
              </div>
              <hr className="my-4 border-gray-600" />
            </div>
          ))}
          <p className="text-red-500">
            Please store your private keys securely. Do not share them with anyone.
          </p>
        </div>
      ) : (
        <p>Generating your wallet...</p>
      )}
      
    </div>
  );
};

export default GenerateWallet;
