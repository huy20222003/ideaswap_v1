import { useContext } from "react";
//context
import { CodeContext } from "../../Contexts/CodeContext";
//------------------------------------------------------------

const useCode = ()=> {
    return useContext(CodeContext);
}

export default useCode;