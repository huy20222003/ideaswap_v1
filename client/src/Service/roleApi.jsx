import axiosConfig from './axiosConfig';

const roleApi = {
  getAll: () => {
    const url = '/role';
    return axiosConfig.get(url);
  },
  getById: (roleId) => {
    const url = `/role/${roleId}`;
    return axiosConfig.get(url);
  },
};

export default roleApi;
