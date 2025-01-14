import axios from '../Request';
import paths from './paths';
import {iApi} from './types';

export default {
    getSkills: async () => {
        return await axios.get<iApi.oSkill>(paths.getSkills);
    }, 
    getSpecializations: async () => {
        return await axios.get<iApi.oSpecializations>(paths.getSpecializations);
    }
}