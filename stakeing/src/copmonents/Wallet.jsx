
import React, { useEffect, useState } from "react";
import { connectWallet } from '../utils/connectWallet';
import web3Context from '../context/web3Context';
import Button from "./button/Button";
import { handleAccountChange } from "../utils/handleAccountChange";
import { handleChainChange } from "../utils/handleChainChange";
import './Wallet.css';  // Import the CSS file

const Wallet = ({ children }) => {
  const [state, setState] = useState({
    provider: null,
    selectedAccount: null,
    stakingContract: null,
    stakeTokenContract: null,
    chainId: null
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleAccountChangeWrapper = () => handleAccountChange(setState);
    const handleChainChangeWrapper = () => handleChainChange(setState);

    window.ethereum.on("accountsChanged", handleAccountChangeWrapper);
    window.ethereum.on("chainChanged", handleChainChangeWrapper);

    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountChangeWrapper);
      window.ethereum.removeListener("chainChanged", handleChainChangeWrapper);
    };
  }, []);

  const handleWallet = async () => {
    try {
      setIsLoading(true);
      const { provider, selectedAccount, stakingContract, stakeTokenContract, chainId } = await connectWallet();
      console.log("provider", provider, "selectedAccount", selectedAccount, "stakingContract", stakingContract, "stakeTokenContract", stakeTokenContract, "chainId", chainId);
      setState({ provider, selectedAccount, stakingContract, stakeTokenContract, chainId });
    } catch (error) {
      console.error("Error connecting wallet", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="wallet-container">
      <web3Context.Provider value={state}>
        {children}
        <Button onClick={handleWallet} label="Connect Wallet" className="wallet-button" />
      </web3Context.Provider>
      {isLoading && <p className="wallet-loading">Loading...</p>}
    </div>
  );
};

export default Wallet;
