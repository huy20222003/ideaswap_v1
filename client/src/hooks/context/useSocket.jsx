import { useContext } from "react";
//context
import { SocketContext } from "../../Contexts/SocketContext";
//------------------------------------------------------------

const useSocket = ()=> {
    return useContext(SocketContext);
}

export default useSocket;