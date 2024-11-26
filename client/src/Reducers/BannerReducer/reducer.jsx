import { GET_ALL_BANNERS, GET_BANNER_BY_ID } from './constants';
  
  export const initBannerState = {
    banner: null,
    banners: [],
  };
  
  export const reducer = (state, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case GET_ALL_BANNERS:
        return {
          ...state,
          banners: payload,
        };
      case GET_BANNER_BY_ID:
        return {
          ...state,
          banner: payload,
        };
      default:
        return {
          ...state,
        };
    }
  };
  