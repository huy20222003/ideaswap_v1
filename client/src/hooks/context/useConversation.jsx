import { useContext } from "react";
//context
import { ConversationContext } from "../../Contexts/ConversationContext";
//------------------------------------------------------------

const useConversation = ()=> {
    return useContext(ConversationContext);
}

export default useConversation;