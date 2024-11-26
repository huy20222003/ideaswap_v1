import { createContext, useCallback, useReducer } from 'react';
//reducer
import {
  initCommentState,
  reducer,
} from '../Reducers/CommentReducer/reducer';
import {
  getAll,
  addComment,
} from '../Reducers/CommentReducer/action';
//api
import commentApi from '../Service/commentApi';

export const CommentContext = createContext();

export const CommentProvider = (prop) => {
    const [commentState, dispatch] = useReducer(reducer, initCommentState);
  
    const handleError = (error) => {
      if (error.response && error.response.data) {
        return error.response.data;
      } else {
        return { success: false, message: error.message };
      }
    };
  
    const handleGetAllComments = useCallback(async () => {
      try {
        const response = await commentApi.getAll();
        if (response.data.success) {
          dispatch(getAll(response.data.comments));
        }
      } catch (error) {
        return handleError(error);
      }
    }, []);


    const handleCreateComment = useCallback(async (comment) => {
      try {
        const response = await commentApi.createComment(comment);
        if (response.data.success) {
          dispatch(addComment(response.data.comment));
        }
        return response.data;
      } catch (error) {
        return handleError(error);
      }
    }, []);
  
    const commentData = {
      commentState,
      handleGetAllComments,
      handleCreateComment,
    };
  
    return (
      <CommentContext.Provider value={commentData}>
        {prop.children}
      </CommentContext.Provider>
    );
  };
  