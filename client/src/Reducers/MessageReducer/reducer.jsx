import { GET_MESSAGES_BY_CONVERSATIONID } from './constants';

export const initStateMessage = {
  messages: [],
  message: null
};

export const reducer = (state, action) => {
  const {
    type,
    payload
  } = action;

  switch (type) {
    case GET_MESSAGES_BY_CONVERSATIONID:
      return {
        ...state,
        messages:  payload
      };
    default:
      return {
        ...state,
      };
  }
};
