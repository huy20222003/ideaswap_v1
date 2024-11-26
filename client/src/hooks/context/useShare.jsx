import { useContext } from "react";
//context
import { ShareContext } from "../../Contexts/ShareContext";
//------------------------------------------------------------

const useShare = ()=> {
    return useContext(ShareContext);
}

export default useShare;