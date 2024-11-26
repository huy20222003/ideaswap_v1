import { createContext, useCallback, useReducer, useState } from 'react';
//reducer
import { initCourseState, reducer } from '../Reducers/CourseReducer/reducer';
import {
  getAll,
  addCourse,
  deleteCourse,
  getById,
  updateCourse,
  updateView,
  searchCourse,
} from '../Reducers/CourseReducer/action';
//api
import courseApi from '../Service/courseApi';

export const CourseContext = createContext();

export const CourseProvider = (prop) => {
  const [courseState, dispatch] = useReducer(reducer, initCourseState);
  const [openFormDialogAddCourse, setOpenFormDialogAddCourse] = useState(false);
  const [openFormDialogEditCourse, setOpenFormDialogEditCourse] =
    useState(false);
  const [openFormDialogDeleteCourse, setOpenFormDialogDeleteCourse] =
    useState(false);

  const handleError = useCallback((error) => {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      return { success: false, message: error.message };
    }
  }, []);

  const handleGetAllCourses = useCallback(async () => {
    try {
      const response = await courseApi.getAll();
      if (response.data.success) {
        dispatch(getAll(response.data.courses));
      }
    } catch (error) {
      return handleError(error);
    }
  }, [handleError]);

  const handleGetCourseById = useCallback(
    async (courseId) => {
      try {
        const response = await courseApi.getById(courseId);
        if (response.data.success) {
          dispatch(getById(response.data.course));
        }
        return response.data;
      } catch (error) {
        return handleError(error);
      }
    },
    [handleError]
  );

  const handleCreateCourse = useCallback(
    async (course, setProgressValue) => {
      try {
        // Bắt đầu upload, set giá trị tiến trình là 0
        setProgressValue(0);

        const response = await courseApi.createCourse(
          course,
          (progressEvent) => {
            // Xử lý tiến trình upload ở đây
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setProgressValue(progress);
          }
        );

        if (response.data.success) {
          dispatch(addCourse(response.data.course));
        }
        return response.data;
      } catch (error) {
        return handleError(error);
      }
    },
    [dispatch, handleError]
  );

  const handleUpdateCourse = useCallback(
    async (courseId, course, setProgressValue) => {
      try {
        // Bắt đầu upload, set giá trị tiến trình là 0
        setProgressValue(0);

        const response = await courseApi.updateCourse(
          courseId,
          course,
          (progressEvent) => {
            // Xử lý tiến trình upload ở đây
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setProgressValue(progress);
          }
        );

        if (response.data.success) {
          dispatch(updateCourse(response.data.course));
        }
        return response.data;
      } catch (error) {
        return handleError(error);
      }
    },
    [dispatch, handleError]
  );

  const handleUpdateView = useCallback(
    async (courseId, course) => {
      try {
        const response = await courseApi.updateView(courseId, course);
        if (response.data.success) {
          dispatch(updateView(response.data.course));
        }
        return response.data;
      } catch (error) {
        return handleError(error);
      }
    },
    [handleError]
  );

  const handleDeleteCourse = useCallback(
    async (courseId) => {
      try {
        const response = await courseApi.deleteCourse(courseId);
        if (response.data.success) {
          dispatch(deleteCourse(courseId));
        }
        return response.data;
      } catch (error) {
        return handleError(error);
      }
    },
    [handleError]
  );

  const handleSearchCourses = useCallback(
    async (searchValue) => {
      try {
        if (searchValue != '') {
          const response = await courseApi.searchCourse(searchValue);
          if (response.data.success) {
            dispatch(searchCourse(response.data.courses));
          }
        } else {
          handleGetAllCourses();
        }
      } catch (error) {
        return handleError(error);
      }
    },
    [handleError, handleGetAllCourses]
  );

  const courseData = {
    courseState,
    handleGetAllCourses,
    openFormDialogAddCourse,
    setOpenFormDialogAddCourse,
    openFormDialogDeleteCourse,
    setOpenFormDialogDeleteCourse,
    openFormDialogEditCourse,
    setOpenFormDialogEditCourse,
    handleCreateCourse,
    handleDeleteCourse,
    handleGetCourseById,
    handleUpdateCourse,
    handleUpdateView,
    handleSearchCourses,
  };

  return (
    <CourseContext.Provider value={courseData}>
      {prop.children}
    </CourseContext.Provider>
  );
};
