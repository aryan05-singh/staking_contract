import {useContext} from "react"
import web3Context from "../../context/web3Context"


const ConnectedNetwork = () => {

              const {chainId} = useContext(web3Context)
              if(chainId == 11155111){
                            return <p>Connected Network : sepolia</p>
              }
              else{
                            return <p>Connected Network Unsupported</p>
              }



}

export default ConnectedNetwork