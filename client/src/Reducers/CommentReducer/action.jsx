import { ADD_COMMENT, GET_ALL_COMMENTS } from "./constants"

export const getAll = (payload)=> {
    return {
        type: GET_ALL_COMMENTS,
        payload
    }
}

export const addComment = (payload)=> {
    return {
        type: ADD_COMMENT,
        payload
    }
}