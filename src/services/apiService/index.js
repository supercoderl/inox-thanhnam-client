import axiosInstance from "../../config/axios";

const ApiService = {
    get: async (path, params) => {
        try {
            return await axiosInstance.get(path, { params: params });
        } catch (error) {
            console.error('Error call GET service: ', error);
            return;
        }
    },
    post: async (path, body, params) => {
        try {
            return await axiosInstance.post(path, body, { params: params });
        } catch (error) {
            console.error('Error call GET service: ', error);
            return;
        }
    },
    put: async (path, body, params) => {
        try {
            return await axiosInstance.put(path, body, { params: params });
        } catch (error) {
            console.error('Error call GET service: ', error);
            return;
        }
    },
    delete: async (path, params) => {
        try {
            return await axiosInstance.delete(path, { params: params });
        } catch (error) {
            console.error('Error call DELETE service: ', error);
            return;
        }
    },
    setObject: (object) => {
        return object || null;
    },
    formatVND: (amount) => {
        return amount ? amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : 0;
    }
};

export default ApiService;