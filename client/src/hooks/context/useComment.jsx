import { useContext } from "react";
//context
import { CommentContext } from "../../Contexts/CommentContext";
//------------------------------------------------------------

const useComment = ()=> {
    return useContext(CommentContext);
}

export default useComment;