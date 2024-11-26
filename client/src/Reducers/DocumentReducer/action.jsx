import { ADD_DOCUMENT, DELETE_DOCUMENT, GET_ALL_DOCUMENT, GET_DOCUMENT_BY_ID, SEARCH_DOCUMENT, UPDATE_DOCUMENT } from "./constants"

export const getAll = (payload)=> {
    return {
        type: GET_ALL_DOCUMENT,
        payload
    }
}

export const getById = (payload)=> {
    return {
        type: GET_DOCUMENT_BY_ID,
        payload
    }
}

export const addDocument = (payload)=> {
    return {
        type: ADD_DOCUMENT,
        payload
    }
}

export const updateDocument = (payload)=> {
    return {
        type: UPDATE_DOCUMENT,
        payload
    }
}

export const deleteDocument = (payload)=> {
    return {
        type: DELETE_DOCUMENT,
        payload
    }
}


export const searchDocument = (payload)=> {
    return {
        type: SEARCH_DOCUMENT,
        payload
    }
}