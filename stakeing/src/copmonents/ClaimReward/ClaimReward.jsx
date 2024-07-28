// ClaimReward.jsx
import React, { useContext, useState } from 'react';
import { ethers } from 'ethers';
import web3Context from '../../context/web3Context';
import Button from '../button/Button';
import './ClaimReward.css';  // Import the CSS file

const ClaimReward = () => {
  const { stakingContract } = useContext(web3Context); 
  const [transactionStatus, setTransactionStatus] = useState("");

  const claimReward = async (e) => {
    e.preventDefault();
    if (!stakingContract || !stakingContract.target) {
      console.error('Staking contract or target address is not defined');
      return;
    }

    try {
      const transaction = await stakingContract.claimReward(); 
      setTransactionStatus("Transaction is pending....");
      
      const receipt = await transaction.wait();
      if (receipt.status === 1) {
        setTransactionStatus("Transaction is Successful");
        setTimeout(() => {
          setTransactionStatus("");
        }, 5000);
      } else {
        setTransactionStatus("Transaction failed");
      }
    } catch (error) {
      console.error('Claiming reward failed', error.message);
      setTransactionStatus("Error occurred while claiming reward");
    }
  }

  return (
    <div className="claim-reward-container">
      <form onSubmit={claimReward}>
        <Button onClick={claimReward} type="submit" label="Claim Reward" />
      </form>
      {transactionStatus && (
        <div
          className={`claim-reward-status ${
            transactionStatus.includes('pending')
              ? 'pending'
              : transactionStatus.includes('Successful')
              ? 'success'
              : 'failed'
          }`}
        >
          {transactionStatus}
        </div>
      )}
    </div>
  );
}

export default ClaimReward;
