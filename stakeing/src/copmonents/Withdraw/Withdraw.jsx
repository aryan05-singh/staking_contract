import React, { useContext, useRef, useState } from 'react';  
import { ethers } from 'ethers';
import web3Context from '../../context/web3Context';
import Button from '../button/Button';
import './WithdrawStakeAmount.css';

const WithdrawStakeAmount = () => {
  const { stakingContract } = useContext(web3Context); 
  const withdrawstakeAmountRef = useRef();
  const [transactionStatus, setTransactionStatus] = useState("");

  const withdrawstakeToken = async (e) => {
    e.preventDefault();
    const amount = withdrawstakeAmountRef.current.value.trim();
    if (isNaN(amount) || amount <= 0) {
      console.error('Please enter a valid positive number');
      return;
    }
    const amountToWithdraw = ethers.parseUnits(amount, 18).toString();
    console.log('stakingContract:', stakingContract);

    if (!stakingContract || !stakingContract.target) {
      console.error('Staking contract or target address is not defined');
      return;
    }

    try {
      const targetAddress = stakingContract.target; 
      const transaction = await stakingContract.withdraw(amountToWithdraw);
      setTransactionStatus("Transaction is pending....");
      
      const receipt = await transaction.wait();
      if (receipt.status === 1) {
        setTransactionStatus("Transaction is Successful");
        setTimeout(() => {
          setTransactionStatus("");
        }, 5000);
        withdrawstakeAmountRef.current.value = "";
      } else {
        setTransactionStatus("Transaction failed");
      }
    } catch (error) {
      console.error('Staking failed', error.message);
    }
  }

  return (
    <div>
      <form onSubmit={withdrawstakeToken}>
        <label>Amount To Withdraw:</label>
        <input type="text" ref={withdrawstakeAmountRef} />
        <Button onClick={withdrawstakeToken} type="submit" label="Withdraw Stake Token" />
      </form>
      {transactionStatus && <div>{transactionStatus}</div>}
    </div>
  );
}

export default WithdrawStakeAmount;
