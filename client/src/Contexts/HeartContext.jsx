import { createContext, useCallback, useReducer } from 'react';
//reducer
import {
  initHeartState,
  reducer,
} from '../Reducers/HeartReducer/reducer';
import {
  getAll,
  addHeart,
  deleteHeart,
} from '../Reducers/HeartReducer/action';
//api
import heartApi from '../Service/heartApi';

export const HeartContext = createContext();

export const HeartProvider = (prop) => {
    const [heartState, dispatch] = useReducer(reducer, initHeartState);
  
    const handleError = (error) => {
      if (error.response && error.response.data) {
        return error.response.data;
      } else {
        return { success: false, message: error.message };
      }
    };
  
    const handleGetAllHearts = useCallback(async () => {
      try {
        const response = await heartApi.getAll();
        if (response.data.success) {
          dispatch(getAll(response.data.hearts));
        }
      } catch (error) {
        return handleError(error);
      }
    }, []);

    const handleCreateHeart = useCallback(async (data) => {
      try {
        const response = await heartApi.addHeart(data);
        if (response.data.success) {
          dispatch(addHeart(response.data.heart));
        }
        return response.data;
      } catch (error) {
        return handleError(error);
      }
    }, []);

    const handleDeleteHeart = useCallback(async (data) => {
      try {
        const response = await heartApi.deleteHeart(data);
        if (response.data.success) {
          dispatch(deleteHeart(response.data.heart._id));
        }
        return response.data;
      } catch (error) {
        return handleError(error);
      }
    }, []);
  
    const heartData = {
      heartState,
      handleGetAllHearts,
      handleCreateHeart,
      handleDeleteHeart,
    };
  
    return (
      <HeartContext.Provider value={heartData}>
        {prop.children}
      </HeartContext.Provider>
    );
  };
  