import axios from '../Request';
import paths from './paths';
import {iApi} from './types';

export default {
    getEvents: async () => {
        return await axios.get<iApi.oEvents>(paths.getEvents);
    },
    getEventById: async (id: string) => {
        return await axios.get<iApi.oEvent>(paths.getEvent + id);
    },
}