import { useContext } from "react";
//context
import { CensorshipsContext } from "../../Contexts/CensorshipsContext";
//------------------------------------------------------------

const useCensorships = ()=> {
    return useContext(CensorshipsContext);
}

export default useCensorships;