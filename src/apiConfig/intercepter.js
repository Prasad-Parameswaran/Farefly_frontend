import axios from "axios";


const clientAxiosIntercepter = (url) => {
    const instance = axios.create({
        //baseURL: `http://localhost:4000/`,
        //baseURL: 'https://farflybackend.onrender.com',
        baseURL: 'https://farefly.de-vip.online/',
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

    instance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response) {
                if (error.response.status === 401) {
                    window.location.href = "/error404";
                } else if (error.response.status === 500) {
                    window.location.href = "/error500";
                } else {
                    console.log("HTTP ERROR CODE:", error.response.status);
                }
            } else if (error.request) {
                console.log("Network Error:", error.message);
            } else {
                console.log("Error:", error.message);
            }
            return Promise.reject(error);
        }
    );

    return instance
}
const partnerAxiosIntercepter = (url) => {
    const instance = axios.create({
        //baseURL: `http://localhost:4000/partner/`,
        //baseURL: 'https://farflybackend.onrender.com/partner/',
        baseURL: 'https://farefly.de-vip.online/partner/',

    });

    instance.interceptors.request.use(
        config => {

            const tokenData = localStorage.getItem('partnerToken');

            if (tokenData) {
                config.headers['Authorization'] = `Bearer ${localStorage.getItem('partnerToken')}`;
            }
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );

    instance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response) {
                if (error.response.status === 401) {
                    window.location.href = "/error404";
                } else if (error.response.status === 500) {
                    window.location.href = "/error500";
                } else {
                    console.log("HTTP ERROR CODE:", error.response.status);
                }
            } else if (error.request) {
                console.log("Network Error:", error.message);
            } else {
                console.log("Error:", error.message);
            }
            return Promise.reject(error);
        }
    );

    return instance;
}

const adminAxiosIntercepter = (url) => {
    const instance = axios.create({
        //baseURL: `http://localhost:4000/admin/`,
        //baseURL: 'https://farflybackend.onrender.com/admin/',
        baseURL: 'https://farefly.de-vip.online/admin/',

    });

    instance.interceptors.request.use(
        config => {
            const tokenData = localStorage.getItem('adminToken');
            if (tokenData) {
                config.headers['Authorization'] = `Bearer ${localStorage.getItem('adminToken')}`;
            }
            return config;
        },
        error => {

            return Promise.reject(error);
        }
    )
    instance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response) {
                if (error.response.status === 401) {
                    window.location.href = "/error404";
                } else if (error.response.status === 500) {
                    window.location.href = "/error500";
                } else {
                    console.log("HTTP ERROR CODE:", error.response.status);
                }
            } else if (error.request) {
                console.log("Network Error:", error.message);
            } else {
                console.log("Error:", error.message);
            }
            return Promise.reject(error);
        }
    );

    return instance;
}

export { clientAxiosIntercepter, partnerAxiosIntercepter, adminAxiosIntercepter };
