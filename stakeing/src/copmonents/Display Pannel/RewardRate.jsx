// RewardRate.jsx
import { useState, useEffect, useContext } from "react";
import web3Context from "../../context/web3Context";
import { ethers } from "ethers";

const RewardRate = () => {
  const { stakingContract, selectedAccount } = useContext(web3Context);
  const [rewardRate, setRewardRate] = useState("0");

  useEffect(() => {
    const fetchRewardRate = async () => {
      try {
        const rewardRateWei = await stakingContract.REWARD_RATE;
        const rewardRateEth = ethers.formatUnits(rewardRateWei.toString(), 18);
        setRewardRate(rewardRateEth);
      } catch (error) {
        console.error("Error fetching data", error.message);
      }
    };

    if (stakingContract) {
      fetchRewardRate();
    }
  }, [stakingContract, selectedAccount]);

  // Inline CSS styles
  const containerStyle = {
    textAlign: 'center',
    marginTop: '20px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9'
  };

  const rewardRateTextStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333'
  };

  return (
    <div style={containerStyle}>
      <p style={rewardRateTextStyle}>Reward Rate: {rewardRate} token/second</p>
    </div>
  );
};

export default RewardRate;
