import { ADD_VIDEO, DELETE_VIDEO, GET_ALL_VIDEOS, GET_VIDEO_BY_ID, UPDATE_VIDEO, UPDATE_VIEW } from "./constants"


export const getById = (payload)=> {
    return {
        type: GET_VIDEO_BY_ID,
        payload
    }
}

export const getAll = (payload)=> {
    return {
        type: GET_ALL_VIDEOS,
        payload
    }
}

export const addVideo = (payload)=> {
    return {
        type: ADD_VIDEO,
        payload
    }
}

export const updateVideo = (payload)=> {
    return {
        type: UPDATE_VIDEO,
        payload
    }
}

export const updateView = (payload)=> {
    return {
        type: UPDATE_VIEW,
        payload
    }
}

export const deleteVideo = (payload)=> {
    return {
        type: DELETE_VIDEO,
        payload
    }
}