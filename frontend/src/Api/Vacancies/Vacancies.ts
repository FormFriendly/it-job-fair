import axios from '../Request';
import paths from './paths';
import {iApi} from './types';

export default {
    getVacancies: async (params: iApi.iParams) => {
        return await axios.get<iApi.oVacancies>(paths.getVacancies, { params });
    },
    getVacancyById: async (id: string) => {
        return await axios.get<iApi.oVacancy>(paths.getVacancy + id);
    },
}