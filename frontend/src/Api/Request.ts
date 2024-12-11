import Axios from 'axios';
import Qs from 'qs';
import {setAuthHeader} from './Interceptors/setAuthHeader';
import {Api} from '@/Types';

const axios = Axios.create({
    baseURL: '/api',
    paramsSerializer: (params) => Qs.stringify(params, {arrayFormat: 'repeat'})
});

axios.interceptors.request.use(setAuthHeader);


export default {
    ...axios,
    get: <T>(...args: Parameters<typeof axios.get>) => {
        return axios.get<T>(...args)
            .then((response) => response.data)
    },
    post: async <T>(...args: Parameters<typeof axios.post>) => {
        return axios.post<T>(...args)
            .then((response) => response.data)
    },
    patch: async <T>(...args: Parameters<typeof axios.patch>) => {
        const response = await axios.patch<T>(...args);
        return response.data;
    },
    delete: async <T>(...args: Parameters<typeof axios.delete>) => {
        const response = await axios.delete<T>(...args);
        return response.data;
    },
    put: async <T>(...args: Parameters<typeof axios.put>) => {
        const response = await axios.put<T>(...args);
        return response.data;
    },
}





