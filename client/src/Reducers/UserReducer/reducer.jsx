import {
  FORGET_PASSWORD,
  GET_ALL_USERS,
  GET_USER_BY_ID,
  RESET_PASSWORD,
  UPDATE_USER,
} from './constants';

export const initUserState = {
  user: null,
  users: [],
};

export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_USERS:
      return {
        ...state,
        users: payload,
      };
    case GET_USER_BY_ID:
      return {
        ...state,
        user: payload,
      };
    case FORGET_PASSWORD:
      return {
        ...state,
        user: payload,
      };
    case RESET_PASSWORD:
      return {
        ...state,
      };
    case UPDATE_USER:
      const newUsers = state.users.map((user) =>
        user._id === payload._id ? payload : user
      );

      return {
        ...state,
        users: newUsers,
      };
    default:
      return {
        ...state,
      };
  }
};
