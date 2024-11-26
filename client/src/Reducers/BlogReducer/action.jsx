import { ADD_BLOG, DELETE_BLOG, GET_ALL_BLOGS, GET_ONE_BLOG, UPDATE_BLOG } from "./constants"


export const getAll = (payload)=> {
    return {
        type: GET_ALL_BLOGS,
        payload
    }
}

export const getOne = (payload)=> {
    return {
        type: GET_ONE_BLOG,
        payload
    }
}

export const addBlog = (payload)=> {
    return {
        type: ADD_BLOG,
        payload
    }
}

export const updateBlog = (payload)=> {
    return {
        type: UPDATE_BLOG,
        payload
    }
}

export const deleteBlog = (payload)=> {
    return {
        type: DELETE_BLOG,
        payload
    }
}