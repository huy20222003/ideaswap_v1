import { ADD_CONVERSATION, DELETE_CONVERSATION, GET_CONVERSATIONS_BY_USERID, GET_ONE_CONVERSATION, UPDATE_CONVERSATION } from "./constants"


export const getConversationByUserId = (payload)=> {
    return {
        type: GET_CONVERSATIONS_BY_USERID,
        payload
    }
}

export const getOneConversation = (payload)=> {
    return {
        type: GET_ONE_CONVERSATION,
        payload
    }
}

export const addConversation = (payload)=> {
    return {
        type: ADD_CONVERSATION,
        payload
    }
}

export const deleteConversation = (payload)=> {
    return {
        type: DELETE_CONVERSATION,
        payload
    }
}

export const updateConversation = (payload)=> {
    return {
        type: UPDATE_CONVERSATION,
        payload
    }
}