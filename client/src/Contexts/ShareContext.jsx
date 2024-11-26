import { createContext, useCallback, useReducer } from 'react';
//reducer
import {
  initShareState,
  reducer,
} from '../Reducers/ShareReducer/reducer';
import {
  getAll,
  addShare
} from '../Reducers/ShareReducer/action';
//api
import shareApi from '../Service/shareApi';

export const ShareContext = createContext();

export const ShareProvider = (prop) => {
    const [shareState, dispatch] = useReducer(reducer, initShareState);
  
    const handleError = (error) => {
      if (error.response && error.response.data) {
        return error.response.data;
      } else {
        return { success: false, message: error.message };
      }
    };
  
    const handleGetAllShares = useCallback(async () => {
      try {
        const response = await shareApi.getAll();
        if (response.data.success) {
          dispatch(getAll(response.data.shares));
        }
      } catch (error) {
        return handleError(error);
      }
    }, []);

    const handleCreateShare = useCallback(async (share) => {
      try {
        const response = await shareApi.createShare(share);
        if (response.data.success) {
          dispatch(addShare(response.data.share));
        }
        return response.data;
      } catch (error) {
        return handleError(error);
      }
    }, []);
  
    const shareData = {
      shareState,
      handleGetAllShares,
      handleCreateShare,
    };
  
    return (
      <ShareContext.Provider value={shareData}>
        {prop.children}
      </ShareContext.Provider>
    );
  };
  