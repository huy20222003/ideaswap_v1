import axiosConfig from './axiosConfig';

const courseApi = {
  getAll: () => {
    const url = '/course';
    return axiosConfig.get(url);
  },
  getById: (courseId) => {
    const url = `/course/${courseId}`;
    return axiosConfig.get(url);
  },
  createCourse: (data, onUploadProgress) => {
    const url = '/course/add';
    return axiosConfig.post(url, data, {
      onUploadProgress: onUploadProgress, // Bắt sự kiện upload tiến trình
    });
  },
  updateCourse: (courseId, data, onUploadProgress) => {
    const url = `/course/update/${courseId}`;
    return axiosConfig.put(url, data, {
      onUploadProgress: onUploadProgress, // Bắt sự kiện upload tiến trình
    });
  },
  updateView: (courseId, data)=> {
    const url = `/course/update/view/${courseId}`;
    return axiosConfig.put(url, data);
},
  deleteCourse: (courseId) => {
    const url = `/course/delete/${courseId}`;
    return axiosConfig.delete(url);
  },
  searchCourse: (searchValue) => {
    const url = `/course/search?q=${searchValue}`;
    return axiosConfig.get(url);
  },
};

export default courseApi;
