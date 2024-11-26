import { createContext, useCallback, useReducer } from 'react';
//reducer
import {
  initStateMessage,
  reducer,
} from '../Reducers/MessageReducer/reducer';
import {
  getMessagesByConversationId
} from '../Reducers/MessageReducer/action';
//api
import messageApi from '../Service/messageApi';

export const MessageContext = createContext();

export const MessageProvider = (prop) => {
    const [messageState, dispatch] = useReducer(reducer, initStateMessage);
  
    const handleError = useCallback((error) => {
      if (error.response && error.response.data) {
        return error.response.data;
      } else {
        return { success: false, message: error.message };
      }
    }, []);    
  
    const handleGetMessageByConversationId = useCallback(async (conversationId) => {
      try {
        const response = await messageApi.getMessagesByConversationId(conversationId);
        if (response.data.success) {
          dispatch(getMessagesByConversationId(response.data.messages));
        }
      } catch (error) {
        return handleError(error);
      }
    }, [handleError]);
  
    const messageData = {
      messageState, 
      handleGetMessageByConversationId
    };
  
    return (
      <MessageContext.Provider value={messageData}>
        {prop.children}
      </MessageContext.Provider>
    );
  };
  