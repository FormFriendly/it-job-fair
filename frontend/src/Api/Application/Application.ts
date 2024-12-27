import axios from '../Request';
import paths from './paths';
import {iApi} from './types';

export default {
    apply: (params: iApi.iApplyForVacancy) => axios.post<iApi.oApplyForVacancy>(paths.applyForVacancy, params)
}