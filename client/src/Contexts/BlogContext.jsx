import { createContext, useCallback, useReducer, useState } from 'react';
//reducer
import {
  initBlogState,
  reducer,
} from '../Reducers/BlogReducer/reducer';
import {
  getAll,
  getOne,
  addBlog,
  updateBlog,
  deleteBlog,
} from '../Reducers/BlogReducer/action';
//api
import blogApi from '../Service/blogApi';

export const BlogContext = createContext();

export const BlogProvider = (prop) => {
    const [blogState, dispatch] = useReducer(reducer, initBlogState);
    const [openFormDialogDeleteBlog, setOpenFormDialogDeleteBlog] = useState(false);
    const [openFormDialogCommentBlog, setOpenFormDialogCommentBlog] = useState(false);
    const [openFormDialogEditBlog, setOpenFormDialogEditBlog] = useState(false);
  
    const handleError = useCallback((error) => {
      if (error.response && error.response.data) {
        return error.response.data;
      } else {
        return { success: false, message: error.message };
      }
    }, []);  
  
    const handleGetAllBlog = useCallback(async () => {
      try {
        const response = await blogApi.getAll();
        if (response.data.success) {
          dispatch(getAll(response.data.blogs));
        }
      } catch (error) {
        return handleError(error);
      }
    }, [handleError]);
  
    const handleGetOneBlog = useCallback(async (blogId) => {
      try {
        const response = await blogApi.getOne(blogId);
        if (response.data.success) {
          dispatch(getOne(response.data.blog));
        }
        return response.data;
      } catch (error) {
        return handleError(error);
      }
    }, [handleError]);

    const handleCreateBlog = useCallback(async (blog, setProgressValue) => {
      try {
        // Bắt đầu upload, set giá trị tiến trình là 0
        setProgressValue(0);
    
        const response = await blogApi.createBlog(blog, (progressEvent) => {
          // Xử lý tiến trình upload ở đây
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setProgressValue(progress);
        });
    
        if (response.data.success) {
          dispatch(addBlog(response.data.blog));
        }
        return response.data;
      } catch (error) {
        return handleError(error);
      }
    }, [dispatch, handleError]);

    const handleUpdateBlog = useCallback(async (blogId, document, setProgressValue) => {
      try {
        // Bắt đầu upload, set giá trị tiến trình là 0
        setProgressValue(0);
    
        const response = await blogApi.updateBlog(blogId, document, (progressEvent) => {
          // Xử lý tiến trình upload ở đây
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setProgressValue(progress);
        });
    
        if (response.data.success) {
          dispatch(updateBlog(response.data.blog));
        }
        return response.data;
      } catch (error) {
        return handleError(error);
      }
    }, [dispatch, handleError]);

    const handleDeleteBlog = useCallback(async (blogId) => {
      try {
        const response = await blogApi.deleteBlog(blogId);
        if (response.data.success) {
          dispatch(deleteBlog(blogId));
        }
        return response.data;
      } catch (error) {
        return handleError(error);
      }
    }, [handleError]);
  
    const blogData = {
      blogState,
      openFormDialogDeleteBlog,
      setOpenFormDialogDeleteBlog,
      openFormDialogCommentBlog, 
      setOpenFormDialogCommentBlog,
      openFormDialogEditBlog,
      setOpenFormDialogEditBlog,
      handleGetAllBlog,
      handleGetOneBlog,
      handleCreateBlog,
      handleUpdateBlog,
      handleDeleteBlog,
    };
  
    return (
      <BlogContext.Provider value={blogData}>
        {prop.children}
      </BlogContext.Provider>
    );
  };
  