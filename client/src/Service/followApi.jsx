import axiosConfig from "./axiosConfig";

const followApi = {
    getAll: ()=> {
        const url = '/follow';
        return axiosConfig.get(url);
    },
    createFollow: (data)=> {
        const url = '/follow/add';
        return axiosConfig.post(url, data);
    },
    deleteFollow: (data)=> {
        const url = `/follow/delete`;
        return axiosConfig.delete(url, {data: data});
    },
}

export default followApi;