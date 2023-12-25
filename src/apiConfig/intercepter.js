import axios from "axios";

const clientAxiosIntercepter = (url) => {
    console.log("this is url=====================================");
    const instance = axios.create({
        baseURL: `http://localhost:4000/`,
    });

    instance.interceptors.request.use(
        config => {
            const tokenData = localStorage.getItem('Token');
            if (tokenData) {
                config.headers['Authorization'] = `Bearer ${localStorage.getItem('Token')}`;
                console.log('configinakath------------ keri');
            }
            return config;
        },
        error => {
            console.log('ibade error adichu....');
            return Promise.reject(error);

        }
    );

    return instance;
}
const partnerAxiosIntercepter = (url) => {
    console.log(url);
    const instance = axios.create({
        baseURL: `http://localhost:4000/partner/`,
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

    return instance;
}

const adminAxiosIntercepter = (url) => {
    console.log(url);
    const instance = axios.create({
        baseURL: `http://localhost:4000/admin/`,
    });

    instance.interceptors.request.use(
        config => {
            console.log('ivideyum ethi')

            const tokenData = localStorage.getItem('adminToken');
            console.log('1');
            if (tokenData) {
                config.headers['Authorization'] = `Bearer ${localStorage.getItem('adminToken')}`;
            }
            return config;
        },
        error => {
            console.log('error ahnu ethi')

            return Promise.reject(error);
        }
    );

    return instance;
}

export { clientAxiosIntercepter, partnerAxiosIntercepter, adminAxiosIntercepter };
