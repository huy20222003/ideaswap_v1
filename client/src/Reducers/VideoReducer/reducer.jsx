import {
  ADD_VIDEO,
  DELETE_VIDEO,
  GET_ALL_VIDEOS,
  GET_VIDEO_BY_ID,
  UPDATE_VIDEO,
  UPDATE_VIEW,
} from './constants';

export const initVideoState = {
  video: null,
  videos: [],
};

export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_VIDEO_BY_ID:
      return {
        ...state,
        video: payload,
      };
    case GET_ALL_VIDEOS:
      return {
        ...state,
        videos: payload,
      };
    case ADD_VIDEO:
      return {
        ...state,
        video: payload,
      };
    case UPDATE_VIDEO:
      const newVideos = state.videos.map((video) =>
        video._id === payload._id ? payload : video
      );

      return {
        ...state,
        videos: newVideos,
      };
      case UPDATE_VIEW:
        const newVideosView = state.videos.map((video) =>
          video._id === payload._id ? payload : video
        );
  
        return {
          ...state,
          videos: newVideosView,
        };
    case DELETE_VIDEO:
      return {
        ...state,
        videos: state.videos.filter((video) => video._id !== payload),
      };
    default:
      return {
        ...state,
      };
  }
};
