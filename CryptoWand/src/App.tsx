import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Landing from './Landing';
import CreateNewWallet from './CreateNewWallet';
import GeneratePhrase from './GeneratePhrase';
import GenerateWallet from './GenerateWallet';
import BlockExplorer from './BlockExplorer';
import Solana from './Solana';
import Ethereum from './Ethereum';

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/create-new-wallet",
    element: <CreateNewWallet />,
  },
  {
    path: "/generate-phrase/:blockchain", // Add :blockchain to the path
    element: <GeneratePhrase />,
  },
  {
    path: "/generate-wallet/:blockchain", // Add :blockchain to the path
    element: <GenerateWallet />,
  },
  {
    path: "/block-explorer",
    element: <BlockExplorer />
  },
  {
    path: "/solana",
    element: <Solana />
  },
  {
    path: "/ethereum",
    element: <Ethereum />
  }
]);

const App: React.FC = () => {
  return (
    <div className='bg-bg-color h-screen'>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default App;
