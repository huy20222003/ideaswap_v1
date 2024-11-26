import { createContext, useCallback, useReducer, useState } from 'react';
//reducer
import {
  initStateConversation,
  reducer,
} from '../Reducers/ConversationReducer/reducer';
import {
  getConversationByUserId,
  addConversation,
  getOneConversation,
  deleteConversation,
  updateConversation
} from '../Reducers/ConversationReducer/action';
//api
import conversationApi from '../Service/conversationApi';

export const ConversationContext = createContext();

export const ConversationProvider = (prop) => {
  const [conversationState, dispatch] = useReducer(
    reducer,
    initStateConversation
  );
  const [openFormDeleteConversation, setOpenFormDeleteConversation] =
    useState(false);

  const handleError = useCallback((error) => {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      return { success: false, message: error.message };
    }
  }, []);

  const handleGetConversationsByUserId = useCallback(
    async (userId) => {
      try {
        const response = await conversationApi.getConversationsByUserId(userId);
        if (response.data.success) {
          dispatch(getConversationByUserId(response.data.conversations));
        }
      } catch (error) {
        return handleError(error);
      }
    },
    [handleError]
  );

  const handleGetOneConversations = useCallback(
    async (conversationID) => {
      try {
        const response = await conversationApi.getOneConversation(
          conversationID
        );
        if (response.data.success) {
          dispatch(getOneConversation(response.data.conversation));
        }
        return response.data;
      } catch (error) {
        return handleError(error);
      }
    },
    [handleError]
  );

  const handleUpdateConversation = useCallback(
    async (conversation) => {
      try {
        dispatch(updateConversation(conversation));
      } catch (error) {
        return handleError(error);
      }
    },
    [handleError]
  );

  const handleAddConversation = useCallback(
    async (data) => {
      try {
        const response = await conversationApi.addConversation(data);
        if (response.data.success) {
          dispatch(addConversation(response.data.conversation));
        }
        return response.data;
      } catch (error) {
        return handleError(error);
      }
    },
    [handleError]
  );

  const handleDeleteConversation = useCallback(
    async (conversationId) => {
      try {
        const response = await conversationApi.deleteConversation(
          conversationId
        );
        if (response.data.success) {
          dispatch(deleteConversation(conversationId));
        }
        return response.data;
      } catch (error) {
        return handleError(error);
      }
    },
    [handleError]
  );

  const conversationData = {
    conversationState,
    openFormDeleteConversation,
    setOpenFormDeleteConversation,
    handleGetConversationsByUserId,
    handleAddConversation,
    handleGetOneConversations,
    handleDeleteConversation,
    handleUpdateConversation
  };

  return (
    <ConversationContext.Provider value={conversationData}>
      {prop.children}
    </ConversationContext.Provider>
  );
};
