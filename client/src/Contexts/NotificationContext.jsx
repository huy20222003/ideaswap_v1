import { createContext, useCallback, useReducer } from 'react';
//reducer
import {
  initNotificationState,
  reducer,
} from '../Reducers/NotificationReducer/reducer';
import {
  getByUserId,
  updateNotification,
} from '../Reducers/NotificationReducer/action';
//api
import notificationApi from '../Service/notificationApi';
//createContext
import {useSocket} from '../hooks/context';
//------------------------------------------------------

export const NotificationContext = createContext();

export const NotificationProvider = (prop) => {
  const [notificationState, dispatch] = useReducer(
    reducer,
    initNotificationState
  );
  const {socket} = useSocket();

  const handleError = useCallback((error) => {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      return { success: false, message: error.message };
    }
  }, []);

  const handleSendNotification = useCallback(async (data) => {
    try {
      if(socket) {
        socket.emit("sendNotification", data);
      }
    } catch (error) {
      return handleError(error);
    }
  }, [handleError, socket]);

  const handleGetNotificationsByUserId = useCallback(async (userId) => {
    try {
      const response = await notificationApi.getByUserId(userId);
      if (response.data.success) {
        dispatch(getByUserId(response.data.notifications));
      }
    } catch (error) {
      return handleError(error);
    }
  }, [handleError]);

  const handleUpdateNotifications = useCallback(
    async (data) => {
      try {
        const response = await notificationApi.update(data);
        if (response.data.success) {
          dispatch(updateNotification(response.data.notifications));
        }
      } catch (error) {
        return handleError(error);
      }
    },
    [handleError]
  );

  const notificationData = {
    notificationState,
    handleGetNotificationsByUserId,
    handleUpdateNotifications,
    handleSendNotification,
  };

  return (
    <NotificationContext.Provider value={notificationData}>
      {prop.children}
    </NotificationContext.Provider>
  );
};
