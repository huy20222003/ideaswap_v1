import { createContext, useCallback, useReducer, useState } from 'react';
//reducer
import {
  initVideoState,
  reducer,
} from '../Reducers/VideoReducer/reducer';
import {
  getById,
  getAll, 
  addVideo,
  deleteVideo,
  updateVideo,
  updateView,
} from '../Reducers/VideoReducer/action';
//api
import videoApi from '../Service/videoApi';

export const VideoContext = createContext();

export const VideoProvider = (prop) => {
    const [videoState, dispatch] = useReducer(reducer, initVideoState);
    const [openFormDialogEditVideo, setOpenFormDialogEditvideo] = useState(false);
    const [openFormDialogDeleteVideo, setOpenFormDialogDeletevideo] = useState(false);
  
    const handleError = useCallback((error) => {
      if (error.response && error.response.data) {
        return error.response.data;
      } else {
        return { success: false, message: error.message };
      }
    }, []); 

    const handleGetAllVideo = useCallback(async () => {
      try {
        const response = await videoApi.getAll();
        if (response.data.success) {
          dispatch(getAll(response.data.videos));
        }
      } catch (error) {
        return handleError(error);
      }
    }, [handleError]);
  
    const handleGetVideoById = useCallback(async (videoId) => {
      try {
        const response = await videoApi.getById(videoId);
        if (response.data.success) {
          dispatch(getById(response.data.video));
        }
        return response.data;
      } catch (error) {
        return handleError(error);
      }
    }, [handleError]);

    const handleCreateVideo = useCallback(async (video, setProgressValue) => {
      try {
        // Bắt đầu upload, set giá trị tiến trình là 0
        setProgressValue(0);
    
        const response = await videoApi.createVideo(video, (progressEvent) => {
          // Xử lý tiến trình upload ở đây
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setProgressValue(progress);
        });
    
        if (response.data.success) {
          dispatch(addVideo(response.data.video));
        }
        return response.data;
      } catch (error) {
        return handleError(error);
      }
    }, [dispatch, handleError]);

    const handleUpdateVideo = useCallback(async (videoId, video, setProgressValue) => {
      try {
        // Bắt đầu upload, set giá trị tiến trình là 0
        setProgressValue(0);
    
        const response = await videoApi.updateVideo(videoId, video, (progressEvent) => {
          // Xử lý tiến trình upload ở đây
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setProgressValue(progress);
        });
    
        if (response.data.success) {
          dispatch(updateVideo(response.data.video));
        }
        return response.data;
      } catch (error) {
        return handleError(error);
      }
    }, [dispatch, handleError]);

    const handleUpdateView = useCallback(async (videoId, video) => {
      try {
        const response = await videoApi.updateView(videoId, video);
        if (response.data.success) {
          dispatch(updateView(response.data.video));
        }
        return response.data;
      } catch (error) {
        return handleError(error);
      }
    }, [handleError]);

    const handleDeleteVideo = useCallback(async (videoId) => {
      try {
        const response = await videoApi.deleteVideo(videoId);
        if (response.data.success) {
          dispatch(deleteVideo(videoId));
        }
        return response.data;
      } catch (error) {
        return handleError(error);
      }
    }, [handleError]);
  
    const videoData = {
      videoState,
      openFormDialogEditVideo,
      setOpenFormDialogEditvideo,
      openFormDialogDeleteVideo,
      setOpenFormDialogDeletevideo,
      handleGetVideoById,
      handleGetAllVideo,
      handleCreateVideo,
      handleDeleteVideo,
      handleUpdateVideo,
      handleUpdateView,
    };
  
    return (
      <VideoContext.Provider value={videoData}>
        {prop.children}
      </VideoContext.Provider>
    );
  };
  