import { GET_MESSAGES_BY_CONVERSATIONID } from "./constants"


export const getMessagesByConversationId = (payload)=> {
    return {
        type: GET_MESSAGES_BY_CONVERSATIONID,
        payload
    }
}