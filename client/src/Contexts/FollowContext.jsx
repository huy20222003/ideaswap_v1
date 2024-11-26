import { createContext, useCallback, useReducer } from 'react';
//reducer
import {
  initFollowsState,
  reducer,
} from '../Reducers/FollowReducer/reducer';
import {
  getAll,
  addFollow,
  deleteFollow,
} from '../Reducers/FollowReducer/action';
//api
import followApi from '../Service/followApi';

export const FollowContext = createContext();

export const FollowProvider = (prop) => {
    const [followState, dispatch] = useReducer(reducer, initFollowsState);
  
    const handleError = (error) => {
      if (error.response && error.response.data) {
        return error.response.data;
      } else {
        return { success: false, message: error.message };
      }
    };
  
    const handleGetAllFollows = useCallback(async () => {
      try {
        const response = await followApi.getAll();
        if (response.data.success) {
          dispatch(getAll(response.data.follows));
        }
      } catch (error) {
        return handleError(error);
      }
    }, []);

    const handleCreateFollow = useCallback(async (follow) => {
      try {
        const response = await followApi.createFollow(follow);
        if (response.data.success) {
          dispatch(addFollow(response.data.follow));
        }
        return response.data;
      } catch (error) {
        return handleError(error);
      }
    }, []);

    const handleDeleteFollow = useCallback(async (data) => {
      try {
        const response = await followApi.deleteFollow(data);
        if (response.data.success) {
          dispatch(deleteFollow(data));
        }
        return response.data;
      } catch (error) {
        return handleError(error);
      }
    }, []);
  
    const followData = {
      followState,
      handleGetAllFollows,
      handleCreateFollow,
      handleDeleteFollow,
    };
  
    return (
      <FollowContext.Provider value={followData}>
        {prop.children}
      </FollowContext.Provider>
    );
  };
  