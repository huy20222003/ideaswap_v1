import { useContext } from "react";
//context
import { VideoContext } from "../../Contexts/VideoContext";
//------------------------------------------------------------

const useVideo = ()=> {
    return useContext(VideoContext);
}

export default useVideo;