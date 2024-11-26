import { ADD_SHARE, GET_ALL_SHARES } from "./constants"


export const getAll = (payload)=> {
    return {
        type: GET_ALL_SHARES,
        payload
    }
}

export const addShare = (payload)=> {
    return {
        type: ADD_SHARE,
        payload
    }
}