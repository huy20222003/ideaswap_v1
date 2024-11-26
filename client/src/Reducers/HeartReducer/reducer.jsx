import { ADD_HEART, DELETE_HEART, GET_ALL_HEARTS } from './constants';

export const initHeartState = {
  heart: null,
  hearts: [],
};

export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_HEARTS:
      return {
        ...state,
        hearts: payload,
      };
    case ADD_HEART:
      return {
        ...state,
        hearts: [...state.hearts, payload],
      };
    case DELETE_HEART:
      return {
        ...state,
        hearts: state.hearts.filter((heart) => heart._id !== payload?._id),
      };
    default:
      return {
        ...state,
      };
  }
};
