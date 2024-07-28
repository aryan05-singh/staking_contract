// EarnedReward.jsx
import { useState, useEffect, useContext } from "react";
import web3Context from "../../context/web3Context";
import { ethers } from "ethers";

const EarnedReward = () => {
  const { stakingContract, selectedAccount } = useContext(web3Context);
  const [rewardValue, setRewardValue] = useState("0");

  useEffect(() => {
    const fetchStakeRewardInfo = async () => {
      try {
        const rewardValueWei = await stakingContract.earned(selectedAccount);
        const rewardValueEth = ethers.formatUnits(rewardValueWei, 18).toString();
        const roundedReward = parseFloat(rewardValueEth).toFixed(2);
        setRewardValue(roundedReward);
      } catch (error) {
        console.error("Error fetching data", error.message);
      }
    };

    if (stakingContract && selectedAccount) {
      fetchStakeRewardInfo();
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

  const rewardTextStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333'
  };

  return (
    <div style={containerStyle}>
      <p style={rewardTextStyle}>Earned Reward: {rewardValue} ETH</p>
    </div>
  );
};

export default EarnedReward;
