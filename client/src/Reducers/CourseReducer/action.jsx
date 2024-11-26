import { ADD_COURSE, DELETE_COURSE, GET_ALL_COURSES, GET_COURSE_BY_ID, SEARCH_COURSE, UPDATE_COURSE, UPDATE_VIEW } from "./constants"


export const getAll = (payload)=> {
    return {
        type: GET_ALL_COURSES,
        payload
    }
}

export const getById = (payload)=> {
    return {
        type: GET_COURSE_BY_ID,
        payload
    }
}

export const addCourse = (payload)=> {
    return {
        type: ADD_COURSE,
        payload
    }
}

export const updateCourse = (payload)=> {
    return {
        type: UPDATE_COURSE,
        payload
    }
}

export const updateView = (payload)=> {
    return {
        type: UPDATE_VIEW,
        payload
    }
}

export const deleteCourse = (payload)=> {
    return {
        type: DELETE_COURSE,
        payload
    }
}

export const searchCourse = (payload)=> {
    return {
        type: SEARCH_COURSE,
        payload
    }
}