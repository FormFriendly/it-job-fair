import {useQuery} from '@tanstack/react-query';
import * as Api from '@/Api';

export const useCandidateProfile = () => {
    return useQuery({
        queryKey: ['company-me'],
        queryFn: () => Api.Profile.companyMe(),
    })
}