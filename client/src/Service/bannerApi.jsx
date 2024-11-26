import axiosConfig from './axiosConfig';

const bannerApi = {
  getAll: () => {
    const url = '/banner';
    return axiosConfig.get(url);
  },
  getById: (bannerId) => {
    const url = `/banner/${bannerId}`;
    return axiosConfig.get(url);
  },
  createCourse: (data, onUploadProgress) => {
    const url = '/banner/add';
    return axiosConfig.post(url, data, {
      onUploadProgress: onUploadProgress, // Bắt sự kiện upload tiến trình
    });
  },
  updateCourse: (bannerId, data, onUploadProgress) => {
    const url = `/banner/update/${bannerId}`;
    return axiosConfig.put(url, data, {
      onUploadProgress: onUploadProgress, // Bắt sự kiện upload tiến trình
    });
  },
  deleteCourse: (bannerId) => {
    const url = `/banner/delete/${bannerId}`;
    return axiosConfig.delete(url);
  },
};

export default bannerApi;
