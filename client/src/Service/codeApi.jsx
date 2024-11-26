import axiosConfig from "./axiosConfig";

const codeApi = {
    sendCode: (data)=> {
        const url = '/code/send';
        return axiosConfig.post(url, data);
    },
    verifyCode: (data)=> {
        const url = '/code/verify';
        return axiosConfig.post(url, data);
    },
}

export default codeApi;