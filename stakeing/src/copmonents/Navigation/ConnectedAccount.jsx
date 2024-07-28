import {useContext} from "react"
import web3Context from "../../context/web3Context"

const ConnectedAccount = () =>{

              const{selectedAccount} = useContext(web3Context);
              return(
                            <p>Connected Account :{selectedAccount}</p>
              )


}

export default ConnectedAccount