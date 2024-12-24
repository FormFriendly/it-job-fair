import axios from '../Request';
import paths from './paths';
import {iApi} from './types';

export default {
    me: async () => {
        return await axios.get<iApi.oCandidate>(paths.me);
    },
    updateCandidate: (params: iApi.iUpdateCandidate) => axios.put<iApi.oUpdateCandidate>(paths.updateCandidate, params),
    uploadAvatar: (params: iApi.iUploadAvatar) => axios.put<iApi.oUploadAvatar>(paths.uploadAvatar, params),
    uploadResume: (params: iApi.iUploadResume) => axios.put<iApi.oUploadResume>(paths.uploadResume, params),
}