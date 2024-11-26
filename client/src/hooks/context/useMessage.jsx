import { useContext } from "react";
//context
import { MessageContext } from "../../Contexts/MessageContext";
//------------------------------------------------------------

const useMessage = ()=> {
    return useContext(MessageContext);
}

export default useMessage;