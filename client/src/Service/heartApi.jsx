import axiosConfig from "./axiosConfig";

const heartApi = {
    getAll: ()=> {
        const url = '/heart';
        return axiosConfig.get(url);
    },
    addHeart: (data)=> {
        const url = '/heart/add';
        return axiosConfig.post(url, data);
    },
    deleteHeart: (data) => {
        const url = `/heart/delete`;
        return axiosConfig.delete(url, { data: data });
    },    
}

export default heartApi;