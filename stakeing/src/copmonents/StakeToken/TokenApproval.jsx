
import React, { useContext, useRef, useState } from 'react';  
import { ethers } from 'ethers';
import web3Context from '../../context/web3Context';
import Button from '../button/Button';
import './TokenApproval.css'; // Import the CSS file

const TokenApproval = () => {
  const { stakeTokenContract, stakingContract } = useContext(web3Context); 
  const approvedTokenRef = useRef();
  const [transactionStatus, setTransactionStatus] = useState("");

  const approveToken = async (e) => {
    e.preventDefault();

    const amount = approvedTokenRef.current.value.trim();
    if (isNaN(amount) || amount <= 0) {
      console.error('Please enter a valid positive number');
      return;
    }
    const amountToSend = ethers.parseUnits(amount, 18).toString();

    console.log('stakeTokenContract:', stakeTokenContract);
    console.log('stakingContract:', stakingContract);

    if (!stakeTokenContract) {
      console.error('Stake token contract is not defined');
      return;
    }

    if (!stakingContract || !stakingContract.target) {
      console.error('Staking contract or target address is not defined');
      return;
    }

    try {
      const targetAddress = stakingContract.target; 
      const transaction = await stakeTokenContract.approve(targetAddress, amountToSend);
      setTransactionStatus("Transaction is pending....");
      
      const receipt = await transaction.wait();
      if (receipt.status === 1) {
        setTransactionStatus("Transaction is Successful");
        setTimeout(() => {
          setTransactionStatus("");
        }, 5000);
        approvedTokenRef.current.value = "";
      } else {
        setTransactionStatus("Transaction failed");
      }
    } catch (error) {
      console.error('Token Approval failed', error.message);
    }
  };

  return (
    <div className="token-approval-container">
      <form onSubmit={approveToken} className="token-approval-form">
        <label htmlFor="amount">Token Approval:</label>
        <input
          id="amount"
          type="text"
          ref={approvedTokenRef}
          className="token-approval-input"
        />
        <Button
          onClick={approveToken}
          type="submit"
          label="Token Approve"
          className="token-approval-button"
        />
      </form>
      {transactionStatus && <div className="token-approval-status">{transactionStatus}</div>}
    </div>
  );
};

export default TokenApproval;
