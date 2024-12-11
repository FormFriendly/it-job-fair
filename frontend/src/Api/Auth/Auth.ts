import axios from '../Request';
import paths from './paths';
import {iApi} from './types';

export default {
    login: (params: iApi.iLogin) => axios.post<iApi.oLogin>(paths.login, params),
    registration: (params: iApi.iRegistration) => axios.post<iApi.oRegistration>(paths.registration, params)
}