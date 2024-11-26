import { createContext, useCallback, useReducer } from 'react';
//reducer
import { initUserState, reducer } from '../Reducers/UserReducer/reducer';
import {
  getAll,
  getById,
  update,
  forgetPassword,
} from '../Reducers/UserReducer/action';
//api
import userApi from '../Service/userApi';

export const UserContext = createContext();

export const UserProvider = (prop) => {
  const [userState, dispatch] = useReducer(reducer, initUserState);

  const handleError = (error) => {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      return { success: false, message: error.message };
    }
  };

  const handleGetAllUsers = useCallback(async () => {
    try {
      const response = await userApi.getAll();
      if (response.data.success) {
        dispatch(getAll(response.data.users));
      }
    } catch (error) {
      return handleError(error);
    }
  }, []);

  const handleGetUserById = useCallback(async (userId) => {
    try {
      const response = await userApi.getById(userId);
      if (response.data.success) {
        dispatch(getById(response.data.user));
      }
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }, []);

  const handleForgetPassword = useCallback(async (data) => {
    try {
      const response = await userApi.forgetPassword(data);
      if (response.data.success) {
        dispatch(forgetPassword(response.data.user));
      }
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }, []);

  const handleResetPassword = useCallback(async (userId, data) => {
    try {
      const response = await userApi.resetPassword(userId, data);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }, []);

  const handleUpdateUser = useCallback(async (userId, data) => {
    try {
      const response = await userApi.update(userId, data);
      if (response.data.success) {
        dispatch(update(response.data.user));
      }
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }, []);

  const userData = {
    userState,
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUser,
    handleForgetPassword,
    handleResetPassword,
  };

  return (
    <UserContext.Provider value={userData}>
      {prop.children}
    </UserContext.Provider>
  );
};
