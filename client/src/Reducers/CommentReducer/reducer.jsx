import { ADD_COMMENT, GET_ALL_COMMENTS } from './constants';

export const initCommentState = {
  comment: null,
  comments: [],
};

export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_COMMENTS:
      return {
        ...state,
        comments: payload,
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, payload],
      };
    default:
      return {
        ...state,
      };
  }
};
