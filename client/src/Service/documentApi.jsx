import axiosConfig from './axiosConfig';

const doumentApi = {
  getAll: () => {
    const url = '/document';
    return axiosConfig.get(url);
  },
  getById: (documentId) => {
    const url = `/document/${documentId}`;
    return axiosConfig.get(url);
  },
  createDocument: (data, onUploadProgress) => {
    const url = '/document/add';
    return axiosConfig.post(url, data, {
      onUploadProgress: onUploadProgress, // Bắt sự kiện upload tiến trình
    });
  },
  updateDocument: (documentId, document, onUploadProgress) => {
    const url = `/document/update/${documentId}`;
    return axiosConfig.put(url, document, {
      onUploadProgress: onUploadProgress, // Bắt sự kiện upload tiến trình
    });
  },
  deleteDocument: (documentID) => {
    const url = `/document/delete/${documentID}`;
    return axiosConfig.delete(url);
  },
  searchDocument: (searchValue) => {
    const url = `/document/search?q=${searchValue}`;
    return axiosConfig.get(url);
  },
};

export default doumentApi;
