import axios from '../Request';
import paths from './paths';
import {iApi} from './types';

export default {
    candidateMe: async () => {
        return await axios.get<iApi.oCandidate>(paths.candidateMe);
    },
    companyMe: async () => {
        return await axios.get<iApi.oCompany>(paths.companyMe);
    },
    updateCandidate: (params: iApi.iUpdateCandidate) => axios.put<iApi.oUpdateCandidate>(paths.updateCandidate, params),
    updateCompany: (params: iApi.iUpdateCompany) => axios.put<iApi.oUpdateCompany>(paths.updateCompany, params),
    uploadCandidateAvatar: (params: iApi.iUploadCandidateAvatar) => axios.put<iApi.oUploadCandidateAvatar>(paths.uploadCandidateAvatar, params),
    uploadCompanyLogo: (params: iApi.iUploadCompanyLogo) => axios.put<iApi.oUploadCompanyLogo>(paths.uploadCompanyLogo, params),
}