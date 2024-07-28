// src/utils/connectWallet.jsx
import { ethers, Contract } from "ethers";
import stakingAbi from "../ABI/stakingAbi.json";
import stakeTokenAbi from "../ABI/stakeTokenAbi.json";

export const connectWallet = async () => {
  try {
    if (window.ethereum == null) {
      throw new Error("MetaMask is not installed");
    }
    
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts'
    });
    
    const chainIdHex = await window.ethereum.request({
      method: 'eth_chainId'
    });
    
    const chainId = parseInt(chainIdHex, 16); // Convert hex to decimal
    
    const selectedAccount = accounts[0];
    if (!selectedAccount) {
      throw new Error("No Ethereum account is available");
    }
    
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const stakingContractAddress = "0x6205999fB1a3bFC2176aeB82cF4CBa6b04143174";
    const stakeTokenContractAddress = "0xD3632d4f212d9691a10593337FfB5197fCC77E2d";
    
    const stakingContract = new Contract(stakingContractAddress, stakingAbi, signer);
    const stakeTokenContract = new Contract(stakeTokenContractAddress, stakeTokenAbi, signer);

    return { provider, selectedAccount, stakingContract, stakeTokenContract, chainId };
  } catch (error) {
    console.error("Error connecting wallet:", error);
    throw error;
  }
};
