import axiosConfig from "./axiosConfig";

const commentApi = {
    getAll: ()=> {
        const url = '/comment';
        return axiosConfig.get(url);
    },
    createComment: (data)=> {
        const url = '/comment/add';
        return axiosConfig.post(url, data);
    },
}

export default commentApi;