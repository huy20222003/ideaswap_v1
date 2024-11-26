import axiosConfig from './axiosConfig';

const notificationApi = {
  getByUserId: (userId) => {
    const url = `/notification/${userId}`;
    return axiosConfig.get(url);
  },
  update: (data) => {
    const url = `/notification/update`;
    return axiosConfig.put(url, data);
  },
};

export default notificationApi;
