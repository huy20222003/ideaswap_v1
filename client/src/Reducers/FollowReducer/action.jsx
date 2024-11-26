import { ADD_FOLLOW, DELETE_FOLLOW, GET_ALL_FOLLOWS } from "./constants"

export const getAll = (payload)=> {
    return {
        type: GET_ALL_FOLLOWS,
        payload
    }
}

export const addFollow = (payload)=> {
    return {
        type: ADD_FOLLOW,
        payload
    }
}

export const deleteFollow = (payload)=> {
    return {
        type: DELETE_FOLLOW,
        payload
    }
}