import axios from '../Request';
import paths from './paths';
import {iApi} from './types';
import CS from '@/Storages/Cookie';

export default {
    me: async () => {
        try {
            if (!CS.token.getAccess()) return null;
            return await axios.get<iApi.oMe>(paths.me);
        } catch (ex) {
            return null;
        }
    },
    profileMe: async () => {
        return await axios.get<iApi.oMe>(paths.me);
    },
    updateCandidate: (params: iApi.iUpdateCandidate) => axios.put<iApi.oUpdateCandidate>(paths.updateCandidate, params),
}