import { GET_ALL_CENSORSHIPS } from "./constants"

export const getAll = (payload)=> {
    return {
        type: GET_ALL_CENSORSHIPS,
        payload
    }
}