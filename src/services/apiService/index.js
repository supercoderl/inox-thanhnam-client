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
    },
    splitFullname: (fullname) => {
        if (!fullname || fullname === "") return null;
        const splitName = fullname.split(' ');
        const firstname = splitName.pop();
        const lastname = splitName.join(' ');
        return { firstname, lastname };
    },
    setSession: (key, value) => {
        const serializedValue = JSON.stringify(value);
        window.sessionStorage.setItem(key, serializedValue);
    },
    getSession: (key) => {
        try {
            const item = window.sessionStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error(`Error getting sessionStorage item ${key}:`, error);
            return null;
        }
    },
};

export default ApiService;