import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { generateMnemonic } from 'bip39';

const GeneratePhrase: React.FC = () => {
  const { blockchain } = useParams<{ blockchain: string }>(); // Accessing the blockchain type from URL params

  const [phrase, setPhrase] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  const generatePhrase = () => {
    const mnemonic = generateMnemonic();
    setPhrase(mnemonic);
  };

  const formatPhrase = (phrase: string) => {
    const words = phrase.split(' ');
    const rows = [];

    for (let i = 0; i < words.length; i += 3) {
      rows.push(words.slice(i, i + 3));
    }

    return rows.map((row, rowIndex) => (
      <div key={rowIndex} className="flex justify-between mb-2">
        {row.map((word, index) => (
          <div key={index} className="flex items-center w-1/3">
            <span className="w-8 text-gray-400">{rowIndex * 3 + index + 1}.</span>
            <span className="ml-2">{word}</span>
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-bg-color text-white p-4">
      <h2 className="text-3xl font-uncial mb-6">Generate Your Secret Recovery Phrase</h2>

      <div className="bg-bg-color p-6 rounded-lg w-full max-w-md text-center relative">
        <p className="mb-4 font-amarante relative z-10">
          Your secret recovery phrase is crucial for accessing your wallet. It is your only way to recover your wallet if you lose access to it.
        </p>
        <p className="mb-6 font-amarante relative z-10">
          <strong>Do not share your recovery phrase with anyone.</strong> Anyone with access to your recovery phrase can access your wallet and its contents.
        </p>

        <button
          onClick={generatePhrase}
          className="bg-[#FBCFAC] hover:bg-[#e6b8aa] text-gray-900 font-bold py-2 px-4 rounded font-amarante relative z-10"
        >
          Generate Recovery Phrase
        </button>

        {phrase && (
          <div className="mt-6 p-4 bg-gray-700 rounded relative z-10">
            <div className="blur-sm hover:blur-none transition duration-300 ease-in-out">
              <p className="mb-2 font-amarante">Your recovery phrase:</p>
              <div className="text-left font-amarante">
                {formatPhrase(phrase)}
              </div>
            </div>

            {/* Display the checkbox if the user hasn't confirmed saving the phrase */}
            {!isConfirmed && (
              <div className="mt-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    onChange={() => setIsConfirmed(true)} // Set isConfirmed to true on checkbox change
                  />
                  <span className="font-amarante">
                    I have saved my recovery phrase safely.
                  </span>
                </label>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Display the "Next" button if the user has confirmed saving the phrase */}
      {isConfirmed && (
        <div className="mt-6">
          {blockchain === 'ethereum' && (
            <Link
              to="/generate-wallet/ethereum"
              className="bg-[#FBCFAC] hover:bg-[#e6b8aa] px-4 py-2 rounded-lg font-amarante font-bold text-xl text-gray-900"
            >
              Next
            </Link>
          )}
          {blockchain === 'solana' && (
            <Link
              to="/generate-wallet/solana"
              className="bg-[#FBCFAC] hover:bg-[#e6b8aa] px-4 py-2 rounded-lg font-amarante font-bold text-xl text-gray-900"
            >
              Next
            </Link>
          )}
        </div>
      )}

      <div className="mt-6">
        <Link
          to="/"
          className="bg-white hover:bg-gray-200 px-4 py-2 rounded-lg font-amarante font-bold text-xl text-gray-900"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default GeneratePhrase;
