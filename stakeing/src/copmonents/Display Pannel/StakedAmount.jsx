import React, { useContext, useRef, useState } from 'react';  
import { ethers } from 'ethers';
import web3Context from '../../context/web3Context';
import Button from '../button/Button';
import StakingContext from '../../context/StakingContext';
import './StakeAmount.css';  // Import the CSS file

const StakeAmount = () => {
  const { stakingContract } = useContext(web3Context); 
  const stakeAmountRef = useRef();
  const [transactionStatus, setTransactionStatus] = useState("");
  const { isReload, setIsReload } = useContext(StakingContext);

  const stakeToken = async (e) => {
    e.preventDefault();
    const amount = stakeAmountRef.current.value.trim();
    if (isNaN(amount) || amount <= 0) {
      console.error('Please enter a valid positive number');
      return;
    }
    const amountToStake = ethers.parseUnits(amount, 18).toString();
    console.log('stakingContract:', stakingContract);

    if (!stakingContract || !stakingContract.target) {
      console.error('Staking contract or target address is not defined');
      return;
    }

    try {
      const targetAddress = stakingContract.target; 
      const transaction = await stakingContract.stake(amountToStake);
      setTransactionStatus("Transaction is pending....");
      
      const receipt = await transaction.wait();
      if (receipt.status === 1) {
        setTransactionStatus("Transaction is Successful");
        setIsReload(!isReload);
        setTimeout(() => {
          setTransactionStatus("");
        }, 5000);
        stakeAmountRef.current.value = "";
      } else {
        setTransactionStatus("Transaction failed");
      }
    } catch (error) {
      console.error('Staking failed', error.message);
      setTransactionStatus("Transaction failed");
    }
  }

  return (
    <div className="stake-container">
      <form onSubmit={stakeToken}>
        <input type="text" ref={stakeAmountRef} />
        <Button onClick={stakeToken} type="submit" label="Stake Token" />
      </form>
      {transactionStatus && (
        <div
          className={`transaction-status ${
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

export default StakeAmount;
