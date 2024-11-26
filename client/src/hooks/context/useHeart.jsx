import { useContext } from "react";
//context
import { HeartContext } from "../../Contexts/HeartContext";
//------------------------------------------------------------

const useHeart = ()=> {
    return useContext(HeartContext);
}

export default useHeart;