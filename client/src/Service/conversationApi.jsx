import axiosConfig from "./axiosConfig";

const conversationApi = {
    getConversationsByUserId: (userId)=> {
        const url = `/conversation/${userId}`;
        return axiosConfig.get(url);
    },
    getOneConversation: (conversationId)=> {
        const url = `/conversation/get-by-id/${conversationId}`;
        return axiosConfig.get(url);
    },
    addConversation: (data)=> {
        const url = '/conversation/add';
        return axiosConfig.post(url, data);
    },
    deleteConversation: (conversationId)=> {
        const url = `/conversation/delete/${conversationId}`;
        return axiosConfig.delete(url);
    }
}

export default conversationApi;