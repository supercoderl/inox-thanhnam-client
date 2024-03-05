import axiosInstance from "../../config/axios";

const AuthService = {
    login: async (username, password) => {
        try {
            return await axiosInstance.post('/Auth/login', { username, password });
        } catch (error) {
            console.error('Error logging in:', error);
            return;
        }
    },

    logout: async () => {
        return await axiosInstance.post('/Auth/logout', { refreshToken: localStorage.getItem("refreshToken") });
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('accessToken');
    },

    saveAccessToken: (accessToken) => {
        localStorage.setItem("accessToken", accessToken);
    },

    saveRefreshToken: (refreshToken) => {
        localStorage.setItem("refreshToken", refreshToken);
    },

    saveUser: (user) => {
        localStorage.setItem("user", user);
    },

    getUser: () => {
        return localStorage.getItem("user");
    },

    getCookie: (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    },

    setCookie: (name, value, days) => {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value};${expires};path=/`;
    }
};

export default AuthService;