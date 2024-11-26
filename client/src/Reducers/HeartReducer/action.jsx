import { ADD_HEART, DELETE_HEART, GET_ALL_HEARTS } from "./constants"


export const getAll = (payload)=> {
    return {
        type: GET_ALL_HEARTS,
        payload
    }
}

export const addHeart = (payload)=> {
    return {
        type: ADD_HEART,
        payload
    }
}

export const deleteHeart = (payload)=> {
    return {
        type: DELETE_HEART,
        payload
    }
}