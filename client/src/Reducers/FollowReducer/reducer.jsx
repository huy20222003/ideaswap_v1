import { ADD_FOLLOW, DELETE_FOLLOW, GET_ALL_FOLLOWS } from './constants';

export const initFollowsState = {
  follow: null,
  follows: [],
};

export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_FOLLOWS:
      return {
        ...state,
        follows: payload,
      };
    case ADD_FOLLOW:
      return {
        ...state,
        follows: [...state.follows, payload],
      };
    case DELETE_FOLLOW:
      return {
        ...state,
        follows: state.follows.filter((follow) => follow._id !== payload?._id),
      };
    default:
      return {
        ...state,
      };
  }
};
