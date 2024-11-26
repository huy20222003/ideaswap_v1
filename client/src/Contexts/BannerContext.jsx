import { createContext, useCallback, useReducer } from 'react';
//reducer
import {
  initBannerState,
  reducer,
} from '../Reducers/BannerReducer/reducer';
import {
  getAll, getById
} from '../Reducers/BannerReducer/action';
//api
import bannerApi from '../Service/bannerApi';

export const BannerContext = createContext();

export const BannerProvider = (prop) => {
    const [bannerState, dispatch] = useReducer(reducer, initBannerState);
  
    const handleError = useCallback((error) => {
      if (error.response && error.response.data) {
        return error.response.data;
      } else {
        return { success: false, message: error.message };
      }
    }, []);    
  
    const handleGetAllBanners = useCallback(async () => {
      try {
        const response = await bannerApi.getAll();
        if (response.data.success) {
          dispatch(getAll(response.data.banners));
        }
      } catch (error) {
        return handleError(error);
      }
    }, [handleError]);

    const handleGetBannerById = useCallback(async (bannerId) => {
      try {
        const response = await bannerApi.getById(bannerId);
        if (response.data.success) {
          dispatch(getById(response.data.banner));
        }
        return response.data;
      } catch (error) {
        return handleError(error);
      }
    }, [handleError]);
  
    const bannerData = {
      bannerState,
      handleGetAllBanners,
      handleGetBannerById,
    };
  
    return (
      <BannerContext.Provider value={bannerData}>
        {prop.children}
      </BannerContext.Provider>
    );
  };
  