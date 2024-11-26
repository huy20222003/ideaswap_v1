import axiosConfig from './axiosConfig';

const blogApi = {
  getAll: () => {
    const url = '/blog';
    return axiosConfig.get(url);
  },
  getOne: (blogId) => {
    const url = `/blog/${blogId}`;
    return axiosConfig.get(url);
  },
  createBlog: (data, onUploadProgress) => {
    const url = '/blog/add';
    return axiosConfig.post(url, data, {
      onUploadProgress: onUploadProgress, // Bắt sự kiện upload tiến trình
    });
  },
  updateBlog: (blogId, data, onUploadProgress) => {
    const url = `/blog/update/${blogId}`;
    return axiosConfig.put(url, data, {
      onUploadProgress: onUploadProgress, // Bắt sự kiện upload tiến trình
    });
  },
  deleteBlog: (blogId) => {
    const url = `/blog/delete/${blogId}`;
    return axiosConfig.delete(url);
  },
};

export default blogApi;
