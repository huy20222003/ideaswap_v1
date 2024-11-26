import { useContext } from "react";
//context
import { UserContext } from "../../Contexts/UserContext";
//------------------------------------------------------------

const useUser = ()=> {
    return useContext(UserContext);
}

export default useUser;