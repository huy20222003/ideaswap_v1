import {
  ADD_CONVERSATION,
  DELETE_CONVERSATION,
  GET_CONVERSATIONS_BY_USERID,
  GET_ONE_CONVERSATION,
  UPDATE_CONVERSATION,
} from './constants';

export const initStateConversation = {
  conversations: [],
  conversation: null,
};

export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CONVERSATIONS_BY_USERID:
      return {
        ...state,
        conversations: payload,
      };
    case GET_ONE_CONVERSATION:
      return {
        ...state,
        conversation: payload,
      };
    case ADD_CONVERSATION:
      return {
        ...state,
        conversations: [...state.conversations, payload],
      };
    case UPDATE_CONVERSATION:
      const newConversations = state.conversations.map((conversation) =>
        conversation._id === payload._id ? payload : conversation
      );

      return {
        ...state,
        conversations: newConversations,
      };
    case DELETE_CONVERSATION:
      return {
        ...state,
        conversations: state.conversations.filter(
          (conversation) => conversation._id !== payload
        ),
      };
    default:
      return {
        ...state,
      };
  }
};
