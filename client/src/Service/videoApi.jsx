import axiosConfig from "./axiosConfig";

const videoApi = {
    getById: (videoId)=> {
        const url = `/video/${videoId}`;
        return axiosConfig.get(url);
    },
    getAll: ()=> {
        const url = '/video';
        return axiosConfig.get(url);
    },
    createVideo: (data, onUploadProgress) => {
        const url = '/video/add';
        return axiosConfig.post(url, data, {
          onUploadProgress: onUploadProgress, // Bắt sự kiện upload tiến trình
        });
      },
    updateVideo: (videoId, data, onUploadProgress)=> {
        const url = `/video/update/${videoId}`;
        return axiosConfig.put(url, data, {
            onUploadProgress: onUploadProgress, // Bắt sự kiện upload tiến trình
          });
    },
    updateView: (videoId, data)=> {
        const url = `/video/update/view/${videoId}`;
        return axiosConfig.put(url, data);
    },
    deleteVideo: (videoId)=> {
        const url = `/video/delete/${videoId}`;
        return axiosConfig.delete(url);
    },
}

export default videoApi;