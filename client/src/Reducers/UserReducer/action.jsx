import { FORGET_PASSWORD, GET_ALL_USERS, GET_USER_BY_ID, RESET_PASSWORD, UPDATE_USER } from "./constants"


export const getAll = (payload)=> {
    return {
        type: GET_ALL_USERS,
        payload
    }
}

export const getById = (payload)=> {
    return {
        type: GET_USER_BY_ID,
        payload
    }
}

export const forgetPassword = (payload)=> {
    return {
        type: FORGET_PASSWORD,
        payload
    }
}

export const resetPassword = (payload)=> {
    return {
        type: RESET_PASSWORD,
        payload
    }
}

export const update = (payload)=> {
    return {
        type: UPDATE_USER,
        payload
    }
}