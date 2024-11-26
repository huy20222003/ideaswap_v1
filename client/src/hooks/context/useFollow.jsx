import { useContext } from "react";
//context
import { FollowContext } from "../../Contexts/FollowContext";
//------------------------------------------------------------

const useFollow = ()=> {
    return useContext(FollowContext);
}

export default useFollow;