import axiosConfig from "./axiosConfig";

const messageApi = {
    getMessagesByConversationId: (conversationId)=> {
        const url = `/message/${conversationId}`;
        return axiosConfig.get(url);
    }
}

export default messageApi;