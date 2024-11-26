import { GET_ALL_BANNERS, GET_BANNER_BY_ID } from "./constants"


export const getAll = (payload)=> {
    return {
        type: GET_ALL_BANNERS,
        payload
    }
}

export const getById = (payload)=> {
    return {
        type: GET_BANNER_BY_ID,
        payload
    }
}
