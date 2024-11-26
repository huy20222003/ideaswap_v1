import { createContext, useCallback, useReducer } from 'react';
//reducer
import {
  initCensorshipsState,
  reducer,
} from '../Reducers/CensorshipsReducer/reducer';
import {
  getAll,
} from '../Reducers/CensorshipsReducer/action';
//api
import censorshipsApi from '../Service/censorshipsApi';

export const CensorshipsContext = createContext();

export const CensorshipsProvider = (prop) => {
    const [censorshipsState, dispatch] = useReducer(reducer, initCensorshipsState);
  
    const handleError = (error) => {
      if (error.response && error.response.data) {
        return error.response.data;
      } else {
        return { success: false, message: error.message };
      }
    };
  
    const handleGetAllCensorships = useCallback(async () => {
      try {
        const response = await censorshipsApi.getAll();
        if (response.data.success) {
          dispatch(getAll(response.data.censorships));
        }
      } catch (error) {
        return handleError(error);
      }
    }, []);
  
    const censorshipsData = {
      censorshipsState,
      handleGetAllCensorships,
    };
  
    return (
      <CensorshipsContext.Provider value={censorshipsData}>
        {prop.children}
      </CensorshipsContext.Provider>
    );
  };
  