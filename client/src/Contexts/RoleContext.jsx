import { createContext, useCallback, useReducer } from 'react';
//reducer
import {
  initRoleState,
  reducer,
} from '../Reducers/RoleReducer/reducer';
import {
  getById,
  getAll,
} from '../Reducers/RoleReducer/action';
//api
import roleApi from '../Service/roleApi';

export const RoleContext = createContext();

export const RoleProvider = (prop) => {
    const [roleState, dispatch] = useReducer(reducer, initRoleState);
  
    const handleError = useCallback((error) => {
      if (error.response && error.response.data) {
        return error.response.data;
      } else {
        return { success: false, message: error.message };
      }
    }, []);

    const handleGetAllRoles = useCallback(async () => {
      try {
        const response = await roleApi.getAll();
        if (response.data.success) {
          dispatch(getAll(response.data.roles));
        }
      } catch (error) {
        return handleError(error);
      }
    }, [handleError]);

    const handleGetRoleById = useCallback(async (roleId) => {
      try {
        const response = await roleApi.getById(roleId);
        if (response.data.success) {
          dispatch(getById(response.data.role));
        }
        return response.data;
      } catch (error) {
        return handleError(error);
      }
    }, [handleError]);
  
    const roleData = {
      roleState,
      handleGetRoleById,
      handleGetAllRoles,
    };
  
    return (
      <RoleContext.Provider value={roleData}>
        {prop.children}
      </RoleContext.Provider>
    );
  };
  