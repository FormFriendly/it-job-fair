import axios from '../Request';
import paths from './paths';
import {iApi} from './types';

export default {
    me: async () => {
        return await axios.get<iApi.oCompany>(paths.me);
    },
    updateCompany: (params: iApi.iUpdateCompany) => axios.put<iApi.oUpdateCompany>(paths.updateCompany, params),
    uploadLogo: (params: iApi.iUploadLogo) => axios.post<iApi.oUploadLogo>(paths.uploadLogo, params),
}