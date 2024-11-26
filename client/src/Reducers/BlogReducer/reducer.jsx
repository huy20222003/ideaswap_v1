import {
  ADD_BLOG,
  DELETE_BLOG,
  GET_ALL_BLOGS,
  GET_ONE_BLOG,
  UPDATE_BLOG,
} from './constants';

export const initBlogState = {
  blog: null,
  blogs: [],
};

export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_BLOGS:
      return {
        ...state,
        blogs: payload,
      };
    case GET_ONE_BLOG:
      return {
        ...state,
        blog: payload,
      };
    case ADD_BLOG:
      return {
        ...state,
        blog: payload,
      };
    case UPDATE_BLOG:
      const newBlogs = state.blogs.map((blog) =>
        blog._id === payload._id ? payload : blog
      );
      return {
        ...state,
        blogs: newBlogs,
      };
    case DELETE_BLOG:
      return {
        ...state,
        blogs: state.blogs.filter((blog) => blog._id !== payload),
      };
    default:
      return {
        ...state,
      };
  }
};
