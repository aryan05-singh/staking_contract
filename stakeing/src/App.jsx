
import ClaimReward from "./copmonents/ClaimReward/ClaimReward";
import DisplayPannel from"./copmonents/Display Pannel/DisplayPannel";
import Navigation from "./copmonents/Navigation/Navigation";
import StakedAmount from "./copmonents/StakeToken/StakeAmount";
import TokenApproval from "./copmonents/StakeToken/TokenApproval";
import Wallet from "./copmonents/Wallet";
import WithdrawStakeAmount from "./copmonents/Withdraw/Withdraw";
import { StakingProvider } from "./context/StakingContext";

function App() {
  return (
    <div className="app-container">
      <div className="content-wrapper">
        <Wallet>
          <Navigation />
          <StakingProvider>
            <DisplayPannel />
            <StakedAmount />
            <TokenApproval />
            <WithdrawStakeAmount />
          </StakingProvider>
          <ClaimReward />
        </Wallet>
      </div>
    </div>
  );
}

export default App;
