import axiosConfig from "./axiosConfig";

const shareApi = {
    getAll: ()=> {
        const url = '/share';
        return axiosConfig.get(url);
    },
    createShare: (data)=> {
        const url = '/share/add';
        return axiosConfig.post(url, data);
    },
}

export default shareApi;