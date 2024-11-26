import { GET_ALL_ROLES, GET_ROLE_BY_ID } from "./constants"

export const getAll = (payload)=> {
    return {
        type: GET_ALL_ROLES,
        payload
    }
}

export const getById = (payload)=> {
    return {
        type: GET_ROLE_BY_ID,
        payload
    }
}

