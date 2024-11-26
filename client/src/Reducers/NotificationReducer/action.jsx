import { GET_NOTIFICATIONS_BY_USERID, UPDATE_NOTIFICATION } from "./constants"


export const getByUserId = (payload)=> {
    return {
        type: GET_NOTIFICATIONS_BY_USERID,
        payload
    }
}


export const updateNotification = (payload)=> {
    return {
        type: UPDATE_NOTIFICATION,
        payload
    }
}