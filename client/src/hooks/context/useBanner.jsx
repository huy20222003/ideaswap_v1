import { useContext } from "react";
//context
import { BannerContext } from "../../Contexts/BannerContext";
//------------------------------------------------------------

const useBanner = ()=> {
    return useContext(BannerContext);
}

export default useBanner;