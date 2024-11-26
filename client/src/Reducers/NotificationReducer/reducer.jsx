import { GET_NOTIFICATIONS_BY_USERID, UPDATE_NOTIFICATION } from './constants';

export const initNotificationState = {
  notification: null,
  notifications: [],
};

export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_NOTIFICATIONS_BY_USERID:
      return {
        ...state,
        notifications: payload,
      };
    case UPDATE_NOTIFICATION:
      return {
        ...state,
        notifications: payload,
      };
    default:
      return {
        ...state,
      };
  }
};
