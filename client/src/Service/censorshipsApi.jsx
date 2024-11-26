import axiosConfig from "./axiosConfig";

const censorshipsApi = {
    getAll: ()=> {
        const url = '/censorships';
        return axiosConfig.get(url);
    },
}

export default censorshipsApi;