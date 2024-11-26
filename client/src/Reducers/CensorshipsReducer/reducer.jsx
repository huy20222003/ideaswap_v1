import { GET_ALL_CENSORSHIPS } from "./constants";

export const initCensorshipsState = {
    censorship: null,
    censorships: [],
  };
  
  export const reducer = (state, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case GET_ALL_CENSORSHIPS:
        return {
          ...state,
          censorships: payload,
        };
      default:
        return {
          ...state,
        };
    }
  };