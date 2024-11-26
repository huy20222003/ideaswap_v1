import {
  ADD_COURSE,
  DELETE_COURSE,
  GET_ALL_COURSES,
  GET_COURSE_BY_ID,
  SEARCH_COURSE,
  UPDATE_COURSE,
  UPDATE_VIEW,
} from './constants';

export const initCourseState = {
  course: null,
  courses: [],
};

export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_COURSES:
      return {
        ...state,
        courses: payload,
      };
    case GET_COURSE_BY_ID:
      return {
        ...state,
        course: payload,
      };
    case ADD_COURSE:
      return {
        ...state,
        courses: [...state.courses, payload],
      };
    case UPDATE_COURSE:
      const newCourses = state.courses.map((course) =>
        course._id === payload._id ? payload : course
      );

      return {
        ...state,
        courses: newCourses,
      };
    case UPDATE_VIEW:
      const newCoursesView = state.courses.map((course) =>
        course._id === payload._id ? payload : course
      );

      return {
        ...state,
        courses: newCoursesView,
      };
    case DELETE_COURSE:
      return {
        ...state,
        courses: state.courses.filter((course) => course._id !== payload),
      };
    case SEARCH_COURSE:
      return {
        ...state,
        courses: payload,
      };
    default:
      return {
        ...state,
      };
  }
};
