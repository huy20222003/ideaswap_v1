import { useContext } from "react";
//context
import { BlogContext } from "../../Contexts/BlogContext";
//------------------------------------------------------------

const useBlog = ()=> {
    return useContext(BlogContext);
}

export default useBlog;