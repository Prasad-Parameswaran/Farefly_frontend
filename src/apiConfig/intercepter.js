import axios from "axios";

const clientAxiosIntercepter = (url) => {
    console.log(url);
    const instance = axios.create({
        baseURL: `http://localhost:4000/`,
    });

    instance.interceptors.request.use(
        config => {
            const tokenData = localStorage.getItem('Token');
            if (tokenData) {
                config.headers['Authorization'] = `Bearer ${localStorage.getItem('Token')}`;
            }
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );

    return instance;
}

export { clientAxiosIntercepter };
